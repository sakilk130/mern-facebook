import cls from 'classnames';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import axiosInstance from '../../../../config/axios';
import { ResetForm } from '../../../../enums/resetForm';
import styles from './styles/send-code-by-email.module.css';

interface ISendCodeByEmailProps {
  findUser: {
    email: string;
    picture: string;
  } | null;
  setStep?: (step: number) => void;
  error: string;
  setError: (error: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const SendCodeByEmail = ({
  setStep,
  findUser,
  error,
  loading,
  setError,
  setLoading,
}: ISendCodeByEmailProps) => {
  const handleSendCodeByEmail = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        '/auth/send-verification-code',
        {
          email: findUser?.email,
        },
      );
      setLoading(false);
      if (data.success) {
        setError('');
        setStep && setStep(ResetForm.VERIFY_CODE);
      } else {
        setError(data.error);
      }
    } catch (error: any) {
      setError(error.response.data.error);
      setLoading(false);
    }
  };
  return (
    <div className={cls(styles.resetWrap)}>
      <h1>Reset Your Password</h1>
      {error && <p className={cls(styles.error)}>{error}</p>}
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
          className={cls('blue_btn', loading && 'disabled')}
          onClick={handleSendCodeByEmail}
          disabled={loading}
        >
          {loading ? <PulseLoader color="#fff" size={10} /> : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default SendCodeByEmail;
