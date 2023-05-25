import ModalForm, { IModalSize } from '../modal/ModalForm';

export interface IModalPopupTypes {
  isOpen: boolean;
  popupTitle: string;
  cancelText: string;
  submitText: string;
  handleCancel: () => void;
  handleSubmit: () => void;
  popupSize: IModalSize;
  confirmationMessage: string ;
}

const ConfirmationModalPopup = ({
  isOpen,
  popupTitle,
  cancelText,
  submitText,
  handleCancel,
  handleSubmit,
  popupSize,
  confirmationMessage
}: IModalPopupTypes) => {
  return (
    <ModalForm
      show={isOpen}
      title={popupTitle}
      cancelText={cancelText}
      submitText={submitText}
      handleCancel={handleCancel}
      handleFormSubmit={handleSubmit}
      size={popupSize}
    >
      <>{confirmationMessage}</>
    </ModalForm>
  );
};

export default ConfirmationModalPopup;
