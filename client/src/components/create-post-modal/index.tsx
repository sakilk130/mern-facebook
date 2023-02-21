import { memo, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import ReactModal from 'react-modal';
import { useSelector } from 'react-redux';
import { IUser } from '../../interfaces/user';
import { AppState } from '../../redux/store';
import AddToYourPost from './components/add-to-your-post';
import EmojiSection from './components/emoji-section';
import ImagePreview from './components/image-preview';
import styles from './styles/create-post-modal.module.css';

const modalStyles = {
  overlay: {
    borderRadius: '10px',
    border: 'none',
  },
  content: {
    borderRadius: '10px',
    maxHeight: '450px',
    maxWidth: '500px',
    border: 'none',
    boxShadow: '0 0 5px var(--shadow-1)',
    margin: 'auto',
  },
};

const CreatePostModal = () => {
  const [text, setText] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(true);
  const [images, setImages] = useState([]);
  const { user } = useSelector((state: AppState) => state.user as IUser);

  return (
    <ReactModal isOpen={true} style={modalStyles}>
      <header className={styles.modalHeader}>
        <div className={styles.headerText}>
          <h2>Create Post</h2>
        </div>
        <button type="button" className={styles.closeBtn}>
          <AiOutlineClose />
        </button>
      </header>
      <hr className={styles.hr} />
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
          />
        )}
        <AddToYourPost />
        <button className={styles.postBtn}>Post</button>
      </div>
    </ReactModal>
  );
};

export default memo(CreatePostModal);
