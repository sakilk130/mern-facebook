import cls from 'classnames';
import { Link } from 'react-router-dom';
import { ResetForm } from '../../../../enums/resetForm';
import styles from './styles/send-code-by-email.module.css';

interface ISendCodeByEmailProps {
  findUser: {
    email: string;
    picture: string;
  } | null;
  setStep?: (step: number) => void;
}

const SendCodeByEmail = ({ setStep, findUser }: ISendCodeByEmailProps) => {
  const handleSendCodeByEmail = () => {
    setStep && setStep(ResetForm.VERIFY_CODE);
  };
  return (
    <div className={cls(styles.resetWrap)}>
      <h1>Reset Your Password</h1>
      <div className={cls(styles.search)}>
        <div className={cls(styles.searchLeft)}>
          <p>How do you want to receive the code to reset your password?</p>
          <div className={cls(styles.checkWithEmail)}>
            <input type="radio" name="code" id="email" checked />
            <label htmlFor="email">
              <span>Send code via email</span> <span>{findUser?.email}</span>
            </label>
          </div>
        </div>
        <div className={cls(styles.searchRight)}>
          <img src={findUser?.picture} alt="" />
          <span>email@email.email</span>
          <span>Facebook user</span>
        </div>
      </div>
      <div className={cls(styles.formBtn)}>
        <Link to="/login" className={cls(styles.grayBtn)}>
          Not You ?
        </Link>
        <button
          type="button"
          className="blue_btn"
          onClick={handleSendCodeByEmail}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SendCodeByEmail;
