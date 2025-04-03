const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path if needed

const router = express.Router();
const { uploadCoverPhoto, uploadProfilePicture } = require('../controllers/userController');
const upload = require('../controllers/userController').upload; // Import multer upload middleware

// Route for uploading cover photo
router.post('/user/upload-pdp', upload.single('PDP'), uploadProfilePicture);

router.post('/user/upload-cover', upload.single('cover'), uploadCoverPhoto);
// PUT route to update user data
router.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the URL
    const updatedData = req.body;  // Get the updated user data from the request body
    
    // Find the user by ID and update their details
    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Return the updated user data
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user data', error: err });
  }
});

// Get user by ID
router.get('/users/:id', async (req, res) => {
  console.log("Fetching user with ID:", req.params.id); // Debugging line

  try {
    // Fetch user by ID
    const user = await User.findById(req.params.id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }


    // Respond with the user data, including the Base64 image
    res.status(200).json({
      ...user.toObject(), // Spread user object to include all fields
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});


// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
      }
    try {
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
      }
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
  
      // Generate a token
      const token = jwt.sign({ id: user._id }, '933df9e3fe21f0a07e7cd89a5db087a30649da4813bb895e675f0d513f5c037ffce5624b95e860b8c33a6e50855b4310c650f3b2de3e5a5fa3c531f28e61d626d1027c688768e3e53d600b699627abbfffde64f1c2b01e621080b85e0d0aa529c11f31e6fcfaad7e715eaf17f20dbe9099bc9168d40809dfb47dbdf6ba88556f147ee87ec34032dacf235bf86307980ee361de66366be0c935374808d8a656d8468c8c5985048cbe7f161eeeab3d7ff36f6bcf02e13d7729f14d431012cebe9fcff1376ee557bc58824bab055b014f2618a10dacc96fa7ca30100dac53f63f99a3e1ab5ad67824c796178cee1393c7c83fb120e73385f9bf17adb216263e3b2d', { expiresIn: '1h' });
  
      // Respond with the user ID and token
      res.status(200).json({
        message: 'Login successful.',
        userId: user._id,
        token,
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Server error.' });
    }
  });
// Signup route
router.post('/signup', async (req, res) => {
  const { name, prenom, email, password, userType } = req.body;

  try {
    // Validate required fields
    if (!name || !prenom || !email || !password || !userType) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      prenom,
      email,
      password: hashedPassword,
      userType, // Either 'researcher' or 'recruiter'
      researcher: userType === 'researcher' ? {} : undefined, // Default researcher schema
      recruiter: userType === 'recruiter' ? {} : undefined,   // Default recruiter schema
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});
module.exports = router;
