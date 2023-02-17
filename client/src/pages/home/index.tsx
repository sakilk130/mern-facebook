import cls from 'classnames';
import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useSelector } from 'react-redux';
import ActivationModal from '../../components/activation-modal';
import Header from '../../components/header';
import {
  CreatePost,
  HomeLeft,
  HomeRight,
  Stories,
} from '../../components/home';
import { IUser } from '../../interfaces/user';
import { AppState } from '../../redux/store';
import styles from './styles/home.module.css';

const Home = () => {
  const params = new URLSearchParams(window.location.search);
  const activeToken = params.get('token');
  const [activationModal, setActivationModal] = useState(false);
  const { user, token } = useSelector((state: AppState) => state.user as IUser);

  const handleShow = () => {
    setActivationModal(true);
    document.body.style.overflow = 'hidden';
  };
  const handleClose = () => {
    setActivationModal(false);
    document.body.style.overflow = 'unset';
  };
  const modalStyles = {
    overlay: {
      borderRadius: '10px',
      border: 'none',
      zIndex: 1,
    },
    content: {
      borderRadius: '10px',
      maxHeight: activeToken === token ? '215px' : '115px',
      maxWidth: '350px',
      border: 'none',
      boxShadow: '0 0 5px var(--shadow-1)',
      margin: 'auto',
    },
  };

  useEffect(() => {
    if (!user.verified) {
      handleShow();
    }
    return () => {
      handleClose();
    };
  }, [user.verified, token]);

  return (
    <div className={styles.container}>
      <ReactModal isOpen={activationModal} style={modalStyles}>
        <ActivationModal
          onClose={handleClose}
          token={activeToken ? (activeToken === token ? activeToken : '') : ''}
        />
      </ReactModal>
      <Header />
      <HomeLeft />
      <div className={cls(styles.middle)}>
        <Stories />
        <CreatePost />
      </div>
      <HomeRight />
    </div>
  );
};

export default Home;
