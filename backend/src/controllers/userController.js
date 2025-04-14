const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, userName: newUser.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: "User registered successfully",
      token: token,
      userName: newUser.name
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
    if (!user || !user.isActive) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, userName: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: "Login successful",
      token: token,
      userName: user.name
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

// Update user profile
const updateUser = async (req, res) => {
  const userId = req.user.userId;
  const { name, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

// Deactivate (soft delete) user account
const deactivateUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    await User.findByIdAndUpdate(userId, { isActive: false });
    res.json({ message: "User account deactivated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to deactivate account" });
  }
};

module.exports = {
  userRegister,
  userLogin,
  updateUser,
  deactivateUser
};
