<template>
    <Select
        keyName="id"
        titleName="name"
        :deletable="deletable"
        :placeholder="planceholder"
        :nullOptionText="nullOptionText"
        :disabled="disabled"
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
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: Object,
            default: null
        }
    },
    watch: {
        value(v) {
            this.$set(this.$data, "roleId", v === null ? null : v.id);
        },
        roleId(value) {
            if (value != null)
                this.$emit(
                    "input",
                    this.roles.find(e => e.role.id === value).role
                );
        }
    },
    data() {
        return {
            roleId: this.value === null ? null : this.value.id
        };
    },
    computed: mapState({ roles: state => state.meta.userModel.roles })
};
</script>
