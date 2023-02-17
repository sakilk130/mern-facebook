import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import Cookie from 'js-cookie';
import { memo, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import axiosInstance from '../../../../config/axios';
import { UserActionEnum } from '../../../../redux/user/types';
import { IFormValues, initialValues, validationSchema } from './formik/formik';
import styles from './styles/RegisterCardModal.module.css';
import { months } from './utils';

interface RegisterCardModalProps {
  onClose: () => void;
}

const RegisterCardModal = ({ onClose }: RegisterCardModalProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const onSubmit = async (values: IFormValues) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post('/auth/register', values);
      setLoading(false);
      if (data?.success) {
        setSuccessMessage(data?.message);
        setTimeout(() => {
          onClose();
          dispatch({
            type: UserActionEnum.LOGIN,
            payload: data?.data,
          });
          Cookie.set('user', JSON.stringify(data?.data));
          navigate('/');
        }, 2000);
      } else {
        setError(data?.error ?? 'Something went wrong');
      }
    } catch (err: any) {
      // FIXME: fix any
      setLoading(false);
      if (typeof err.response?.data?.error === 'object') {
        formik.setErrors(err.response?.data?.error);
      } else {
        setError(err.response?.data?.error ?? 'Something went wrong');
      }
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (successMessage) {
      formik.resetForm();
    }
    if (error) {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successMessage, error]);

  return (
    <>
      <header className={styles.modalHeader}>
        <div>
          <h2>Sign Up</h2>
          <p>It's quick and easy.</p>
        </div>
        <button type="button" onClick={onClose} className={styles.closeBtn}>
          <AiOutlineClose />
        </button>
      </header>
      <hr />
      <FormikProvider value={formik}>
        <Form>
          <div className={styles.form}>
            <div className={styles.formInputInRow}>
              <div>
                <Field
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  className={formik.errors.firstName && styles.redBorder}
                />
                <div className={styles.errorMessage}>
                  <ErrorMessage name="firstName" />
                </div>
              </div>
              <div>
                <Field
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  className={formik.errors.lastName && styles.redBorder}
                />
                <div className={styles.errorMessage}>
                  <ErrorMessage name="lastName" />
                </div>
              </div>
            </div>
            <div className={styles.formInput}>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className={formik.errors.email && styles.redBorder}
              />
            </div>
            <div className={styles.errorMessage}>
              <ErrorMessage name="email" />
            </div>
            <div className={styles.formInput}>
              <Field
                type="password"
                name="password"
                id="password"
                placeholder="New Password"
                className={formik.errors.password && styles.redBorder}
              />
            </div>
            <div className={styles.errorMessage}>
              <ErrorMessage name="password" />
            </div>
            <div className={styles.dob}>
              <label htmlFor="dob">Date of Birth</label>
              <div className={styles.dateMonthYearWrap}>
                <div>
                  <Field
                    as="select"
                    name="dob.bDate"
                    className={formik.errors.dob?.bDate && styles.redBorder}
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </Field>
                </div>
                <div>
                  <Field
                    as="select"
                    name="dob.bMonth"
                    className={formik.errors.dob?.bDate && styles.redBorder}
                  >
                    {months.map((month) => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </Field>
                </div>
                <div>
                  <Field
                    as="select"
                    name="dob.bYear"
                    className={formik.errors.dob?.bDate && styles.redBorder}
                  >
                    {Array.from({ length: 100 }, (_, i) => currentYear - i).map(
                      (year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ),
                    )}
                  </Field>
                </div>
              </div>
              <div className={styles.errorMessage}>
                <ErrorMessage name="dob.bDay" />
                <ErrorMessage name="dob.bMonth" />
                <ErrorMessage name="dob.bYear" />
              </div>
            </div>
            <div className={styles.gender}>
              <label htmlFor="gender">Gender</label>
              <div className={styles.genderWrap}>
                <label htmlFor="female">
                  <span>Female</span>
                  <Field
                    type="radio"
                    id="female"
                    name="gender"
                    value="Female"
                  />
                </label>
                <label htmlFor="male">
                  <span>Male</span>
                  <Field type="radio" id="male" name="gender" value="Male" />
                </label>
                <label htmlFor="custom">
                  <span>Custom</span>
                  <Field
                    type="radio"
                    id="custom"
                    name="gender"
                    value="Custom"
                  />
                </label>
              </div>
              <div className={styles.errorMessage}>
                <ErrorMessage name="gender" />
              </div>
            </div>
            <p className={styles.notice}>
              People who use our service may have uploaded your contact
              information to Facebook. Learn more.
            </p>
            <p className={styles.notice}>
              By clicking Sign Up, you agree to our Terms, Privacy Policy and
              Cookies Policy. You may receive SMS notifications from us and can
              opt out at any time.
            </p>
            {error && <p className={styles.error}>{error}</p>}
            {successMessage && (
              <p className={styles.success}>{successMessage}</p>
            )}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? <PulseLoader color="#fff" size={10} /> : 'Sign Up'}
            </button>
          </div>
        </Form>
      </FormikProvider>
    </>
  );
};

export default memo(RegisterCardModal);
