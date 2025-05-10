// middlewares/multer.js
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // Correct import

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer storage with Cloudinary
const storage = new CloudinaryStorage({ // Correct instantiation
  cloudinary: cloudinary,
  params: {
    folder: 'job_applications',  // Folder name on Cloudinary
    allowed_formats: ['pdf', 'doc', 'docx'], // Only allow specific file formats
  },
});

// Initialize multer with storage configuration
const upload = multer({ storage });

module.exports = upload;
