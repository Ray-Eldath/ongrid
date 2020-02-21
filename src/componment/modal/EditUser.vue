<template>
    <div class="modal">
        <header class="h-modal-header">编辑用户 {{ origin.username }}</header>

        <div class="content">
            <Form
                :labelWidth="65"
                mode="block"
                :model="user"
                :rules="validation"
                ref="form"
            >
                <p v-if="current" class="red-color" style="margin-bottom: 2em">
                    <i class="mdi mdi-alert-outline"></i>
                    <span style="font-weight: bold"> 警告：</span
                    >您正在编辑当前登录账户。不恰当的修改可能将使您立即失去一些必要权限。
                </p>
                <p style="display: flex; margin-bottom: 2em">
                    <i class="mdi mdi-information-variant"></i>
                    修改可能不会立即生效。除权限相关的改动，最晚在用户
                    {{ origin.username }} 再一次登录时改动才能反映。
                </p>
                <FormItem label="用户名" prop="username">
                    <input type="text" v-model="user.username" />
                </FormItem>
                <FormItem label="邮箱" prop="email">
                    <input type="text" v-model="user.email" />
                </FormItem>
                <FormItem label="身份" prop="role">
                    <RoleSelector
                        v-model="user.role"
                        :deletable="false"
                    ></RoleSelector>
                </FormItem>
                <Button
                    style="float: right"
                    icon="mdi mdi-cached"
                    text
                    @click="reset"
                    >重置</Button
                >
            </Form>
        </div>
        <footer class="h-modal-footer">
            <Button icon="mdi mdi-cloud-upload" color="primary" @click="submit"
                >提交</Button
            >
            <Button text @click="cancel">取消</Button>
        </footer>
    </div>
</template>

<style lang="sass" scoped>
.modal
    min-width: 500px
    max-width: 600px

    .content
        padding: 2em
</style>

<script>
import RoleSelector from "../RoleSelector";

export default {
    props: ["data", "current"],
    data() {
        return {
            roleObject: null,
            validation: {
                required: ["username", "email", "role"],
                email: ["email"]
            },
            user: this.data,
            origin: JSON.parse(JSON.stringify(this.data))
        };
    },
    methods: {
        submit() {
            const self = this;
            if (this.$refs.form.valid().result) {
                this.$api.patch(
                    `/users/${this.origin.id}`,
                    {
                        username: this.user.username,
                        email: this.user.email,
                        role: this.user.role.id
                    },
                    {
                        success() {
                            self.$emit("close");
                            self.$emit("submitted");
                        }
                    }
                );
            }
        },
        cancel() {
            this.$emit("close");
        },
        reset() {
            this.$set(this, "user", JSON.parse(JSON.stringify(this.origin)));
        }
    },
    components: { RoleSelector }
};
</script>
