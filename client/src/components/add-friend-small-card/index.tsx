import styles from './styles/add-friend-small-card.module.css';

interface IAddFriendSmallCard {
  item: {
    profile_picture: string;
    profile_name: string;
    image: string;
  };
}

const AddFriendSmallCard = ({ item }: IAddFriendSmallCard) => {
  return (
    <div className={styles.addfriendCard}>
      <div className={styles.addfriend_imgsmall}>
        <img src={item.profile_picture} alt="" />
        <div className={styles.addfriend_infos}>
          <div className={styles.addfriend_name}>
            {item.profile_name.length > 11
              ? `${item.profile_name.substring(0, 11)}...`
              : item.profile_name}
          </div>
          <div className={styles.light_blue_btn}>
            <img
              src="../../../icons/addFriend.png"
              alt=""
              className="filter_blue"
            />
            Add Friend
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFriendSmallCard;
