<template>
    <div class="background">
        <div class="block">
            <div class="login-box">
                <section class="login">
                    <h1 class="title">登录</h1>
                    <div class="h-input h-input-prefix-icon">
                        <input
                            :disabled="disabled"
                            type="text"
                            v-model="email"
                            placeholder="邮箱"
                        />
                        <i class="h-icon ion-md-mail"></i>
                    </div>
                    <div class="h-input h-input-prefix-icon">
                        <input
                            :disabled="disabled"
                            type="password"
                            v-model="password"
                            placeholder="密码"
                        />
                        <i class="h-icon ion-md-keypad"></i>
                    </div>

                    <Button
                        class="login"
                        color="primary"
                        :loading="isLoading"
                        @click="submit"
                        >登录</Button
                    >
                    <div class="bottom">
                        <p class="register">
                            没有账户？请<router-link to="/register"
                                >在这里注册。</router-link
                            >
                        </p>
                        <p class="forget"><a href="http://">忘记密码？</a></p>
                    </div>
                    <span class="logout" @click="logout">强制登出</span>
                </section>
            </div>
        </div>

        <div class="corner">
            <div>Photo by Markus Spiske on Unsplash</div>
            <div>2020. Offgrid. ⚡ by IllegalSkillsException.</div>
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

    &:hover
        cursor: default
        opacity: 1
        transition: opacity 600ms ease

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

            .h-input
                margin-bottom: 1.2em
                display: block
                zoom: 1.3

                .h-icon
                    opacity: .3

            .login
                margin-top: 10px
                margin-bottom: 5px
                width: 100%
                font-size: 20px

            .bottom
                display: flex
                justify-content: space-between

                .forget
                    color: darken(white, 30)

                .register
                    color: darken(white, 60)

            .logout
                float: left
                margin-top: 10px
                color: black
                opacity: 0.2
                cursor: pointer

                &:hover
                    opacity: 0.4
                    transition: opacity 500ms ease

            .title
                font-size: 4em
                font-weight: bold
                color: lighten(black, 40)
                margin-bottom: 15px

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
import dayjs from "dayjs";

export default {
    data() {
        return {
            email: "alpha@beta.omega",
            password: "123",
            disabled: false,
            isLoading: false
        };
    },
    methods: {
        async submit() {
            this.isLoading = true;
            this.disabled = true;
            if (this.email.length === 0 || this.password.length === 0)
                this.$Message["error"]("错误：用户名或密码不能为空");
            else {
                const selfI = this;

                await this.$api.post(
                    "login",
                    { email: this.email, password: this.password },
                    {
                        success(r) {
                            let self = r.self;

                            selfI.$store.commit("login", {
                                token: r.bearer,
                                expire: r.expire_in,
                                id: self.id,
                                username: self.username,
                                email: self.email,
                                role: self.role,
                                permissions: self.permissions,
                                avatarUrl: self.avatar_url
                            });
                        }
                    }
                );
            }

            this.isLoading = false;
            this.disabled = false;
        },
        logout() {
            this.$store.commit("logout");
            this.$Message("成功清除登录状态。");
        }
    }
};
</script>
