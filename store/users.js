export const strict = false

export const state = () => ({
    user: {},
})

export const mutations = {
    SET_USER (state, payload) {
        state.user = payload
    }
}

export const actions = {
    async fetchUser ({ commit }, payload) {
		console.log('Call to fetchUser: ', payload)
		const userId = payload
		const { data } = await this.$axios.$get(`/api/users/${userId}`)
		console.log('data: ', data)
		commit('SET_USER', data)
    }
}

export const getters = {
    loadedUser (state) {
        return state.user
    }
}
