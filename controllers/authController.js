

const bcrypt = require('bcryptjs');
const User = require('../Models/userModel');

async function signup(req, res) {
  try {
    const { email, password, name } = req.body;
    
    // Check if email is valid
    if (!email || !email.includes('@') || !email.includes('.')) {
      return res.status(400).json({ message: 'Invalid email address' });
    }
    
// Check if name is provided
    if (!name) {
  return res.status(400).json({ message: 'Name is required' });
    }

// Check if password meets criteria
    if (!password || password.length < 6) {
  return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }


    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Set userId in session
    req.session.userId = user._id;
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { signup, login };
