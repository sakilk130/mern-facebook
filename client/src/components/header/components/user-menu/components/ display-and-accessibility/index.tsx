import cls from 'classnames';
import { UserProfile } from '../../../../../../enums/userProfile';
import styles from './styles/display-and-accessibility.module.css';

interface DisplayAndAccessibilityProps {
  onChangeVisible: (visible: UserProfile) => void;
}

const DisplayAndAccessibility = ({
  onChangeVisible,
}: DisplayAndAccessibilityProps) => {
  return (
    <>
      <div className={cls(styles.title)}>
        <div
          className={styles.backBtn}
          onClick={() => onChangeVisible(UserProfile.USER_MENU)}
        >
          <i className="arrow_back_icon"></i>
        </div>
        <h2>Display & Accessibility</h2>
      </div>
      <div className={cls(styles.userMenuItem, styles.hover)}>
        <div className={cls(styles.circle)}>
          <i className="dark_filled_icon"></i>
        </div>
        <div className={cls(styles.modeWrapper)}>
          <h4>Dark Mode</h4>
          <p>
            Adjust the appearance of Facebook to reduce glare and give your eyes
            a break.
          </p>
        </div>
      </div>
      <div className={cls(styles.modeSelect)}>
        <h3>Off</h3>
        <input type="radio" />
      </div>
      <div className={cls(styles.modeSelect)}>
        <h3>On</h3>
        <input type="radio" />
      </div>
      <div className={cls(styles.userMenuItem, styles.hover)}>
        <div className={cls(styles.circle)}>
          <i className="compact_icon"></i>
        </div>
        <div className={cls(styles.modeWrapper)}>
          <h4>Compact Mode</h4>
          <p>
            Make your font size smaller so more content can fit on the screen.
          </p>
        </div>
      </div>
      <div className={cls(styles.modeSelect)}>
        <h3>Off</h3>
        <input type="radio" />
      </div>
      <div className={cls(styles.modeSelect)}>
        <h3>On</h3>
        <input type="radio" />
      </div>
      <div className={cls(styles.userMenuItem, styles.hover)}>
        <div className={cls(styles.circle)}>
          <i className="keyboard_icon"></i>
        </div>
        <div className={cls(styles.userMenu)}>
          <h4>Keyboard</h4>
          <div className="rArrow">
            <i className="right_icon"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayAndAccessibility;
