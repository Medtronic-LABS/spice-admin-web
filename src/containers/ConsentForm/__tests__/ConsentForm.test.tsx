import { mount } from 'enzyme';
import SelectInput from '../../../components/formFields/SelectInput';
import ConsentForm, { IProps } from '../ConsentForm';


jest.mock('../../../components/editor/WysiwygEditor', () => {
  return jest.fn(() => null);
});
describe('ConsentForm', () => {
  const mockSubmitConsentForm = jest.fn();
  const mockHandleClose = jest.fn();
  const mockHandleDeactivate = jest.fn();
  const mockSetSelectedFormType = jest.fn();

  const props: IProps = {
    title: 'Test Title',
    handleClose: mockHandleClose,
    submitConsentForm: mockSubmitConsentForm,
    handleDeactivate: mockHandleDeactivate,
    setSelectedFormType: mockSetSelectedFormType,
    editorContent: '',
    setEditorContent: jest.fn(),
  };

  it('should render a SelectInput component when isAccount prop is true', () => {
    const wrapper = mount(<ConsentForm {...props} isAccount={true} />);
    expect(wrapper.find(SelectInput)).toHaveLength(1);
  });

  it('should not render a SelectInput component when isAccount prop is false', () => {
    const wrapper = mount(<ConsentForm {...props} isAccount={false} />);
    expect(wrapper.find(SelectInput)).toHaveLength(0);
  });

  it('should disable the delete consent button when disableDeleteConsentBtn prop is true', () => {
    const wrapper = mount(<ConsentForm {...props} disableDeleteConsentBtn={true} />);
    const deleteButton = wrapper.find('button.danger-btn');
    expect(deleteButton).toHaveLength(1);
    expect(deleteButton.prop('disabled')).toBe(true);
  });

  it('should enable the delete consent button when disableDeleteConsentBtn prop is false', () => {
    const wrapper = mount(<ConsentForm {...props} disableDeleteConsentBtn={false} />);
    const deleteButton = wrapper.find('button.danger-btn');
    expect(deleteButton).toHaveLength(1);
    expect(deleteButton.prop('disabled')).toBe(true);
  });

  it('should enable the submit button when isAccount is false', () => {
    const wrapper = mount(<ConsentForm {...props} isAccount={false} />);
    const submitButton = wrapper.find('button.primary-btn');
    expect(submitButton).toHaveLength(1);
    expect(submitButton.prop('disabled')).toBe(false);
  });

  it('should disable the submit button when isAccount is true and form type is not selected', () => {
    const wrapper = mount(<ConsentForm {...props} isAccount={true} />);
    const submitButton = wrapper.find('button.primary-btn');
    expect(submitButton).toHaveLength(1);
    expect(submitButton.prop('disabled')).toBe(true);
  });

  it('should enable the submit button when isAccount is true and form type is selected', () => {
    const wrapper = mount(<ConsentForm {...props} isAccount={true} />);
    const selectInput = wrapper.find(SelectInput);
    selectInput.prop('input').onChange({ name: 'Screening', id: 0 });
    wrapper.update();
    const submitButton = wrapper.find('button.primary-btn');
    expect(submitButton).toHaveLength(1);
    expect(submitButton.prop('disabled')).toBe(false);
  });

})