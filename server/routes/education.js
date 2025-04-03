const express = require("express");
const router = express.Router();
const educationController = require("../controllers/educationController");

// Add Education
router.post("/add-education", educationController.addEducation);

// Get Education by User
router.get("/education/:userId", educationController.getEducationByUser);

module.exports = router;