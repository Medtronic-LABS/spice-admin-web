import React, { useCallback, useRef, useState } from 'react';
import SearchIcon from '../../assets/images/search.svg';

import styles from './Searchbar.module.scss';

interface ISearchbarProps {
  placeholder?: string;
  onSearch: (search: string) => void;
  isOutlined?: boolean;
}

/**
 * Search bar component that triggers search on onChange
 * @param param0
 * @returns {React.ReactElement}
 */
const Searchbar = ({ placeholder, onSearch, isOutlined = true }: ISearchbarProps): React.ReactElement => {
  const [searchText, setSearchText] = useState('');
  const timerId: React.MutableRefObject<number | undefined> = useRef<number>();
  const onChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timerId.current);
      setSearchText(value);
      timerId.current = setTimeout(() => onSearch(value), 500) as any;
    },
    [onSearch]
  );

  return (
    <div className={styles.searchbarContainer}>
      <input
        className={isOutlined ? styles.searchbarOutlined : styles.searchbar}
        placeholder={placeholder || 'Search'}
        onChange={onChange}
        value={searchText}
      />
      <img src={SearchIcon} alt='' />
    </div>
  );
};

export default Searchbar;
