import cls from 'classnames';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import axiosInstance from '../../config/axios';
import { UserActionEnum } from '../../redux/user/types';
import styles from './styles/activation-modal.module.css';

interface IActivationModal {
  onClose: () => void;
  token?: string;
}

const ActivationModal = ({ onClose, token }: IActivationModal) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resend, setResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleActivate = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post('/auth/activate', {
        token,
      });
      setLoading(false);
      if (data?.success) {
        onClose();
        const user = JSON.parse(Cookies.get('user') ?? '');
        if (!user) return;

        Cookies.set(
          'user',
          JSON.stringify({
            ...user,
            user: {
              ...user.user,
              verified: true,
            },
          }),
        );
        dispatch({
          type: UserActionEnum.VERIFY,
          payload: true,
        });
        navigate('/');
      } else {
        setError(data?.error ?? 'Failed to activate');
      }
    } catch (error: any) {
      // FIXME: fix any
      setError(error.response?.data?.error ?? 'Failed to activate');
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResend(true);
    try {
      const { data } = await axiosInstance.post('/auth/send-verification');
      setResend(false);
      if (data?.success) {
        setSuccess(data?.message ?? 'Email sent');
      } else {
        setError(data?.error ?? 'Failed to send email');
      }
    } catch (error: any) {
      // FIXME: fix any
      setError(error.response?.data?.error ?? 'Failed to activate');
      setResend(false);
    }
  };

  return (
    <>
      <header className={styles.modalHeader}>
        <div>
          <h2>
            <span>Activate</span> your account
          </h2>
          {!token && (
            <p>
              We have sent you an email with a link to activate your account.
              Please
            </p>
          )}
        </div>
      </header>
      {token && (
        <div className={styles.modalBody}>
          {success && <p className={cls(styles.successMessage)}>{success}</p>}
          {error && <p className={cls(styles.errorMessage)}>{error}</p>}
          <button
            className={cls(styles.active)}
            disabled={loading || resend}
            type="button"
            onClick={handleActivate}
          >
            {loading ? (
              <PulseLoader color="blue" size={10} />
            ) : (
              <span>Activate</span>
            )}
          </button>
          <button
            className={cls(styles.resend)}
            disabled={loading || resend}
            onClick={handleResend}
          >
            {resend ? (
              <PulseLoader color="blue" size={10} />
            ) : (
              <span>Resend</span>
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default ActivationModal;
