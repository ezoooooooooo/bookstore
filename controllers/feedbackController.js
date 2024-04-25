const Feedback = require('../models/feedbackModel');

const feedbackController = {
  addFeedback: async (req, res) => {
    try {
      const { userId, message } = req.body;
      
      const newFeedback = new Feedback({
        userId,
        message,
        createdAt: new Date(),
      });

      await newFeedback.save();

      res.status(201).json({ message: 'Feedback added successfully' });
    } catch (error) {
      console.error('Error adding feedback:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  getAllFeedback: async (req, res) => {
    try {
      const feedbacks = await Feedback.find();
      res.status(200).json(feedbacks);
    } catch (error) {
      console.error('Error retrieving feedback:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = feedbackController;