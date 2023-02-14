import cls from 'classnames';
import styles from './styles/contact.module.css';

interface ContactProps {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    verified: boolean;
    picture: string;
  };
}

const Contact = ({ user }: ContactProps) => {
  return (
    <div className={cls(styles.container)}>
      <img src={user.picture} alt="" />
      <p>
        {user.firstName} {user.lastName}
      </p>
    </div>
  );
};

export default Contact;
