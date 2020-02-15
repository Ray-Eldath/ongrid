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
            <TableItem title="序号" prop="id"></TableItem>
            <TableItem title="邮箱" prop="email"></TableItem>
            <TableItem title="用户名" prop="username"></TableItem>
            <TableItem title="操作">
                <!-- eslint-disable-next-line vue/no-unused-vars -->
                <template slot-scope="data">
                    <Button
                        text-color="green"
                        icon="ion-md-checkmark"
                        v-tooltip="true"
                        content="批准注册"
                        placement="bottom"
                    ></Button>
                    <Button
                        text-color="red"
                        icon="ion-md-close"
                        v-tooltip="true"
                        content="拒绝注册"
                        placement="bottom"
                    ></Button>
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

            console.log(params);
            console.log(this.filter.email);

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
        clearFilter() {
            this.$refs.filter.resetValid();
            this.$set(this.filter, "email", "");
            this.$set(this.filter, "username", "");
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
            loading: false
        };
    }
};
</script>
