import ReactDOM from 'react-dom';
import { Form } from 'react-final-form';
import React from 'react';
import { FormApi } from 'final-form';

import close from '../../assets/images/close.svg';

import styles from './ModalForm.module.scss';

export type IModalSize = 'modal-md' | 'modal-lg' | 'modal-xl';

export interface IModalProps {
  title: string;
  cancelText?: string;
  submitText: string;
  submitDisabled?: boolean;
  children?: React.ReactElement;
  show: boolean;
  handleCancel: () => void;
  deactivateLabel?: string;
  handleForceSubmit?: boolean;
  handleFormSubmit: (values?: any) => void;
  handleDeactivate?: () => void;
  render?: (form?: FormApi<any>) => React.ReactElement;
  mutators?: object;
  initialValues?: object;
  size?: IModalSize;
  isDeactivateModal?: boolean;
}

const ModalForm = React.memo(
  ({
    children,
    show,
    handleCancel,
    title,
    cancelText,
    submitText,
    submitDisabled = false,
    deactivateLabel,
    handleForceSubmit = false,
    handleFormSubmit,
    handleDeactivate,
    initialValues = {},
    size,
    render,
    mutators
  }: IModalProps) => {
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
            <Form
              onSubmit={(value) => {
                if (!handleForceSubmit) {
                  handleFormSubmit(value);
                }
              }}
              initialValues={initialValues}
              mutators={{ ...mutators }}
              render={({ handleSubmit, form, values }) => {
                return (
                  <form
                    onSubmit={(val) => {
                      if (!handleForceSubmit) {
                        handleSubmit(val);
                      }
                    }}
                  >
                    <div className={`${styles.scroll} modal-body px-1dot25 py-1dot5`}>
                      {render ? render(form) : children}
                    </div>
                    <div className={`modal-footer py-0dot75 px-1dot25`}>
                      {deactivateLabel ? (
                        <button
                          type='button'
                          className='btn danger-btn me-auto'
                          data-dismiss='modal'
                          onClick={handleDeactivate}
                        >
                          {deactivateLabel}
                        </button>
                      ) : null}
                      {cancelText && (
                        <button
                          type='button'
                          className='btn secondary-btn me-0dot5'
                          data-dismiss='modal'
                          onClick={handleCancel}
                        >
                          {cancelText}
                        </button>
                      )}
                      <button
                        type='submit'
                        className='btn primary-btn'
                        disabled={submitDisabled}
                        onClick={
                          handleForceSubmit
                            ? (e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleFormSubmit(values);
                              }
                            : () => null
                        }
                      >
                        {submitText}
                      </button>
                    </div>
                  </form>
                );
              }}
            />
          </div>
        </div>
      </div>,
      document.body
    );
  }
);
export default ModalForm;
