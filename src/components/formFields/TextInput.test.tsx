import React from 'react';
import { shallow,mount } from 'enzyme';
import TextInput from './TextInput';
import styles from './TextInput.module.scss';

describe('TextInput component', () => {
  let wrapper:any;
  const mockOnChange = jest.fn();
let props:any
  beforeEach(() => {
     props={
      event:{
        target:{
          setSelectionRange:jest.fn()
        }
      }
    }
    wrapper = shallow(<TextInput {...props} onChange={mockOnChange}/>);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('displays label if isShowLabel prop is true', () => {
    wrapper.setProps({ label: 'Test Label', isShowLabel: true });
    expect(wrapper.find('label').text()).toEqual('Test Label*');
  });

  it('does not display label if isShowLabel prop is false', () => {
    wrapper.setProps({ label: 'Test Label', isShowLabel: false });
    expect(wrapper.find('label').exists()).toBe(false);
  });

  it('displays error message if error prop is provided', () => {
    wrapper.setProps({ error: 'Test Error' });
    expect(wrapper.find(`.${styles.error}`).text()).toEqual('*Test Error ');
  });

  it('displays helpertext prop if provided', () => {
    const helpertext = <span>Test Helpertext</span>;
    wrapper.setProps({ helpertext });
    expect(wrapper.contains(helpertext)).toBe(true);
  });
  
   it('renders the label and input correctly', () => {
    const wrapper = mount(<TextInput {...props}  label="Test Label" name="test" />);
    expect(wrapper.find('label').text()).toBe('Test Label*');
    expect(wrapper.find('input').prop('name')).toBe('test');
  });

  it('calls the onChange function when input value is changed', () => {
    const input = wrapper.find('input').at(0);
    const event = { target: { value: 'test' } };
    input.simulate('change', event);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
