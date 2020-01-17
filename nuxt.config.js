export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: ['@nuxtjs/dotenv'],
    /*
     ** Nuxt.js modules
     */
    modules: ['@nuxtjs/axios', '@nuxtjs/auth'],
    auth: {
        // strategies: {
        //     local: {
        //         endpoints: {
        //             login: { url: '/api/auth/login', method: 'post', propertyName: 'token' },
        //             logout: { url: '/api/auth/logout', method: 'post' },
        //             user: { url: '/api/auth/user', method: 'get', propertyName: 'user' }
        //         }
        //     }
		// },
        strategies: {
            //   local: {
            //     endpoints: {
            //       login: { propertyName: "token.accessToken" }
            //     }
            //   },
            user: {
                _scheme: 'local',
                endpoints: {
					login: { url: '/api/auth/login-user', method: 'post', propertyName: 'token.accessToken' },
                }
            },
            resume: {
                _scheme: 'local',
                endpoints: {
                    login: { url: '/api/auth/login-resume', method: 'post', propertyName: 'token.accessToken' }
                }
            }
        },
        vuex: {
        	namespace: 'auth-module'
		},
		// redirect: false
		redirect: {
			// callback: '/callback',
			home: '/redirect-after-login'
		}
		// watchLoggedIn: false
    },
    serverMiddleware: ['~/api'],
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    }
}
