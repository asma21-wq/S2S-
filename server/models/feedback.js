const mongoose = require('mongoose');

// Feedback schema
const feedbackSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  },
  content: { 
    type: String, 
    required: true,
    maxlength: 1000, // Optional: Limit the feedback text length
    trim: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
