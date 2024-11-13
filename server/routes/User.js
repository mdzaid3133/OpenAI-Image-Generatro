import express from 'express';
import { register,login, logout,updateProfile } from '../controllers/user.js';
import { isLoggedIn } from '../middleware/Auth.js';
const  router = express.Router();


router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)   
router.post('/editprofile',isLoggedIn, updateProfile)   

export default router