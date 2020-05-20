<template>
    <div class="contain">
        <div class="left">
            <GraphSource></GraphSource>
        </div>

        <div class="center">
            <GraphRoute></GraphRoute>
        </div>

        <div class="right">
            <GraphTerminal></GraphTerminal>
        </div>
    </div>
</template>

<style lang="sass" scoped>

.contain
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
import GraphSource from '../componment/GraphSource'
import GraphRoute from '../componment/GraphRoute'
import GraphTerminal from '../componment/GraphTerminal'
export default {
    components: { GraphSource ,GraphRoute,GraphTerminal},
    data() {
        return {
            
        };
    },
    methods:{

    }
};
</script>
