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
                <FormItem label="用户身份" prop="roleObject">
                    <RoleSelector
                        v-model="model.roleObject"
                        :deletable="false"
                    ></RoleSelector>
                </FormItem>
                <!-- TODO: extra permissions，有时间就做..... 懒得弄就算了吧（唉我好垃圾QAQ） -->
            </Form>
            <div v-if="model.roleObject != null" style="max-width: 600px">
                <p>
                    将创建用户
                    <span class="green-color">{{ application.username }}</span>
                    <span style="opacity: 0.7">（{{ application.email }}）</span
                    >，并分配身份
                    <span class="green-color">{{
                        model.roleObject.role.name
                    }}</span
                    >。
                </p>
                <p>
                    该身份默认具有权限：<span style="opacity: 0.6">{{
                        permission
                    }}</span>
                </p>
                <p
                    v-if="model.roleObject.role.name === 'Root'"
                    class="red-color root-warning"
                >
                    <i class="ion-md-warning"></i>
                    <span style="font-weight: bold">警告：</span>Root
                    账户将具有所有权限，我们极其不建议新建多于一个的 Root
                    账户。请确认您确实了解新建 Root
                    账户的风险，这将带来极大安全隐患，且很可能不符合您组织的安全策略。
                </p>
            </div>
        </div>
        <footer class="h-modal-footer">
            <Button color="primary" icon="ion-md-person-add" @click="submit"
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
import RoleSelector from "../componment/RoleSelector";
import { mapState } from "vuex";

export default {
    data() {
        return {
            model: {
                roleObject: null
            },
            validation: {
                required: ["roleObject"]
            }
        };
    },
    computed: {
        permission() {
            return this.model.roleObject.default_permissions
                .map(e => e.name)
                .join(", ");
        }
    },
    methods: {
        submit() {
            if (this.$refs.form.valid().result) {
                const self = this;
                this.$api.post(
                    `/application/${this.application.id}/approve`,
                    {
                        role_id: this.model.roleObject.role.id
                    },
                    {
                        success() {
                            self.$Message(
                                `成功新建用户 ${self.application.username}`
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
