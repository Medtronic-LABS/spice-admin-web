import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import CaretDownIcon from '../../assets/images/caret-down-white.svg';

import styles from './Dropdown.module.scss';

interface IDropdownProps {
  menuItems: Array<{
    menuText: string;
    route?: string;
    onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
    menuClass?: string;
  }>;
  label: string;
  className?: string;
}

/**
 * A component for dropdown, with a button as trigger
 * @param param0
 * @returns {React.ReactElement}
 */
const Dropdown = ({
  label,
  menuItems,
  className = ''
}: IDropdownProps): React.ReactElement => {
  const dropdownTogglerId = useRef<string>(new Date().getTime().toString());

  return (
    <>
      <button
        className={`${className} fs-0dot875 dropdown-toggle primary-btn d-flex align-items-center py-0dot625 ps-0dot75 pe-1 ${styles.dropdownButton}`}
        id={dropdownTogglerId.current}
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        <img className='me-0dot875' src={CaretDownIcon} alt='caret-down' />
        {label}
      </button>
      <ul
        className='dropdown-menu dropdown-menu-start highlight-small-text'
        aria-labelledby={dropdownTogglerId.current}
      >
        {menuItems.map(({ menuText, route, onClick, menuClass = '' }, i) => (
          <li key={`${menuText}${i}`} onClick={onClick} className={menuClass}>
            {route ? (
              <Link
                className='dropdown-item d-flex align-items-center'
                to={route}
              >
                {menuText}
              </Link>
            ) : (
              menuText
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Dropdown;
