import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  photoURL: {
    type: String,
    default: '',
  },
  farmName: {
    type: String,
    required: true,
  },
  farmSize: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  onboardingCompleted: {
    type: Boolean,
    default: false,
  }
});

const User = mongoose.model('User', userSchema);

export default User; 