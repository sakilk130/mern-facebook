import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Cover from '../../components/cover';
import Header from '../../components/header';
import axiosInstance from '../../config/axios';
import { IUser } from '../../interfaces/user';
import { AppState } from '../../redux/store';
import styles from './styles/profile.module.css';

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [_, setLoading] = useState<boolean>(false);
  const [__, setError] = useState<string>('');

  const { user } = useSelector((state: AppState) => state.user as IUser);
  const userName = username === undefined ? user.userName : username;

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(
          `/user/get-profile/${userName}`,
        );
        setProfile(data.data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setError(
          error.response.data.error ??
            error.response.data.message ??
            'Something went wrong',
        );
        navigate('/profile');
      }
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <Header page="profile" />
      <div className={styles.profile}>
        <div className={styles.profileContainer}>
          <Cover cover={profile?.cover ?? null} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
