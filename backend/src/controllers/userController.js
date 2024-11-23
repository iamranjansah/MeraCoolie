const User = require('../models/User');

// Create a new user
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate request body
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Please fill in all fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    return res.status(201).json({
      msg: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { createUser };
