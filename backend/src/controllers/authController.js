import User from '../models/User.js';

export const saveUserData = async (req, res) => {
  try {
    const { firstName, lastName, email, farmName, farmSize } = req.body;

    const newUser = new User({
      firstName,
      lastName,
      email,
      farmName,
      farmSize,
      onboardingCompleted: false
    });

    await newUser.save();

    res.status(201).json({
      message: "User data saved successfully",
      user: newUser
    });

  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      message: "Error saving user data",
      error: error.message
    });
  }
}; 