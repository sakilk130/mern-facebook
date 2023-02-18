import cls from 'classnames';
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { ResetForm } from '../../../../enums/resetForm';
import styles from './styles/reset-password.module.css';

interface IResetPasswordProps {
  setStep?: (step: number) => void;
  password: string;
  setPassword: (password: string) => void;
}

const ResetPassword = ({
  setStep,
  password,
  setPassword,
}: IResetPasswordProps) => {
  const formik = useFormik({
    initialValues: {
      password: password,
      confirmPassword: password,
    },
    onSubmit: (values) => {
      setPassword(values.password);
      setStep && setStep(ResetForm.SEND_CODE_BY_EMAIL);
    },
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
              <Link to="/login" className={cls(styles.grayBtn)}>
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Continue
              </button>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default ResetPassword;
