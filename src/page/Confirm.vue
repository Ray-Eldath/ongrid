<template>
    <PanelPage title="注册账户：设置用户名和密码" height="50%">
        <Step :step="1"></Step>

        <Form
            class="form"
            ref="form"
            :labelWidth="65"
            :rules="validationRules"
            :model="model"
        >
            <FormItem label="用户名" prop="username">
                <input type="text" v-model="model.username" />
            </FormItem>
            <FormItem class="password-item" label="密码" prop="password">
                <input type="password" v-model="model.password" />
            </FormItem>
            <FormItem class="button-item">
                <Button
                    class="button"
                    circle
                    color="primary"
                    icon="ion-md-send"
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
            validationRules: {
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
    methods: {
        submit() {
            this.$refs.form.valid();
        }
    },
    components: { PanelPage, Step }
};
</script>
