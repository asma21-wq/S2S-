const Feedback = require('../models/feedback');

// Add feedback
const addFeedback = async (req, res) => {
  console.log("Request body:", req.body); // Debugging

  const { content, userId } = req.body; // ✅ Extract userId from body

  if (!userId) {
    return res.status(400).json({ message: 'User ID is missing.' });
  }

  try {
    const feedback = new Feedback({ content, user: userId }); // ✅ Save userId
    await feedback.save();

    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .populate('user', 'name prenom');

    res.status(201).json({ message: 'Feedback submitted successfully', feedbacks });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Failed to submit feedback', error: error.message });
  }
};

// Get the latest 3 feedbacks
const getLatestFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .populate('user', 'name prenom');

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
};

module.exports = {
  addFeedback,
  getLatestFeedbacks,
};