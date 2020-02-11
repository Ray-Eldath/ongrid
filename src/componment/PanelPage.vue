<template>
    <div class="top">
        <div
            class="h-panel h-panel-no-border"
            :style="{ width: width, height: height }"
        >
            <div class="h-panel-bar">
                <span class="h-panel-title">{{ title }}</span>
            </div>
            <div class="h-panel-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.top
    z-index: -100
    background-color: darken(white, 3)
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center

    .h-panel
        z-index: 2
        border: solid darken(white, 5) 1px
        transition: 200ms ease-in-out

        @media (max-width: 1200px)
            width: 80% !important

        &:hover
            box-shadow: 0 2px 18px rgba(0, 0, 0, .1)
            border-color: rgba(0, 0, 0, 0)
            position: relative

        .h-panel-body
            padding: 3em
            height: 85%
</style>

<script>
import "../util/ribbon";

export default {
    props: {
        title: {
            type: String,
            required: true
        },
        width: {
            type: String,
            default: "500px"
        },
        height: {
            type: String,
            default: "40%"
        },
        ribbon: {
            type: Boolean,
            default: true
        }
    }
};
</script>
