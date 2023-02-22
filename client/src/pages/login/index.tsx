import { Modal } from 'antd';
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { Dispatch } from 'redux';
import Footer from '../../components/footer';
import PageTitle from '../../components/page-title';
import RegisterCardModal from '../../components/register';
import axiosInstance from '../../config/axios';
import { UserActionEnum, UserActionTypes } from '../../redux/user/types';
import { IFormValues, initialValues, validationSchema } from './formik/formik';
import styles from './styles/login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch: Dispatch<UserActionTypes> = useDispatch();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const onSubmit = async (values: IFormValues) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post('/auth/login', values);
      setLoading(false);
      if (data?.success) {
        dispatch({
          type: UserActionEnum.LOGIN,
          payload: data?.data,
        });
        Cookie.set('user', JSON.stringify(data?.data));
        navigate('/');
      } else {
        setError(data?.error ?? 'Something went wrong');
      }
    } catch (err: any) {
      //FIXME: fix any
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
    validationSchema,
    onSubmit,
  });

  const handleShow = () => {
    setShowRegisterModal(true);
  };
  const handleClose = () => {
    setShowRegisterModal(false);
  };
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, [error]);

  return (
    <>
      <PageTitle title="Login | Facebook" />
      <Modal
        title={
          <div>
            <h2>Sign Up</h2>
            <p>It's quick and easy.</p>
          </div>
        }
        centered
        open={showRegisterModal}
        onCancel={handleClose}
        footer={null}
      >
        <RegisterCardModal onClose={handleClose} />
      </Modal>
      <div className={styles.container}>
        <div className={styles.left}>
          <img
            src="/icons/facebook.svg"
            alt="Facebook "
            className={styles.iconSvg}
          />
          <h1>
            Facebook helps you connect and share with the people in your life.
          </h1>
        </div>
        <div className={styles.right}>
          <FormikProvider value={formik}>
            <Form>
              <div className={styles.card}>
                <div
                  className={`${styles.input} ${
                    formik.errors.email && styles.redBorder
                  }`}
                >
                  <Field type="text" placeholder="Email address" name="email" />
                  <div className={styles.fieldError}>
                    <ErrorMessage name="email" />
                  </div>
                </div>
                <div
                  className={`${styles.input} ${
                    formik.errors.password && styles.redBorder
                  }`}
                >
                  <Field
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                  <div className={styles.fieldError}>
                    <ErrorMessage name="password" />
                  </div>
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button
                  type="submit"
                  className={`${styles.loginBtn}`}
                  disabled={loading}
                >
                  {loading ? <PulseLoader color="#fff" size={10} /> : 'Log In'}
                </button>
                <div className={styles.forgotBtn}>
                  <Link to="/reset">Forgotten password?</Link>
                </div>
                <button
                  className={styles.newAccountBtn}
                  type="button"
                  onClick={handleShow}
                >
                  Create New Account
                </button>
              </div>
            </Form>
          </FormikProvider>
          <p className={styles.instruction}>
            Create a Page for a celebrity, brand or business.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
