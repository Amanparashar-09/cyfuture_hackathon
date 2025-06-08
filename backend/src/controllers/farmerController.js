const Farmer = require('../models/Farmer');

// ➕ Create farmer profile (only once)
exports.createFarmerProfile = async (req, res) => {
  console.log("Creating profile with data:", {
    userId: req.user.userId,
    email: req.user.email,
    body: req.body
  });
  
  try {
    const exists = await Farmer.findOne({ userId: req.user.userId });
    console.log("Checking if profile exists for userId:", exists);
    if (exists) return res.status(400).json({ message: "Profile already exists" });

    const farmer = await Farmer.create({
      userId: req.user.userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.user.email, 
      phone: req.body.phone,
      address: req.body.address
    });

    res.status(201).json(farmer);
  } catch (err) {
    res.status(500).json({ message: "Failed to create profile", error: err.message });
  }
};

// 📥 Get profile by logged-in user
exports.getMyFarmerProfile = async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ userId: req.user.userId });
    if (!farmer) return res.status(404).json({ message: "Profile not found" });

    res.json(farmer);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile", error: err.message });
  }
};

// ✏️ Update profile by userId
exports.updateMyFarmerProfile = async (req, res) => {
  try {
    const farmer = await Farmer.findOneAndUpdate(
      { userId: req.user.userId },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.user.email,
          phone: req.body.phone,
          address: req.body.address
        }
      },
      { new: true }
    );

    if (!farmer) return res.status(404).json({ message: "Profile not found" });

    res.json(farmer);
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile", error: err.message });
  }
};
