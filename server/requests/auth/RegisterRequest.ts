import * as Yup from 'yup';

export const RegisterRequest = Yup.object().shape({
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
