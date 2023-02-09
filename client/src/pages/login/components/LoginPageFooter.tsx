import { Link } from 'react-router-dom';
import styles from './styles/LoginPageFooter.module.css';
import { AiOutlinePlus } from 'react-icons/ai';

const LoginPageFooter = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.language}>
        <Link to="/">English(UK)</Link>
        <Link to="/">Français(FR)</Link>
        <Link to="/">العربية</Link>
        <Link to="/">ⵜⴰⵎⴰⵣⵉⵖⵜ</Link>
        <Link to="/">Español (España)</Link>
        <Link to="/">italiano</Link>
        <Link to="/">Deutsch</Link>
        <Link to="/">Português (Brasil)</Link>
        <Link to="/">हिन्दी</Link>
        <Link to="/">中文(简体)</Link>
        <Link to="/">日本語</Link>
        <Link to="/" className={styles.plus}>
          <AiOutlinePlus />
        </Link>
      </div>
      <div className="footer_splitter"></div>
      <div className={styles.language}>
        <Link to="/">Sign Up</Link>
        <Link to="/">Log in</Link>
        <Link to="/">Messenger</Link>
        <Link to="/">Facebook Lite</Link>
        <Link to="/">Watch</Link>
        <Link to="/">Places</Link>
        <Link to="/">Games</Link>
        <Link to="/">Marketplace</Link>
        <Link to="/">Facebook Pay</Link>
        <Link to="/">Oculus</Link>
        <Link to="/">Portal</Link>
        <Link to="/">Instagram</Link>
        <Link to="/">Bulletin</Link>
        <Link to="/">Local</Link>
        <Link to="/">Fundraisers</Link>
        <Link to="/">Services</Link>
        <Link to="/">Voting Information Centre</Link>
        <Link to="/">Groups</Link>
        <Link to="/">About</Link>
        <Link to="/">Create ad</Link>
        <Link to="/">Create Page</Link>
        <Link to="/">Developers</Link>
        <Link to="/">Careers</Link>
        <Link to="/">Privacy</Link>
        <Link to="/">Cookies</Link>
        <Link to="/">AdChoices</Link>
        <Link to="/">Terms</Link>
        <Link to="/">Help</Link>
      </div>
      <div>
        <Link to="/" style={{ fontSize: '12px', marginTop: '10px' }}>
          Meta © 2022
        </Link>
      </div>
    </footer>
  );
};

export default LoginPageFooter;
