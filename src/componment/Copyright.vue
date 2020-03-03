<template>
    <div class="copyright">
        ©. 2019 - {{ year }}. Offgrid,<i class="mdi mdi-flash yellow-color"></i> by
        IllegalSkillsException, developer: <a href="https://github.com/Ray-Eldath" target="_blank" rel="noopener noreferrer">Ray Eldath</a>. All
        rights reserved.
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
