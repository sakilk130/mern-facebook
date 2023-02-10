import cls from 'classnames';
import { useRef, useState } from 'react';
import Header from '../../components/header';
import useOutsideClick from '../../hooks/useOutsideClick';
import styles from './styles/home.module.css';

const Home = () => {
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<any>(null);
  useOutsideClick(cardRef, () => setVisible(false));

  return (
    <div className={styles.container}>
      <Header setVisible={setVisible} />
      {visible && <div className={cls(styles.card)} ref={cardRef}></div>}
    </div>
  );
};

export default Home;
