<template>
    <div class="root" v-if="$route.meta.plain">
        <router-view />
    </div>
    <Layout
        class="root"
        v-else
        :siderFixed="true"
        :siderCollapsed="siderCollapsed"
    >
        <Sider class="sider" theme="dark">
            <div v-if="!siderCollapsed" class="logo text-center">
                <span>OFFGRID</span>
            </div>
            <Menu
                style="margin-top: 20px;"
                ref="menu"
                :datas="menuDatas"
                :inlineCollapsed="siderCollapsed"
                :accordion="true"
                @select="select"
            ></Menu>
        </Sider>
        <Layout :headerFixed="true">
            <HHeader theme="white">
                <div style="width:100px; float:left;">
                    <Button
                        icon="ion-md-menu"
                        size="l"
                        noBorder
                        style="font-size: 20px"
                        @click="siderCollapsed = !siderCollapsed"
                    ></Button>
                </div>
            </HHeader>
            <Content style="padding: 0px 30px">
                <div class="view">
                    <router-view />
                </div>
                <div class="bottom-line"></div>
                <HFooter class="footer text-center">
                    ©. 2019 - 2020. IllegalSkillsExcepion.
                    <a
                        href="https://github.com/Ray-Eldath"
                        target="_blank"
                        rel="noopener noreferrer"
                        >Ray Eldath</a
                    >.
                </HFooter>
            </Content>
        </Layout>
    </Layout>
</template>

<style lang="sass" scoped>
body
    font-family: 'Noto Sans SC', sans-serif

    .bottom-line
        margin-top: 2em

    .root
        height: 100%

        .h-layout-header-fixed
            overflow-y: scroll

        .h-layout
            background: #f0f2f5

            .view
                background: white
                $padding: 32px
                padding: $padding
                margin-top: $padding

        .sider
            .logo
                width: 100%
                margin-top: 20px
                padding-top: 10px

                span
                    $height: 100px
                    height: $height
                    line-height: $height
                    font-size: 36px
                    font-family: serif
                    color: white
                    opacity: 0.8
                    transition: 500ms linear

                    &:hover
                        opacity: 1
                        cursor: default
</style>

<script>
export default {
    methods: {
        select(data) {
            this.$router.push({ name: data.key });
        }
    },
    data() {
        return {
            siderCollapsed: false,
            menuDatas: [
                { title: "主页", key: "home", icon: "ion-md-home" },
                {
                    title: "运行管理",
                    key: "_top_operation",
                    icon: "ion-md-build",
                    children: [
                        {
                            title: "数据源注册表",
                            key: "providers",
                            icon: "ion-md-log-in"
                        },
                        {
                            title: "模型注册表",
                            key: "models",
                            icon: "ion-md-log-out"
                        },
                        { title: "运行图", key: "graph", icon: "ion-md-swap" }
                    ]
                },
                {
                    title: "账户管理",
                    key: "_top_users",
                    icon: "ion-md-people",
                    children: [
                        {
                            title: "所有账户",
                            key: "user",
                            icon: "ion-md-contacts"
                        },
                        {
                            title: "注册申请",
                            key: "application",
                            icon: "ion-md-paper"
                        }
                    ]
                },
                {
                    title: "结果查询",
                    key: "result",
                    icon: "ion-md-list-box"
                },
                { title: "系统管理", key: "metrics", icon: "ion-md-analytics" }
            ]
        };
    },
    watch: {
        $route() {
            if (this.$route.name) {
                this.$refs.menu.select(this.$route.name);
            }
        },
        siderFixed() {
            if (!this.siderFixed) {
                this.headerFixed = false;
            }
        }
    }
};
</script>
