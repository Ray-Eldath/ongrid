<template>
    <div class="container">
        <div class="headline">Hello World by {{ vendor }}</div>
        <Name name="sodader" />
    </div>
</template>

<script>
import Name from "../componment/Name";

export default {
    data() {
        return {
            vendor: "Ray Eldath"
        };
    },
    components: { Name }
};
</script>

<style lang="sass" scoped>
.container
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    
    .headline
        color: red
</style>