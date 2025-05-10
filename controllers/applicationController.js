const Application = require('../models/Application');
const Job = require('../models/Job');

// Apply to job
exports.applyToJob = async (req, res) => {
  try {
    const userId = req.userId;
    const { jobId, resume } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Check if already applied
    const alreadyApplied = await Application.findOne({ user: userId, job: jobId });
    if (alreadyApplied) {
      return res.status(400).json({ message: 'You have already applied to this job' });
    }

    // Create new application
    const application = new Application({
      user: userId,
      job: jobId,
      resume
    });

    await application.save();
    res.status(201).json({ message: 'Job application submitted successfully', application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all applications for the user
exports.getUserApplications = async (req, res) => {
  try {
    const userId = req.userId;

    // Find all applications by the user and populate job details
    const applications = await Application.find({ user: userId }).populate('job', 'title company location salary');

    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: 'No applications found for this user' });
    }

    res.status(200).json({ applications });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
