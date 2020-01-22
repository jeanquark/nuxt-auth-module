const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
// const Review = require('../models/Review');
// const Bootcamp = require('../models/Bootcamp');
const Resume = require('../models/Resume')

// @desc      Get all resumes
// @route     GET /api/v1/resumes
// @access    Public
exports.getResumes = asyncHandler(async (req, res, next) => {
	console.log('Call to getResumes controller')
    res.status(200).json(res.advancedResults)
    
    // const resumes = await Resume.find({ 'active': true }, 'username job_title job_description active')
    // console.log('resumes: ', resumes)

    // res.status(200).json({ success: true, data: resumes })
})

// @desc      Get single resume
// @route     GET /api/v1/resume/:id
// @access    Public
exports.getResume = asyncHandler(async (req, res, next) => {
	console.log('Call to getResume controller: ', req.params.id)
    // const resume = await Resume.findOne({ username: '8231144c-af70-4e57-849c-a5ecb5f82a83' })
    // const resume = await Resume.findOne({ username: req.params.id })
    const resume = await Resume.findById(req.params.id)
    console.log('resume: ', resume)

    if (!resume) {
        return next(new ErrorResponse(`Resume not found with id of ${req.params.id}`, 404))
    }

    res.status(200).json({ success: true, data: resume })
})
