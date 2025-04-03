const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  servicename: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  username: { type: String, required: true }, // Assuming you have a username field
});

module.exports = mongoose.model('Service', serviceSchema);