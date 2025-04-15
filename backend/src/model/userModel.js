const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema & Model
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    isActive: { type: Boolean, default: true },
  });
  
  const User = mongoose.model("User", userSchema);

  module.exports = User;