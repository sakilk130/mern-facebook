import * as Yup from 'yup';

export interface IFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: {
    bDate: number;
    bMonth: number;
    bYear: number;
  };
  gender: string;
}

export const initialValues: IFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  dob: {
    bDate: new Date().getDate(),
    bMonth: new Date().getMonth() + 1,
    bYear: new Date().getFullYear(),
  },
  gender: '',
};

export const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be less than 50 characters'),
  dob: Yup.object().shape({
    bDate: Yup.number().required('Birth date is required'),
    bMonth: Yup.number().required('Birth month is required'),
    bYear: Yup.number().required('Birth year is required'),
  }),
  gender: Yup.string().required('Gender is required'),
});
