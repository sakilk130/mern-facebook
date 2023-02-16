import cls from 'classnames';
import { useSelector } from 'react-redux';
import { IUser } from '../../../../interfaces/user';
import { AppState } from '../../../../redux/store';
import { Feeling, LiveVideo, Photo } from '../../../../svg';
import styles from './styles/create-post.module.css';

const CreatePost = () => {
  const { user } = useSelector((state: AppState) => state.user as IUser);
  return (
    <div className={cls(styles.container)}>
      <div className={cls(styles.inputField)}>
        <img src={user.picture} alt="" />
        <div>What's on your mind, {user.firstName}</div>
      </div>
      <hr />
      <div className={cls(styles.postIcons)}>
        <div className={cls(styles.postIcon)}>
          <LiveVideo color="#f3425f" /> Live Video
        </div>
        <div className={cls(styles.postIcon)}>
          <Photo color="#4bbf67" /> Photo/Video
        </div>
        <div className={cls(styles.postIcon)}>
          <Feeling color="#f7b928" /> Feeling/Activity
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
