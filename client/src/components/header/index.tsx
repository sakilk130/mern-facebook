import cls from 'classnames';
import { Link } from 'react-router-dom';
import {
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Search,
  Watch,
} from '../../svg';
import styles from './styles/header.module.css';

const Header = () => {
  const color = '#65676b';
  return (
    <header>
      <div className={styles.headerLeft}>
        <Link to="/">
          <Logo />
        </Link>
        <div className={styles.search}>
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
      <div className={styles.headerLeft}></div>
    </header>
  );
};

export default Header;
