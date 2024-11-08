const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDocotrsController,
  bookeAppointmnetController,
  bookingAvailabilityController,
  userAppointmentsController,
  getDoctorByIdController,
  submitFeedbackController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

require("dotenv").config()

//router onject
const router = express.Router();



// 
const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");
require("dotenv").config()

// GridFsStorage for file uploads
const storage = new GridFsStorage({
  url: process.env.MONGO_URI, // MongoDB connection string
  file: (req, file) => {
    return {
      filename: `${Date.now()}-certificate-${file.originalname}`,
      bucketName: "certificates", // Name of the collection in MongoDB
    };
  },
});

const upload = multer({ storage }); // multer middleware

// Routes
router.post("/apply-doctor", authMiddleware, upload.single("certificate"), applyDoctorController); // Apply for Doctor




// 
















//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

//Apply Doctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController);

//Notifiaction  Doctor || POST
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);
//Notifiaction  Doctor || POST
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

//GET ALL DOC
router.get("/getAllDoctors", authMiddleware, getAllDocotrsController);

//BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware, bookeAppointmnetController);

//Booking Avliability
// Corrected route spelling
router.post(
  "/booking-availability",  // Changed from /booking-availbility
  authMiddleware,
  bookingAvailabilityController
);
// Get doctor by id (for retrieving feedback)
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);

// Submit feedback
router.post("/submitFeedback", authMiddleware, submitFeedbackController);

//Appointments List
router.get("/user-appointments", authMiddleware, userAppointmentsController);

module.exports = router;
