import React from 'react';
import { Link } from 'react-router-dom';
import cls from 'classnames';

import styles from './styles/shortcut.module.css';

interface ShortcutProps {
  link: string;
  img: string;
  name: string;
}
const Shortcut = ({ img, link, name }: ShortcutProps) => {
  return (
    <Link to={link} className={cls(styles.shortcutItem)}>
      <img src={img} alt="" />
      <p>{name}</p>
    </Link>
  );
};

export default Shortcut;
