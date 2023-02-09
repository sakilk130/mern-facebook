import { Link } from 'react-router-dom';
import PageTitle from '../../components/page-title';
import styles from './styles/login.module.css';
import { Form, FormikProvider, useFormik, Field, ErrorMessage } from 'formik';
import { initialValues, validationSchema } from './formik/formik';

const Login = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <PageTitle title="Login | Facebook" />
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
                <button className={styles.loginBtn}>Log In</button>
                <div className={styles.forgotBtn}>
                  <Link to="/forgotten-password">Forgotten password?</Link>
                </div>
                <button className={styles.newAccountBtn}>
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
    </>
  );
};

export default Login;
