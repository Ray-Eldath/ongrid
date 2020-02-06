<template>
    <div class="background">
        <div class="block">
            <div class="login-box">
                <section class="login">
                    <h1 class="title">登录</h1>
                    <div class="h-input h-input-prefix-icon">
                        <input
                            type="text"
                            v-model="model.name"
                            placeholder="邮箱"
                        />
                        <i class="h-icon ion-md-mail"></i>
                    </div>
                    <div class="h-input h-input-prefix-icon">
                        <input
                            type="text"
                            v-model="model.password"
                            placeholder="密码"
                        />
                        <i class="h-icon ion-md-keypad"></i>
                    </div>

                    <Button class="login" color="primary">登录</Button>
                    <div class="bottom">
                        <p class="forget"><a href="http://">忘记密码？</a></p>
                        <p class="register">
                            没有账户？请<a
                                href="http://google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                >在这里注册。</a
                            >
                        </p>
                    </div>
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
    color: rgba(255, 255, 255, 0.3)

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
                .forget
                    color: darken(white, 30)
                    float: right
                .register
                    color: darken(white, 60)
                    float: left
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
export default {
    data() {
        return {
            isLoading: false,
            model: {
                name: "",
                password: ""
            },
            validationRules: {
                required: ["name", "password"]
            }
        };
    },
    methods: {
        submit() {
            this.isLoading = true;
            let validResult = this.$refs.form.valid();
            if (validResult.result) {
                this.$Message("验证成功");
                setTimeout(() => {
                    this.isLoading = false;
                }, 1000);
            } else {
                this.isLoading = false;
            }
        },
        reset() {
            this.$refs.form.resetValid();
        }
    }
};
</script>
