import cls from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { homeLeft } from '../../../../data/home';
import { IUser } from '../../../../interfaces/user';
import { AppState } from '../../../../redux/store';
import { ArrowDown1 } from '../../../../svg';
import LinkItem from './components/link-item';
import styles from './styles/home-left.module.css';

const HomeLeft = () => {
  const [visible, setVisible] = useState(false);

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
      {!visible && (
        <div className={cls(styles.profile)} onClick={() => setVisible(true)}>
          <div className={cls(styles.arrow)}>
            <ArrowDown1 />
          </div>
          <p>See More</p>
        </div>
      )}
      {visible && (
        <>
          {homeLeft.slice(8, homeLeft.length).map((link) => (
            <LinkItem
              key={link.text}
              img={link.img}
              text={link.text}
              notification={link?.notification}
            />
          ))}
          <div
            className={cls(styles.profile)}
            onClick={() => setVisible(false)}
          >
            <div className={cls(styles.arrow, styles.rotate180)}>
              <ArrowDown1 />
            </div>
            <p>See Less</p>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeLeft;
