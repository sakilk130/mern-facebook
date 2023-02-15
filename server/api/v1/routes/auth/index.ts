import express from 'express';
import { RequestValidator } from '../../../../middleware/RequestValidator';
import { LoginRequest } from '../../../../requests/auth/LoginRequest';
import { RegisterRequest } from '../../../../requests/auth/RegisterRequest';
import { activate, login, register } from '../../controllers/auth';

const router = express.Router();

router.post('/register', RequestValidator(RegisterRequest), register);
router.post('/activate', activate);
router.post('/login', RequestValidator(LoginRequest), login);

export default router;
