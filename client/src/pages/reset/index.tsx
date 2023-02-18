import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IUser } from '../../interfaces/user';
import { AppState } from '../../redux/store';
import { UserActionEnum } from '../../redux/user/types';
import styles from './styles/reset.module.css';
import cls from 'classnames';
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import Footer from '../../components/footer';

const Reset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: AppState) => state.user as IUser);

  const handleLogout = () => {
    Cookies.set('user', '');
    dispatch({ type: UserActionEnum.LOGOUT });
    navigate('/');
  };
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: () => {},
  });

  return (
    <div className={cls(styles.container)}>
      <header className={cls(styles.header)}>
        <img
          className={cls(styles.headerImage)}
          src="../../../icons/facebook.svg"
          alt=""
        />
        <div>
          {user ? (
            <div className={cls(styles.profileDiv)}>
              <Link to="/profile">
                <img
                  className={cls(styles.profileImage)}
                  src={user?.user?.picture}
                  alt=""
                />
              </Link>
              <button className="blue_btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className="blue_btn">Login</button>
            </Link>
          )}
        </div>
      </header>
      <main className={cls(styles.main)}>
        <div className={cls(styles.resetWrap)}>
          <div className={cls(styles.resetForm)}>
            <h1>Find Your Account</h1>
            <p>
              Please enter your email address or mobile number to search for
              your account.
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
      </main>
      <Footer />
    </div>
  );
};

export default Reset;
