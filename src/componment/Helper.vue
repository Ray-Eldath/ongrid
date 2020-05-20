<template>
    <div class="helper">
        <i
            class="handle mdi mdi-help-circle"
            v-tooltip
            placement="bottom"
            :content="content"
        ></i>
    </div>
</template>

<style lang="sass" scoped>
.helper
    display: inline
    opacity: .8
    transition: 300ms ease

    &:hover
        opacity: 1
</style>
<script>
export default {
    props: {
        content: {
            type: String,
            required: true
        }
    }
};
</script>
