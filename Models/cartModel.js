// cartModel.js

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  items: [{ 
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, // Reference to the Book model
    quantity: { type: Number, default: 1 },
  }],
  saved: { type: Boolean, default: false }, // Indicates whether the cart is saved for later
  createdAt: { type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
