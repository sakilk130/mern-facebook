import express from 'express';
import { register, login, activate } from '../../controllers/auth';

const router = express.Router();

router.post('/register', register);
router.post('/activate', activate);
router.post('/login', login);

export default router;
