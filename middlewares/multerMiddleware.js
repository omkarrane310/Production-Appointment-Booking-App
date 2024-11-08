// multerMiddleware.js
const multer = require("multer");

// Set up storage engine
const storage = multer.memoryStorage(); // Use memory storage for file uploads

// Initialize multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 2 MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf/; // Acceptable file types
    const extname = fileTypes.test(file.mimetype) && fileTypes.test(file.originalname.split('.').pop());
    if (extname) {
      return cb(null, true);
    } else {
      cb("Error: File type not supported!");
    }
  },
});

module.exports = upload;
