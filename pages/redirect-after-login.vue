<template>
	<div>
		<h1>Redirect after login page</h1>
		<nuxt-link to="/">Back to homepage</nuxt-link><br />
		Logged in? {{ $auth.$state.loggedIn ? 'Logged In' : 'Guest' }}<br /><br />
		$auth.$state.strategy: {{ $auth.$state.strategy }}
	</div>
</template>

<script>
	import jwt from 'jsonwebtoken'
	export default {
		async mounted () {
			console.log('Mounted redirect after login page')
			let token
			let decoded
			switch (this.$auth.$state.strategy) {
				case 'user':
					token = window.localStorage.getItem('auth._token.user')
					decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET)
					const userId = decoded.user_id
					console.log('userId: ', userId)
					const abc = await this.$store.dispatch('users/fetchUser', userId)
					console.log('abc: ', abc)
					break
				case 'resume':
					token = window.localStorage.getItem('auth._token.resume')
					decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET)
					const resumeId = decoded.resume_id
					const def = await this.$store.dispatch('resumes/fetchResume', resumeId)
					console.log('def: ', def)
					break
				default:
					token = null
			}
		}
	}
</script>

<style scoped>

</style>
