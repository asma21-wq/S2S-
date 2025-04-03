const Education = require("../models/Education");
const User = require("../models/User");

// Add Education
exports.addEducation = async (req, res) => {
  try {
    const {
      userId,
      school,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      grade,
      details,
    } = req.body;

    // Validate required fields
    if (!userId || !school || !degree || !fieldOfStudy || !startDate) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Create a new Education entry
    const newEducation = new Education({
      user: userId,
      school,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      grade,
      details,
    });

    // Save the education record to the database
    await newEducation.save();

    // Update the User model to include the new education entry in the 'education' array
    await User.findByIdAndUpdate(userId, {
      $push: { education: newEducation._id },
    });

    res.status(201).json({
      success: true,
      message: "Education added successfully",
      newEducation,
    });
  } catch (error) {
    console.error("Error adding education:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get Education by User
exports.getEducationByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Fetch education for the user
    const education = await Education.find({ user: userId });

    res.status(200).json({
      success: true,
      education,
    });
  } catch (error) {
    console.error("Error fetching education:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};