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
                class="h-menu-dark"
                :datas="menuDatas"
                :inlineCollapsed="siderCollapsed"
                :accordion="true"
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
            <Content style="padding: 0px 30px;">
                <div class="view">
                    <router-view />
                </div>
                <HFooter class="footer text-center">
                    ©. 2019 - 2020. IllegalSkillsExcepion.
                    <a
                        href="https://github.com/Ray-Eldath"
                        target="_blank"
                        rel="noopener noreferrer"
                        >Ray Eldath</a
                    >
                </HFooter>
            </Content>
        </Layout>
    </Layout>
</template>

<style lang="sass">
body
    font-family: 'Noto Sans SC', sans-serif

    .root
        height: 100%

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
                    transition: 500ms ease-in-out

                    &:hover
                        opacity: 1
                        cursor: default

        .footer
            padding: 1em
</style>

<script>
export default {
    data() {
        console.log(this.$store.state.auth.authed);

        return {
            siderCollapsed: false,
            menuDatas: [
                { title: "主页", key: "home", icon: "ion-md-home" },
                { title: "用户管理", key: "search", icon: "ion-md-people" },
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
                { title: "结果查询", key: "result", icon: "ion-md-list-box" },
                {
                    title: "账户管理",
                    key: "_top_users",
                    icon: "ion-md-people",
                    children: [
                        {
                            title: "所有账户",
                            key: "users",
                            icon: "ion-md-contacts"
                        },
                        {
                            title: "注册申请",
                            key: "applications",
                            icon: "ion-md-paper"
                        }
                    ]
                },
                { title: "系统管理", key: "metrics", icon: "ion-md-analytics" }
            ]
        };
    },
    watch: {
        siderFixed() {
            if (!this.siderFixed) {
                this.headerFixed = false;
            }
        }
    }
};
</script>
