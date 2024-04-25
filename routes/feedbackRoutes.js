const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Add feedback
router.post('/', feedbackController.addFeedback);

// Get all feedback
router.get('/', feedbackController.getAllFeedback);

// Edit feedback
router.patch('/:feedbackId', feedbackController.editFeedback);

// Delete feedback
router.delete('/:feedbackId', feedbackController.deleteFeedback);

module.exports = router;
