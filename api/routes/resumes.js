import { Router } from 'express'
import Resume from '../models/Resume'

const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')

const router = Router()

router.get(
    '/:id',
    asyncHandler(async (req, res, next) => {
        console.log('Call to api/resumes/:id route')

		const resume = await Resume.findById(req.params.id)
		console.log('resume: ', resume)

        if (!resume) {
            return next(new ErrorResponse(`Resume not found with id of ${req.params.id}`, 404))
        }

        res.status(200).json({ success: true, data: resume })
    })
)

// export default router
module.exports = router
