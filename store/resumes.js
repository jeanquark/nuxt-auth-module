export const strict = false

export const state = () => ({
	resumes: [],
    resume: {},
})

export const mutations = {
    SET_RESUMES (state, payload) {
        state.resumes = payload
    },
    SET_RESUME (state, payload) {
        state.resume = payload
    }
}

export const actions = {
    async fetchResumes ({ commit }) {
		console.log('Call to fetchResumes')
		const { data } = await this.$axios.$get('/api/resumes')
		console.log('data: ', data)
		commit('SET_RESUMES', data)
    },
    async fetchResume ({ commit }, payload) {
		console.log('Call to fetchResume: ', payload)
        const { username } = payload
        console.log('username: ', username)
		const { data } = await this.$axios.$get(`/api/resumes/${username}`)
		console.log('data: ', data)
		commit('SET_RESUME', data)
    }
}

export const getters = {
    loadedResumes (state) {
        return state.resumes
    },
    loadedResume (state) {
        return state.resume
    }
}
