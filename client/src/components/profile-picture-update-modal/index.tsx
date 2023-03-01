import React, { useRef, useState } from 'react';
import cls from 'classnames';
import styles from './styles/profile-picture-update-modal.module.css';
import UpdateImageView from './components/update-image-view';

const ProfilePictureUpdateModal = ({ pRef }: any) => {
  const refInput = useRef<any>(null);
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const handleImage = (e: any) => {
    let file = e.target.files[0];
    if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/webp' &&
      file.type !== 'image/gif'
    ) {
      setError(`${file.name} format is not supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      setImage(event?.target.result);
    };
  };

  return (
    <>
      <input
        type="file"
        ref={refInput}
        hidden
        onChange={handleImage}
        accept="image/jpeg,image/png,image/webp,image/gif"
      />

      <div className={styles.update_picture_buttons}>
        <button
          className="light_blue_btn"
          onClick={() => refInput?.current?.click()}
          style={{
            color: 'var(--filter_blue)',
          }}
        >
          <i className="plus_icon filter_blue"></i>
          Upload photo
        </button>
        <button className="gray_btn">
          <i className="frame_icon"></i>
          Add frame
        </button>
      </div>
      {error && (
        <div className={cls(styles.postError, styles.comment_error)}>
          <div className={styles.postError_error}>{error}</div>
          <button className="blue_btn" onClick={() => setError('')}>
            Try again
          </button>
        </div>
      )}
      <div className={styles.old_pictures_wrap}></div>
      {image && (
        <UpdateImageView
          setImage={setImage}
          image={image}
          pRef={pRef}
          setError={setError}
        />
      )}
    </>
  );
};

export default ProfilePictureUpdateModal;
