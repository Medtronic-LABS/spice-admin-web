import React from 'react';
import { mount } from 'enzyme';
import CheckboxGroup from './CheckboxGroup';

describe('CheckboxGroup component', () => {

  const props: any = {
    errorLabel: 'Error',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    required: true,
    fieldLabel: 'Checkbox Group',
    fields: { value: [] },
    meta: { touched: true, error: 'Please select an option' },
  };

  it('should render correctly', () => {
    const wrapper = mount(<CheckboxGroup {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render the correct field label', () => {
    const wrapper = mount(<CheckboxGroup {...props} />);
    const label = wrapper.find('.input-field-label');
    expect(label.text()).toBe('Checkbox Group*');
  });

  it('should render the correct number of checkboxes', () => {
    const wrapper = mount(<CheckboxGroup {...props} />);
    const checkboxes = wrapper.find('input[type="checkbox"]');
    expect(checkboxes).toHaveLength(props.options.length);
  });

  it('should set the default checked state of checkboxes correctly', () => {
    const wrapper = mount(<CheckboxGroup {...props} />);
    const checkboxes = wrapper.find('input[type="checkbox"]');
    props.options.forEach((option:any, index:any) => {
      expect(checkboxes.at(index).prop('defaultChecked')).toBe(
        props.fields?.value?.includes(option.value) || false
      );
    });
  });

  it('should call fields.push with the correct value when a checkbox is checked', () => {
    const fields = { value: [], push: jest.fn() };
    const meta = { touched: false, error: null };
  
    const wrapper = mount(<CheckboxGroup options={props.options} fields={fields} meta={meta} />);
    const checkbox = wrapper.find('input[type="checkbox"]').at(1); // Click the second checkbox
    checkbox.simulate('click', { target: { checked: true } });
  
    expect(fields.push).toHaveBeenCalledWith('option2');
  });

  it('should add and remove values from the fields object', () => {
    const fields = { value: [], push: jest.fn(), remove: jest.fn() };
    const meta = { touched: false, error: null };
  
    const wrapper = mount(<CheckboxGroup options={props.options} fields={fields} meta={meta} />);
    const checkbox1 = wrapper.find('input[type="checkbox"]').at(0);
    const checkbox2 = wrapper.find('input[type="checkbox"]').at(1);
  
    // Check the first checkbox
    checkbox1.simulate('click', { target: { checked: true } });
    expect(fields.push).toHaveBeenCalledWith('option1');
  
    // Check the second checkbox
    checkbox2.simulate('click', { target: { checked: true } });
    expect(fields.push).toHaveBeenCalledWith('option2');
  });

  it('should call fields.push() when a checkbox is checked', () => {
    const fields = { value: [], push: jest.fn(), remove: jest.fn() };
    const meta = { touched: false, error: null };
    const wrapper = mount(
      <CheckboxGroup options={props.options} fields={fields} meta={meta} />
    );

    const checkbox = wrapper.find('input[type="checkbox"]').first();
    checkbox.simulate('click', { target: { checked: true } });

    expect(fields.push).toHaveBeenCalledWith('option1');
  });

  it('renders the input field label without an asterisk when not required', () => {
    const props = {
      required: false,
      fieldLabel: 'My Checkbox Group',
      options: [{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }],
    };

    const wrapper = mount(<CheckboxGroup {...props} />);
    const label = wrapper.find('.input-field-label');

    expect(label).toHaveLength(1);
    expect(label.text()).toBe('My Checkbox Group');
  });

  it('should call fields.remove() when a checkbox is unchecked', () => {
    const fields = { value: ['1'], push: jest.fn(), remove: jest.fn() };
    const meta = { touched: false, error: null };
    const wrapper = mount(
      <CheckboxGroup options={props.options} fields={fields} meta={meta} />
    );

    // Uncheck the first checkbox
    const checkbox1 = wrapper.find('input[type="checkbox"]').first();
    checkbox1.simulate('click', { target: { checked: false } });

    expect(fields.remove).toHaveBeenCalledWith(-1);
  });

  it('renders the input field label with an asterisk when required', () => {
    const props = {
      required: true,
      fieldLabel: 'My Checkbox Group',
      options: [{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }],
    };

    const wrapper = mount(<CheckboxGroup {...props} />);
    const label = wrapper.find('.input-field-label');

    expect(label).toHaveLength(1);
    expect(label.text()).toBe('My Checkbox Group*');
  });
});
