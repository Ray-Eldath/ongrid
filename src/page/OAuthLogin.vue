<template>
    <div class="page">
        <div class="content">
            <div class="box">
                <h1 class="title text-ellipsis">登录到 {{ clientName }}</h1>
                <p class="description">
                    <i
                        class="mdi mdi-link-box-variant-outline"
                        style="margin-right: 2px"
                    ></i
                    >{{ clientName }} 正在请求使用您的 Offgrid 账户登录。
                </p>
                <p class="disclaimer">
                    <i class="mdi mdi-lock green-color"></i>
                    不用担心，该服务绝无可能得到您的用户名或密码。若您具有访问该服务的权限，您将跳转至该服务。
                </p>
                <LoginBox
                    class="login-box"
                    loginPrompt="使用 Offgrid 账户登录"
                    emailPlanceholder="Offgrid 账户邮箱"
                    passwordPlanceholder="Offgrid 账户密码"
                    :disabled="disabled"
                    :isLoading="isLoading"
                    @submit="submit"
                ></LoginBox>
            </div>
            <div class="bottom">
                这是一个由 {{ clientName }} 发起、由 Offgrid 处理的 OAuth
                登录请求。
                <Copyright></Copyright>
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.page
    height: 100%
    width: 100%
    background: darken(white, 3)

    .content
        position: relative
        z-index: 2
        width: 40%
        height: 100%
        padding: 8em
        margin: auto
        background: white
        display: flex
        flex-direction: column
        justify-content: center
        transition: 200ms linear

        @media (max-width: 1200px)
            width: 80%

        &:hover
            box-shadow: 0 2px 20px rgba(0, 0, 0, .03)
            border-color: rgba(0, 0, 0, 0)

        .box
            .title
                font-weight: bold
                font-size: 3em

            .description
                margin: 0
                margin-bottom: 15px
                font-size: 16px

            .disclaimer
                font-size: 16px
                color: lighten(black, 40)
                margin-top: 5px
                margin-bottom: 2em

        .bottom
            position: absolute
            bottom: 0
            margin-bottom: 5px
            opacity: .3
</style>

<script>
import "../util/ribbon";
import LoginBox from "../componment/LoginBox";
import Copyright from "../componment/Copyright";

export default {
    data() {
        let clientName = "unknown client";
        this.$api.get("hydra/check", {
            params: { login_challenge: this.$route.query.login_challenge },
            success(data) {
                clientName = data.client_name;
            }
        });
        return {
            clientName: clientName,
            disabled: false,
            isLoading: false
        };
    },
    methods: {
        submit(email, password) {
            this.isLoading = true;
            this.disabled = true;

            this.$api.post(
                "hydra/login",
                { email: email, password: password },
                {
                    params: {
                        login_challenge: this.$route.query.login_challenge
                    }
                }
            );
        }
    },
    components: { LoginBox, Copyright }
};
</script>
