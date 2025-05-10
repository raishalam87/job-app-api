const Job = require('../models/Job');

// Admin creates a new job
exports.createJob = async (req, res) => {
  try {
    const { title, description, company, location, salary, experienceLevel } = req.body;

    // Check if all required fields are provided
    if (!title || !description || !company || !location || !salary || !experienceLevel) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate experience level
    const validExperienceLevels = ['Fresher', '1-3 years', '3-5 years', '5+ years'];
    if (!validExperienceLevels.includes(experienceLevel)) {
      return res.status(400).json({ message: "Invalid experience level" });
    }

    const newJob = new Job({
      title,
      description,
      company,
      location,
      salary,
      experienceLevel
    });

    await newJob.save();
    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all available jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
