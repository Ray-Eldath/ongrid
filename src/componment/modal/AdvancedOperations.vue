<template>
    <div class="modal">
        <header class="h-modal-header">
            高级操作
        </header>
        <div class="content">
            <p class="red-color">
                <i class="mdi mdi-alert-octagon-outline"></i>
                <span style="font-weight: bold">注意：</span>
                除非您确切明白以下操作的含义，否则不要单击下列按钮。我们强烈建议您仅在得到您组织的
                Offgrid 管理员的明确指示的情况下单击这些按钮。
            </p>
            <Collapse style="width: 100%; margin-top: 1em">
                <CollapseItem title="高级操作列表">
                    <div class="buttons">
                        <Button
                            icon="mdi mdi-logout"
                            circle
                            @click="forcedLogout"
                            >强制登出</Button
                        >
                        <Button
                            icon="mdi mdi-database-remove"
                            circle
                            @click="clearMeta"
                            >清空元数据缓存</Button
                        >
                    </div>
                </CollapseItem>
            </Collapse>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.modal
    max-width: 600px

    .content
        display: flex
        flex-direction: column
        align-items: center
        padding: 2em

        .buttons
            margin: 1em
            margin-bottom: 1.5em
            width: 85%
            display: flex

            button
                margin-right: 10px
</style>

<script>
export default {
    methods: {
        forcedLogout() {
            this.$store.commit("logout");
            this.$Message["warn"]("成功清除登录状态。");
        },
        clearMeta() {
            this.$store.commit("clearMeta");
            this.$Message["warn"]("成功清除元数据缓存。");
        }
    }
};
</script>
