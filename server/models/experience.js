const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  companyName: { 
    type: String, 
    required: true 
  },
  employmentType: { 
    type: String, 
    enum: [
      'Full-time', 
      'Part-time', 
      'Self-employed', 
      'Freelance', 
      'Contract', 
      'Internship', 
      'Seasonal', 
      'Apprenticeship'
    ], 
    required: true 
  },
  location: { 
    type: String, 
    default: '' 
  },
  locationType: { 
    type: String, 
    enum: ['Remote', 'On-site', 'Hybrid'], 
    required: true 
  },
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date 
  },
  description: { 
    type: String, 
    default: '' 
  }
}, { timestamps: true });

const Experience = mongoose.model('Experience', experienceSchema);
module.exports = Experience;