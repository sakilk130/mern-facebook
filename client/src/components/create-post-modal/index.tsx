import { Modal } from 'antd';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { IUser } from '../../interfaces/user';
import { AppState } from '../../redux/store';
import AddToYourPost from './components/add-to-your-post';
import EmojiSection from './components/emoji-section';
import ImagePreview from './components/image-preview';
import styles from './styles/create-post-modal.module.css';

const CreatePostModal = () => {
  const [text, setText] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [images, setImages] = useState([]);
  const { user } = useSelector((state: AppState) => state.user as IUser);

  return (
    <Modal title="Create Post" centered open={true} footer={null}>
      <div className={styles.modalBody}>
        <div className={styles.profileInfo}>
          <img
            className={styles.profileImage}
            src={user?.picture}
            alt="profile"
          />
          <div>
            <h3>{user.firstName}</h3>
            <div className={styles.publicIconWrap}>
              <img src="../../../icons/public.png" alt="emoji" />
              Public
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>
        {!showPreview ? (
          <EmojiSection
            setText={setText}
            text={text}
            firstName={user.firstName}
          />
        ) : (
          <ImagePreview
            setText={setText}
            text={text}
            firstName={user.firstName}
            images={images}
            setImages={setImages}
            setShowPreview={setShowPreview}
          />
        )}
        <AddToYourPost setShowPreview={setShowPreview} />
        <button className={styles.postBtn}>Post</button>
      </div>
    </Modal>
  );
};

export default memo(CreatePostModal);
