<template>
    <div class="modal">
        <header class="h-modal-header">
            <i v-if="titleIcon" :class="titleIcon"></i> {{ title }}
        </header>
        <div class="content">
            <div class="icon">
                <i class="yellow-color mdi mdi-alert-circle"></i>
            </div>
            <p class="paragraph">{{ content }}</p>
        </div>
        <footer class="h-modal-footer">
            <Button :color="confirmColor" :icon="confirmIcon" @click="confirm"
                >确认</Button
            >
            <Button text @click="cancel">取消</Button>
        </footer>
    </div>
</template>

<style lang="sass" scoped>
.modal
    max-width: 600px
    padding: 1em

    .content
        padding: 1em
        display: flex
        position: relative

        .icon
            display: flex
            align-items: center
            font-size: 50px
            padding-right: 10px
</style>

<script>
export default {
    props: {
        title: String,
        titleIcon: String,
        content: String,
        confirmIcon: String,
        confirmColor: {
            type: String,
            default: "primary"
        }
    },
    methods: {
        confirm() {
            this.$emit("confirm");
            this.close();
        },
        cancel() {
            this.close();
        },
        close() {
            this.$emit("close");
        }
    }
};
</script>
