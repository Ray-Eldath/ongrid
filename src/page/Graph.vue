<template>
    <div class="container">
        <div class="left">
            <GraphSource></GraphSource>
        </div>

        <div class="center">
            <GraphRoute></GraphRoute>
        </div>

        <div class="right">
            <GraphEndpoint></GraphEndpoint>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.container
    height: 60vh
    display: flex
    justify-content: space-around
        
    .left
        background-color: #F8F8F8
        width: 28%

    .center
        background-color: #F8F8F8
        width: 40%

    .right
        background-color: #F8F8F8
        width: 28%
</style>

<script>
import GraphSource from "../componment/GraphSource";
import GraphRoute from "../componment/GraphRoute";
import GraphEndpoint from "../componment/GraphEndpoint";

export default {
    components: { GraphSource, GraphRoute, GraphEndpoint }
};
</script>
