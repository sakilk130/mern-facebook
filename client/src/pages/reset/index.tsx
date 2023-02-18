import cls from 'classnames';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/footer';
import {
  SearchByEmail,
  SendCodeByEmail,
  VerifyCode,
} from '../../components/reset-form';
import { ResetForm } from '../../enums/resetForm';
import { IUser } from '../../interfaces/user';
import { AppState } from '../../redux/store';
import { UserActionEnum } from '../../redux/user/types';
import styles from './styles/reset.module.css';

const Reset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(ResetForm.SEARCH_BY_EMAIL);

  const user = useSelector((state: AppState) => state.user as IUser);

  const handleLogout = () => {
    Cookies.set('user', '');
    dispatch({ type: UserActionEnum.LOGOUT });
    navigate('/');
  };

  const renderStep = () => {
    switch (step) {
      case ResetForm.SEARCH_BY_EMAIL:
        return (
          <SearchByEmail email={email} setEmail={setEmail} setStep={setStep} />
        );
      case ResetForm.SEND_CODE_BY_EMAIL:
        return <SendCodeByEmail setStep={setStep} />;
      case ResetForm.VERIFY_CODE:
        return <VerifyCode setStep={setStep} code={code} setCode={setCode} />;
      default:
        return (
          <SearchByEmail email={email} setEmail={setEmail} setStep={setStep} />
        );
    }
  };

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
      <main className={cls(styles.main)}>{renderStep()}</main>
      <Footer />
    </div>
  );
};

export default Reset;
