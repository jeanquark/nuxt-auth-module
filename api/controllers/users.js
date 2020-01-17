const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
// const Review = require('../models/Review');
// const Bootcamp = require('../models/Bootcamp');
const User = require('../models/User')

// @desc      Get all resumes
// @route     GET /api/v1/resumes
// @access    Public
exports.getUser = asyncHandler(async (req, res, next) => {
	console.log('Call to getUser controller: ')
    res.json({ user: req.user })
})

