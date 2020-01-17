export const strict = false

export const state = () => ({
	resumes: [],
    resume: {},
})

export const mutations = {
    SET_RESUME (state, payload) {
        state.resume = payload
    }
}

export const actions = {
    async fetchResume ({ commit }, payload) {
		console.log('Call to fetchResume: ', payload)
		const resumeId = payload
		const { data } = await this.$axios.$get(`/api/resumes/${resumeId}`)
		console.log('data: ', data)
		commit('SET_RESUME', data)
    }
}

export const getters = {
    loadedResume (state) {
        return state.resume
    }
}
