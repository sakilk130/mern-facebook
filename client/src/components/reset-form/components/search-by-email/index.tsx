import cls from 'classnames';
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import * as Yup from 'yup';
import axiosInstance from '../../../../config/axios';
import { ResetForm } from '../../../../enums/resetForm';
import styles from './styles/search-by-email.module.css';

interface ISearchByEmailProps {
  email: string;
  setEmail: (email: string) => void;
  setStep?: (step: number) => void;
  error: string;
  setError: (error: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setFindUser?: (user: any) => void;
}

const SearchByEmail = ({
  email,
  setEmail,
  setStep,
  error,
  setError,
  loading,
  setLoading,
  setFindUser,
}: ISearchByEmailProps) => {
  const onSubmit = async (values: { email: string }) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post('/auth/find-user', {
        email: values.email,
      });
      setLoading(false);
      if (data.success) {
        setError('');
        setEmail(values.email);
        setFindUser && setFindUser(data.data);
        setStep && setStep(ResetForm.SEND_CODE_BY_EMAIL);
      } else {
        setError(data.error);
      }
    } catch (error: any) {
      // FIXME: Error type
      setError(error.response.data.error);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: email,
    },
    onSubmit,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required')
        .max(50, 'Max length is 50'),
    }),
    enableReinitialize: true,
  });
  return (
    <div className={cls(styles.resetWrap)}>
      <div className={cls(styles.resetForm)}>
        <h1>Find Your Account</h1>
        <p>
          Please enter your email address or mobile number to search for your
          account.
        </p>
        {error && <div className={cls(styles.error)}>{error}</div>}
        <FormikProvider value={formik}>
          <Form>
            <div className={cls(styles.inputField)}>
              <Field
                name="email"
                type="email"
                placeholder="Email address or phone number"
                className={formik.errors.email && styles.redBorder}
              />
              <div className={styles.errorMessage}>
                <ErrorMessage name="email" />
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
                {loading ? <PulseLoader color="#fff" size={10} /> : 'Search'}
              </button>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default SearchByEmail;
