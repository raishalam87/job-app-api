const Application = require('../models/Application'); // Assuming this model stores the applications
const User = require('../models/User'); // User model to get user data

// Get all applications (Admin only)
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('user', 'name email phone role')  // Populate the user details with only name, email, phone, role
      .populate('job', 'title company location salary'); // Populate job details

    res.status(200).json({ applications });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get details of a specific user who applied
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId; // Get userId from params

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
