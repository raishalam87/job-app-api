const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String, required: true },
  experienceLevel: { 
    type: String, 
    enum: ['Fresher', '1-3 years', '3-5 years', '5+ years'],  // Define allowed values
    required: true
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', jobSchema);
