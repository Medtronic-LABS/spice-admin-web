import React from 'react';
import { mount } from 'enzyme';
import TextAreaInput from './TextAreaInput';

describe('TextAreaInput', () => {
  it('should render a label', () => {
    const wrapper = mount(
      <TextAreaInput label="Name" name="name" />
    );
    expect(wrapper.find('label').text()).toEqual('Name');
  });

  it('should not render the label if isShowLabel prop is false', () => {
    const wrapper = mount(
      <TextAreaInput label="Name" name="name" isShowLabel={false} />
    );
    expect(wrapper.find('label').exists()).toEqual(false);
  });

  it('should have the correct maxLength prop', () => {
    const wrapper = mount(
      <TextAreaInput label="Name" name="name" maxLength={300} />
    );
    expect(wrapper.find('textarea').prop('maxLength')).toEqual(300);
  });
});
