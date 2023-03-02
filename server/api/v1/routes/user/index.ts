import express from 'express';
import { auth } from '../../../../middleware/auth';
import { getProfile, updateProfilePicture } from '../../controllers/user';

const router = express.Router();

router.get('/get-profile/:username', auth, getProfile);
router.post('/update-profile-picture', auth, updateProfilePicture);

export default router;
