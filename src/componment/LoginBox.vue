<template>
    <div class="box">
        <div class="h-input h-input-prefix-icon">
            <input
                :disabled="disabled"
                type="text"
                v-model="email"
                :placeholder="emailPlanceholder"
            />
            <i class="h-icon mdi mdi-email"></i>
        </div>
        <div class="h-input h-input-prefix-icon">
            <input
                :disabled="disabled"
                type="password"
                v-model="password"
                :placeholder="passwordPlanceholder"
                @keydown.enter="submit"
            />
            <i class="h-icon mdi mdi-textbox-password"></i>
        </div>

        <Button
            class="login"
            color="primary"
            :loading="isLoading"
            @click="submit"
            >{{ loginPrompt }}</Button
        >
        <div class="bottom">
            <p class="register">
                没有账户？请<router-link to="/register"
                    >在这里注册。</router-link
                >
            </p>
            <p class="forget"><a href="http://">忘记密码？</a></p>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.box
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

    >*
        width: 100%

    .h-input
        margin-bottom: 1.2em
        display: block
        zoom: 1.3

        .h-icon
            opacity: .3

    .login
        margin-top: 15px
        margin-bottom: 5px
        font-size: 20px

    .bottom
        display: flex
        justify-content: space-between

        .register
            color: darken(white, 50)
</style>

<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        emailPlanceholder: {
            type: String,
            default: "邮箱"
        },
        passwordPlanceholder: {
            type: String,
            default: "密码"
        },
        loginPrompt: {
            type: String,
            default: "登录"
        }
    },
    data() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        submit() {
            console.log(this.email);
            this.$emit("submit", this.email, this.password);
        }
    }
};
</script>
