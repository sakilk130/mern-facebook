import cls from 'classnames';
import { useRef } from 'react';
import useOutsideClick from '../../../../hooks/useOutsideClick';
import styles from './styles/all-menu.module.css';
import { menu, create } from '../../../../data/allMenu';
import { Search } from '../../../../svg';
import AllMenuItem from './components/AllMenuItem';

interface IAllMenu {
  setShowAllMenu: (showAllMenu: boolean) => void;
}

const AllMenu = ({ setShowAllMenu }: IAllMenu) => {
  const allMenuRef = useRef(null);
  const color = '#65676b';

  useOutsideClick(allMenuRef, () => {
    setShowAllMenu(false);
  });

  return (
    <div className={cls(styles.allMenuContainer)} ref={allMenuRef}>
      <h2 className={cls(styles.allMenuHeader)}>Menu</h2>
      <div className={cls(styles.allMenu)}>
        <div className={cls(styles.allMenuLeft)}>
          <div className={cls(styles.allMenuLeftSearch)}>
            <Search color={color} />
            <input type="text" placeholder="Search" />
          </div>
          <div className={cls(styles.allMenuLeftSocialMenu)}>
            <h2>Social</h2>
            {menu.slice(0, 6).map((item) => (
              <AllMenuItem
                key={item.name}
                icon={item.icon}
                name={item.name}
                description={item.description}
              />
            ))}
            <hr />
          </div>
          <div className={cls(styles.allMenuLeftSocialMenu)}>
            <h2>Entertainment</h2>
            {menu.slice(6, 9).map((item) => (
              <AllMenuItem
                key={item.name}
                icon={item.icon}
                name={item.name}
                description={item.description}
              />
            ))}
            <hr />
          </div>
          <div className={cls(styles.allMenuLeftSocialMenu)}>
            <h2>Shopping</h2>
            {menu.slice(9, 11).map((item) => (
              <AllMenuItem
                key={item.name}
                icon={item.icon}
                name={item.name}
                description={item.description}
              />
            ))}
            <hr />
          </div>
          <div className={cls(styles.allMenuLeftSocialMenu)}>
            <h2>Personal</h2>
            {menu.slice(11, 15).map((item) => (
              <AllMenuItem
                key={item.name}
                icon={item.icon}
                name={item.name}
                description={item.description}
              />
            ))}
            <hr />
          </div>
          <div className={cls(styles.allMenuLeftSocialMenu)}>
            <h2>Professional</h2>
            {menu.slice(15, 17).map((item) => (
              <AllMenuItem
                key={item.name}
                icon={item.icon}
                name={item.name}
                description={item.description}
              />
            ))}
            <hr />
          </div>
          <div className={cls(styles.allMenuLeftSocialMenu)}>
            <h2>Community Resources</h2>
            {menu.slice(17, 21).map((item) => (
              <AllMenuItem
                key={item.name}
                icon={item.icon}
                name={item.name}
                description={item.description}
              />
            ))}
            <hr />
          </div>
          <div className={cls(styles.allMenuLeftSocialMenu)}>
            <h2>More from Meta</h2>
            {menu.slice(21, 23).map((item) => (
              <AllMenuItem
                key={item.name}
                icon={item.icon}
                name={item.name}
                description={item.description}
              />
            ))}
          </div>
        </div>
        <div className={cls(styles.allMenuRight)}>
          <h2>Create</h2>
          {create.map((item) => (
            <div key={item.name} className={cls(styles.createMenu)}>
              <div>
                <i className={item.icon}></i>
              </div>
              <h4>{item.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMenu;
