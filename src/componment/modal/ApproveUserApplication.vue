<template>
    <div class="modal">
        <header class="h-modal-header">
            创建新用户 {{ application.username }}
        </header>
        <div class="content">
            <Form
                class="form"
                ref="form"
                mode="block"
                :rules="validation"
                :model="model"
            >
                <FormItem label="账户身份" prop="role">
                    <RoleSelector
                        v-model="model.role"
                        :deletable="false"
                    ></RoleSelector>
                </FormItem>
                <!-- TODO: extra permissions，有时间就做..... 懒得弄就算了吧（唉我好垃圾QAQ） -->
            </Form>
            <div v-if="model.role != null" style="max-width: 600px">
                <p>
                    将创建账户
                    <span class="green-color">{{ application.username }}</span>
                    <span style="opacity: 0.7">（{{ application.email }}）</span
                    >，并分配身份
                    <span class="green-color">{{ model.role.name }}</span
                    >。
                </p>
                <p>
                    该身份默认具有权限：<span style="opacity: 0.6">{{
                        permission
                    }}</span>
                </p>
                <p style="margin-top: 1.6em">
                    <i class="mdi mdi-information-outline"></i>
                    <span style="font-weight: bold">注意：</span>
                    由于安全策略，不能创建具有您具有您所不具有的权限的账户。
                </p>
                <p v-if="model.role.name === 'Root'" class="red-color root-warning">
                    <i class="mdi mdi-alert-outline"></i>
                    <span style="font-weight: bold">警告：</span>Root
                    账户将具有所有权限，我们极其不建议新建多于一个的 Root
                    账户。请确认您确实了解新建 Root
                    账户的风险，这将带来极大安全隐患，且很可能不符合您组织的安全策略。
                </p>
            </div>
        </div>
        <footer class="h-modal-footer">
            <Button color="primary" icon="mdi mdi-account-plus" @click="submit"
                >提交</Button
            >
            <Button text @click="cancel">取消</Button>
        </footer>
    </div>
</template>

<style lang="sass" scoped>
.modal
    .content
        padding: 2em

        .root-warning
            margin-top: 2em
            border: dashed 5px red
            padding: 8px
</style>

<script>
import RoleSelector from "../RoleSelector";
import { mapState } from "vuex";

export default {
    data() {
        return {
            model: {
                role: null
            },
            validation: {
                required: ["role"]
            }
        };
    },
    computed: {
        permission() {
            return this.roles
                .find(e => e.role.id === this.model.role.id)
                .default_permissions.map(e => e.name)
                .join(", ");
        },
        ...mapState({ roles: state => state.meta.userModel.roles })
    },
    methods: {
        submit() {
            if (this.$refs.form.valid().result) {
                const self = this;
                this.$api.post(
                    `/application/${this.application.id}/approve`,
                    {
                        role_id: this.model.role.id
                    },
                    {
                        success() {
                            self.$Message["success"](
                                `成功新建账户 ${self.application.username}`
                            );
                            self.$emit("applicationSubmitted", self.model);
                            self.$emit("close");
                        }
                    }
                );
            }
        },
        cancel() {
            this.$emit("close");
        }
    },
    props: {
        application: {
            type: Object,
            required: true
        }
    },
    components: { RoleSelector }
};
</script>
