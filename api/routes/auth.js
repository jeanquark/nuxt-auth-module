import { Router } from 'express'
import User from '../models/User'
import Resume from '../models/Resume'

const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')

const { getUser } = require('../controllers/users')
const { getResume } = require('../controllers/resumes')

const jsonwebtoken = require('jsonwebtoken')

const router = Router()

router.post(
    '/register',
    asyncHandler(async (req, res, next) => {
        console.log('Call to api/auth/register route')
        console.log('req.body: ', req.body)
        const { firstname, lastname, email, password } = req.body

        const user = await User.findOne({ email }).select('+password')
        console.log('user: ', user)

        if (!user) {
            // Create user
            const user = await User.create({
                firstname,
                lastname,
                email,
                password
            })
            return res.status(201).send({ message: 'User created successfully!' })
        }

        res.status(200).send({ message: 'User already exists' })
        // sendTokenResponse(user, 200, res);
    })
)

router.post('/login', async (req, res, next) => {
    try {
        console.log('Call to api/auth/login route')
        const { email, password } = req.body

        // Check if user exists
        const user = await User.findOne({ email }).select('+password')
        console.log('user: ', user)

        if (!user) {
            return next(new ErrorResponse('Invalid credentials', 401))
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password)
        console.log('isMatch: ', isMatch)

        if (!isMatch) {
            return next(new ErrorResponse('Invalid credentials', 401))
        }

        // return next(new ErrorResponse('Invalid credentials', 401))
        // sendTokenResponse(user, 200, res)
        res.json({
            success: true
        })
        // next()
    } catch (error) {
        console.log('error: ', error)
        next(error)
    }
})

router.post('/login-user', async (req, res, next) => {
    try {
        console.log('Call to api/auth/login-user route')
        const { email, password } = req.body
        console.log('email: ', email)

        // Check if user exists
        const user = await User.findOne({ email }).select('+password')
        console.log('user: ', user)

        if (!user) {
            return next(new ErrorResponse('Invalid credentials', 401))
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password)
        console.log('isMatch: ', isMatch)

        if (!isMatch) {
            return next(new ErrorResponse('Invalid credentials', 401))
        }

        const accessToken = jsonwebtoken.sign(
            {
                email,
                picture: 'https://github.com/nuxt.png',
                name: 'User ' + email,
                user_id: user._id,
                scope: ['test', 'user']
            },
            process.env.JWT_SECRET
        )

        // const options = {
        //     expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        //     httpOnly: true
        // }

        // return next(new ErrorResponse('Invalid credentials', 401))
        // sendTokenResponse(user, 200, res)
        // res.json({
        // 	success: true
        // })
        // res.cookie('token', accessToken, options).json({
        res.json({
            token: {
                accessToken
            }
        })
        // next()
    } catch (error) {
        console.log('error: ', error)
        next(error)
    }
})

router.post('/login-resume', async (req, res, next) => {
    try {
        console.log('Call to api/auth/login-resume route')
        const { username, password } = req.body

        // Check if resume exists
        // const resume = await Resume.findOne({ username })
        const resume = await Resume.findOne({ username }).select('+password')
        console.log('resume: ', resume)

        if (!resume) {
            return next(new ErrorResponse('Invalid credentials', 401))
        }

        // Check if password matches
        const isMatch = await resume.matchPassword(password)
        console.log('isMatch: ', isMatch)

        if (!isMatch) {
            return next(new ErrorResponse('Invalid credentials', 401))
        }

        const accessToken = jsonwebtoken.sign(
            {
                username,
                picture: 'https://github.com/nuxt.png',
                name: 'User ' + username,
                resume_id: resume._id,
                scope: ['test', 'user']
            },
            process.env.JWT_RESUME_SECRET
        )

        res.json({
            token: {
                accessToken
            }
        })
        // res.json({
        // 	success: true,
        // 	resume
        // })
    } catch (error) {
        console.log('error: ', error)
        next(error)
    }
})

// [POST] /logout
router.post('/logout', (req, res, next) => {
    console.log('Call to route api/auth/logout route')
    // res.json({ status: 'OK' })
    res.status(200).send({ message: 'Successful logout', status: 200 })
})

router.post('/logout-user', (req, res, next) => {
    res.cookie('auth._token.user', '', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    res.cookie('auth._refresh_token.user', '', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    res.cookie('auth.strategy', '', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    res.status(200).send({ message: 'Successful logout' })
})

router.get('/oauth', async (req, res, next) => {
    console.log('Call to /api/auth/oauth route')
    const code = req.query.code
    console.log('code: ', code)

    const { tokens } = await oauth2Client.getToken(code)
    console.log('tokens: ', tokens)

    // const abc = await axios.post('https://accounts.google.com/o/oauth2/auth', {
    //     code,
    //     client_id: '1017850396776-9ppn6k5isnuo3duc0q3uqg7p48sbc3gh.apps.googleusercontent.com',
    //     client_secret: 'h9E1rQrpbYhmko4OVF6B6Kqn',
    //     redirect_uri: 'https://localhost:3000/login',
    //     grant_type: 'authorization_code'
    // })
    // console.log('abc: ', abc)

    res.status(200).send({ message: 'Successful call to oauth page', status: 200, code })
})

router.get('/callback', async (req, res, next) => {
    console.log('Call to /api/auth/callback route')
})

// export default router
module.exports = router
