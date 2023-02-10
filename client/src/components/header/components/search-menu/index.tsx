import cls from 'classnames';
import { useEffect, useRef, useState } from 'react';
import useOutsideClick from '../../../../hooks/useOutsideClick';
import { Return, Search } from '../../../../svg';
import styles from './styles/search-menu.module.css';

interface ISearchMenu {
  color: string;
  setShowSearchMenu: (showSearchMenu: boolean) => void;
}

const SearchMenu = ({ color, setShowSearchMenu }: ISearchMenu) => {
  const [iconVisible, setIconVisible] = useState(true);
  const menu = useRef(null);
  const input = useRef<HTMLInputElement>(null);

  useOutsideClick(menu, () => {
    setShowSearchMenu(false);
  });

  useEffect(() => {
    input?.current?.focus();
  }, []);

  return (
    <div className={cls(styles.container)} ref={menu}>
      <div className={cls(styles.searchWrap)}>
        <div className={cls(styles.headerLogo)}>
          <div
            onClick={() => {
              setShowSearchMenu(false);
            }}
            className={cls(styles.return)}
          >
            <Return color={color} />
          </div>
        </div>
        <div
          className={cls(styles.search)}
          onClick={() => {
            input?.current?.focus();
          }}
        >
          <div
            style={{
              visibility: iconVisible ? 'visible' : 'hidden',
            }}
          >
            <Search color={color} />
          </div>

          <input
            type="text"
            placeholder="Search Facebook"
            ref={input}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
          />
        </div>
      </div>
      <div className={cls(styles.searchHistoryHeader)}>
        <span className={cls(styles.recentSearch)}>Recent searches</span>
        <span className={cls(styles.editBtn)}>Edit</span>
      </div>
      <div className="search_history"></div>
      <div className="search_results scrollbar"></div>
    </div>
  );
};

export default SearchMenu;
