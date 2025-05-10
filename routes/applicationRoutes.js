const express = require('express');
const router = express.Router();
const { applyToJob, getUserApplications } = require('../controllers/applicationController');
const authenticateUser = require('../middlewares/authMiddleware');

// Apply to job (protected route)
router.post('/apply', authenticateUser, applyToJob);

// Get all applications for the user (protected route)
router.get('/my-applications', authenticateUser, getUserApplications);

module.exports = router;
