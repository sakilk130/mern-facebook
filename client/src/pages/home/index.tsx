import cls from 'classnames';
import Header from '../../components/header';
import {
  CreatePost,
  HomeLeft,
  HomeRight,
  Stories,
} from '../../components/home';
import styles from './styles/home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
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
