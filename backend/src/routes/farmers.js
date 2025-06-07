const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createFarmerProfile,
  getMyFarmerProfile,
  updateMyFarmerProfile
} = require('../controllers/farmerController');

// 🔒 All routes protected
router.post('/', authMiddleware, createFarmerProfile);      // Create
router.get('/me', authMiddleware, getMyFarmerProfile);      // Read
router.put('/me', authMiddleware, updateMyFarmerProfile);   // Update

module.exports = router;
