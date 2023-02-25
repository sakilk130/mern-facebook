import cls from 'classnames';
import moment from 'moment';
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { MdPublic } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IPost } from '../../interfaces/post';
import ReactPopup from './components';
import styles from './styles/post.module.css';

interface IPostProps {
  post: IPost;
}

const Post = ({ post }: IPostProps) => {
  const [showReactPopup, setShowReactPopup] = useState(false);

  return (
    <div className={cls(styles.container)}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link
            to={`/profile/${
              typeof post.user === 'object' ? post.user.userName : ''
            }`}
          >
            <img
              className={cls(styles.avatar)}
              src={typeof post.user === 'object' ? post.user.picture : ''}
              alt="profile"
            />
          </Link>
          <div className={styles.headerInfo}>
            <Link
              to={`/profile/${
                typeof post.user === 'object' ? post.user.userName : ''
              }`}
            >
              <span className={styles.headerName}>
                {typeof post.user === 'object'
                  ? `${post.user.firstName} ${post.user.lastName}`
                  : ''}
              </span>
            </Link>
            <div className={styles.timeAndPublic}>
              <span className={styles.headerTime}>
                {moment(post.createdAt).fromNow()}
              </span>
              <span className={styles.headerDot}>
                <MdPublic />
              </span>
            </div>
          </div>
        </div>
        <div className={styles.headerRight}>
          <BsThreeDots />
        </div>
      </div>
      <div className={styles.body}>
        {post.background ? (
          <div
            className={styles.backgroundImage}
            style={{
              backgroundImage: `url(${post.background})`,
            }}
          >
            <div className={styles.bodyText}>{post.text}</div>
          </div>
        ) : (
          <>
            <div className={styles.text}>{post.text}</div>
            {post.images && post.images.length ? (
              <div
                className={cls(
                  post.images.length === 1
                    ? styles.grid_1
                    : post.images.length === 2
                    ? styles.grid_2
                    : post.images.length === 3
                    ? styles.grid_3
                    : post.images.length === 4
                    ? styles.grid_4
                    : post.images.length >= 5 && styles.grid_5,
                )}
              >
                {post.images.slice(0, 5).map((image, i) => (
                  <img
                    src={image}
                    key={image}
                    alt=""
                    className={styles[`img${i}`]}
                  />
                ))}
                {post.images.length > 5 && (
                  <div className={styles.more_pics_shadow}>
                    +{post.images.length - 5}
                  </div>
                )}
              </div>
            ) : null}
          </>
        )}
      </div>
      <div className={styles.footer}>
        <div className={styles.likeAndShare}>
          <div className={styles.footerLeft}></div>
          <div className={styles.footerRight}>
            <span>13 comments</span> <span>13 shares</span>
          </div>
        </div>
        <ReactPopup
          setShowReactPopup={setShowReactPopup}
          showReactPopup={showReactPopup}
        />
        <hr className={styles.hr} />
        <div className={styles.footerIcons}>
          <div
            className={styles.icon}
            onMouseOver={() => {
              setTimeout(() => {
                setShowReactPopup(true);
              }, 500);
            }}
            onMouseLeave={() => {
              setTimeout(() => {
                setShowReactPopup(false);
              }, 500);
            }}
          >
            <i className="like_icon"></i>
            <span>Like</span>
          </div>
          <div className={styles.icon}>
            <i className="comment_icon"></i>
            <span>Comment</span>
          </div>
          <div className={styles.icon}>
            <i className="share_icon"></i>
            <span>Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
