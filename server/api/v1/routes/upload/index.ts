import express from 'express';
import { auth } from '../../../../middleware/auth';
import { uploadImages as uploadImagesMiddleware } from '../../../../middleware/ImageUpload';
import { uploadImages, listImages } from '../../controllers/upload';

const router = express.Router();

router.post('/images', auth, uploadImagesMiddleware, uploadImages);
router.post('/list-images', auth, listImages);
export default router;
