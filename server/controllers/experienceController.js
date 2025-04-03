const Experience = require('../models/experience');
const User = require('../models/User');

exports.addExperience = async (req, res) => {
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
};
exports.getExperiencesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    // Fetch experiences for the user
    const experiences = await Experience.find({ user: userId });

    res.status(200).json({
      success: true,
      experiences,
    });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};