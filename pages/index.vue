<template>
    <div class="container">
        <h1>Homepage</h1>
        <br />
        <!-- <nuxt-link to="/login">Login</nuxt-link> | 
		<nuxt-link to="/register">Register</nuxt-link> | 
		<nuxt-link to="/about">About</nuxt-link> |
		<button @click="$auth.logout()" v-if="$auth.$state.loggedIn">Logout</button> -->
        <button @click="loginUser()" v-if="!user">Login user</button>
        <button @click="logoutUser()" v-if="user">Logout user</button>
		<br /><br />
        <button @click="loginResume()" v-if="!resume">Login resume</button>
        <button @click="logoutResume()" v-if="resume">Logout resume</button>
        <br /><br />
        <p>
            <!-- <button @click="login()">Login</button><br /><br /> -->
            <!-- <button @click="logout()">Logout</button><br /><br /> -->
        </p>
        <br />
        <p>
            Logged in? {{ $auth.$state.loggedIn ? 'Logged In' : 'Guest' }}<br /><br />
            $auth.user: {{ $auth.user }}<br /><br />
            <!-- $store.state.auth.user: {{ $store.state.auth.user }}<br /><br /> -->
            <button @click="getUser()">Get user</button><br /><br />
			user: {{ user }}<br /><br />
			resume: {{ resume }}
        </p>
    </div>
</template>

<script>
	export default {
		data () {
			return {

			}
		},
		computed: {
			user () {
				return this.$store.getters['users/loadedUser']
			},
			resume () {
				return this.$store.getters['resumes/loadedResume']
			}
		},
		methods: {
			async loginUser() {
				try {
					const data = await this.$auth.loginWith('user', {
						data: {
							email: 'john@gmail.com',
							password: '123456'
						}
					})
					console.log('data: ', data)
				} catch (error) {
					console.log('error: ', error)
				}
			},
			async loginResume() {
				try {
					const data = await this.$auth.loginWith('resume', {
						data: {
							username: 'd5d22f80-d0f2-44a2-8c73-537dfb67ad71',
							password: 'secret'
						}
					})
					console.log('data: ', data)
				} catch (error) {
					console.log('error: ', error)
				}
			},
			async logoutUser () {
				window.localStorage.setItem('auth._token.user', false)
				this.$store.commit('users/SET_USER', null)
			},
			async logoutResume () {
				window.localStorage.setItem('auth._token.resume', false)
				this.$store.commit('resumes/SET_RESUME', null)
			}

		}
	}
</script>

<style scoped>
</style>
