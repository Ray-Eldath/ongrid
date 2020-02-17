<template>
    <Select
        keyName="id"
        titleName="name"
        :deletable="deletable"
        :placeholder="planceholder"
        :nullOptionText="nullOptionText"
        v-model="roleId"
        :datas="roles.map(e => e.role)"
    ></Select>
</template>

<script>
import { mapState } from "vuex";

export default {
    props: {
        deletable: {
            type: Boolean,
            default: true
        },
        planceholder: String,
        nullOptionText: String,
        value: {
            type: Object,
            default: null
        }
    },
    computed: mapState({ roles: state => state.meta.roles }),
    watch: {
        value(v) {
            this.$set(this.$data, "roleId", v === null ? null : v.role.id);
        },
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
