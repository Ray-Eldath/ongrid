<template>
    <div class="top">
        <div class="h-panel h-panel-no-border">
            <div class="h-panel-bar">
                <span class="h-panel-title">在 Offgrid 注册账户</span>
            </div>
            <div class="h-panel-body">
                <div class="h-input h-input-prefix-icon">
                    <input
                        :disabled="disabled"
                        type="text"
                        v-model="email"
                        placeholder="邮箱"
                    />
                    <i class="h-icon ion-md-mail"></i>
                </div>
                <Button class="button" color="primary" icon="ion-md-send"
                    >发送验证邮件</Button
                >
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.top
    background-color: darken(white, 3)
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center

    .h-panel
        z-index: 2
        border: solid darken(white, 5) 1px
        transition: 200ms ease-in-out
        height: 40%
        width: 400px

        &:hover
            box-shadow: 0 2px 18px rgba(0, 0, 0, .1)
            border-color: rgba(0, 0, 0, 0)
            position: relative

        .h-panel-body
            height: 85%
            padding: 3em
            display: flex
            justify-content: center
            flex-direction: column

        .h-input
            justify-content: flex-end
            width: 100%
            zoom: 1.3

            .h-icon
                opacity: .6

        .button
            margin-top: 2em
            zoom: 1.2
            width: 100%
</style>

<script>
import "../util/ribbon";

export default {
    data() {
        return {
            email: "",
            disabled: false
        };
    }
};
</script>
