<template>
    <Steps :datas="data" :step="step"></Steps>
</template>

<script>
export default {
    data() {
        return {
            data: [
                {
                    title: "验证邮箱",
                    icon: "mdi mdi-email-open"
                },
                {
                    title: "填写信息",
                    icon: "mdi mdi-format-list-numbered"
                },
                {
                    title: "等待审核",
                    icon: "mdi mdi-progress-clock"
                },
                {
                    title: "注册成功",
                    icon: "mdi mdi-check-all"
                }
            ]
        };
    },
    props: {
        step: {
            type: Number,
            required: true
        }
    }
};
</script>
