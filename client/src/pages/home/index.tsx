import Header from '../../components/header';
import { HomeLeft } from '../../components/home';
import styles from './styles/home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <HomeLeft />
    </div>
  );
};

export default Home;
