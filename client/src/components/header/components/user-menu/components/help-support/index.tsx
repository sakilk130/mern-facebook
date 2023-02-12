import cls from 'classnames';
import { UserProfile } from '../../../../../../enums/userProfile';
import styles from './styles/help-support.module.css';

interface HelpSupportProps {
  onChangeVisible: (visible: UserProfile) => void;
}

const HelpSupport = ({ onChangeVisible }: HelpSupportProps) => {
  return (
    <>
      <div className={cls(styles.title)}>
        <div
          className={styles.backBtn}
          onClick={() => onChangeVisible(UserProfile.USER_MENU)}
        >
          <i className="arrow_back_icon"></i>
        </div>
        <h2>Help & Support</h2>
      </div>
      <div className={cls(styles.userMenuItem, styles.hover)}>
        <div className={cls(styles.circle)}>
          <i className="help_center_icon"></i>
        </div>
        <h4>Help Center</h4>
      </div>
      <div className={cls(styles.userMenuItem, styles.hover)}>
        <div className={cls(styles.circle)}>
          <i className="email_icon"></i>
        </div>
        <h4>Support Inbox</h4>
      </div>
      <div className={cls(styles.userMenuItem, styles.hover)}>
        <div className={cls(styles.circle)}>
          <i className="info_filled_icon"></i>
        </div>
        <div className={cls(styles.userMenu)}>
          <h4>Report a Problem</h4>
        </div>
      </div>
    </>
  );
};

export default HelpSupport;
