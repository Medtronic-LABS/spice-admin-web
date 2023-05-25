import React from 'react';
import EditIcon from '../../assets/images/edit.svg';
import PlusIcon from '../../assets/images/plus.svg';
import styles from './IconButton.module.scss';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isEdit?: boolean;
  customIcon?: any;
  handleClick: () => void;
}

/**
 * A compoent for button with icon
 * @param param
 * @returns React.ReactElement
 */
const IconButton = ({
  label,
  disabled = false,
  isEdit,
  customIcon,
  type = 'button',
  handleClick,
  ..._props
}: IProps): React.ReactElement => {
  const buttonIconElmt = () => {
    if (customIcon) {
      return <img src={customIcon} className={styles.btnImg} alt='custom-icon' />;
    } else if (isEdit) {
      return <img src={EditIcon} className={styles.btnImg} alt='edit-icon' />;
    } else {
      return <img src={PlusIcon} className={styles.btnImg} alt='plus-icon' />;
    }
  };
  return (
    <button type={type} disabled={disabled} className={`btn primary-btn ${styles.iconButton}`} onClick={handleClick}>
      {buttonIconElmt()}
      <span className={styles.btnLabel}>{label}</span>
    </button>
  );
};

export default IconButton;
