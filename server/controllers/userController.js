const multer = require('multer');
const path = require('path');
const User = require('../models/User'); // Assuming the user model is defined
const mongoose = require('mongoose');

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save to uploads folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Use original extension
  }
});

// Set up the multer upload middleware
const upload = multer({ storage: storage });
// Upload Cover Photo
const uploadCoverPhoto = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Logs the text fields like userId
    console.log('Uploaded File:', req.file); // 
    const { userId } = req.body;

    // Validate the userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID format' });
    }

    // Check if a file is uploaded
    if (req.file) {
      const coverPhotoPath = '/uploads/' + req.file.filename; // Public path to the file

      // Update the user's cover photo
      const user = await User.findByIdAndUpdate(
        userId, // Maps userId to _id
        { coverPhoto: coverPhotoPath },
        { new: true } // Return the updated user
      );

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.json({ success: true, url: coverPhotoPath });
    } else {
      res.status(400).json({ success: false, message: 'No file uploaded' });
    }
  } catch (error) {
    console.error('Error uploading cover photo:', { error });
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
// Upload Profile Picture (PDP)
const uploadProfilePicture = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Logs the text fields like userId
    console.log('Uploaded File:', req.file);
    const { userId } = req.body;

    // Validate the userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID format' });
    }

    // Check if a file is uploaded
    if (req.file) {
      const profilePicPath = '/uploads/' + req.file.filename; // Public path to the file

      // Update the user's profile picture
      const user = await User.findByIdAndUpdate(
        userId,
        { PDP: profilePicPath },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.json({ success: true, url: profilePicPath });
    } else {
      res.status(400).json({ success: false, message: 'No file uploaded' });
    }
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update User Information
const updateUser = async (req, res) => {
  try {
    const { userId } = req.body;  // Assuming the user ID is passed in the request body
    const updatedData = req.body;  // The updated user data from the frontend
    
    // Find the user by userId and update their details
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,  // Return the updated document
      runValidators: true,  // Validate data according to the schema
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the updated user data as response
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating user", error: err });
  }
};

module.exports = {  upload, updateUser,uploadCoverPhoto, uploadProfilePicture };
