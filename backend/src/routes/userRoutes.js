const express = require('express');
const { createUser } = require('../controllers/userController');
const router = express.Router();

// Register a new user
router.post('/register', createUser);

module.exports = router;
