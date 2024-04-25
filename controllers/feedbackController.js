const Feedback = require('../models/feedbackModel');

const feedbackController = {
  // Add feedback
  addFeedback: async (req, res) => {
    try {
      const { content, rating } = req.body;
      const userId = req.session.userId; // Assuming user ID is stored in the session

      const feedback = new Feedback({ userId, content, rating });
      await feedback.save();

      res.status(201).json({ message: 'Feedback added successfully', feedback });
    } catch (error) {
      console.error('Error adding feedback:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get all feedback
  getAllFeedback: async (req, res) => {
    try {
      const feedback = await Feedback.find().populate('userId', 'username');
      res.status(200).json(feedback);
    } catch (error) {
      console.error('Error getting feedback:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Edit feedback
  editFeedback: async (req, res) => {
    try {
      const { feedbackId } = req.params;
      const { content, rating } = req.body;
      const userId = req.session.userId; // Assuming user ID is stored in the session

      const feedback = await Feedback.findOneAndUpdate(
        { _id: feedbackId, userId },
        { content, rating },
        { new: true }
      );

      if (!feedback) {
        return res.status(404).json({ error: 'Feedback not found or user unauthorized' });
      }

      res.status(200).json({ message: 'Feedback updated successfully', feedback });
    } catch (error) {
      console.error('Error editing feedback:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Delete feedback
  deleteFeedback: async (req, res) => {
    try {
      const { feedbackId } = req.params;
      const userId = req.session.userId; // Assuming user ID is stored in the session

      const feedback = await Feedback.findOneAndDelete({ _id: feedbackId, userId });

      if (!feedback) {
        return res.status(404).json({ error: 'Feedback not found or user unauthorized' });
      }

      res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
      console.error('Error deleting feedback:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = feedbackController;
