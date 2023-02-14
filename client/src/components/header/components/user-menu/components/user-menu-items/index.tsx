import cls from 'classnames';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserProfile } from '../../../../../../enums/userProfile';
import { IUser } from '../../../../../../interfaces/user';
import { AppState } from '../../../../../../redux/store';
import styles from './styles/user-menu-items.module.css';

interface UserMenuItemsProps {
  onChangeVisible: (visible: UserProfile) => void;
}

const UserMenuItems = ({ onChangeVisible }: UserMenuItemsProps) => {
  const { user } = useSelector((state: AppState) => state.user as IUser);

  return (
    <div>
      <Link to="/profile" className={cls(styles.profileLink, styles.hover)}>
        <img src={user.picture} alt={user.firstName} />
        <div>
          <h4>
            {user.firstName} {user.lastName}
          </h4>
          <span>See your profile</span>
        </div>
      </Link>
      <hr />
      <div className={cls(styles.userMenuItem, styles.hover)}>
        <div className={cls(styles.circle)}>
          <i className="report_filled_icon"></i>
        </div>
        <div>
          <h4>Give Feedback</h4>
          <span>Help us improve the new Facebook</span>
        </div>
      </div>
      <hr />
      <div
        className={cls(styles.userMenuItem, styles.hover)}
        onClick={() => onChangeVisible(UserProfile.SETTINGS_AND_PRIVACY)}
      >
        <div className={cls(styles.circle)}>
          <i className="settings_filled_icon"></i>
        </div>
        <div className={cls(styles.userMenu)}>
          <h4>Settings & Privacy</h4>
          <div className="rArrow">
            <i className="right_icon"></i>
          </div>
        </div>
      </div>
      <div
        className={cls(styles.userMenuItem, styles.hover)}
        onClick={() => onChangeVisible(UserProfile.HELP_AND_SUPPORT)}
      >
        <div className={cls(styles.circle)}>
          <i className="help_filled_icon"></i>
        </div>
        <div className={cls(styles.userMenu)}>
          <h4>Help & Support</h4>
          <div className="rArrow">
            <i className="right_icon"></i>
          </div>
        </div>
      </div>
      <div
        className={cls(styles.userMenuItem, styles.hover)}
        onClick={() => onChangeVisible(UserProfile.DISPLAY_ACCESSIBILITY)}
      >
        <div className={cls(styles.circle)}>
          <i className="dark_filled_icon"></i>
        </div>
        <div className={cls(styles.userMenu)}>
          <h4>Display & Accessibility</h4>
          <div className="rArrow">
            <i className="right_icon"></i>
          </div>
        </div>
      </div>
      <div className={cls(styles.userMenuItem, styles.hover)}>
        <div className={cls(styles.circle)}>
          <i className="logout_filled_icon"></i>
        </div>
        <h4>Logout</h4>
      </div>
    </div>
  );
};

export default UserMenuItems;
