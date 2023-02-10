import cls from 'classnames';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IUser } from '../../interfaces/user';
import { AppState } from '../../redux/store';
import {
  ArrowDown,
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from '../../svg';
import styles from './styles/header.module.css';

interface IHeader {
  setVisible: (value: boolean) => void;
}

const Header = ({ setVisible }: IHeader) => {
  const { user } = useSelector((state: AppState) => state.user as IUser);
  const color = '#65676b';
  const handleSearch = () => {
    setVisible(true);
  };

  return (
    <header>
      <div className={styles.headerLeft}>
        <Link to="/">
          <Logo />
        </Link>
        <div className={styles.search} onClick={handleSearch}>
          <Search color={color} />
          <input type="text" placeholder="Search Facebook" />
        </div>
      </div>
      <div className={styles.headerMiddle}>
        <Link to="/" className={cls(styles.middleIcon, styles.active)}>
          <HomeActive />
        </Link>
        <Link to="/" className={cls(styles.middleIcon)}>
          <Friends color={color} />
        </Link>
        <Link to="/" className={cls(styles.middleIcon, styles.watch)}>
          <Watch color={color} />
          <div className={cls(styles.watchNotification)}>9+</div>
        </Link>
        <Link to="/" className={cls(styles.middleIcon)}>
          <Market color={color} />
        </Link>
        <Link to="/" className={cls(styles.middleIcon)}>
          <Gaming color={color} />
        </Link>
      </div>
      <div className={styles.headerRight}>
        <Link to="/profile" className={cls(styles.profile)}>
          <img src={user.picture} alt="" className={cls(styles.image)} />
          <span>{user?.firstName}</span>
        </Link>
        <div className={cls(styles.headerRightIcon)}>
          <Menu />
        </div>
        <div className={cls(styles.headerRightIcon)}>
          <Messenger />
        </div>
        <div className={cls(styles.headerRightIcon, styles.notification)}>
          <Notifications />
          <div className={cls(styles.notificationCount)}>5</div>
        </div>
        <div className={cls(styles.headerRightIcon)}>
          <ArrowDown color={color} />
        </div>
      </div>
    </header>
  );
};

export default Header;
