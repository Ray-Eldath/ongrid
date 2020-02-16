<template>
    <div class="content">
        <Form
            class="filter"
            ref="filter"
            mode="threecolumn"
            :labelWidth="65"
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
            <TableItem title="ID" prop="id" :width="200"></TableItem>
            <TableItem title="状态" :width="200">
                <template v-slot="{ data }">
                    <span v-if="data.is_application_pending" class="green-color"
                        >等待审核</span
                    >
                    <span v-else class="gray-color">已被拒绝</span>
                </template>
            </TableItem>
            <TableItem title="邮箱" prop="email"></TableItem>
            <TableItem title="用户名" prop="username"></TableItem>
            <TableItem title="操作">
                <template v-slot="{ data }">
                    <template v-if="data.is_application_pending">
                        <Button
                            text-color="green"
                            icon="ion-md-checkmark"
                            v-tooltip="true"
                            content="批准注册"
                            @click="openApprove(data)"
                        ></Button>
                        <Poptip
                            :content="poptip.reject"
                            @content="rejectApplication(data)"
                        >
                            <Button
                                text-color="red"
                                icon="ion-md-close"
                                v-tooltip="true"
                                content="拒绝注册"
                            ></Button>
                        </Poptip>
                    </template>
                    <Poptip
                        v-else
                        :content="poptip.delete"
                        @click="deleteApplication(data)"
                    >
                        <Button
                            text-color="gray"
                            style="opacity: 0.7"
                            icon="ion-md-trash"
                            v-tooltip="true"
                            content="删除该注册申请"
                        ></Button>
                    </Poptip>
                </template>
            </TableItem>
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

<style lang="sass" scoped>
.content
    .pagination
        margin-top: 2em
</style>

<script>
import ApproveModal from "../componment/ApproveUserApplicationModal";

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

            const self = this;
            await this.$api.get("/applications", {
                success(returns) {
                    self.pagination.total = returns.total;
                    self.entries = returns.result;

                    self.loading = false;
                },
                params: params
            });
        },
        async submitFilter() {
            if (this.$refs.filter.valid().result) await this.refresh();
        },
        async clearFilter() {
            this.$refs.filter.resetValid();
            this.$set(this.filter, "email", "");
            this.$set(this.filter, "username", "");
            await refresh();
        },
        openApprove(data) {
            const self = this;
            this.$Modal({
                component: {
                    vue: ApproveModal,
                    datas: { application: data }
                },
                events: {
                    applicationSubmitted(data) {
                        self.refresh();
                    }
                },
                hasCloseIcon: true
            });
        }
    },
    async mounted() {
        await this.refresh();
    },
    data() {
        return {
            entries: [
                {
                    id: 1,
                    email: "alpha@beta.omega",
                    username: "False Ray Eldath"
                }
            ],
            filter: {
                email: "",
                username: ""
            },
            pagination: {
                page: 1,
                size: 15,
                total: 1
            },
            poptip: {
                reject:
                    "由于安全策略，一旦某邮箱对应的注册请求被拒绝，该邮箱的后续请求均将被直接拒绝。是否继续？",
                delete:
                    "由于安全策略，一旦某邮箱对应的注册请求被拒绝，该邮箱的后续请求均将被直接拒绝。删除已拒绝的申请将解除这一锁定。是否继续？"
            },
            loading: false
        };
    }
};
</script>
