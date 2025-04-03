const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const Project = require('../models/project'); // Make sure the path is correct
const router = express.Router();

// Configure multer to store files in memory as Buffer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// GET route to fetch all projects

router.get('/projects', async (req, res) => {
  try {
    // Fetch the projects from the database
    const projects = await Project.find();

    // Convert the binary image data and files to base64 and send to the frontend
    const projectsWithBase64 = projects.map(project => {
      // Convert image to base64 (if it exists)
      const imageBase64 = project.image ? `data:image/jpeg;base64,${project.image.toString('base64')}` : null;

      // Convert files (array of Buffers) to base64
      const filesBase64 = project.files.map(fileBuffer => {
        return `data:application/octet-stream;base64,${fileBuffer.toString('base64')}`;
      });

      return {
        ...project.toObject(),  // Convert mongoose document to plain object
        image: imageBase64,      // Add base64 image
        files: filesBase64      // Add base64 files array
      };
    });

    // Send the updated projects to the frontend
    res.json(projectsWithBase64);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: "Error fetching projects" });
  }
});


router.post('/projects', upload.fields([
  { name: 'image', maxCount: 1 }, // Single image
  { name: 'files', maxCount: 10 }, // Multiple files (limit 10 in this example)
]), async (req, res) => {
  try {
    const { title, description, overview, keyFeatures, technologies, timeline, scope, collaborators, projectImpact, challengesSolved, status, owner } = req.body;

    // Prepare the file data
    const projectData = {
      title,
      description,
      overview,
      keyFeatures,
      technologies,
      timeline,
      scope,
      collaborators,
      projectImpact,
      challengesSolved,
      status,
      owner,
    };

    // If an image is uploaded, store it in the 'image' field as a Buffer
    if (req.files['image']) {
      projectData.image = req.files['image'][0].buffer;
    }

    // If files are uploaded, store them in the 'files' field as an array of Buffers
    if (req.files['files']) {
      projectData.files = req.files['files'].map(file => file.buffer);
    }

    const newProject = new Project(projectData);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create project' });
  }
});
// Serve the file from memory (for demonstration purposes, serve as base64)
router.get('/file/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const fileBuffer = project.files[req.query.index]; // Access the requested file (by index)
    
    const projectsWithBase64 = project.map(project => {
      // Convert image to base64 (if it exists)
      const imageBase64 = project.image ? `data:image/jpeg;base64,${project.image.toString('base64')}` : null;

      // Convert files (array of Buffers) to base64
      const filesBase64 = project.files.map(fileBuffer => {
        return `data:application/octet-stream;base64,${fileBuffer.toString('base64')}`;
      });

      return {
        ...project.toObject(),  // Convert mongoose document to plain object
        image: imageBase64,      // Add base64 image
        files: filesBase64      // Add base64 files array
      };
    });
    res.json(projectsWithBase64);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching file' });
  }
});
// GET route to fetch a project by ID with ObjectId validation
router.get('/project/:id', async (req, res) => {
  try {
    // Fetch the project using the provided ID
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Convert the binary image data to base64 (if it exists)
    const imageBase64 = project.image 
      ? `data:image/jpeg;base64,${project.image.toString('base64')}`
      : null;

    // Convert any files (buffers) to base64 (if they exist)
    const filesBase64 = project.files.map(fileBuffer => 
      `data:application/octet-stream;base64,${fileBuffer.toString('base64')}`
    );

    // Return the project data with base64 image and files (if available)
    res.status(200).json({
      ...project.toObject(),  // Convert mongoose document to plain object
      image: imageBase64,      // Base64-encoded image (if exists)
      files: filesBase64,     // Base64-encoded files (if any)
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Error fetching project data' });
  }
});

  router.get('/projects/latest', async (req, res) => {
    try {
      // Fetch the latest 3 projects from the database, sorted by creation date
      const latestProjects = await Project.find().sort({ createdAt: -1 }).limit(3);
  
      // Convert the binary image data to base64 and send it to the frontend
      const projectsWithBase64 = latestProjects.map(project => {
        // Convert image to base64 (if it exists)
        const imageBase64 = project.image 
          ? `data:image/jpeg;base64,${project.image.toString('base64')}` 
          : null;
  
        // Return the project with the base64-encoded image
        return {
          ...project.toObject(),  // Convert mongoose document to plain object
          image: imageBase64,      // Add base64 image to the response
        };
      });
  
      // Send the updated projects with base64 images
      res.status(200).json(projectsWithBase64);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching latest projects' });
    }
  });
  
module.exports = router;
