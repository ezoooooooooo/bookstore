const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Cart routes
router.post('/add', cartController.addToCart);
router.delete('/remove/:productId', cartController.removeFromCart);
router.patch('/update', cartController.updateQuantity);
router.get('/view', cartController.viewCart);
router.delete('/clear', cartController.clearCart);
router.get('/total-price', cartController.getTotalPrice);
router.post('/save', cartController.saveCart);
router.get('/sort', cartController.sortCartItems);

module.exports = router;