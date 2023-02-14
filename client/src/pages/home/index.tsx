import Header from '../../components/header';
import { HomeLeft, HomeRight } from '../../components/home';
import styles from './styles/home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <HomeLeft />
      <HomeRight />
    </div>
  );
};

export default Home;
