import cls from 'classnames';
import { memo, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import ReactModal from 'react-modal';
import { useSelector } from 'react-redux';
import { IUser } from '../../interfaces/user';
import { AppState } from '../../redux/store';
import AddToYourPost from './components/add-to-your-post';
import EmojiSection from './components/emoji-section';
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
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const { user } = useSelector((state: AppState) => state.user as IUser);

  return (
    <ReactModal isOpen={true} style={modalStyles}>
      <div className={cls(styles.container)}>
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
          {!showPreview && (
            <div className={styles.postInput}>
              <textarea
                ref={textRef}
                className={styles.textarea}
                placeholder={`What's on your mind, ${user.firstName}?`}
                name="post"
                id="post"
                cols={30}
                rows={10}
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
          )}
          <EmojiSection setText={setText} text={text} textRef={textRef} />
          <AddToYourPost />
          <button className={styles.postBtn}>Post</button>
        </div>
      </div>
    </ReactModal>
  );
};

export default memo(CreatePostModal);
