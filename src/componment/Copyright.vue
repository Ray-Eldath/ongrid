<template>
    <div class="copyright">
        ©. 2019 - {{ year }}. Offgrid.
        <i class="mdi mdi-flash yellow-color"></i> by IllegalSkillsException.
        <i class="mdi mdi-xml blue-color"></i> by
        <a
            href="https://github.com/Ray-Eldath"
            target="_blank"
            rel="noopener noreferrer"
            >Ray Eldath</a
        >
        & suyuns. All rights reserved.
    </div>
</template>

<script>
export default {
    computed: {
        year() {
            return this.$dayjs().year();
        }
    }
};
</script>
