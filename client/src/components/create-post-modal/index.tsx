import cls from 'classnames';
import EmojiPicker from 'emoji-picker-react';
import { memo, useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import ReactModal from 'react-modal';
import { useSelector } from 'react-redux';
import { IUser } from '../../interfaces/user';
import { AppState } from '../../redux/store';
import styles from './styles/create-post-modal.module.css';

const modalStyles = {
  overlay: {
    borderRadius: '10px',
    border: 'none',
  },
  content: {
    borderRadius: '10px',
    maxHeight: '400px',
    maxWidth: '500px',
    border: 'none',
    boxShadow: '0 0 5px var(--shadow-1)',
    margin: 'auto',
  },
};

const CreatePostModal = () => {
  const textRef = useRef<HTMLTextAreaElement>(null);

  const [cursorPosition, setCursorPosition] = useState<any>();
  const [text, setText] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [emojiPicker, setEmojiPicker] = useState<boolean>(false);

  const { user } = useSelector((state: AppState) => state.user as IUser);

  const handleEmojiClick = ({ emoji }: any) => {
    const ref = textRef.current;
    ref?.focus();
    const start = text.substring(0, ref?.selectionStart);
    const end = text.substring(ref?.selectionStart!);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  useEffect(() => {
    if (textRef?.current) {
      textRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition]);

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
          <div className={styles.emojiPicker}>
            {emojiPicker && (
              <div className={styles.emojiPickerView}>
                <EmojiPicker
                  height={'300px'}
                  lazyLoadEmojis
                  searchDisabled
                  skinTonesDisabled
                  autoFocusSearch={false}
                  previewConfig={{
                    showPreview: false,
                  }}
                  onEmojiClick={handleEmojiClick}
                />
              </div>
            )}
            <img
              className={styles.colorImage}
              src="../../../icons/colorful.png"
              alt="emoji"
            />
            <i
              className="emoji_icon_large"
              onClick={() => setEmojiPicker((picker) => !picker)}
            ></i>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default memo(CreatePostModal);
