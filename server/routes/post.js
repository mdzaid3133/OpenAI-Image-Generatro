import express from 'express';
import { getAllPosts,createPost } from '../controllers/post.js';
import { isLoggedIn } from '../middleware/Auth.js';

const router  = express.Router();

router.get('/', getAllPosts);
router.post('/',isLoggedIn,createPost);

export default router;