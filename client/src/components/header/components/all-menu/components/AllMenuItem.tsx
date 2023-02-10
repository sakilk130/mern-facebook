import React from 'react';
import cls from 'classnames';
import styles from './AllMenuItem.module.css';

interface IAllMenuItem {
  icon: string;
  name: string;
  description: string;
}

const AllMenuItem = ({ icon, name, description }: IAllMenuItem) => {
  return (
    <div className={cls(styles.allMenuContainer)}>
      <img src={`/left/${icon}.png`} alt="" />
      <div className={cls(styles.allMenuName)}>
        <h4>{name}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default AllMenuItem;
