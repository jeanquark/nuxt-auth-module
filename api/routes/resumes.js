import { Router } from 'express'
import Resume from '../models/Resume'

const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const advancedResults = require('../middleware/AdvancedResults')

const router = Router()

const { getResumes, getResume } = require('../controllers/resumes')

// router.get('/', asyncHandler(async (req, res, next) => {
//     const resumes = await Resume.find({ 'active': true }, 'username job_title job_description active')
//     console.log('resumes: ', resumes)

//     res.status(200).json({ success: true, data: resumes })
// }))

// router.get(
//     '/:username',
//     asyncHandler(async (req, res, next) => {
//         console.log('Call to api/resumes/:username route')

//         // const resume = await Resume.findById(req.params.username)
//         const { username } = req.params
//         console.log('username: ', username)
// 		const resume = await Resume.findOne({ username }).select('-password')
// 		console.log('resume: ', resume)

//         if (!resume) {
//             return next(new ErrorResponse(`Resume not found with id of ${req.params.username}`, 404))
//         }

//         res.status(200).json({ success: true, data: resume })
//     })
// )

// router.route('/').get(advancedResults(Resume, 'resumes', ['username', 'job_title', 'job_description', 'active'], [{ 'active': true}]), getResumes)
// router.route('/').get(advancedResults(Resume, { path: '/', select: 'username job_title' }), getResumes)
router.route('/').get(advancedResults(Resume), getResumes)

router
    .route('/:username')
    //   .get(protect, authorize('user', 'admin'), getResume)
    .get(getResume)

module.exports = router
