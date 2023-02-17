import cls from 'classnames';
import styles from './styles/activation-modal.module.css';

interface IActivationModal {
  onClose: () => void;
  token?: string;
}

const ActivationModal = ({ onClose, token }: IActivationModal) => {
  console.log({ token });
  return (
    <div className={cls(styles.container)}>
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
          <button className={cls(styles.active)}>
            <span>Activate</span>
          </button>
          <button className={cls(styles.resend)}>
            <span>Resend</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivationModal;
