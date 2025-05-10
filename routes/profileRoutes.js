const express = require('express');
const router = express.Router();
const { authProfile } = require('../controllers/profileController');
const authenticateUser = require('../middlewares/authMiddleware');  // Import JWT middleware

// Profile route (protected) - access with a valid token
router.get('/authProfile', authenticateUser, authProfile);

module.exports = router;
