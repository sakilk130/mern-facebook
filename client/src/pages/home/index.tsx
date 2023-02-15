import cls from 'classnames';
import Header from '../../components/header';
import { HomeLeft, HomeRight } from '../../components/home';
import Stories from '../../components/home/components/stories';
import styles from './styles/home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <HomeLeft />
      <div className={cls(styles.middle)}>
        <Stories />
      </div>
      <HomeRight />
    </div>
  );
};

export default Home;
