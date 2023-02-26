import React from 'react';
import styles from './styles/menu-items.module.css';

interface IMenuItemProps {
  icon?: string;
  title: string;
  subtitle?: string;
  img?: string;
}

const MenuItem = ({ icon, img, subtitle, title }: IMenuItemProps) => {
  return (
    <div className={styles.menu}>
      {img ? <img src={img} alt="" /> : <i className={icon}></i>}
      <div>
        <div>{title}</div>
        {subtitle && <div className={styles.menuSub}>{subtitle}</div>}
      </div>
    </div>
  );
};

export default MenuItem;
