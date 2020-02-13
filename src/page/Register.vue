<template>
    <PanelPage title="在 Offgrid 注册账户" height="44%">
        <Step class="step" :step="0" style="width: 100%"></Step>

        <div class="content">
            <div class="h-input h-input-prefix-icon">
                <input
                    :disabled="disabled"
                    type="text"
                    v-model="email"
                    placeholder="邮箱"
                />
                <i class="h-icon ion-md-mail"></i>
            </div>
            <div class="button-outer">
                <Button
                    class="button"
                    color="primary"
                    icon="ion-md-send"
                    :disabled="disabled"
                    @click="submit"
                    @keydown.enter="submit"
                    >发送验证邮件</Button
                >
            </div>
        </div>
    </PanelPage>
</template>

<style lang="sass">
.h-panel-body
    display: flex
    justify-content: space-between
    align-items: center
    flex-direction: column

    .content
        width: 100%
        flex-grow: 0.4
        display: flex
        justify-content: space-between
        flex-direction: column

        .h-input
            width: 100%
            zoom: 1.3

            .h-icon
                opacity: .6

        .button
            zoom: 1.2
            width: 100%
            margin-bottom: 2em
</style>

<script>
import PanelPage from "../componment/PanelPage";
import Step from "../componment/RegisterStep";

export default {
    data() {
        return {
            email: "",
            disabled: false
        };
    },
    methods: {
        submit() {
            if (this.email.length === 0) {
                this.$Message["error"]("错误：邮箱不能为空");
                return;
            }

            const self = this;
            this.$api.post(
                "/register",
                { email: this.email },
                {
                    success() {
                        this.disabled = true;
                        self.$Message["info"](
                            "提交成功！请查看您的收件箱并遵照其中的指示执行下一步操作。感谢您注册 Offgrid！",
                            0
                        );
                    },
                    duration: 0
                }
            );
        }
    },
    components: { PanelPage, Step }
};
</script>
