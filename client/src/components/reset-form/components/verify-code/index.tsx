import cls from 'classnames';
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import styles from './styles/verify-code.module.css';

interface IVerifyCodeProps {
  code: string;
  setCode: (code: string) => void;
  setStep?: (step: number) => void;
}

const VerifyCode = ({ code, setCode, setStep }: IVerifyCodeProps) => {
  const formik = useFormik({
    initialValues: {
      code: code,
    },
    onSubmit: (values) => {
      setCode(values.code);
    },
    validationSchema: Yup.object({
      code: Yup.string().required('Required'),
    }),
    enableReinitialize: true,
  });
  return (
    <div className={cls(styles.resetWrap)}>
      <div className={cls(styles.resetForm)}>
        <h1>Code verification</h1>
        <p>Please enter code that been sent to your email.</p>
        <FormikProvider value={formik}>
          <Form>
            <div className={cls(styles.inputField)}>
              <Field
                name="code"
                type="text"
                placeholder="Code"
                className={formik.errors.code && styles.redBorder}
              />
              <div className={styles.errorMessage}>
                <ErrorMessage name="code" />
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

export default VerifyCode;
