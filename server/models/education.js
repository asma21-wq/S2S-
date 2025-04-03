const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  school: { type: String, required: true }, 
  degree: { type: String, required: true }, 
  fieldOfStudy: { type: String, required: true }, 
  startDate: { type: Date, required: true },
  endDate: { type: Date }, 
  grade: { type: String, default: '' },
  description: { type: String, default: '' },
}, { timestamps: true });

const Education = mongoose.model('Education', educationSchema);
module.exports = Education;
