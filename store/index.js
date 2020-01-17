export const strict = false

export const state = () => ({
    loading: false,
})

export const mutations = {
    SET_LOADING (state, payload) {
        state.loading = payload
    }
}

export const actions = {
    async nuxtServerInit ({ commit, state, dispatch }, { req }) {
		console.log('Call to nuxtServerInit')
		// console.log('req.headers.authorization from nuxtServerInit: ', req.headers.authorization)
		// console.log('req.cookies: ', req.cookies)
		// console.log('req.user: ', req.user)

    	if (req.user) {
            console.log('commit SET_USER')
    		// commit('auth/SET_USER', req.user)
    	}
    }
}

export const getters = {
    loading (state) {
        return state.loading
    }
}
