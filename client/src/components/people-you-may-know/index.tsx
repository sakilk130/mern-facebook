import React from 'react';
import { stories } from '../../data/home';
import { Dots } from '../../svg';
import AddFriendSmallCard from '../add-friend-small-card';
import styles from './styles/people-you-may-know.module.css';

const PeopleYouMayKnow = () => {
  return (
    <div className={styles.pplumayknow}>
      <div className={styles.pplumayknow_header}>
        People You May Know
        <div
          className={`${styles.post_header_right} ${styles.ppl_circle} hover1`}
        >
          <Dots />
        </div>
      </div>
      <div className={styles.pplumayknow_list}>
        {stories.map((item) => (
          <AddFriendSmallCard key={item.profile_name} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PeopleYouMayKnow;
