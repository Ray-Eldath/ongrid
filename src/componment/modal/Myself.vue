<template>
    <div class="modal">
        <header class="h-modal-header">
            <i class="mdi mdi-card-account-details"></i>
            {{ self.username }} 的个人信息
        </header>
        <div class="content">
            <Avatar :src="self.avatarUrl" :width="100" :distance="25">
                <div class="username">{{ self.username }}</div>
                <div class="role">{{ self.role.name }}</div>
                <div class="separation-line"></div>
                <div class="entry">
                    <div class="first">身份</div>
                    <div class="second">{{ self.role.name }}</div>
                </div>
                <div class="entry" v-if="self.registerTime">
                    <div class="first">注册时间</div>
                    <div class="second">{{ registerTime }}</div>
                </div>
                <div class="entry" v-if="self.lastLoginTime">
                    <div class="first">上次登录时间</div>
                    <div class="second">{{ lastLoginTime }}</div>
                </div>
            </Avatar>

            <Collapse class="collapse">
                <CollapseItem>
                    <template slot="title">
                        <div style="color: red; display: inline">
                            <i class="mdi mdi-alert-outline"></i>
                            <span>危险操作</span>
                        </div>
                    </template>
                    <div class="buttons">
                        <Button
                            color="red"
                            icon="mdi mdi-delete-alert"
                            @click="deleteUser"
                            >删除该账户</Button
                        >
                    </div>
                </CollapseItem>
            </Collapse>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.content
    padding: 3em
    padding-bottom: 10px

    .username
        font-size: 2em

    .role
        font-size: 1.4em
        margin-top: -5px

    .separation-line
        margin-top: 5px
        margin-bottom: 5px
        border-bottom: dashed 1px darken(white,15)

    .entry
        opacity: .6

        .first
            display: inline
            margin-right: 3em

        .second
            float: right

    .collapse
        margin-top: 5em
        .buttons
            margin: 0.5em
            margin-bottom: 1em
</style>

<script>
import ConfirmModal from "../modal/Confirm";

export default {
    methods: {
        deleteUser() {
            const self = this;
            this.$Modal({
                component: {
                    vue: ConfirmModal,
                    datas: {
                        title: `确认删除当前账户？`,
                        content: `请注意，这是永久性操作！这意味着您将无法再次登录，所有相关的活动记录也将被级联删除，您需要重新申请并等待批准才能重新具有访问权限。是否继续？`,
                        icon: "red-color mdi mdi-alert-octagon",
                        confirmIcon: "mdi mdi-delete-forever",
                        confirmColor: "red"
                    }
                },
                events: {
                    confirm: modal => {
                        self.$api.delete("/self", {
                            success() {
                                self.$emit("close");
                                self.$store.commit("logout");
                                self.$router.push({ name: "login" });

                                self.$Notice["info"]({
                                    title: "成功删除当前账户",
                                    content:
                                        "您已自动登出，您的账户及相关数据已从 Offgrid 系统中彻底删除，您可能需要重新申请并等待批准才能重新具有访问权限。感谢您使用 Offgrid。",
                                    timeout: 0
                                });
                            }
                        });
                    }
                },
                hasCloseIcon: true
            });
        }
    },
    computed: {
        registerTime() {
            return this.$dayjs(this.self.registerTime).format("llll");
        },
        lastLoginTime() {
            return this.$dayjs(this.self.lastLoginTime).format("llll");
        }
    },
    props: {
        self: {
            type: Object,
            required: true
        }
    }
};
</script>
