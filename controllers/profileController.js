const User = require('../models/User');

// Get user profile by user ID (Protected route)
exports.authProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-passwordHash'); // Don't return password
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
