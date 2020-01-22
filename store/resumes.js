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
		// const { data } = await this.$axios.$get('/api/resumes?active=true')
		const { data } = await this.$axios.$get('/api/resumes?active=true&select=slug,job_title,job_description,active')
		console.log('data: ', data)
		commit('SET_RESUMES', data)
    },
    async fetchResume ({ commit }, payload) {
		console.log('Call to fetchResume: ', payload)
        const { resumeId } = payload
        console.log('resumeId: ', resumeId)
		const { data } = await this.$axios.$get(`/api/resumes/${resumeId}`)
		console.log('data: ', data)
		commit('SET_RESUME', data)
    },
    async fetchResumeBySlug ({ commit }, payload) {
		console.log('Call to fetchResumeBySlug: ', payload)
        const { resumeSlug } = payload
        console.log('resumeSlug: ', resumeSlug)
		const { data } = await this.$axios.$get(`/api/resumes?slug=${resumeSlug.slug}`)
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
