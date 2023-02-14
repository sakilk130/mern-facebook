import cls from 'classnames';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { homeLeft } from '../../../../data/home';
import { IUser } from '../../../../interfaces/user';
import { AppState } from '../../../../redux/store';
import LinkItem from './components/link-item';
import styles from './styles/home-left.module.css';

const HomeLeft = () => {
  const { user } = useSelector((state: AppState) => state.user as IUser);
  return (
    <div className={cls(styles.container)}>
      <Link to="/profile">
        <div className={cls(styles.profile)}>
          <img src={user.picture} alt="" />
          <p>{`${user.firstName} ${user.lastName}`}</p>
        </div>
      </Link>
      {homeLeft.slice(0, 8).map((link) => (
        <LinkItem
          key={link.text}
          img={link.img}
          text={link.text}
          notification={link?.notification}
        />
      ))}
    </div>
  );
};

export default HomeLeft;
