<template>
	<div>
		<h1>Login</h1>
		<nuxt-link to="/">Homepage</nuxt-link><br />
		Logged in? {{ $auth.$state.loggedIn ? 'Logged In' : 'Guest' }}<br /><br />
		<br />

		<form @submit.prevent="login()">
			<label for="email">E-mail</label>
			<input type="email" name="email" required v-model="form.email">

			<label for="password">Password</label>
			<input type="password" name="password" required v-model="form.password">
		
			<button type="submit">Login</button>
		</form>

		<br />
		<!-- <button @click="oauthGoogle()">Login Google</button><br /><br /> -->
		<!-- <button @click="oauthFacebook()">Login Facebook</button> -->
	</div>
</template>

<script>
	export default {
		data () {
			return {
				form: {
					email: 'john@gmail.com',
					password: '123456'
				}
			}
		},
		methods: {
			async login () {
				try {
					const def = await this.$store.dispatch('authentication/login', this.form)
					console.log('def: ', def)
				} catch (error) {
					console.log('error from client: ', error)
				}
			},
			// async oauthGoogle () {
			// 	try {
			// 		// const abc = await this.$auth.loginWith('google')
			// 		// console.log('abc: ', abc)

			// 		// this.$auth.loginWith('google').then(() => this.$store.dispatch('authentication/registerNewUser'))
			// 		this.$auth.loginWith('google').then(() => console.log('Done!'))
			// 	} catch (error) {
			// 		console.log('error from google oauth: ', error)
			// 	}
			// },
			// async oauthFacebook () {
			// 	try {
			// 		await this.$auth.loginWith('facebook')
			// 	} catch (error) {
			// 		console.log('error from facebook oauth: ', error)
			// 	}
			// }
		}
	}

</script>

<style lang="scss" scoped>

</style>
