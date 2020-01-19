import { Router } from 'express'
import Resume from '../models/Resume'

const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')

const router = Router()

router.get('/', asyncHandler(async (req, res, next) => {
    const resumes = await Resume.find({ 'active': true }, 'username job_title job_description active')
    console.log('resumes: ', resumes)

    res.status(200).json({ success: true, data: resumes })
}))

router.get(
    '/:username',
    asyncHandler(async (req, res, next) => {
        console.log('Call to api/resumes/:username route')

        // const resume = await Resume.findById(req.params.username)
        const { username } = req.params
        console.log('username: ', username)
		const resume = await Resume.findOne({ username })
		console.log('resume: ', resume)

        if (!resume) {
            return next(new ErrorResponse(`Resume not found with id of ${req.params.username}`, 404))
        }

        res.status(200).json({ success: true, data: resume })
    })
)

// export default router
module.exports = router
