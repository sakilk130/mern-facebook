import express from 'express';
import { auth } from '../../../../middleware/auth';
import { RequestValidator } from '../../../../middleware/RequestValidator';
import { CreatePostRequest } from '../../../../requests/post/CreatePostRequest';
import { createPost, getAllPosts } from '../../controllers/post';

const router = express.Router();

router.post('/', RequestValidator(CreatePostRequest), auth, createPost);
router.get('/', auth, getAllPosts);

export default router;
