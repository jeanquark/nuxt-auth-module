import { Router } from 'express'
import Resume from '../models/Resume'

const advancedResults = require('../middleware/AdvancedResults')

const router = Router()

const { getResumes, getResume } = require('../controllers/resumes')
const { authResume, authorize } = require('../middleware/auth');

router.route('/').get(advancedResults(Resume), getResumes)

router
    .route('/:id')
    // .get(authResume, getResume)
    // .get(protect, authorize('user', 'admin'), getResume)
    .get(getResume)

module.exports = router
