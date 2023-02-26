import { useRef } from 'react';
import { useSelector } from 'react-redux';
import useOutsideClick from '../../../../hooks/useOutsideClick';
import { IUser } from '../../../../interfaces/user';
import { AppState } from '../../../../redux/store';
import MenuItem from '../menu-item';
import styles from './styles/post-menu.module.css';

interface IPostMenuProps {
  setShowMenu: (showMenu: boolean) => void;
  imagesLength: number;
  userId: string | null;
}

const PostMenu = ({ setShowMenu, imagesLength, userId }: IPostMenuProps) => {
  const menu = useRef(null);
  useOutsideClick(menu, () => setShowMenu(false));

  const {
    user: { id },
  } = useSelector((state: AppState) => state.user as IUser);

  const user = id === userId;

  return (
    <div className={styles.container} ref={menu}>
      {user && <MenuItem icon="pin_icon" title="Pin Post" />}
      <MenuItem
        icon="save_icon"
        title="Save Post"
        subtitle="Add this to your saved items."
      />
      {user && <MenuItem icon="edit_icon" title="Edit Post" />}
      {!user && (
        <MenuItem
          icon="turnOnNotification_icon"
          title="Turn on notifications for this post"
        />
      )}
      {imagesLength && <MenuItem icon="download_icon" title="Download" />}
      {imagesLength && (
        <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
      )}
      {user && <MenuItem img="../../../icons/lock.png" title="Edit audience" />}
      {user && (
        <MenuItem
          icon="turnOffNotifications_icon"
          title="Turn off notifications for this post"
        />
      )}
      {user && <MenuItem icon="delete_icon" title="Turn off translations" />}
      {user && <MenuItem icon="date_icon" title="Edit Date" />}
      {user && (
        <MenuItem icon="refresh_icon" title="Refresh share attachment" />
      )}
      {user && <MenuItem icon="archive_icon" title="Move to archive" />}
      {user && (
        <MenuItem
          icon="trash_icon"
          title="Move to trash"
          subtitle="items in your trash are deleted after 30 days"
        />
      )}
      {!user && <div className="line"></div>}
      {!user && (
        <MenuItem
          img="../../../icons/report.png"
          title="Report post"
          subtitle="i'm concerned about this post"
        />
      )}
    </div>
  );
};

export default PostMenu;
