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
            <FormItem label="用户名" prop="username">
                <input
                    type="text"
                    v-model="filter.username"
                    placeholder="依用户名筛选，留空则不筛选"
                    :disabled="loading"
                    @keydown.enter="refresh"
                />
            </FormItem>
            <FormItem label="用户身份" prop="role">
                <RoleSelector
                    v-model="filter.roleObject"
                    planceholder="依用户身份筛选，留空则不筛选"
                    nullOptionText="不按用户身份筛选"
                ></RoleSelector>
            </FormItem>
            <FormItem label="用户权限" prop="permission">
                <Select
                    keyName="id"
                    titleName="name"
                    :filterable="true"
                    placeholder="依用户权限筛选，留空则不筛选"
                    nullOptionText="不按用户权限筛选"
                    v-model="filter.permission"
                    :datas="flattenPermissions"
                ></Select>
            </FormItem>
            <FormItem single>
                <ButtonGroup style="margin-top: -2px">
                    <Button
                        icon="ion-md-funnel"
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
                    icon="ion-md-refresh"
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
        </Table>
        <Pagination
            class="pagination"
            v-model="pagination"
            align="center"
            :sizes="[15, 20, 50, 100]"
            @change="refresh"
        ></Pagination>
    </div>
</template>

<script>
import RoleSelector from "../componment/RoleSelector";
import { mapState } from "vuex";

export default {
    methods: {
        async refresh() {},
        submitFilter() {},
        clearFilter() {
            this.$set(this.filter, "username", "");
            this.$set(this.filter, "email", "");
            this.$set(this.filter, "roleObject", null);
            this.$set(this.filter, "username", null);
        }
    },
    computed: {
        ...mapState({
            flattenPermissions: state => state.meta.flattenPermissions
        })
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
                roleObject: null,
                permission: null
            },
            loading: false
        };
    },
    components: { RoleSelector }
};
</script>
