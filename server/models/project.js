const mongoose = require('mongoose');

// Project schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // This will hold the "cutting-edge solution" text it's like always a simple phrase 
  overview: { type: String, required: true },// This will hold a long description for the project 
  keyFeatures: { type: [String], default: [] },
  technologies: { type: [String], default: [] },
  timeline: { type: String, required: true },
  scope: { type: String, required: true },
  collaborators: { type: [String], default: [] },
  projectImpact: { type: [String], default: [] },
  challengesSolved: { type: [String], default: [] },
  image: { type: Buffer, required: true },  // Buffer to store the image
  files: { type: [Buffer], default: [] },  // Array of Buffers for files
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who created the project
  publishedAt: {
    type: Date,
    default: Date.now // Automatically set to the current date/time when the project is created
  },
  status: { 
    type: String, 
    enum: ['Completed', 'Ongoing'], // Restrict to these values
    required: true 
  }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
