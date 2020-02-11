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
                    icon: "ion-md-mail-open"
                },
                {
                    title: "填写信息",
                    icon: "ion-md-list"
                },
                {
                    title: "等待审核",
                    icon: "ion-md-square-outline"
                },
                {
                    title: "注册成功",
                    icon: "ion-md-done-all"
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
