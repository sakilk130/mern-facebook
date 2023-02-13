import { useRef, useState } from 'react';
import { UserProfile } from '../../../../enums/userProfile';
import useOutsideClick from '../../../../hooks/useOutsideClick';
import DisplayAndAccessibility from './components/ display-and-accessibility';
import HelpSupport from './components/help-support';
import SettingsAndPrivacy from './components/settings-and-privacy';
import UserMenuItems from './components/user-menu-items';
import styles from './styles/user-menu.module.css';

interface UserMenuProps {
  setShowUserMenu: (showUserMenu: boolean) => void;
}

const UserMenu = ({ setShowUserMenu }: UserMenuProps) => {
  const userMenuRef = useRef(null);
  const [visible, setVisible] = useState(UserProfile.USER_MENU);
  useOutsideClick(userMenuRef, () => {
    setShowUserMenu(false);
  });

  switch (visible) {
    case UserProfile.USER_MENU:
      return (
        <div className={styles.userMenuContainer}>
          <UserMenuItems
            onChangeVisible={setVisible}
            userMenuRef={userMenuRef}
          />
        </div>
      );
    case UserProfile.SETTINGS_AND_PRIVACY:
      return (
        <div className={styles.userMenuContainer}>
          <SettingsAndPrivacy
            onChangeVisible={setVisible}
            userMenuRef={userMenuRef}
          />
        </div>
      );
    case UserProfile.HELP_AND_SUPPORT:
      return (
        <div className={styles.userMenuContainer}>
          <HelpSupport onChangeVisible={setVisible} userMenuRef={userMenuRef} />
        </div>
      );
    case UserProfile.DISPLAY_ACCESSIBILITY:
      return (
        <div className={styles.userMenuContainer}>
          <DisplayAndAccessibility
            onChangeVisible={setVisible}
            userMenuRef={userMenuRef}
          />
        </div>
      );
    default:
      return (
        <div className={styles.userMenuContainer}>
          <UserMenuItems
            onChangeVisible={setVisible}
            userMenuRef={userMenuRef}
          />
        </div>
      );
  }
};

export default UserMenu;
