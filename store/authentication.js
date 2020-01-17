export const strict = false
import axios from 'axios'

export const state = () => ({
    authUser: null
})

export const mutations = {
    SET_USER(state, user) {
        state.authUser = user
    }
}

export const actions = {
    async register({ commit }, payload) {
        console.log('payload: ', payload)
        try {
            const { data } = await axios.post('/api/auth/register', payload)
            console.log('data: ', data)
        } catch (error) {
            console.log('error from vuex: ', error)
        }
    },
    async registerNewUser({ commit }) {
		console.log('RegisterNewUser')
		const { data } = await axios.post('/api/auth/register', payload)
    },
    async register2({ commit }, { email, password }) {
        if (!email || !password) throw new Error('Email and password are required')
        try {
            const { data } = await axios.post('/api/register', { email, password })
            console.log('data: ', data)
            commit('SET_USER', data)
        } catch (error) {
            switch (error.response.status || 500) {
                case 409:
                    throw new Error('Such email is already registered')
                case 500:
                    throw new Error('Internal server error')
            }
        }
    },
    async login({ commit }, { email, password }) {
        try {
            const abc = await this.$auth.loginWith('local', {
                data: {
                    email,
                    password
                }
            })
            console.log('abc: ', abc)
        } catch (error) {
            console.log('error from vuex: ', error)
            throw error
        }
	},
	async loginResume({ commit }, payload ) {
        try {
			const abc = await this.$axios.$post('/api/auth/login-resume', payload)
			console.log('abc: ', abc)
			this.$auth.setToken('resume', abc.token)
			
        } catch (error) {
            console.log('error from vuex: ', error)
            throw error
        }
    },
    async login2({ commit }, { email, password }) {
        if (!email || !password) throw new Error('Email and password are required')
        try {
            const { data } = await axios.post('/api/login', { email, password })
            console.log('data: ', data)
            commit('SET_USER', data)
        } catch (error) {
            throw new Error('Wrong email or password')
        }
    },
    async logout({ commit }) {
        const { data } = await axios.post('/api/logout')
        console.log('data: ', data)
        if (data.ok) commit('SET_USER', null)
    },
    async changePassword({ commit }, { currentPassword, newPassword }) {
        if (!currentPassword || !newPassword) throw new Error('All fields are required')
        try {
            await axios.patch('/api/auth', { currentPassword, newPassword })
            commit('SET_USER', null)
        } catch (error) {
            throw new Error('Wrong password')
        }
    }
}

export const getters = {
    loadedAuthUser(state) {
        return state.authUser
    }
}
