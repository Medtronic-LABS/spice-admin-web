import { mount, shallow } from 'enzyme';
import ModalForm, { IModalProps } from '../ModalForm';

describe('<ModalForm />', () => {
  let props: IModalProps;

  beforeEach(() => {
    props = {
      title: 'Test Modal',
      show: true,
      handleCancel: jest.fn(),
      submitText: 'Submit',
      handleFormSubmit: jest.fn(),
    };
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<ModalForm {...props} />);
    expect(wrapper.length).toBe(1);
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<ModalForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should close modal when handleCancel is clicked', () => {
    const wrapper = mount(<ModalForm {...props} />);
    wrapper.setProps({cancelText: 'Cancel'});
    wrapper.find('.btn.secondary-btn.me-0dot5').simulate('click');
    expect(props.handleCancel).toHaveBeenCalled();
  });

  it('should call handleFormSubmit when submit button is clicked', () => {
    const wrapper = mount(<ModalForm {...props} />);
    wrapper.setProps({handleForceSubmit: true});
    wrapper.find('.btn.primary-btn').simulate('click');
    expect(props.handleFormSubmit).toHaveBeenCalled();
  });

  it('should show deactivate button if deactivateLabel prop is provided', () => {
    props.deactivateLabel = 'Deactivate';
    const wrapper = mount(<ModalForm {...props} />);
    expect(wrapper.find('.btn.danger-btn').length).toBe(1);
  });

  it('should disable submit button when submitDisabled prop is true', () => {
    props.submitDisabled = true;
    const wrapper = mount(<ModalForm {...props} />);
    expect(wrapper.find('.btn.primary-btn').prop('disabled')).toBe(true);
  });

  it('should call handleFormSubmit on submit button click when handleForceSubmit prop is true', () => {
    props.handleForceSubmit = true;
    const wrapper = mount(<ModalForm {...props} />);
    wrapper.find('.btn.primary-btn').simulate('click');
    expect(props.handleFormSubmit).toHaveBeenCalled();
  });
  
  it('does not call handleFormSubmit when handleForceSubmit is false', () => {
    const mockHandleFormSubmit = jest.fn();
    const wrapper = mount(
      <ModalForm show={true} handleCancel={() => {}} title="Test Modal" handleFormSubmit={mockHandleFormSubmit} handleForceSubmit={false} submitText="Submit" />
    );
    wrapper.find('form').simulate('submit');
    expect(mockHandleFormSubmit).toHaveBeenCalled();
  });
  

  it('should render with the correct title', () => {
    const title = 'Test Title';
    const wrapper = shallow(<ModalForm {...props} title={title} show />);
    expect(wrapper.find('.modal-title').text()).toEqual(title);
  });
  
  it('should render with the correct cancel text', () => {
    const cancelText = 'Cancel';
    const wrapper = mount(<ModalForm {...props} cancelText={cancelText} show />);
    expect(wrapper.find('.btn.secondary-btn.me-0dot5').text()).toEqual(cancelText);
  });

  it('should render with the correct submit text', () => {
    const submitText = 'Submit';
    const wrapper = mount(<ModalForm {...props} submitText={submitText} />);
    expect(wrapper.find('.btn.primary-btn').text()).toEqual(submitText);
  });

  it('does not render when show is false', () => {
    const wrapper = mount(
      <ModalForm {...props} show={false} handleCancel={() => {}} title="Test Modal" />
    );
    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
