const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register route
router.post("/register", userController.userRegister);

// Login route
router.post("/login", userController.userLogin);

module.exports = router;
