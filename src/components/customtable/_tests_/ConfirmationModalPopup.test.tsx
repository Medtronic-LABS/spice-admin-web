import { mount } from 'enzyme';
import ModalForm from '../../modal/ModalForm';
import ConfirmationModalPopup from '../ConfirmationModalPopup';

describe('ConfirmationModalPopup', () => {
    it('passes props to ModalForm', () => {
        const isOpen = true;
        const popupTitle = 'Test Title';
        const handleCancel = jest.fn();
        const handleSubmit = jest.fn();
        const cancelText = 'Cancel';
        const submitText = 'Ok';
        const popupSize = 'modal-md';
        const confirmationMessage = 'Are you sure?';
        const wrapper = mount(
          <ConfirmationModalPopup
            isOpen={isOpen}
            popupTitle={popupTitle}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            cancelText={cancelText}
            submitText={submitText}
            popupSize={popupSize}
            confirmationMessage={confirmationMessage}
          />
        );
        const modalForm = wrapper.find(ModalForm);
        expect(modalForm.prop('show')).toEqual(isOpen);
        expect(modalForm.prop('title')).toEqual(popupTitle);
        expect(modalForm.prop('cancelText')).toEqual(cancelText);
        expect(modalForm.prop('submitText')).toEqual(submitText);
        expect(modalForm.prop('size')).toEqual(popupSize);
        expect(modalForm.prop('handleCancel')).toEqual(handleCancel);
        expect(modalForm.prop('handleFormSubmit')).toEqual(handleSubmit);
        expect(wrapper.contains(confirmationMessage)).toEqual(true);
      });
  });
  
