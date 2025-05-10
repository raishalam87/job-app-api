const express = require('express');
const router = express.Router();
const { createJob, getJobs } = require('../controllers/jobController');
const authenticateUser = require('../middlewares/authMiddleware');  // JWT middleware

// Admin-only route to create a job (needs authentication)
router.post('/create', authenticateUser, createJob);

// Public route to fetch all available jobs (no authentication needed)
router.get('/', getJobs);

module.exports = router;
