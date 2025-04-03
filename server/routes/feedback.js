const express = require('express');
const router = express.Router();
const { addFeedback, getLatestFeedbacks } = require('../controllers/feedbackController');



// Add feedback (requires authentication)
router.post('/feedback',  addFeedback);

// Get the latest 3 feedbacks (no authentication required)
router.get('/latest', getLatestFeedbacks);

module.exports = router;