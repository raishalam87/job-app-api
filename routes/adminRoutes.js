const express = require('express');
const { getApplications, getUserDetails } = require('../controllers/adminController');
const authenticateUser = require('../middlewares/authMiddleware'); // Authentication Middleware
const authorizeAdmin = require('../middlewares/authorizeAdmin'); // Admin Authorization Middleware

const router = express.Router();

// Get all applications (Admin only)
router.get('/applications', authenticateUser, authorizeAdmin, getApplications);

// Get details of a user by their ID
router.get('/user/:userId', authenticateUser, authorizeAdmin, getUserDetails);

module.exports = router;
