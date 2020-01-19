<template>
    <div class="container">
        <h1>Homepage</h1>
        <br />
        <!-- <nuxt-link to="/login">Login</nuxt-link> | 
		<nuxt-link to="/register">Register</nuxt-link> | 
		<nuxt-link to="/about">About</nuxt-link> |
		<button @click="$auth.logout()" v-if="$auth.$state.loggedIn">Logout</button> -->

        <p v-if="user && user._id">
            <button @click="logoutUser()">Logout user</button>
        </p>
        <p v-else>
            <button @click="loginUser()">Login user</button>
        </p>
        <br />
        <p v-if="resume && resume._id">
            <button @click="logoutResume()">Logout resume</button>
        </p>
        <p v-else>
            <button @click="loginResume()">Login resume</button>
        </p>
        <br />
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
            <!-- resume: {{ resume }}<br /><br /> -->
        </p>
        <!-- resumes: {{ resumes }} -->
        <div v-for="resume in resumes" :key="resume._id" style="border: 1px solid orange; width: 200px; margin: 10px; padding: 10px; display: inline-block;">
            <h3>{{ resume.job_title }}</h3>
            <p>{{ resume.job_description }}</p>
            <nuxt-link :to="`/resumes/${resume.username}`">{{ resume.username }}</nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    async created() {
        await this.$store.dispatch('resumes/fetchResumes')
    },
    data() {
        return {}
    },
    computed: {
        user() {
            return this.$store.getters['users/loadedUser']
        },
        resume() {
            return this.$store.getters['resumes/loadedResume']
        },
        resumes() {
            return this.$store.getters['resumes/loadedResumes']
        }
    },
    methods: {
        async loginUser() {
            try {
                const data = await this.$auth.loginWith('user', {
                    data: {
                        email: 'john.doe@example.com',
                        password: 'secret'
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
                        username: '7a2a37a0-dc7c-4eda-b81c-5dd38f4d9ef6',
                        password: 'secret'
                    }
                })
                console.log('data: ', data)
            } catch (error) {
                console.log('error: ', error)
            }
        },
        async logoutUser() {
			await this.$axios.post('/api/auth/logout-user')
            window.localStorage.setItem('auth._token.user', false)
			this.$store.commit('users/SET_USER', null)
			// await this.$auth.logout()
			
        },
        async logoutResume() {
            window.localStorage.setItem('auth._token.resume', false)
            this.$store.commit('resumes/SET_RESUME', null)
        }
    }
}
</script>

<style scoped></style>
