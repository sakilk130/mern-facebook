import * as Yup from 'yup';

export const LoginRequest = Yup.object().shape({
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be at most 50 characters'),
});
