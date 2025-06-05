import express from 'express';
import { saveUserData } from '../controllers/authController.js';

const router = express.Router();

router.post('/save-user-data', saveUserData);

export default router; 