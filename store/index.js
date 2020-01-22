const jwt = require('jsonwebtoken')

export const strict = false

export const state = () => ({
    loading: false
})

export const mutations = {
    SET_LOADING(state, payload) {
        state.loading = payload
    }
}

export const actions = {
    async nuxtServerInit({ commit, state, dispatch }, { req }) {
        console.log('Call to nuxtServerInit')
        console.log("this.$auth.getToken('user'): ", this.$auth.getToken('user'))
        console.log("this.$auth.getToken('resume'): ", this.$auth.getToken('resume'))

        if (req.user) {
            console.log('commit SET_USER')
            // commit('auth/SET_USER', req.user)
        }

        if (this.$auth.getToken('user')) {
            const decoded = jwt.verify(this.$auth.getToken('user').split(' ')[1], process.env.JWT_SECRET)
            const userId = decoded.user_id
            console.log('userId: ', userId)
            if (userId) {
                const abc = await dispatch('users/fetchUser', userId)
                console.log('abc: ', abc)

            }
        }

        if (this.$auth.getToken('resume')) {
            const decoded = jwt.verify(this.$auth.getToken('resume').split(' ')[1], process.env.JWT_RESUME_SECRET)
            const resumeId = decoded.resume_id
            console.log('resumeId: ', resumeId)
            if (resumeId) {
                const abc = await dispatch('resumes/fetchResume', resumeId)
                console.log('abc: ', abc)

            }
        }
    }
}

export const getters = {
    loading(state) {
        return state.loading
    }
}
