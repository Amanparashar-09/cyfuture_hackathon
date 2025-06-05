import express from 'express';
import { registerUser, getUserProfile, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);  // Get all users
router.post('/register', registerUser);
router.get('/profile', getUserProfile);

export default router; 