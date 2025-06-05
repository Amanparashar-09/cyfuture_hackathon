import User from '../models/User.js';

// @desc    Get all users (for testing)
// @route   GET /api/users
// @access  Public
export const getAllUsers = async (req, res) => {
  try {
    console.log('=== Getting All Users ===');
    console.log('Database connection status:', User.db.readyState === 1 ? 'Connected' : 'Disconnected');
    
    const users = await User.find({});
    console.log('Raw MongoDB query result:', users);
    console.log('Number of users found:', users.length);
    
    // Log each user's details
    users.forEach((user, index) => {
      console.log(`User ${index + 1}:`, {
        id: user._id,
        email: user.email,
        firebaseUid: user.firebaseUid,
        createdAt: user.createdAt
      });
    });

    res.json(users);
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Register/Update a user after Google authentication
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    console.log('=== Registering/Updating User ===');
    console.log('Database connection status:', User.db.readyState === 1 ? 'Connected' : 'Disconnected');
    
    const { firstName, lastName, email, farmName, farmSize, firebaseUid, photoURL } = req.body;
    console.log('Received user data:', { 
      firstName, 
      lastName, 
      email, 
      farmName, 
      farmSize, 
      firebaseUid, 
      photoURL 
    });

    // Check if user already exists
    const userExists = await User.findOne({ firebaseUid });
    console.log('User exists check result:', userExists ? 'Yes' : 'No');
    if (userExists) {
      console.log('Existing user details:', {
        id: userExists._id,
        email: userExists.email,
        firebaseUid: userExists.firebaseUid
      });
    }
    
    if (userExists) {
      // Update existing user
      console.log('Updating existing user...');
      const updatedUser = await User.findOneAndUpdate(
        { firebaseUid },
        {
          firstName,
          lastName,
          email,
          farmName,
          farmSize,
          photoURL,
        },
        { new: true }
      );
      console.log('User updated in MongoDB:', {
        id: updatedUser._id,
        email: updatedUser.email,
        firebaseUid: updatedUser.firebaseUid,
        updatedAt: updatedUser.updatedAt
      });

      return res.status(200).json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        farmName: updatedUser.farmName,
        farmSize: updatedUser.farmSize,
        photoURL: updatedUser.photoURL,
      });
    }

    // Create new user
    console.log('Creating new user in MongoDB...');
    const user = await User.create({
      firstName,
      lastName,
      email,
      farmName,
      farmSize,
      firebaseUid,
      photoURL,
    });
    console.log('New user created in MongoDB:', {
      id: user._id,
      email: user.email,
      firebaseUid: user.firebaseUid,
      createdAt: user.createdAt
    });

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      farmName: user.farmName,
      farmSize: user.farmSize,
      photoURL: user.photoURL,
    });
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (user) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        farmName: user.farmName,
        farmSize: user.farmSize,
        photoURL: user.photoURL,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 