import React, { useEffect, useRef, useState } from 'react';
import styles from './styles/create-comment.module.css';
import Picker from 'emoji-picker-react';

interface ICreateCommentProps {
  user: {
    picture: string;
  };
}

const CreateComment = ({ user }: ICreateCommentProps) => {
  const [picker, setPicker] = useState(false);
  const [text, setText] = useState('');
  const [commentImage, setCommentImage] = useState('');
  const [cursorPosition, setCursorPosition] = useState();
  const textRef = useRef<any>(null);
  const imgInput = useRef<any>(null);

  const handleEmojiClick = ({ emoji }: any) => {
    const ref = textRef.current;
    ref?.focus();
    const start = text.substring(0, ref?.selectionStart);
    const end = text.substring(ref?.selectionStart!);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCommentImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (textRef?.current) {
      textRef.current.selectionEnd = cursorPosition;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorPosition]);

  return (
    <div className={styles.container}>
      {picker && (
        <div className={styles.emojiPickerView}>
          <Picker
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
      <div className={styles.createWrap}>
        <img className={styles.image} src={user.picture} alt="profile" />
        <input
          type="file"
          hidden
          ref={imgInput}
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleImage}
        />
        <div className={styles.inputWrap}>
          <input
            type="text"
            placeholder="Write a comment..."
            ref={textRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className={styles.icons}>
            <div className={styles.icon} onClick={() => setPicker(!picker)}>
              <i className="emoji_icon"></i>
            </div>
            <div
              className={styles.icon}
              onClick={() => imgInput.current.click()}
            >
              <i className="camera_icon"></i>
            </div>
            <div className={styles.icon}>
              <i className="gif_icon"></i>
            </div>
            <div className={styles.icon}>
              <i className="sticker_icon"></i>
            </div>
          </div>
        </div>
      </div>
      {commentImage && (
        <div className={styles.commentImageWrap}>
          <img
            className={styles.commentImage}
            src={commentImage}
            alt="comment"
          />
          <div
            className={styles.commentImageClose}
            onClick={() => setCommentImage('')}
          >
            <i className="exit_icon"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateComment;
