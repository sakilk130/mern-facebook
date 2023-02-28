import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cover from '../../components/cover';
import Friends from '../../components/friends';
import GridPosts from '../../components/grid-posts';
import Header from '../../components/header';
import { CreatePost } from '../../components/home';
import PeopleYouMayKnow from '../../components/people-you-may-know';
import Photos from '../../components/photos';
import Post from '../../components/post';
import ProfileMenu from '../../components/profile-menu';
import ProfilePictureInfo from '../../components/profile-picture-info';
import axiosInstance from '../../config/axios';
import { IUser } from '../../interfaces/user';
import { AppState } from '../../redux/store';
import styles from './styles/profile.module.css';

interface IProfile {
  setShowModal: (value: boolean) => void;
}
const Profile = ({ setShowModal }: IProfile) => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { user } = useSelector((state: AppState) => state.user as IUser);
  const userName = username === undefined ? user.userName : username;
  var visitor = userName === user.userName ? false : true;

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(
          `/user/get-profile/${userName}`,
        );
        setProfile(data?.data);
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
          <Cover cover={profile?.cover ?? null} visitor={visitor} />
          <ProfilePictureInfo profile={profile} visitor={visitor} />
          <ProfileMenu />
        </div>
      </div>
      <div className={styles.profile_bottom}>
        <div className={styles.profileContainer}>
          <div className={styles.bottom_container}>
            <PeopleYouMayKnow />
            <div className={styles.profile_grid}>
              <div className={styles.profile_left}>
                <Photos userName={userName} />
                <Friends friends={profile?.friends} />
                <div className={styles.relative_fb_copyright}>
                  <Link to="/">Privacy </Link>
                  <span>. </span>
                  <Link to="/">Terms </Link>
                  <span>. </span>
                  <Link to="/">Advertising </Link>
                  <span>. </span>
                  <Link to="/">
                    Ad Choices <i className="ad_choices_icon"></i>{' '}
                  </Link>
                  <span>. </span>
                  <Link to="/"></Link>Cookies <span>. </span>
                  <Link to="/">More </Link>
                  <span>. </span> <br />
                  Meta © 2022
                </div>
              </div>
              <div className={styles.profile_right}>
                <CreatePost profile setShowModal={setShowModal} />
                <GridPosts />
                <div className={styles.posts}>
                  {profile?.posts && profile?.posts?.length ? (
                    profile.posts.map((post: any) => (
                      <Post post={post} user={user} key={post._id} />
                    ))
                  ) : (
                    <div className={styles.no_posts}>No posts available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
