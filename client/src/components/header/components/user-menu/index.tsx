import { useState } from 'react';
import { UserProfile } from '../../../../enums/userProfile';
import SettingsAndPrivacy from './components/settings-and-privacy';
import UserMenuItems from './components/user-menu-items';
import styles from './styles/user-menu.module.css';

const UserMenu = () => {
  const [visible, setVisible] = useState(UserProfile.USER_MENU);

  switch (visible) {
    case UserProfile.USER_MENU:
      return (
        <div className={styles.userMenuContainer}>
          <UserMenuItems onChangeVisible={setVisible} />
        </div>
      );

    case UserProfile.SETTINGS_AND_PRIVACY:
      return (
        <div className={styles.userMenuContainer}>
          <SettingsAndPrivacy onChangeVisible={setVisible} />
        </div>
      );

    default:
      return (
        <div className={styles.userMenuContainer}>
          <UserMenuItems onChangeVisible={setVisible} />
        </div>
      );
  }
};

export default UserMenu;
