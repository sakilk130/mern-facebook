import { useRef } from 'react';
import EmojiSection from '../emoji-section';
import styles from './styles/image-preview.module.css';

interface IImagePreview {
  text: string;
  setText: (text: string) => void;
  firstName: string;
  images: any;
  setImages: (images: any) => void;
}
const ImagePreview = ({
  firstName,
  setText,
  text,
  images,
  setImages,
}: IImagePreview) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: any) => {
    const files = Array.from(e.target.files);
    files.forEach((file: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (event) => {
        setImages((prev: any) => [...prev, event.target?.result]);
      };
    });
  };

  return (
    <div className={styles.container}>
      <EmojiSection
        firstName={firstName}
        setText={setText}
        text={text}
        type2={true}
      />
      <div className={styles.imagesWrap}>
        <input
          type="file"
          multiple
          hidden
          ref={imageRef}
          onChange={handleChange}
        />
        {images && images.length > 0 ? null : (
          <div className={styles.images}>
            <div className={styles.exitBtn}>
              <i className="exit_icon"></i>
            </div>
            <div
              className={styles.addPhoto}
              onClick={() => {
                imageRef?.current?.click();
              }}
            >
              <div className={styles.addPhotoWrap}>
                <i className="addPhoto_icon"></i>
              </div>
              <span>Add Photos/Videos</span>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
      </div>
      <div className={styles.imagesWrap2}>
        <div className={styles.iconWithText}>
          <i className="phone_icon"></i>
          <div className="mobile_text">Add phots from your mobile device.</div>
        </div>
        <span className={styles.addWithPhoneBtn}>Add</span>
      </div>
    </div>
  );
};

export default ImagePreview;
