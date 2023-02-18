import cls from 'classnames';
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import * as Yup from 'yup';
import axiosInstance from '../../../../config/axios';
import styles from './styles/reset-password.module.css';

interface IResetPasswordProps {
  password: string;
  setPassword: (password: string) => void;
  error: string;
  setError: (error: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  email: string;
}

const ResetPassword = ({
  password,
  setPassword,
  email,
  error,
  loading,
  setError,
  setLoading,
}: IResetPasswordProps) => {
  const navigate = useNavigate();
  const onSubmit = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post('/auth/change-password', {
        email,
        password: values.password,
      });
      setPassword(values.password);
      if (data.success) {
        navigate('/');
      } else {
        setError(data.error);
      }
    } catch (error: any) {
      // FIXME: any type
      setLoading(false);
      setError(error.response.data.error);
    }
  };
  const formik = useFormik({
    initialValues: {
      password: password,
      confirmPassword: password,
    },
    onSubmit,
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, 'Must be 6 characters or more')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Passwords must match')
        .required('Required'),
    }),
    enableReinitialize: true,
  });
  return (
    <div className={cls(styles.resetWrap)}>
      <div className={cls(styles.resetForm)}>
        <h1>Change Password</h1>
        <p>Pick a strong password</p>
        {error && <div className={cls(styles.error)}>{error}</div>}
        <FormikProvider value={formik}>
          <Form>
            <div className={cls(styles.inputField)}>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className={formik.errors.password && styles.redBorder}
              />
              <div className={styles.errorMessage}>
                <ErrorMessage name="password" />
              </div>
            </div>
            <div className={cls(styles.inputField)}>
              <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className={formik.errors.confirmPassword && styles.redBorder}
              />
              <div className={styles.errorMessage}>
                <ErrorMessage name="confirmPassword" />
              </div>
            </div>
            <div className={cls(styles.formBtn)}>
              <Link
                to="/login"
                className={cls(styles.grayBtn, loading && 'disabled')}
              >
                Cancel
              </Link>
              <button
                type="submit"
                className={cls('blue_btn', loading && 'disabled')}
                disabled={loading}
              >
                {loading ? (
                  <PulseLoader color="#fff" size={10} />
                ) : (
                  'Change Password'
                )}
              </button>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default ResetPassword;
