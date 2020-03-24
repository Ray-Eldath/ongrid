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
            <HHeader class="header" theme="white">
                <div style="width:100px; float:left;">
                    <Button
                        :icon="
                            'mdi mdi-' +
                                (siderCollapsed
                                    ? 'forwardburger'
                                    : 'backburger')
                        "
                        size="l"
                        noBorder
                        style="font-size: 20px"
                        @click="siderCollapsed = !siderCollapsed"
                    ></Button>
                </div>
                <div class="user">
                    <DropdownCustom
                        ref="userDropdown"
                        class-name="h-text-dropdown"
                        placement="bottom-end"
                    >
                        <Avatar
                            :src="self.avatarUrl"
                            :width="40"
                            :distance="10"
                        >
                            <span class="username">{{ self.username }}</span>
                        </Avatar>

                        <div slot="content">
                            <Avatar
                                class="dropdown-top"
                                v-padding="40"
                                :src="self.avatarUrl"
                                :width="90"
                                :distance="20"
                            >
                                <div style="height: 100%">
                                    <p class="username">{{ self.username }}</p>
                                    <p class="role">
                                        {{ self.role.name }}
                                    </p>
                                </div>
                            </Avatar>
                            <Row class="bottom">
                                <Cell
                                    width="9"
                                    class="text-center"
                                    style="border-right:1px solid #EEE"
                                >
                                    <Button
                                        @click="personalInformation"
                                        icon="mdi mdi-account-box"
                                        text-color="primary"
                                        :no-border="true"
                                        style="font-size: 15px"
                                        >个人信息</Button
                                    >
                                </Cell>
                                <Cell
                                    width="7"
                                    class="text-center"
                                    style="border-right:1px solid #EEE"
                                >
                                    <Button
                                        @click="advancedOperations"
                                        text-color="gray"
                                        :no-border="true"
                                        style="font-size: 15px"
                                        >高级操作</Button
                                    >
                                </Cell>
                                <Cell width="7" class="text-center">
                                    <Button
                                        @click="logout"
                                        icon="mdi mdi-logout"
                                        text-color="primary"
                                        :no-border="true"
                                        style="font-size: 15px"
                                        >注销</Button
                                    >
                                </Cell>
                            </Row>
                        </div>
                    </DropdownCustom>
                </div>
            </HHeader>
            <Content style="padding: 0px 30px">
                <div class="view">
                    <router-view />
                </div>
                <div class="bottom-line"></div>
                <HFooter class="footer text-center">
                    <Copyright></Copyright>
                </HFooter>
            </Content>
        </Layout>
    </Layout>
</template>

<style lang="sass">
body
    font-family: "Noto Sans SC", "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif !important
    font-smoothing: antialiased
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale

    .h-dropdowncustom-group
        min-width: 360px
</style>

<style lang="sass" scoped>
body

    .h-dropdowncustom-group
        min-width: 500px

        .username
            padding-top: 15px
            margin: 0
            font-size: 25px

        .role
            font-size: 18px
            margin: 0
            margin-top: -2px

        .bottom
            line-height: 40px
            border-top: 1px solid #EEE

    .bottom-line
        margin-top: 2em

    .root
        height: 100%

        .header
            .user
                float: right
                margin-right: 20px

                span.username
                    font-size: 16px
                    transition: 200ms ease-out

        .h-layout-header-fixed
            overflow-y: scroll

        .h-layout
            background: #f0f2f5

            .view
                background: white
                border-radius: 2px
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

        .footer
            margin-bottom: 1em
</style>

<script>
import Myself from "./componment/modal/Myself";
import AdvancedOperations from "./componment/modal/AdvancedOperations";
import Copyright from "./componment/Copyright";
import { mapState } from "vuex";
import dayjs from "dayjs";

export default {
    mounted() {
        if (this.$route.meta.plain) return;
        let meta = this.$store.state.meta;

        if (!meta.userModelInitialized) {
            const self = this;
            this.$api.get("/meta/model/user", {
                success(data) {
                    self.$store.commit("setUserModel", data);
                }
            });
        }
    },
    methods: {
        select(data) {
            if (this.$route.name !== data.key)
                this.$router.push({ name: data.key });
        },
        logout() {
            this.$store.commit("logout");
            this.$Message("成功登出。");
            this.$router.push({ name: "login" });
        },
        advancedOperations() {
            this.$Modal({
                component: { vue: AdvancedOperations },
                hasCloseIcon: true,
                hasDivider: true
            });
        },
        personalInformation() {
            this.$Modal({
                component: {
                    vue: Myself,
                    datas: {
                        self: this.self
                    }
                },
                hasCloseIcon: true,
                hasDivider: true
            });
        }
    },
    data() {
        return {
            siderCollapsed: false,
            menuDatas: [
                { title: "主页", key: "home", icon: "mdi mdi-home" },
                {
                    title: "运行管理",
                    key: "_top_operation",
                    icon: "mdi mdi-wrench",
                    children: [
                        {
                            title: "数据源注册表",
                            key: "providers",
                            icon: "mdi mdi-import"
                        },
                        {
                            title: "模型注册表",
                            key: "models",
                            icon: "mdi mdi-export"
                        },
                        {
                            title: "运行图",
                            key: "graph",
                            icon: "mdi mdi-swap-horizontal-bold"
                        }
                    ]
                },
                {
                    title: "用户管理",
                    key: "_top_users",
                    icon: "mdi mdi-account-supervisor",
                    children: [
                        {
                            title: "所有用户",
                            key: "user",
                            icon: "mdi mdi-account-box-multiple"
                        },
                        {
                            title: "注册申请",
                            key: "application",
                            icon: "mdi mdi-clipboard-text-multiple"
                        }
                    ]
                },
                {
                    title: "结果查询",
                    key: "result",
                    icon: "mdi mdi-file-document-box-search"
                },
                {
                    title: "系统管理",
                    key: "metrics",
                    icon: "mdi mdi-view-dashboard"
                }
            ]
        };
    },
    watch: {
        $route() {
            if (this.$route.name) this.$refs.menu.select(this.$route.name);
        },
        siderFixed() {
            if (!this.siderFixed) this.headerFixed = false;
        }
    },
    computed: {
        ...mapState({
            self: state => state.auth
        })
    },
    components: { Copyright }
};
</script>
