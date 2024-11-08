const express = require("express");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
  deleteDoctorController,
  getRatings,
  addRating,
  getCertificateController
} = require("../controllers/doctorCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// 


router.get("/certificate/:filename", getCertificateController); // Get Certificate File


// 

//POST SINGLE DOC INFO
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController);

//POST  GET SINGLE DOC INFO
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);

//GET Appointments
router.get(
  "/doctor-appointments",
  authMiddleware,
  doctorAppointmentsController
);

//POST Update Status
router.post("/update-status", authMiddleware, updateStatusController);

// POST Delete Doctor
router.post("/deleteDoctor", authMiddleware, deleteDoctorController); // add this line

// for the rating and feedback
router.post("/add-rating", addRating);
router.get("/get-ratings/:doctorId", getRatings);
module.exports = router;
