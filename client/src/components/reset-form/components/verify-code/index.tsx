import cls from 'classnames';
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import * as Yup from 'yup';
import axiosInstance from '../../../../config/axios';
import { ResetForm } from '../../../../enums/resetForm';
import styles from './styles/verify-code.module.css';

interface IVerifyCodeProps {
  code: string;
  setCode: (code: string) => void;
  setStep?: (step: number) => void;
  error: string;
  setError: (error: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  email: string;
}

const VerifyCode = ({
  code,
  setCode,
  setStep,
  error,
  loading,
  setError,
  setLoading,
  email,
}: IVerifyCodeProps) => {
  const onSubmit = async (values: { code: string }) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post('/auth/validate-reset-code', {
        code: values.code,
        email: email,
      });
      setLoading(false);
      if (data.success) {
        setError('');
        setCode(values.code);
        setStep && setStep(ResetForm.RESET_PASSWORD);
      } else {
        setError(data.error);
      }
    } catch (error: any) {
      // FIXME: error type
      setError(error.response.data.error);
      setLoading(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      code: code,
    },
    onSubmit,
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
        {error && <p className={cls(styles.error)}>{error}</p>}
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
                {loading ? <PulseLoader color="#fff" size={10} /> : 'Continue'}
              </button>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default VerifyCode;
