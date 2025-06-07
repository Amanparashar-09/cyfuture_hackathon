const mongoose = require('mongoose');

const FarmInfoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    crop_type: String,
    land_area: String,
    season: String,
    location: String,
    farming_type: String
}, { timestamps: true });

module.exports = mongoose.model('FarmInfo', FarmInfoSchema);
