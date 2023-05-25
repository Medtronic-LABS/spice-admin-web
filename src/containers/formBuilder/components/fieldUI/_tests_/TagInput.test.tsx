import React from 'react';
import { shallow, mount } from 'enzyme';
import TagInput, { ITagInputProps } from '../TagInput';

describe('TagInput Component', () => {
  const props: ITagInputProps = {
    defaultValue: ['tag1', 'tag2'],
    onChange: jest.fn(),
    label: 'Tags',
    required: true,
    disabled: false,
    error: '',
    classChange: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component with default props', () => {
    const wrapper = shallow(<TagInput />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render the component with all props', () => {
    const wrapper = shallow(<TagInput {...props} />);
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('label').text()).toBe('Tags*');
    expect(wrapper.find('li').length).toBe(2);
    expect(wrapper.find('input').prop('value')).toBe('');
  });

  it('should add a new tag when Enter key is pressed', () => {
    const wrapper = mount(<TagInput {...props} />);
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: 'newTag' } });
    input.simulate('keyDown', { keyCode: 13 });

    expect(props.onChange).toBeCalledTimes(0);
    expect(wrapper.find('li').length).toBe(3);
    expect(wrapper.find('input').prop('value')).toBe('');
  });

  it('should not add a tag when Enter key is pressed and input value is empty', () => {
    const wrapper = mount(<TagInput {...props} />);
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: '' } });
    input.simulate('keyDown', { keyCode: 13 });

    expect(props.onChange).not.toHaveBeenCalled();
    expect(wrapper.find('li').length).toBe(2);
  });

  it('should not add a tag when Enter key is pressed and input value already exists in the tags', () => {
    const wrapper = mount(<TagInput {...props} />);
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: 'tag1' } });
    input.simulate('keyDown', { keyCode: 13 });

    expect(props.onChange).not.toHaveBeenCalled();
    expect(wrapper.find('li').length).toBe(2);
  });

  it('should remove a tag when Remove button is clicked', () => {
    const wrapper = mount(<TagInput {...props} />);
    const removeButton = wrapper.find('li span').at(0);
    removeButton.simulate('click');
    expect(props.onChange).toBeCalledTimes(0);
    expect(wrapper.find('li').length).toBe(1);
  });

  it('should remove the last tag when Backspace key is pressed and input value is empty', () => {
    const wrapper = mount(<TagInput {...props} />);
    const input = wrapper.find('input');

    input.simulate('keyDown', { keyCode: 8 });
    expect(props.onChange).toBeCalledTimes(0);
    expect(wrapper.find('li').length).toBe(1);
  });
});