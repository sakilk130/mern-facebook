import { Modal } from 'antd';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import axiosInstance from '../../config/axios';
import { IUser } from '../../interfaces/user';
import { AppState } from '../../redux/store';
import AddToYourPost from './components/add-to-your-post';
import EmojiSection from './components/emoji-section';
import ImagePreview from './components/image-preview';
import styles from './styles/create-post-modal.module.css';

interface ICreatePostModal {
  setShowModal: (showModal: boolean) => void;
  showModal: boolean;
}

const CreatePostModal = ({ setShowModal, showModal }: ICreatePostModal) => {
  const [text, setText] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { user } = useSelector((state: AppState) => state.user as IUser);

  const onCreatedPost = async () => {
    try {
      setLoading(true);
      const post = await axiosInstance.post('/post/create', {
        background,
        text,
        user: user.id,
      });
      setLoading(false);
      if (post) {
        setShowModal(false);
      } else {
        setError('Something went wrong');
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.error);
    }
  };

  return (
    <Modal
      title="Create Post"
      centered
      open={showModal}
      footer={null}
      onCancel={() => setShowModal(false)}
    >
      {error && <p className={styles.error}>{error}</p>}
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
            background={background}
            setBackground={setBackground}
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
        <button
          type="button"
          className={styles.postBtn}
          disabled={loading}
          onClick={onCreatedPost}
        >
          {loading ? <PulseLoader color="#fff" size={10} /> : 'Post'}
        </button>
      </div>
    </Modal>
  );
};

export default memo(CreatePostModal);
