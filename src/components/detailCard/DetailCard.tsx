import React from 'react';

import APPCONSTANTS from '../../constants/appConstants';
import IconButton from '../button/IconButton';
import Searchbar from '../searchbar/Searchbar';
import CustomTooltip from '../tooltip';
import styles from './DetailCard.module.scss';

interface IDetailCardProps {
  header: string;
  buttonLabel?: string;
  customLabel?: string;
  customIcon?: string;
  customButtonIcon?: string;
  isEdit?: boolean;
  children: React.ReactElement;
  onSearch?: (searchStr: string) => void;
  searchPlaceholder?: string;
  isSearch?: boolean;
  onButtonClick?: () => void;
  onCustomClick?: (data: any) => void;
  className?: string;
  bodyClassName?: string;
}

/**
 * The component for card detail with searchbar and button.
 * @param param
 * @returns React.ReactElement
 */
const DetailCard = ({
  header,
  buttonLabel,
  customLabel,
  customIcon,
  customButtonIcon,
  isEdit,
  children,
  onSearch,
  searchPlaceholder = APPCONSTANTS.SEARCH_BY_NAME,
  isSearch = false,
  onButtonClick,
  onCustomClick,
  className = '',
  bodyClassName = ''
}: IDetailCardProps): React.ReactElement => {
  const buttonClass = `${buttonLabel && onButtonClick ? 'me-1 mt-1' : 'mt-0'} mt-lg-0`;
  const searchClass = `${isSearch ? 'mt-1' : ''}  mt-lg-0`;

  const renderSearchBar = () => {
    return isSearch && onSearch ? (
      <div className={buttonClass}>
        <Searchbar placeholder={searchPlaceholder} onSearch={onSearch} />
      </div>
    ) : (
      <span />
    );
  };

  const renderCustomIcon = () => {
    return customLabel && onCustomClick ? (
      <div className={`${customIcon ? styles.customIcon : searchClass} me-1`} onClick={onCustomClick}>
        {customIcon ? (
          <CustomTooltip title={customLabel}>
            <img src={customIcon} alt='custom-icon' />
          </CustomTooltip>
        ) : (
          <IconButton customIcon={customButtonIcon} label={customLabel} handleClick={() => null} />
        )}
      </div>
    ) : null;
  };

  return (
    <div className={`card ${styles.detail} ${className}`}>
      <div className={`card-header bg-transparent flex-wrap flex-lg-nowrap ${styles.header}`}>
        <span className={`${styles.headerLabel} ${isSearch && buttonLabel && onButtonClick ? '' : 'w-auto'}`}>
          {header}
        </span>
        <div
          className={`d-flex justify-content-between  ${
            buttonLabel && onButtonClick ? 'justify-content-lg-end' : ''
          }  ${isSearch && buttonLabel ? 'flex-grow-1' : 'flex-grow-0'} flex-grow-md-0`}
        >
          {renderSearchBar()}
          {renderCustomIcon()}
          {buttonLabel && onButtonClick ? (
            <div className={searchClass}>
              <IconButton label={buttonLabel} isEdit={isEdit} handleClick={onButtonClick} />
            </div>
          ) : null}
        </div>
      </div>
      <div className={`card-body p-0 ${bodyClassName}`}>{children}</div>
    </div>
  );
};

export default DetailCard;
