import ReactDOM from 'react-dom';
import React from 'react';

import close from '../../assets/images/close.svg';

import styles from './ModalForm.module.scss';

interface IModalProps {
  title: string;
  children?: React.ReactElement;
  show: boolean;
  handleCancel: () => void;
  deactivateLabel?: string;
  size?: 'modal-md' | 'modal-lg';
}

const ModalViewer = React.memo(({ children, show, handleCancel, title, size }: IModalProps) => {
  if (!show) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className={`${styles.modal} modal modal-show`}>
      <div className={`modal-dialog modal-dialog-centered ${size ? size : styles.modalWidth}`}>
        <div className={`modal-content ${styles.modalContent}`}>
          <div className='modal-header py-1 px-1dot25'>
            <h5 className={`modal-title ${styles.modalTitle}`}>{title}</h5>
            <div
              className={`d-flex justify-content-center align-items-center ${styles.closeIcon}`}
              onClick={handleCancel}
            >
              <img src={close} alt='close' />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
});
export default ModalViewer;
