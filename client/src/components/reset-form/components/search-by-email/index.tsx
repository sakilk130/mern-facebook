import cls from 'classnames';
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { ResetForm } from '../../../../enums/resetForm';
import styles from './styles/search-by-email.module.css';

interface ISearchByEmailProps {
  email: string;
  setEmail: (email: string) => void;
  setStep?: (step: number) => void;
}

const SearchByEmail = ({ email, setEmail, setStep }: ISearchByEmailProps) => {
  const formik = useFormik({
    initialValues: {
      email: email,
    },
    onSubmit: (values) => {
      setEmail(values.email);
      setStep && setStep(ResetForm.SEND_CODE_BY_EMAIL);
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
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
              <Link to="/login" className={cls(styles.grayBtn)}>
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Search
              </button>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default SearchByEmail;
