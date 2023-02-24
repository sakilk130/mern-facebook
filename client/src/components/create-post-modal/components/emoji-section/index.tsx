import EmojiPicker from 'emoji-picker-react';
import React, { memo, useEffect, useRef, useState } from 'react';
import styles from './styles/emoji-section.module.css';
import cls from 'classnames';
interface IEmojiSection {
  text: string;
  setText: (text: string) => void;
  firstName: string;
  type2?: boolean;
  background?: string;
  setBackground?: (background: string) => void;
}

const EmojiSection = ({
  setText,
  text,
  firstName,
  background,
  setBackground,
  type2 = false,
}: IEmojiSection) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const bgRef = useRef<any>(null);

  const [emojiPicker, setEmojiPicker] = useState<boolean>(false);
  const [showBgs, setShowBgs] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<any>();
  const postBackgrounds = [
    '../../../images/postBackgrounds/1.jpg',
    '../../../images/postBackgrounds/2.jpg',
    '../../../images/postBackgrounds/3.jpg',
    '../../../images/postBackgrounds/4.jpg',
    '../../../images/postBackgrounds/5.jpg',
    '../../../images/postBackgrounds/6.jpg',
    '../../../images/postBackgrounds/7.jpg',
    '../../../images/postBackgrounds/8.jpg',
    '../../../images/postBackgrounds/9.jpg',
  ];

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

  const backgroundHanlder = (index: number) => {
    const bg = postBackgrounds[index];
    if (bgRef?.current) {
      bgRef.current.style.backgroundImage = `url(${bg})`;
      bgRef.current.classList.add(styles.backgroundHandler);
      setBackground && setBackground(bg);
    }
  };
  const removeBackground = () => {
    if (bgRef?.current) {
      bgRef.current.style.backgroundImage = `none`;
      bgRef.current.classList.remove(styles.backgroundHandler);
      setBackground && setBackground('');
    }
  };

  return (
    <div className={cls(type2 && styles.flex)}>
      <div className={cls(styles.postInput)} ref={bgRef}>
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
          style={{
            paddingTop: `${
              background && textRef?.current
                ? Math.abs(textRef?.current.value.length * 0.1 - 20)
                : '0'
            }%`,
          }}
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
            onClick={() => setShowBgs((bgs) => !bgs)}
          />
        )}
        {!type2 && showBgs && (
          <>
            <div
              className={styles.noBg}
              onClick={() => {
                removeBackground();
              }}
            ></div>
            {postBackgrounds.map((bg, index) => (
              <img
                key={bg}
                className={styles.backgroundImage}
                src={bg}
                alt="emoji"
                onClick={() => backgroundHanlder(index)}
              />
            ))}
          </>
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
