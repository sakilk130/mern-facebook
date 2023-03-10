import express from 'express';
import { auth } from '../../../../middleware/auth';
import { RequestValidator } from '../../../../middleware/RequestValidator';
import { LoginRequest } from '../../../../requests/auth/LoginRequest';
import { RegisterRequest } from '../../../../requests/auth/RegisterRequest';
import {
  activate,
  login,
  register,
  sendVerification,
  findUser,
  sendVerificationCode,
  validateResetCode,
  changePassword,
} from '../../controllers/auth';

const router = express.Router();

router.post('/register', RequestValidator(RegisterRequest), register);
router.post('/activate', activate);
router.post('/login', RequestValidator(LoginRequest), login);
router.post('/send-verification', auth, sendVerification);
router.post('/find-user', findUser);
router.post('/send-verification-code', sendVerificationCode);
router.post('/validate-reset-code', validateResetCode);
router.post('/change-password', changePassword);

export default router;
