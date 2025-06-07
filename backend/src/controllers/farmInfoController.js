const FarmInfo = require('../models/FarmInfo');

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
        farming_type: req.body.farming_type
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
            farming_type: req.body.farming_type
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
