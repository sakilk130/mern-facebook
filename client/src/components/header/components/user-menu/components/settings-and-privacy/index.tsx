import cls from 'classnames';
import { UserProfile } from '../../../../../../enums/userProfile';
import styles from './styles/settings-and-privacy.module.css';

interface SettingsAndPrivacyProps {
  onChangeVisible: (visible: UserProfile) => void;
}

const SettingsAndPrivacy = ({ onChangeVisible }: SettingsAndPrivacyProps) => {
  return (
    <>
      <div className={cls(styles.title)}>
        <div
          className={styles.backBtn}
          onClick={() => onChangeVisible(UserProfile.USER_MENU)}
        >
          <i className="arrow_back_icon"></i>
        </div>
        <h2>Settings & Privacy</h2>
      </div>
      <div className={cls(styles.userMenuItem, styles.hover)}>
        <div className={cls(styles.circle)}>
          <i className="settings_filled_icon"></i>
        </div>
        <h4>Settings</h4>
      </div>
      <div className={cls(styles.userMenuItem, styles.hover)}>
        <div className={cls(styles.circle)}>
          <i className="privacy_checkup_icon"></i>
        </div>
        <h4>Privacy Checkup</h4>
      </div>
      <div className={cls(styles.userMenuItem, styles.hover)}>
        <div className={cls(styles.circle)}>
          <i className="privacy_shortcuts_icon"></i>
        </div>
        <div className={cls(styles.userMenu)}>
          <h4>Privacy Shortcuts</h4>
        </div>
      </div>
      <div className={cls(styles.userMenuItem, styles.hover)}>
        <div className={cls(styles.circle)}>
          <i className="activity_log_icon"></i>
        </div>
        <div className={cls(styles.userMenu)}>
          <h4>Activity Log</h4>
        </div>
      </div>
      <div className={cls(styles.userMenuItem, styles.hover)}>
        <div className={cls(styles.circle)}>
          <i className="news_icon"></i>
        </div>
        <h4>News Feed Preferences</h4>
      </div>
      <div className={cls(styles.userMenuItem, styles.hover)}>
        <div className={cls(styles.circle)}>
          <i className="language_icon"></i>
        </div>
        <h4>Language</h4>
      </div>
    </>
  );
};

export default SettingsAndPrivacy;
