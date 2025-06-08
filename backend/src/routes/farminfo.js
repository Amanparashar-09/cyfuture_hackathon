const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    createFarmInfo,
    getMyFarmInfo,
    updateMyFarmInfo,
    getWeatherByFarmLocation
} = require('../controllers/farmInfoController');

router.post('/', authMiddleware, createFarmInfo);
router.get('/me', authMiddleware, getMyFarmInfo);
router.put('/me', authMiddleware, updateMyFarmInfo);
router.get('/me/weather', authMiddleware, getWeatherByFarmLocation);

module.exports = router;
