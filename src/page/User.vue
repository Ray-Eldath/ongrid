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
import { mapState } from "vuex";

export default {
    methods: {
        async refresh() {}
    },
    computed: {
        ...mapState({
            permissions: state => state.meta.permissions,
            roles: state => state.meta.roles
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
                email: ""
            },
            loading: false
        };
    }
};
</script>
