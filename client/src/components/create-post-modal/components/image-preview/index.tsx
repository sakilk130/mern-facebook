import { useRef } from 'react';
import EmojiSection from '../emoji-section';
import styles from './styles/image-preview.module.css';
import cls from 'classnames';

interface IImagePreview {
  text: string;
  setText: (text: string) => void;
  firstName: string;
  images: any;
  setImages: (images: any) => void;
  setShowPreview: (showPreview: boolean) => void;
}
const ImagePreview = ({
  firstName,
  setText,
  text,
  images,
  setImages,
  setShowPreview,
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
        {images && images.length > 0 ? (
          <div
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <div className={styles.previewActions}>
              <div className={styles.editAndAddBtn}>
                <button type="button" className={styles.editBtn}>
                  <i className="edit_icon"></i>
                  Edit
                </button>
                <button
                  type="button"
                  className={styles.addPhotoBtn}
                  onClick={() => {
                    imageRef?.current?.click();
                  }}
                >
                  <i className="addPhoto_icon"></i>
                  Add Photos/Videos
                </button>
              </div>
              <div
                className={styles.exitBtn}
                onClick={() => {
                  setImages([]);
                }}
              >
                <i className="exit_icon"></i>
              </div>
            </div>
            <div
              className={cls(
                images.length === 1
                  ? styles.previewImages1
                  : styles.previewImages2,
              )}
            >
              {images.map((img: any, i: number) => (
                <img className={styles.image} src={img} key={i} alt="" />
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.images}>
            <div
              className={styles.exitBtn}
              onClick={() => setShowPreview(false)}
            >
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
