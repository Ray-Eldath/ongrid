<template>
    <div class="content">
        <Form
            class="filter"
            ref="filter"
            mode="threecolumn"
            :labelWidth="80"
            :validOnChange="false"
            :model="filter"
        >
            <FormItem label="邮箱" prop="email">
                <input
                    autofocus
                    type="text"
                    v-model="filter.email"
                    placeholder="依邮箱筛选，留空则不筛选"
                    :disabled="loading"
                    @keydown.enter="refresh"
                />
            </FormItem>
            <FormItem label="状态" prop="state">
                <Select
                    keyName="id"
                    titleName="name"
                    placeholder="依状态筛选，留空则不筛选"
                    nullOptionText="不按状态筛选"
                    v-model="filter.state"
                    :disabled="loading"
                    :datas="userStates"
                ></Select>
            </FormItem>
            <FormItem label="用户名" prop="username">
                <input
                    type="text"
                    v-model="filter.username"
                    placeholder="依用户名筛选，留空则不筛选"
                    :disabled="loading"
                    @keydown.enter="refresh"
                />
            </FormItem>
            <FormItem label="身份" prop="role">
                <RoleSelector
                    v-model="filter.roleObject"
                    planceholder="依用户身份筛选，留空则不筛选"
                    nullOptionText="不按用户身份筛选"
                    :disabled="loading"
                ></RoleSelector>
            </FormItem>
            <FormItem label="权限" prop="permission">
                <template v-slot:label>
                    <Helper
                        content="权限筛选的优先级高于身份筛选：设置权限将会返回所有具有该权限的用户，无论其身份是否满足。"
                    ></Helper>
                    权限
                </template>
                <Select
                    keyName="id"
                    titleName="name"
                    :filterable="true"
                    placeholder="依用户权限筛选，留空则不筛选"
                    nullOptionText="不按用户权限筛选"
                    v-model="filter.permission"
                    :disabled="loading"
                    :datas="flattenPermissions"
                ></Select>
            </FormItem>
            <FormItem single>
                <ButtonGroup style="margin-top: -2px">
                    <Button
                        icon="mdi mdi-filter"
                        :loading="loading"
                        @click="submitFilter"
                        >应用筛选</Button
                    >
                    <Button
                        color="outline"
                        :loading="loading"
                        @click="clearFilter"
                        >清空筛选</Button
                    >
                </ButtonGroup>
                <Button
                    style="margin-left: 1em"
                    icon="mdi mdi-refresh"
                    v-tooltip="true"
                    content="刷新数据"
                    placement="bottom"
                    :loading="loading"
                    @click="refresh"
                ></Button>
            </FormItem>
        </Form>

        <div class="bottom-line"></div>

        <Table
            :datas="entries"
            :loading="loading"
            :border="false"
            :stripe="true"
        >
            <TableItem title="ID" prop="id" :width="120"></TableItem>
            <TableItem title="状态" :width="120">
                <template v-slot="{ data }">
                    <span class="gray-color" v-if="data.state === 0">正常</span>
                    <span class="red-color" v-else-if="data.state === 1"
                        >禁止登录</span
                    >
                </template>
            </TableItem>
            <TableItem title="用户名" prop="username"></TableItem>
            <TableItem title="邮箱" prop="email"></TableItem>
            <TableItem title="身份">
                <template v-slot="{ data }">
                    {{ data.role.name }}
                </template>
            </TableItem>
            <TableItem title="操作">
                <template v-slot="{ data }">
                    <Button
                        text-color="yellow"
                        icon="mdi mdi-account-edit"
                        v-tooltip="true"
                        content="编辑用户"
                        @click="editUser(data)"
                    ></Button>

                    <Button
                        style="margin-left: 4px"
                        text-color="red"
                        icon="mdi mdi-account-remove"
                        v-tooltip="true"
                        content="删除用户"
                        @click="removeUser(data)"
                    ></Button>

                    <Poptip
                        style="margin-left: 4px"
                        v-if="data.state === 0"
                        content="确认禁止该用户登录？"
                        @confirm="banUser(data)"
                    >
                        <Button
                            text-color="gray"
                            icon="mdi mdi-account-cancel"
                            v-tooltip="true"
                            content="封禁用户"
                        ></Button>
                    </Poptip>
                    <Poptip
                        style="margin-left: 4px"
                        v-else-if="data.state === 1"
                        content="确认允许该用户登录？"
                        @confirm="unbanUser(data)"
                    >
                        <Button
                            text-color=""
                            icon="mdi mdi-account-check"
                            v-tooltip="true"
                            content="解除封禁"
                        ></Button>
                    </Poptip>
                </template>
            </TableItem>
        </Table>
        <Pagination
            class="pagination"
            style="margin-top: 2em"
            v-model="pagination"
            align="center"
            :sizes="[15, 20, 50, 100]"
            @change="refresh"
        ></Pagination>
    </div>
