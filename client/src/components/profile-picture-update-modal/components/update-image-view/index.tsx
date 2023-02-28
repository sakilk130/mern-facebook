import React, { useState } from 'react';
import styles from './styles/update-image-view.module.css';
import cls from 'classnames';

interface IUpdateImageView {
  setImage: any;
}
const UpdateImageView = ({ setImage }: IUpdateImageView) => {
  const [description, setDescription] = useState('');

  return (
    <>
      <div className={styles.update_image_desc}>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={cls(styles.textarea_blue, styles.details_input)}
        ></textarea>
      </div>
      <div className={styles.update_center}>
        <div className={styles.crooper}></div>
      </div>
    </>
  );
};

export default UpdateImageView;
