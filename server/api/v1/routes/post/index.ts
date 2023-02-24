import express from 'express';
import { auth } from '../../../../middleware/auth';
import { RequestValidator } from '../../../../middleware/RequestValidator';
import { CreatePostRequest } from '../../../../requests/post/CreatePostRequest';
import { createPost } from '../../controllers/post';

const router = express.Router();

router.post('/create', RequestValidator(CreatePostRequest), auth, createPost);

export default router;
