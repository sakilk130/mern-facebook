import EmojiPicker from 'emoji-picker-react';
import React, { memo, useEffect, useState } from 'react';
import styles from './styles/emoji-section.module.css';

interface IEmojiSection {
  textRef: React.RefObject<HTMLTextAreaElement>;
  text: string;
  setText: (text: string) => void;
}

const EmojiSection = ({ setText, text, textRef }: IEmojiSection) => {
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
  );
};

export default memo(EmojiSection);
