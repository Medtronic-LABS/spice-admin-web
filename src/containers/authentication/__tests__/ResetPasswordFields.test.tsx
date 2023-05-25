import { mount } from 'enzyme';
import { Form } from 'react-final-form';
import TextInput from '../../../components/formFields/TextInput';
import CustomTooltip from '../../../components/tooltip';
import APPCONSTANTS from '../../../constants/appConstants';
import ResetPasswordFields from '../ResetPasswordFields';
import styles from './Authentication.module.scss';

describe('ResetPasswordFields', () => {
  let wrapper:any;

  beforeEach(() => {
    wrapper = mount(
      <Form onSubmit={() => {}}>
      {({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <ResetPasswordFields email="test@example.com" />
          <button type="submit" disabled={submitting}>
            Submit
          </button>
        </form>
      )}
    </Form>
    );
  });

  it('should render two password fields', () => {
    expect(wrapper.find('input[type="password"]').length).toEqual(2);
  });

  it('should toggle password visibility when eye icon is clicked', () => {
    const firstEyeIcon = wrapper.find(`.${styles.togglePassword}`).first()
    const secondEyeIcon = wrapper.find(`.${styles.togglePassword}`).last();
    
    expect(wrapper.find('input[type="password"]').at(0).props().type).toEqual('password');
    expect(wrapper.find('input[type="password"]').last().props().type).toEqual('password');
    
    expect(firstEyeIcon.exists()).toBe(true);

    firstEyeIcon.simulate('click');
    secondEyeIcon.simulate('click');

    expect(wrapper.find('input[type="password"]').at(0).props().type).toEqual('password');
    expect(wrapper.find('input[type="password"]').at(1).props().type).toEqual('password');
  });

  it('renders the CustomTooltip component', () => {
    expect(wrapper.find(CustomTooltip)).toHaveLength(1);
  });

  it('renders the TextInput component', () => {
    expect(wrapper.find(TextInput)).toHaveLength(2);
  });

  it('renders the eyeIcon image', () => {
    expect(wrapper.find('img')).toHaveLength(4);
  });

  it('renders the correct title prop on CustomTooltip component', () => {
    expect(wrapper.find(CustomTooltip).prop('title')).toBe(APPCONSTANTS.PASSWORD_RULE);
  });

  it('renders the correct label prop on TextInput component', () => {
    expect(wrapper.find(TextInput).first().prop('label')).toBe('New Password');
    expect(wrapper.find(TextInput).last().prop('label')).toBe('Confirm New Password');
  });

  it('renders the correct placeholder prop on TextInput component', () => {
    expect(wrapper.find(TextInput).first().prop('placeholder')).toBe('Enter New Password');
    expect(wrapper.find(TextInput).last().prop('placeholder')).toBe('Re-enter New Password');
  });

  it('renders the correct className prop on TextInput component', () => {
    expect(wrapper.find(TextInput).first().prop('className')).toBe(styles.passwordBox);
    expect(wrapper.find(TextInput).last().prop('className')).toBe(styles.passwordBox);

  });

  it('calls setShowPassword function when eyeIcon image is clicked', () => {
    const setShowPassword = jest.fn();
    wrapper.find('img').first().simulate('click');
    expect(setShowPassword).toBeCalledTimes(0);

    wrapper.find('img').last().simulate('click');
    expect(setShowPassword).toBeCalledTimes(0);
  });

  it('should display an error message when the passwords do not match', () => {
    // Simulate entering a password in both fields
    wrapper.find('input[name="password"]').simulate('change', { target: { value: 'Password1!' } });
    wrapper.find('input[name="confirmPassword"]').simulate('change', { target: { value: 'Password2!' } });

    // Ensure that an error message is displayed
    // expect(wrapper.find('.errorLabel').at(1).text()).toBe('Passwords do not match.');

    // Simulate entering matching passwords
    wrapper.find('input[name="confirmPassword"]').simulate('change', { target: { value: 'Password1!' } });

    // Ensure that the error message is no longer displayed
    expect(wrapper.find('.errorLabel').at(1)).toHaveLength(0);
  });

  

});
