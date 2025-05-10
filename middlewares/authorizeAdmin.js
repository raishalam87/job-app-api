const User = require('../models/User'); // Assuming user model has a 'role' field

// Middleware to check if the user is an Admin
const authorizeAdmin = async (req, res, next) => {
  try {
    // Fetch user from DB by userId (from the token)
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Check if the user is an Admin
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access Denied, Admins Only' });
    }

    // If Admin, proceed to the next route handler
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = authorizeAdmin;
