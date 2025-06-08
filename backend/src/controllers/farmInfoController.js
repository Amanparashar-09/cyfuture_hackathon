const FarmInfo = require('../models/FarmInfo');
const axios = require('axios');

// Create farm info (one-time)
exports.createFarmInfo = async (req, res) => {
    try {
        const exists = await FarmInfo.findOne({ userId: req.user.userId });
        if (exists) return res.status(400).json({ message: "Farm info already exists" });

        const farmInfo = await FarmInfo.create({
            userId: req.user.userId,
            crop_type: req.body.crop_type,
            land_area: req.body.land_area,
            season: req.body.season,
            location: req.body.location,
            farming_type: req.body.farming_type,
            soil_type: req.body.soil_type
        });

        res.status(201).json(farmInfo);
    } catch (err) {
        res.status(500).json({ message: "Failed to create farm info", error: err.message });
    }
};

// Get farm info by user
exports.getMyFarmInfo = async (req, res) => {
    try {
        const farmInfo = await FarmInfo.findOne({ userId: req.user.userId });
        if (!farmInfo) return res.status(404).json({ message: "Farm info not found" });

        res.json(farmInfo);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch farm info", error: err.message });
    }
};

// Update farm info
exports.updateMyFarmInfo = async (req, res) => {
    try {
        const farmInfo = await FarmInfo.findOneAndUpdate(
            { userId: req.user.userId },
            {
                $set: {
                    crop_type: req.body.crop_type,
                    land_area: req.body.land_area,
                    season: req.body.season,
                    location: req.body.location,
                    farming_type: req.body.farming_type,
                    soil_type: req.body.soil_type
                }
            },
            { new: true }
        );

        if (!farmInfo) return res.status(404).json({ message: "Farm info not found" });

        res.json(farmInfo);
    } catch (err) {
        res.status(500).json({ message: "Failed to update farm info", error: err.message });
    }
};

// Get weather info by farm location
exports.getWeatherByFarmLocation = async (req, res) => {
    try {
        const farmInfo = await FarmInfo.findOne({ userId: req.user.userId });
        if (!farmInfo) {
            return res.status(404).json({ message: "Farm info not found" });
        }

        const location = farmInfo.location;
        if (!location) {
            return res.status(400).json({ message: "Farm location not set" });
        }

        const apiKey = process.env.OPENWEATHER_API_KEY;
        const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
        
        const response = await axios.get(weatherUrl);
        res.json(response.data);

    } catch (err) {
        console.error("Error fetching weather data:", err.message);
        if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            res.status(err.response.status).json({ message: "Failed to fetch weather data from OpenWeatherMap", error: err.response.data });
        } else if (err.request) {
            // The request was made but no response was received
            res.status(500).json({ message: "No response received from OpenWeatherMap", error: err.message });
        } else {
            // Something happened in setting up the request that triggered an Error
            res.status(500).json({ message: "Error setting up weather request", error: err.message });
        }
    }
};
