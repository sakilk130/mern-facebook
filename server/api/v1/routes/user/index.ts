import express from 'express';
import { getProfile } from '../../controllers/user';

const router = express.Router();

router.get('/get-profile/:username', getProfile);

export default router;
