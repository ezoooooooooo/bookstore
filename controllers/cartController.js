const Cart = require('../models/cartModel');
const SavedCart = require('../models/savedCartModel');
const Book = require('../models/bookModel');

const cartController = {
  addToCart: async (req, res) => {
    try {
      const { bookId, quantity } = req.body;
      const userId = req.session.userId; // Assuming user ID is stored in the session

      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      // Check if the book is already in the cart, if yes, update the quantity
      let cartItem = await Cart.findOne({ userId, bookId });
      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        cartItem = new Cart({ userId, bookId, quantity });
      }

      await cartItem.save();

      res.status(200).json({ message: 'Book added to cart successfully' });
    } catch (error) {
      console.error('Error adding book to cart:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const { bookId } = req.params;
      const userId = req.session.userId; // Assuming user ID is stored in the session

      const cartItem = await Cart.findOneAndDelete({ userId, bookId });
      if (!cartItem) {
        return res.status(404).json({ error: 'Book not found in cart' });
      }

      res.status(200).json({ message: 'Book removed from cart successfully' });
    } catch (error) {
      console.error('Error removing book from cart:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  updateQuantity: async (req, res) => {
    try {
      const { bookId, quantity } = req.body;
      const userId = req.session.userId; // Assuming user ID is stored in the session

      const cartItem = await Cart.findOneAndUpdate(
        { userId, bookId },
        { quantity },
        { new: true }
      );
      if (!cartItem) {
        return res.status(404).json({ error: 'Book not found in cart' });
      }

      res.status(200).json({ message: 'Quantity updated successfully' });
    } catch (error) {
      console.error('Error updating quantity:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  viewCart: async (req, res) => {
    try {
      const userId = req.session.userId; // Assuming user ID is stored in the session

      const cartItems = await Cart.find({ userId }).populate('bookId');
      res.status(200).json(cartItems);
    } catch (error) {
      console.error('Error retrieving cart:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  clearCart: async (req, res) => {
    try {
      const userId = req.session.userId; // Assuming user ID is stored in the session

      await Cart.deleteMany({ userId });
      res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
      console.error('Error clearing cart:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  getTotalPrice: async (req, res) => {
    try {
      const userId = req.session.userId; // Assuming user ID is stored in the session

      const cartItems = await Cart.find({ userId }).populate('bookId');
      let totalPrice = 0;
      cartItems.forEach((item) => {
        totalPrice += item.quantity * item.bookId.price;
      });

      res.status(200).json({ totalPrice });
    } catch (error) {
      console.error('Error calculating total price:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  saveCart: async (req, res) => {
    try {
      const userId = req.session.userId; // Assuming user ID is stored in the session

      // Find the current cart items for the user
      const cartItems = await Cart.find({ userId });

      // Save the cart items to the SavedCart collection
      const savedCart = new SavedCart({ userId, cartItems });
      await savedCart.save();

      // Clear the user's current cart
      await Cart.deleteMany({ userId });

      res.status(200).json({ message: 'Cart saved successfully' });
    } catch (error) {
      console.error('Error saving cart:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },
  sortCartItems: async (req, res) => {
    try {
      const userId = req.session.userId; // Assuming user ID is stored in the session

      const cartItems = await Cart.find({ userId }).sort({ createdAt: 1 }).populate('bookId');
      res.status(200).json(cartItems);
    } catch (error) {
      console.error('Error sorting cart items:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = cartController;