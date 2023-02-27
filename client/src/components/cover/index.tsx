import { useRef, useState } from 'react';
import styles from './styles/cover.module.css';
import useOutsideClick from '../../hooks/useOutsideClick';
interface IProps {
  cover: string | null;
  visitor: boolean;
}

const Cover = ({ cover, visitor }: IProps) => {
  const [showCoverMneu, setShowCoverMenu] = useState(false);
  const menuRef = useRef(null);
  useOutsideClick(menuRef, () => {
    setShowCoverMenu(false);
  });

  return (
    <div className={styles.container}>
      {cover && <img src={cover} alt="cover" />}
      {!visitor && (
        <div className={styles.updateCoverWrapper} ref={menuRef}>
          <div
            className={styles.addCover}
            onClick={() => setShowCoverMenu((prev) => !prev)}
          >
            <i className="camera_filled_icon"></i>
            Add Cover Photo
          </div>
          {showCoverMneu && (
            <div className={styles.openCoverMenu}>
              <div className={styles.openCoverMenuItem}>
                <i className="photo_icon"></i>
                Select Photo
              </div>
              <div className={styles.openCoverMenuItem}>
                <i className="upload_icon"></i>
                Uplaod Photo
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cover;
