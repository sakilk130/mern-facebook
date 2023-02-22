import { Modal } from 'antd';
import cls from 'classnames';
import { useEffect, useState } from 'react';
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
      <Modal centered open={activationModal} closable={false} footer={null}>
        <ActivationModal
          onClose={handleClose}
          token={activeToken ? (activeToken === token ? activeToken : '') : ''}
        />
      </Modal>
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
