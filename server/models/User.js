const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// User schema
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: props => `${props.value} is not a valid email format!`
    }
  },
  password: { 
    type: String, 
    required: true,
    validate: {
      validator: function (v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(v);
      },
      message: "Password must be at least 8 characters long, contain a lowercase letter, an uppercase letter, and a special character."
    }
  },

  name: { type: String ,default: '' ,required: true,},
  prenom: { type: String, default: '', required: true, },
  dateOfBirth: { 
    type: Date,
    default: new Date('2000-01-01'), 
    validate: {
      validator: function (v) {
        return v <= new Date(); 
      },
      message: "Date of birth cannot be in the future."
    }
  },
  bio: { type: String, default: '' }, 
  country: { type: String, default: '' }, 
  town: { type: String, default: '' }, 
  coverPhoto: { type: String }, // Store the image URL or file path
  PDP: { type: String },
  aboutMe: { type: String, default: '' },
  experiences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }],
  educations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Education' }],
 
  
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
