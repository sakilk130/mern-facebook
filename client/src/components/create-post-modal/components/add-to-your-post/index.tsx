import React, { memo } from 'react';
import { Dots, Feeling, Photo } from '../../../../svg';
import styles from './styles/add-to-your-post.module.css';

const AddToYourPost = () => {
  return (
    <div className={styles.container}>
      <h4>Add to your post</h4>
      <div className={styles.addPosts}>
        <div className={styles.addPost}>
          <Photo color="#45bd62" />
        </div>
        <div className={styles.addPost}>
          <i className="tag_icon"></i>
        </div>
        <div className={styles.addPost}>
          <Feeling color="#f7b928" />
        </div>
        <div className={styles.addPost}>
          <i className="maps_icon"></i>
        </div>
        <div className={styles.addPost}>
          <i className="microphone_icon"></i>
        </div>
        <div className={styles.addPost}>
          <Dots color="#65676b" />
        </div>
      </div>
    </div>
  );
};

export default memo(AddToYourPost);
