import React from 'react';
import { mount } from 'enzyme';
import Radio from './Radio';

describe('Radio component', () => {
  const options = [    { value: 'option1', label: 'Option 1' },    { value: 'option2', label: 'Option 2' },    { value: 'option3', label: 'Option 3' }  ];
  const input = {
    value: 'option2',
    onChange: jest.fn()
  };
  const meta = {
    touched: true,
    error: 'This field is required'
  };
  const fieldLabel = 'Choose an option';

  it('should render radio buttons with labels', () => {
    const wrapper = mount(
      <Radio options={options} input={input} meta={meta} fieldLabel={fieldLabel} />
    );
    expect(wrapper.find('label')).toHaveLength(3);
    expect(wrapper.find('input[type="radio"]')).toHaveLength(3);
    expect(wrapper.find('input[value="option1"]').prop('checked')).toBeFalsy();
    expect(wrapper.find('input[value="option2"]').prop('checked')).toBeTruthy();
    expect(wrapper.find('input[value="option3"]').prop('checked')).toBeFalsy();
    expect(wrapper.find('label').at(0).text()).toBe('Option 1');
    expect(wrapper.find('label').at(1).text()).toBe('Option 2');
    expect(wrapper.find('label').at(2).text()).toBe('Option 3');
    expect(wrapper.find('.input-field-label').text()).toBe(`${fieldLabel}`);
  });

  it('should call the onChange prop when a radio button is clicked', () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <Radio options={options} input={input} meta={meta} fieldLabel={fieldLabel} onChange={onChangeMock} />
    );
    const option1Radio = wrapper.find('input[value="option1"]');
    option1Radio.simulate('change', { target: { value: 'option1' } });
    expect(input.onChange).toHaveBeenCalledWith('option1');
    expect(onChangeMock).toHaveBeenCalledWith('option1');
    expect(wrapper.find('input[value="option2"]').prop('checked')).toBeTruthy();
    expect(wrapper.find('input[value="option1"]').prop('checked')).toBeFalsy();
    expect(wrapper.find('input[value="option3"]').prop('checked')).toBeFalsy();
  });
});
