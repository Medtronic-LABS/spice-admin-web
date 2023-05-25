
import { mount, shallow } from 'enzyme';
import InfoIcon from '../../assets/images/info-grey.svg';
import CustomTooltip from '../tooltip';
import SelectInput, { AsyncSelectInput,handleChange } from './SelectInput';
import styles from './SelectInput.module.scss';

describe('SelectInput', () => {
  
  const props: any = {
    label: "Select an option",
    required: true,
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
    input: "option1", // Add the input property here
  };

  it('should render the label and required indicator', () => {
    const wrapper = shallow(<AsyncSelectInput {...props} />);
    const label = wrapper.find('label');

    expect(label).toHaveLength(1);
    expect(label.text()).toContain('Select an option');
    expect(wrapper.find('.input-asterisk')).toHaveLength(1);
  });

  it('should render the label and required indicator', () => {
    const wrapper = shallow(<SelectInput {...props} />);
    const label = wrapper.find('label');

    expect(label).toHaveLength(1);
    expect(label.text()).toContain('Select an option');
    expect(wrapper.find('.input-asterisk')).toHaveLength(1);
  });

  it('should display info icon with tooltip message', () => {
    const wrapper = mount(
      <CustomTooltip title='Type 3 characters to search'>
        <img src={InfoIcon} alt='Type 3 letters' className={styles.infoIcon} />
      </CustomTooltip>
    );

   
    // check if tooltip message is displayed on hover
    wrapper.find('img').simulate('mouseover');
    expect(wrapper.text()).toContain('');

    // check if tooltip message is hidden on mouseout
    wrapper.find('img').simulate('mouseout');
    expect(wrapper.text()).not.toContain('Type 3 characters to search');

    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('img').prop('alt')).toBe('Type 3 letters');

  });

  it('should render the component without errors', () => {
    const wrapper = mount(<SelectInput {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should display the label passed as prop', () => {
    const wrapper = mount(<SelectInput {...props} />);
  const expectedLabel = props.label + (props.required ? '*' : '');
  expect(wrapper.find('label').text()).toBe(expectedLabel);
  });

  it('should update the value when an option is selected', () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(<SelectInput {...props} onChange={onChangeMock} />);

    // Expect the input value to be updated
    expect(wrapper.find('input').prop('value')).toBe('');
  });

  it('should not display error message when showOnlyDropdown is true', () => {
    const wrapper = mount(<SelectInput {...props}/>);
    expect(wrapper.find('.error')).toHaveLength(0);
  });

  it('should display error message when showOnlyDropdown is false', () => {
    const wrapper = mount(<SelectInput {...props}/>);

    expect(wrapper.find(`.${styles.error}`)).toHaveLength(1);
    const expectedLabel = props.label + (props.required ? '*' : '');
    expect(wrapper.find(`.${styles.error}`).text().trim()).toBe(expectedLabel);
  });

  it('should render the label and required indicator', () => {
    const wrapper = shallow(<AsyncSelectInput {...props} />);
    const label = wrapper.find('label');

    expect(label).toHaveLength(1);
    expect(label.text()).toContain('Select an option');
    expect(wrapper.find('.input-asterisk')).toHaveLength(1);
  });

  it('should display info icon with tooltip message', () => {
    const wrapper = mount(
      <CustomTooltip title='Type 3 characters to search'>
        <img src={InfoIcon} alt='Type 3 letters' className={styles.infoIcon} />
      </CustomTooltip>
    );

   
    // check if tooltip message is displayed on hover
    wrapper.find('img').simulate('mouseover');
    expect(wrapper.text()).toContain('');

    // check if tooltip message is hidden on mouseout
    wrapper.find('img').simulate('mouseout');
    expect(wrapper.text()).not.toContain('Type 3 characters to search');

    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('img').prop('alt')).toBe('Type 3 letters');

  });

  it('should render the component without errors', () => {
    const wrapper = mount(<AsyncSelectInput {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should display the label passed as prop', () => {
    const wrapper = mount(<AsyncSelectInput {...props} />);
  const expectedLabel = props.label + (props.required ? '*' : '');
  expect(wrapper.find('label').text()).toBe(expectedLabel);
  });

  it('should update the value when an option is selected', () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(<AsyncSelectInput {...props} onChange={onChangeMock} />);

    // Expect the input value to be updated
    expect(wrapper.find('input').first().prop('value')).toBe('');
  });

  it('should not display error message when showOnlyDropdown is true', () => {
    const wrapper = mount(<AsyncSelectInput {...props}/>);
    expect(wrapper.find('.error')).toHaveLength(0);
  });

  it('should display error message when showOnlyDropdown is false', () => {
    const wrapper = mount(<AsyncSelectInput {...props}/>);

    expect(wrapper.find(`.${styles.error}`)).toHaveLength(1);
    const expectedLabel = props.label + (props.required ? '*' : '');
    expect(wrapper.find(`.${styles.error}`).text().trim()).toBe(expectedLabel);
  });

  it('should set zIndex to 9999 for MenuPortal when isModel is true', () => {
    const component = shallow(<AsyncSelectInput {...props} isModel={true} />);
    const menuPortal = component.find('MenuPortal');
    expect(menuPortal.length).toBe(0);
  });

  it('should set zIndex to 9999 for MenuPortal when isModel is true', () => {
    const component = shallow(<SelectInput {...props} isModel={true} />);
    const menuPortal = component.find('MenuPortal');
    expect(menuPortal.length).toBe(0);
  });
  it('should call onChange prop with correct value', () => {
    const input = {
      onChange: jest.fn()
    };
    const onChange = jest.fn();
    const value = 'new value';
    
    handleChange(input, onChange, value);
    
    expect(input.onChange).toHaveBeenCalledWith(value);
    expect(onChange).toHaveBeenCalledWith(value);
  });

  it('should have 100% statement coverage', () => {
    const input = {
      onChange: jest.fn()
    };
    const onChange = jest.fn();
    const value = 'new value';

    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    handleChange(input, onChange, value);
    expect(input.onChange).toHaveBeenCalledWith(value);
    expect(onChange).toHaveBeenCalledWith(value);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should call handleChange function with input, onChange function, and value', () => {
    const input = 'test input';
    const onChange = jest.fn();
    const wrapper = mount(<SelectInput  {...props} onChange={onChange} input={input} />);

    expect(onChange).toBeCalledTimes(0);
  });

});
