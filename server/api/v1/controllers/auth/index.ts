import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { generateCode } from '../../../../helpers/generateCode';
import { sendResetCode, sendValidationEmail } from '../../../../helpers/mailer';
import { generateToken, verifyToken } from '../../../../helpers/token';
import { validateUserName } from '../../../../helpers/validation';
import { AuthUser } from '../../../../interfaces/user';
import Code from '../../../../models/Code';
import User from '../../../../models/User';

interface RequestWithUser extends Request {
  user?: AuthUser;
}

export const register = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  const { firstName, lastName, email, password, gender, dob } = req.body;
  try {
    const exitingUser = await User.findOne({ email });
    if (exitingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists',
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    let tempUsername = firstName + lastName;
    let newUsername = await validateUserName(tempUsername);
    const user = new User({
      firstName,
      lastName,
      userName: newUsername,
      email,
      password: hashedPassword,
      gender,
      dob,
    });
    await user.save();
    const token = generateToken({ id: user._id }, '30m');
    const url = `${process.env.BASE_URL}?token=${token}`;
    sendValidationEmail(email, firstName + ' ' + lastName, url);
    return res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
          verified: user.verified,
          picture: user.picture,
        },
        token,
      },
      message: 'Registration successful | Please verify your email',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const activate = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const decoded = await verifyToken(token);
    if (!decoded) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired token',
      });
    }
    const { id } = decoded as JwtPayload;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
    if (user.verified) {
      return res.status(400).json({
        success: false,
        error: 'User already verified',
      });
    }
    user.verified = true;
    await user.save();
    return res.status(200).json({
      success: true,
      message: 'User verified successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  const { email, password } = req.body;
  try {
    const findEmail = await User.findOne({ email });
    if (!findEmail) {
      return res.status(404).json({
        success: false,
        error: 'Email or password is incorrect',
      });
    }
    const isMatch = await bcrypt.compare(password, findEmail.password);
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        error: 'Email or password is incorrect',
      });
    }
    const token = generateToken({ id: findEmail._id }, '1d');
    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: findEmail._id,
          firstName: findEmail.firstName,
          lastName: findEmail.lastName,
          userName: findEmail.userName,
          email: findEmail.email,
          verified: findEmail.verified,
          picture: findEmail.picture,
        },
        token,
      },
      message: 'Login successful',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const sendVerification = async (req: RequestWithUser, res: Response) => {
  try {
    const { id } = req.user as AuthUser;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
    if (user.verified === true) {
      return res.status(400).json({
        success: false,
        message: 'This account is already activated.',
      });
    }
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      '30m'
    );
    const url = `${process.env.BASE_URL}?token=${emailVerificationToken}`;
    sendValidationEmail(user.email, user.firstName, url);
    return res.status(200).json({
      success: true,
      message: 'Email verification link has been sent to your email.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const findUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select('email picture');
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
    return res.status(200).json({
      success: true,
      data: {
        email: user.email,
        picture: user.picture,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const sendVerificationCode = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    console.log('🚀 ~ file: index.ts:219 ~ sendVerificationCode ~ user', user);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
    await Code.findOneAndRemove({ email });
    const code = new Code({
      code: generateCode(),
      user: user._id,
    });
    await code.save();
    sendResetCode(email, user.firstName, code.code);
    return res.status(200).json({
      success: true,
      message: 'Verification code has been sent to your email',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
