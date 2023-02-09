import * as Yup from 'yup';

export interface IFormValues {
  email: string;
  password: string;
}

export const initialValues: IFormValues = {
  email: '',
  password: '',
};

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});
