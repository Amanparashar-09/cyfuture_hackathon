const express = require('express');
const { getAssistantResponse } = require('../controllers/assistantController');
const protect = require('../middleware/authMiddleware'); 

const router = express.Router();

router.post('/', protect, getAssistantResponse);

module.exports = router; 