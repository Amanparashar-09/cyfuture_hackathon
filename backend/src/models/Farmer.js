const mongoose = require('mongoose');

const FarmerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    firstName: String,
    lastName: String,
    phone: String,
    address: String
}, { timestamps: true });

module.exports = mongoose.model('Farmer', FarmerSchema);
