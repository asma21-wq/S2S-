const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, 
  title: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  }, 
  postType: {
    type: String,
    enum: ['article', 'research', 'project', 'unfinished_project'],
    required: true
  }, 
  collaboratorsNeeded: {
    type: Boolean,
    default: false
  }, 
  tags: {
    type: [String],
    default: []
  },
  attachments: {
    type: [String],
    default: []
  },
  views: { 
    type: Number, 
    default: 0 
  },
  likes: { 
    type: Number, 
    default: 0 
  }, 
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now } 
  }]
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
