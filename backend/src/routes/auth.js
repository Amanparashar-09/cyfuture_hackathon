const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected route example
router.get('/dashboard', authMiddleware, (req, res) => {
    res.json({ message: `Welcome back, user ${req.user.userId}` });
});

module.exports = router;
