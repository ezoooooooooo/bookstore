const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.delete('/:id', bookController.deleteBookById);
router.post('/', bookController.createBook);
router.patch('/:id', bookController.updateBook);

module.exports = router;
