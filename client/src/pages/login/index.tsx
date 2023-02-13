import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { Dispatch } from 'redux';
import PageTitle from '../../components/page-title';
import axiosInstance from '../../config/axios';
import { UserActionTypes, UserActionEnum } from '../../redux/user/types';
import LoginPageFooter from './components/footer';
import RegisterCardModal from './components/register';
import { IFormValues, initialValues, validationSchema } from './formik/formik';
import styles from './styles/login.module.css';
import Cookie from 'js-cookie';

const Login = () => {
  ReactModal.setAppElement('#root');
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
        if (data?.data?.user?.verified) {
          dispatch({
            type: UserActionEnum.LOGIN,
            payload: data?.data,
          });
          Cookie.set('user', JSON.stringify(data?.data));
          navigate('/');
        } else {
          setError('Please verify your email');
        }
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
  const modalStyles = {
    overlay: {
      borderRadius: '10px',
      border: 'none',
    },
    content: {
      borderRadius: '10px',
      maxHeight: '570px',
      maxWidth: '500px',
      border: 'none',
      boxShadow: '0 0 5px var(--shadow-1)',
      margin: 'auto',
    },
  };
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
      <ReactModal isOpen={showRegisterModal} style={modalStyles}>
        <RegisterCardModal onClose={handleClose} />
      </ReactModal>
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
                  <Link to="/forgotten-password">Forgotten password?</Link>
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
      <LoginPageFooter />
    </>
  );
};

export default Login;
