<template>
    <div>
        <h1>Resume</h1>
        <nuxt-link to="/">Back to homepage</nuxt-link><br /><br />
        resume: {{ resume }}
    </div>
</template>

<script>
export default {
    created () {
        const resumeUsername = this.$route.params
        console.log('resumeUsername: ', resumeUsername)
        this.$store.dispatch('resumes/fetchResume', resumeUsername)
    },
    data () {
        return {

        }
    },
    computed: {
        resume () {
            return this.$store.getters['resumes/loadedResume']
        }
    }
}
</script>

<style scoped>

</style>