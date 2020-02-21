<template>
    <PanelPage title="注册账户：设置用户名和密码" height="50%">
        <Step :step="step"></Step>

        <Form
            class="form"
            ref="form"
            :labelWidth="65"
            :rules="validation"
            :model="model"
        >
            <FormItem label="用户名" prop="username">
                <input
                    type="text"
                    v-model="model.username"
                    :disabled="disabled"
                />
            </FormItem>
            <FormItem class="password-item" label="密码" prop="password">
                <input
                    type="password"
                    v-model="model.password"
                    :disabled="disabled"
                />
            </FormItem>
            <FormItem class="button-item">
                <Button
                    class="button"
                    circle
                    color="primary"
                    icon="mdi mdi-cloud-upload"
                    :disabled="disabled"
                    @click="submit"
                    >提交</Button
                >
            </FormItem>
        </Form>
    </PanelPage>
</template>

<style lang="sass">
.h-panel-body
    display: flex
    flex-direction: column
    justify-content: space-between
    align-content: space-between

    .form
        zoom: 1.1

        .password-item
            margin-top: 1em

        .button-item
            padding-bottom: 0

            .button
                width: 100%
                margin-top: 1.5em
</style>

<script>
import PanelPage from "../componment/PanelPage";
import Step from "../componment/RegisterStep";

export default {
    data() {
        return {
            model: {
                username: "",
                password: ""
            },
            step: 1,
            token: this.$route.params.token,
            disabled: false,
            validation: {
                rules: {
                    username: {
                        maxLen: 16,
                        required: true
                    },
                    password: {
                        maxLen: 18,
                        minLen: 6,
                        required: true
                    }
                }
            }
        };
    },
    async mounted() {
        const self = this;

        await this.$api.get(`/confirm/${this.token}`, {
            failed() {
                self.disabled = true;
            },
            duration: 0
        });
    },
    methods: {
        submit() {
            if (this.$refs.form.valid().result) {
                const self = this;
                this.$api.post(
                    `/confirm/${this.token}`,
                    {
                        username: this.model.username,
                        password: this.model.password
                    },
                    {
                        success() {
                            self.disabled = true;
                            self.$Message["success"](
                                "提交成功！您的注册申请现正等待管理员审核并分配权限。",
                                0
                            );
                            self.step = 2;
                        },
                        duration: 0
                    }
                );
            }
        }
    },
    components: { PanelPage, Step }
};
</script>
