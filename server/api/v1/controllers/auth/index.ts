import { Request, Response } from 'express';
import User from '../../../../models/User';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';
import { validateUserName } from '../../../../helpers/validation';
import { generateToken, verifyToken } from '../../../../helpers/token';
import { sendValidationEmail } from '../../../../helpers/mailer';
import { JwtPayload } from 'jsonwebtoken';

export const register = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const { firstName, lastName, email, password, gender, dob } = req.body;
    const schema = Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
      password: Yup.string().required('Password is required'),
      gender: Yup.string().required('Gender is required'),
      dob: Yup.object().shape({
        bDate: Yup.number().required('Birth date is required'),
        bMonth: Yup.number().required('Birth month is required'),
        bYear: Yup.number().required('Birth year is required'),
      }),
    });
    await schema.validate(req.body, { abortEarly: false });
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
        },
        token,
      },
      message: 'Registration successful | Please verify your email',
    });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      let errors: Record<string, string[]> = {};
      //TODO: type check
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
  try {
    const { email, password } = req.body;
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
      password: Yup.string().required('Password is required'),
    });
    await schema.validate(req.body, { abortEarly: false });
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
        },
        token,
      },
      message: 'Login successful',
    });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      let errors: Record<string, string[]> = {};
      //TODO: type check
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
};
