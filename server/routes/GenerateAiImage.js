import express from 'express';
import {generateImageFromText}  from '../controllers/GenerateAiImage.js';
import { isLoggedIn } from '../middleware/Auth.js';

const router = express.Router();

router.post('/', isLoggedIn, generateImageFromText)

export default router;

