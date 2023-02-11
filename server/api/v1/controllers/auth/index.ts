import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import * as Yup from 'yup';
import { sendValidationEmail } from '../../../../helpers/mailer';
import { generateToken, verifyToken } from '../../../../helpers/token';
import { validateUserName } from '../../../../helpers/validation';
import User from '../../../../models/User';

export const register = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  const { firstName, lastName, email, password, gender, dob } = req.body;
  const schema = Yup.object().shape({
    firstName: Yup.string()
      .required('First name is required')
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name must be at most 50 characters'),
    lastName: Yup.string()
      .required('Last name is required')
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name must be at most 50 characters'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password must be at most 50 characters'),
    gender: Yup.string().required('Gender is required'),
    dob: Yup.object().shape({
      bDate: Yup.number().required('Birth date is required'),
      bMonth: Yup.number().required('Birth month is required'),
      bYear: Yup.number().required('Birth year is required'),
    }),
  });

  try {
    await schema.validate(req.body, { abortEarly: false });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      let errors: Record<string, string[]> = {};
      //FIXME: type check
      error.inner.forEach((err: any) => {
        if (err?.path) {
          errors[err?.path] = err.errors;
        }
      });
      return res.status(400).json({
        success: false,
        error: errors,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

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
    const token = generateToken({ id: user._id }, '1d');
    const url = `${process.env.BASE_URL}/auth/verify-email?token=${token}`;
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
  const schema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password must be at most 50 characters'),
  });

  try {
    await schema.validate(req.body, { abortEarly: false });
  } catch (error) {
    let errors: Record<string, string[]> = {};
    // FIXME: any type
    error.inner.forEach((err: any) => {
      if (err?.path) {
        errors[err?.path] = err.errors;
      }
    });
    return res.status(400).json({
      success: false,
      error: errors,
    });
  }

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
