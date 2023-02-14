import cls from 'classnames';
import { useSelector } from 'react-redux';
import { IUser } from '../../../../interfaces/user';
import { AppState } from '../../../../redux/store';
import { Dots, NewRoom, Search } from '../../../../svg';
import Contact from './components/contact';
import styles from './styles/home-right.module.css';

const HomeRight = () => {
  const color = '#65676b';
  const { user } = useSelector((state: AppState) => state.user as IUser);

  return (
    <div className={cls(styles.container)}>
      <h4 className={cls(styles.sponsored)}>Sponsored</h4>
      <hr />
      <div className={cls(styles.contactHeader)}>
        <h4>Contacts</h4>
        <div className={cls(styles.contactHeaderRight)}>
          <div className={cls(styles.headerIcon)}>
            <NewRoom color={color} />
          </div>
          <div className={cls(styles.headerIcon)}>
            <Search color={color} />
          </div>
          <div className={cls(styles.headerIcon)}>
            <Dots color={color} />
          </div>
        </div>
      </div>
      <div className={cls(styles.contactWrap)}>
        <Contact user={user} />
      </div>
    </div>
  );
};

export default HomeRight;
