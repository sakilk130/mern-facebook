import cls from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { homeLeft } from '../../../../data/home';
import { IUser } from '../../../../interfaces/user';
import { AppState } from '../../../../redux/store';
import { ArrowDown1 } from '../../../../svg';
import LinkItem from './components/link-item';
import Shortcut from './components/shortcut';
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
      <hr />

      <div className={cls(styles.shortcutHeader)}>
        <p>Your Shortcuts</p>
        <div className={cls(styles.editBtn)}>Edit</div>
      </div>
      <div className={cls(styles.shortcutList)}>
        <Shortcut
          link="https://www.youtube.com/c/MohamedHaJJi1/featured"
          img="../../images/ytb.png"
          name="My Youtube channel"
        />

        <Shortcut
          link="https://www.instagram.com/med_hajji7/"
          img="../../images/insta.png"
          name="My Instagram "
        />
      </div>
      <footer className={cls(styles.footer)}>
        <Link to="/">Privacy </Link>
        <span>. </span>
        <Link to="/">Terms </Link>
        <span>. </span>
        <Link to="/">Advertising </Link>
        <span>. </span>
        <Link to="/">
          Ad Choices <i className="ad_choices_icon"></i>
        </Link>
        <span>. </span>
        <Link to="/"></Link>Cookies <span>. </span>
        <Link to="/">More </Link>
        <span>. </span> <br />
        Meta © 2022
      </footer>
    </div>
  );
};

export default HomeLeft;
