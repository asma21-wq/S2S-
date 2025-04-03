const express = require('express');
const router = express.Router();
const Experience = require('../models/experience'); // Adjust path if needed
const User = require('../models/User'); // Adjust path if needed
const experienceController = require('../controllers/experienceController');
// Add Experience
router.post('/add-experience', async (req, res) => {
  try {
    const { 
      userId, 
      title, 
      companyName, 
      employmentType, 
      location, 
      locationType, 
      startDate, 
      endDate, 
      description 
    } = req.body;

    // Validate required fields
    if (!userId || !title || !companyName || !employmentType || !locationType || !startDate) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Create a new Experience entry
    const newExperience = new Experience({
      user: userId,
      title,
      companyName,
      employmentType,
      location,
      locationType,
      startDate,
      endDate,
      description,
    });

    // Save the experience record to the database
    await newExperience.save();

    // Update the User model to include the new experience entry in the 'experiences' array
    await User.findByIdAndUpdate(userId, { 
      $push: { experiences: newExperience._id } 
    });

    res.status(201).json({ 
      success: true, 
      message: 'Experience added successfully', 
      newExperience 
    });
  } catch (error) {
    console.error('Error adding experience:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});


// Add Experience
router.post('/add-experience', experienceController.addExperience);

// Get Experiences by User
router.get('/experiences/:userId', experienceController.getExperiencesByUser);

module.exports = router;

module.exports = router;