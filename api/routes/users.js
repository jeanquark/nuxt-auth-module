import { Router } from 'express'
import User from '../models/User'

const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')

const router = Router()


router.get(
    '/:id',
    asyncHandler(async (req, res, next) => {
        console.log('Call to api/users/:id route')
        console.log('req.params.id: ', req.params.id)
        console.log('req.headers.authorization: ', req.headers.authorization)
		const user = await User.findById(req.params.id)
		console.log('user: ', user)

        if (!user) {
            return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404))
        }

        res.status(200).json({ success: true, data: user })
    })
)

// export default router
module.exports = router
