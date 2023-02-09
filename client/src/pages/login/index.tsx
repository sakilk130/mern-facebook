import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/page-title';
import LoginPageFooter from './components/footer';
import RegisterCardModal from './components/register';
import { initialValues, validationSchema } from './formik/formik';
import styles from './styles/login.module.css';

const Login = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  ReactModal.setAppElement('#root');
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const modalStyles = {
    overlay: {
      borderRadius: '10px',
      border: 'none',
    },
    content: {
      borderRadius: '10px',
      maxHeight: '500px',
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
                  <Field
                    type="email"
                    placeholder="Email address"
                    name="email"
                  />
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
                <button type="submit" className={styles.loginBtn}>
                  Log In
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
