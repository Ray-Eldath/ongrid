<template>
    <div class="background">
        <div class="block">
            <div class="login-box">
                <section class="login">
                    <h1 class="title">登录到 Offgrid</h1>
                    <LoginBox
                        :disabled="disabled"
                        :isLoading="isLoading"
                        @submit="submit"
                    ></LoginBox>
                    <span class="logout" @click="logout">强制登出</span>
                </section>
            </div>
        </div>

        <div class="corner">
            <div>Photo by Markus Spiske on Unsplash</div>
            <Copyright></Copyright>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.corner
    position: fixed
    $pad: 15px
    left: $pad
    bottom: $pad
    margin-bottom: -4px
    color: white
    opacity: .4
    transition: 600ms linear

    &:hover
        cursor: default
        opacity: 0.8

    div
        margin-top: -3px

    @media (max-width: 1200px)
        div:first-child
            display: none

        color: rgba(0, 0, 0, 0.3)

.block
    margin-left: auto
    height: 100%
    width: 40%
    border-radius: 5em 0 0 5em
    background: white

    @media (max-width: 1200px)
        width: 100%
        border-radius: 0

    .login-box
        height: 100%
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center

        .login
            width: 60%

        .logout
            float: left
            margin-top: 10px
            color: black
            opacity: 0.2
            cursor: pointer
            transition: 500ms linear

            &:hover
                opacity: 0.4

        .title
            font-size: 4em
            font-weight: bold
            color: lighten(black, 40)
            margin-bottom: 20px

.background
    height: 100%
    background-image: url('../../asset/login.jpg')
    background-size: contain
</style>

<style lang="sass">
body
    margin: 0
    height: 100vh
</style>

<script>
import LoginBox from "../componment/LoginBox";
import Copyright from "../componment/Copyright";
import dayjs from "dayjs";

export default {
    data() {
        return {
            disabled: false,
            isLoading: false
        };
    },
    methods: {
        async submit(email, password) {
            this.isLoading = true;
            this.disabled = true;
            if (email.length === 0 || password.length === 0)
                this.$Message["error"]("错误：用户名或密码不能为空");
            else {
                const selfI = this;

                await this.$api.post(
                    "login",
                    { email: email, password: password },
                    {
                        success(r) {
                            let self = r.self;
                            let login = self.last_login_time;
                            let register = self.register_time;

                            selfI.$store.commit("login", {
                                token: r.bearer,
                                expire: r.expire_in,
                                id: self.id,
                                username: self.username,
                                email: self.email,
                                role: self.role,
                                permissions: self.permissions,
                                avatarUrl: self.avatar_url,
                                lastLoginTime: login ? login : "",
                                registerTime: register ? register : ""
                            });

                            let back = selfI.$route.query.back;
                            if (selfI.$route.query && back === "true") {
                                selfI.$router.back();
                            } else selfI.$router.push({ name: "home" });
                        }
                    }
                );
            }

            this.isLoading = false;
            this.disabled = false;
        },
        logout() {
            this.$store.commit("logout");
            this.$Message["warn"]("成功清除登录状态。");
        }
    },
    components: { LoginBox, Copyright }
};
</script>
