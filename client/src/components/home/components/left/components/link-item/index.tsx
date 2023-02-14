import React from 'react';
import cls from 'classnames';
import styles from './styles/link-item.module.css';

interface LinkItemProps {
  img: string;
  text: string;
  notification?: string;
}

const LinkItem = ({ img, text, notification }: LinkItemProps) => {
  return (
    <div className={cls(styles.container)}>
      <img src={`../../../left/${img}.png`} alt="" />
      <div className={cls(styles.linkItemText)}>
        <p>{text}</p>
        {notification && <span>{notification}</span>}
      </div>
    </div>
  );
};

export default LinkItem;
