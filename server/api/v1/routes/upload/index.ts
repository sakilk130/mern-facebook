import express from 'express';
import { auth } from '../../../../middleware/auth';
import { uploadImages as uploadImagesMiddleware } from '../../../../middleware/ImageUpload';
import { uploadImages } from '../../controllers/upload';

const router = express.Router();

router.post('/images', auth, uploadImagesMiddleware, uploadImages);

export default router;