</template>

<script>
import RoleSelector from "../componment/RoleSelector";
import Helper from "../componment/Helper";
import ConfirmModal from "../componment/modal/Confirm";
import EditUser from "../componment/modal/EditUser";
import { mapState } from "vuex";

export default {
    methods: {
        async refresh() {
            this.loading = true;

            let params = {
                pre_page: this.pagination.size,
                page: this.pagination.page
            };
            if (this.filter.email.length !== 0)
                params.email = this.filter.email;
            if (this.filter.username.length !== 0)
                params.username = this.filter.username;
            if (this.filter.permission && this.filter.permission.length !== 0)
                params.permission = this.filter.permission;
            if (this.filter.roleObject)
                params.role = this.filter.roleObject.role.id;
            if (this.filter.state) params.state = this.filter.state;

            const self = this;
            await this.$api.get("/users", {
                success(returns) {
                    self.pagination.total = returns.total;
                    self.entries = returns.result;

                    self.loading = false;
                },
                params: params
            });
        },
        async submitFilter() {
            await this.refresh();
        },
        clearFilter() {
            this.$set(this.filter, "username", "");
            this.$set(this.filter, "email", "");
            this.$set(this.filter, "roleObject", null);
            this.$set(this.filter, "username", null);
        },
        editUser(user) {
            const self = this;
            this.$Modal({
                component: {
                    vue: EditUser,
                    datas: { data: JSON.parse(JSON.stringify(user)) }
                },
                events: {
                    submitted: modal => {
                        self.$Message["success"](
                            `成功编辑用户 ${user.username}`
                        );
                        self.refresh();
                    }
                },
                hasCloseIcon: true,
                hasDivider: true
            });
        },
        removeUser(user) {
            const self = this;
            this.$Modal({
                component: {
                    vue: ConfirmModal,
                    datas: {
                        title: `确认永久删除用户 ${user.username}？`,
                        content: `您正试图永久删除用户 ${user.username} <${user.email}>，这意味着该用户将无法再次登录，所有相关的活动记录也将被级联删除。这是永久性操作。该用户若被删除，需要重新申请并批准才能重新具有访问权限。是否继续？`,
                        confirmIcon: "mdi mdi-delete-forever",
                        confirmColor: "red"
                    }
                },
                events: {
                    confirm: modal => {
                        self.$api.delete(`/users/${user.id}`, {
                            success() {
                                self.$Message["success"](
                                    `成功删除用户 ${user.username}`
                                );
                                self.refresh();
                            }
                        });
                    }
                },
                hasCloseIcon: true
            });
        },
        async banUser(user) {
            const self = this;
            await this.$api.get(`/users/${user.id}/ban`, {
                success() {
                    self.refresh();
                }
            });
        },
        async unbanUser(user) {
            const self = this;
            await this.$api.get(`/users/${user.id}/unban`, {
                success() {
                    self.refresh();
                }
            });
        }
    },
    computed: {
        ...mapState({
            flattenPermissions: state =>
                state.meta.userModel["flatten_permissions"],
            userStates: state => state.meta.userModel["user_states"]
        })
    },
    async mounted() {
        await this.refresh();
    },
    data() {
        return {
            entries: [
                {
                    id: 30213,
                    username: "Ray Eldath",
                    email: "abc@omega.com",
                    role: {
                        id: 0,
                        name: "Root"
                    }
                }
            ],
            pagination: {
                page: 1,
                size: 15,
                total: 1
            },
            filter: {
                username: "",
                email: "",
                state: null,
                permission: "",
                roleObject: null
            },
            loading: false
        };
    },
    components: { RoleSelector, Helper }
};
</script>
