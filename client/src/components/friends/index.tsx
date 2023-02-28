import styles from './styles/friends.module.css';

interface IFriends {
  friends: any;
}

const Friends = ({ friends }: IFriends) => {
  return (
    <div className={styles.profile_card}>
      <div className={styles.profile_card_header}>
        Friends
        <div className={styles.profile_header_link}>See all friends</div>
      </div>
      {friends && (
        <div className={styles.profile_card_count}>
          {friends.length === 0
            ? ''
            : friends.length === 1
            ? '1 Photo'
            : `${friends.length} photos`}
        </div>
      )}
      <div className={styles.profile_card_grid}>
        {friends &&
          friends
            .slice(0, 9)
            .map((friend: any) => (
              <div className={styles.profile_photo_card}></div>
            ))}
      </div>
    </div>
  );
};

export default Friends;
