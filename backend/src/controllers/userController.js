const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

// User Registration
const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Create a JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET, // Use a secret key from environment variables
      { expiresIn: '1h' } // Set token expiration to 1 hour (optional)
    );

    // Respond with the token
    res.status(201).json({
      message: "User registered successfully",
      token: token, // Send the token back to the client
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

// User Login
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // Use a secret key from environment variables
      { expiresIn: '1h' } // Set token expiration to 1 hour
    );

    // Respond with the token
    res.status(200).json({
      message: "Login successful",
      token: token, // Send the token back to the client
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

module.exports = {
  userRegister,
  userLogin
};
