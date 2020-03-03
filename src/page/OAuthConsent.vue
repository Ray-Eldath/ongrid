<template>
    <PanelPage title="Offgrid OAuth">
        <h1>正跳转至请求的服务...</h1>
    </PanelPage>
</template>

<script>
import PanelPage from "../componment/PanelPage";

export default {
    mounted() {
        this.$api.get("hydra/consent", {
            params: { login_challenge: this.$route.query.login_challenge }
        });
    },
    components: { PanelPage }
};
</script>
