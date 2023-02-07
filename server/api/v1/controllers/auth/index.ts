import { Request, Response } from 'express';
import User from '../../../../models/User';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';
import { validateUserName } from '../../../../helpers/validation';

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
    return res.status(201).json({
      success: true,
      data: user,
      message: 'Registration successful',
    });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      let errors: Record<string, string[]> = {};
      error.inner.forEach((err) => {
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
