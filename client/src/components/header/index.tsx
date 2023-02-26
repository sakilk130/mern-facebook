import cls from 'classnames';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useOutsideClick from '../../hooks/useOutsideClick';
import { IUser } from '../../interfaces/user';
import { AppState } from '../../redux/store';
import {
  ArrowDown,
  Friends,
  Gaming,
  Home,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from '../../svg';
import AllMenu from './components/all-menu';
import SearchMenu from './components/search-menu';
import UserMenu from './components/user-menu';
import styles from './styles/header.module.css';

interface IHeader {
  page?: string;
}

const Header = ({ page }: IHeader) => {
  const allMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const color = '#65676b';
  const { user } = useSelector((state: AppState) => state.user as IUser);

  const handleSearchMenu = () => {
    setShowSearchMenu(true);
  };
  const toggleAllMenu = () => {
    setShowAllMenu((prev) => !prev);
  };
  useOutsideClick(allMenuRef, () => {
    setShowAllMenu(false);
  });
  useOutsideClick(userMenuRef, () => {
    setShowUserMenu(false);
  });

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Link to="/">
          <Logo />
        </Link>
        <div className={styles.search} onClick={handleSearchMenu}>
          <Search color={color} />
          <input type="text" placeholder="Search Facebook" />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}
      <div className={styles.headerMiddle}>
        <Link
          to="/"
          className={cls(
            styles.middleIcon,
            page === 'home' && styles.active,
            styles.homeIcon,
          )}
        >
          {page === 'home' ? <HomeActive /> : <Home color={color} />}
        </Link>
        <Link to="/" className={cls(styles.middleIcon)}>
          <Friends color={color} />
        </Link>
        <Link
          to="/"
          className={cls(styles.middleIcon, styles.watch, styles.videoIcon)}
        >
          <Watch color={color} />
          <div className={cls(styles.watchNotification)}>9+</div>
        </Link>
        <Link to="/" className={cls(styles.middleIcon, styles.marketIcon)}>
          <Market color={color} />
        </Link>
        <Link to="/" className={cls(styles.middleIcon, styles.gamingIcon)}>
          <Gaming color={color} />
        </Link>
      </div>
      <div className={styles.headerRight}>
        <Link
          to="/profile"
          className={cls(
            styles.profile,
            page === 'profile' && styles.activeProfile,
          )}
        >
          <img src={user.picture} alt="" className={cls(styles.image)} />
          <span>{user?.firstName}</span>
        </Link>
        <div
          className={cls(styles.headerRightIcon, styles.allMenuIcon)}
          ref={allMenuRef}
        >
          <div
            className={cls(showAllMenu ? styles.activeMenu : '')}
            onClick={toggleAllMenu}
          >
            <Menu />
          </div>
          {showAllMenu && <AllMenu />}
        </div>
        <div className={cls(styles.headerRightIcon, styles.messengerIcon)}>
          <Messenger />
        </div>
        <div className={cls(styles.headerRightIcon, styles.notification)}>
          <Notifications />
          <div className={cls(styles.notificationCount)}>5</div>
        </div>
        <div className={cls(styles.headerRightIcon)} ref={userMenuRef}>
          <div
            className={cls(
              styles.menuWrap,
              showUserMenu ? styles.activeMenu : '',
            )}
            onClick={() => setShowUserMenu((prev) => !prev)}
          >
            <ArrowDown color={color} />
          </div>
          {showUserMenu && <UserMenu />}
        </div>
      </div>
    </header>
  );
};

export default Header;
