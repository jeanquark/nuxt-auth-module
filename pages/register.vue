<template>
	<div>
		<h1>Register</h1>
		<nuxt-link to="/">Homepage</nuxt-link><br /><br />

		<form @submit.prevent="register()">
			<label for="firstname">Firstname</label>
			<input type="text" name="firstname" required v-model="form.firstname">
			<br /><br />
			<label for="lastname">Lastname</label>
			<input type="text" name="lastname" required v-model="form.lastname">
			<br /><br />
			<label for="email">E-mail</label>
			<input type="email" name="email" required v-model="form.email">
			<br /><br />
			<label for="password">Password</label>
			<input type="password" name="password" required v-model="form.password">
			<br /><br />
			<label for="password">Password confirmation</label>
			<input type="password" name="password_confirmation" required v-model="form.password_confirmation">
			<br /><br />
			<button type="submit">Register</button>
		</form>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				form: {
					'firstname': 'John',
					'lastname': 'Doe',
					'email': 'john.doe@example.com',
					'password': 'secret',
					'password_confirmation': 'secret'
				}
			}
		},
		methods: {
			async register () {
				try {
					await this.$store.dispatch('authentication/register', this.form)
				} catch (error) {
					console.log('error from client: ', error)
				}
			} 
		}
	}
</script>

<style lang="scss" scoped>

</style>
