import { Link } from 'react-router-dom';
import PageTitle from '../../components/page-title';
import styles from './styles/login.module.css';

const Login = () => {
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
          <div className={styles.card}>
            <div className={styles.input}>
              <input type="text" placeholder="Email address or phone number" />
            </div>
            <div className={styles.input}>
              <input type="password" placeholder="Password" />
            </div>
            <button className={styles.loginBtn}>Log In</button>
            <div className={styles.forgotBtn}>
              <Link to="/forgotten-password">Forgotten password?</Link>
            </div>
            <button className={styles.newAccountBtn}>Create New Account</button>
          </div>
          <p className={styles.instruction}>
            Create a Page for a celebrity, brand or business.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
