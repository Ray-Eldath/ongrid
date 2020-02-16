<template>
    <Select
        keyName="id"
        titleName="name"
        :deletable="false"
        v-model="roleId"
        :datas="roles.map(e => e.role)"
    ></Select>
</template>

<script>
import { mapState } from "vuex";

export default {
    props: ["role"],
    computed: mapState({ roles: state => state.meta.roles }),
    watch: {
        roleId(value) {
            this.$emit(
                "input",
                this.roles.find(e => e.role.id === value)
            );
        }
    },
    data() {
        return {
            roleId: null
        };
    }
};
</script>
