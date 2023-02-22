import EmojiPicker from 'emoji-picker-react';
import React, { memo, useEffect, useRef, useState } from 'react';
import styles from './styles/emoji-section.module.css';
import cls from 'classnames';
interface IEmojiSection {
  text: string;
  setText: (text: string) => void;
  firstName: string;
  type2?: boolean;
}

const EmojiSection = ({
  setText,
  text,
  firstName,
  type2 = false,
}: IEmojiSection) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [emojiPicker, setEmojiPicker] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<any>();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorPosition]);

  return (
    <div className={cls(type2 && styles.flex)}>
      <div className={styles.postInput}>
        <textarea
          ref={textRef}
          className={cls(type2 ? styles.textarea2 : styles.textarea)}
          placeholder={`What's on your mind, ${firstName}?`}
          name="post"
          id="post"
          cols={30}
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
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
        {!type2 && (
          <img
            className={styles.colorImage}
            src="../../../icons/colorful.png"
            alt="emoji"
          />
        )}
        <i
          className="emoji_icon_large"
          onClick={() => setEmojiPicker((picker) => !picker)}
        ></i>
      </div>
    </div>
  );
};

export default memo(EmojiSection);
