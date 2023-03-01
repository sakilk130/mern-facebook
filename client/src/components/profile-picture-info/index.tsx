import { Modal } from 'antd';
import { memo, useRef, useState } from 'react';
import ProfilePictureUpdateModal from '../profile-picture-update-modal';
import styles from './styles/profile-picture-info.module.css';
interface IProfilePictureInfo {
  profile: any | null;
  visitor: boolean;
}
const ProfilePictureInfo = ({ profile, visitor }: IProfilePictureInfo) => {
  const [showModal, setShowModal] = useState<boolean>(true);
  const pRef = useRef(null);
  return (
    <>
      <Modal
        title="Upload Profile Picture"
        centered
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <ProfilePictureUpdateModal pRef={pRef} />
      </Modal>
      {profile && (
        <div className={styles.profile_img_wrap}>
          <div className={styles.profile_w_left}>
            <div className={styles.profile_w_img}>
              <div
                className={styles.profile_w_bg}
                style={{
                  backgroundSize: 'cover',
                  backgroundImage: `url(${profile.picture})`,
                }}
              ></div>
              {!visitor && (
                <div className={styles.profile_circle}>
                  <i className="camera_filled_icon"></i>
                </div>
              )}
            </div>
            <div className={styles.profile_w_col}>
              <div className={styles.profile_name}>
                {profile.firstName} {profile.lastName}
                <div className={styles.othername}>( Othername )</div>
              </div>
              <div className={styles.profile_friend_count}></div>
              <div className={styles.profile_friend_imgs}></div>
            </div>
          </div>
          {!visitor && (
            <div className={styles.profile_w_right}>
              <div className="blue_btn">
                <img
                  src="../../../icons/plus.png"
                  alt=""
                  className={styles.invert}
                />
                <span>Add to story</span>
              </div>
              <div className="gray_btn">
                <i className="edit_icon"></i>
                <span>Edit profile</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

function areEqual(prevProps: any, nextProps: any) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

export default memo(ProfilePictureInfo, areEqual);
