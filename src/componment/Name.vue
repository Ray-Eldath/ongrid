<template>
    <div>{{ name }}</div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="sass" scoped>
div
    font-size: 2em
    color: green
</style>