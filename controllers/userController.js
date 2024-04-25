const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');

async function getUserDetails(req, res) {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function updateName(req, res) {
  try {
    const { name } = req.body;
    await User.findByIdAndUpdate(req.session.userId, { name });
    res.json({ message: 'Name updated successfully' });
  } catch (error) {
    console.error('Error updating name:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function updatePassword(req, res) {
  try {
    const { password } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(req.session.userId, { password: hashedPassword });
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function deleteAccount(req, res) {
  try {
    await User.findByIdAndDelete(req.session.userId);
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { getUserDetails, updateName, updatePassword, deleteAccount };
