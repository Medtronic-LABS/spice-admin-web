import React from 'react';
import { mount } from 'enzyme';
import Checkbox from './Checkbox';
import styles from './Checkbox.module.scss';

describe('Checkbox', () => {
  it('should render correctly with label', () => {
    const wrapper = mount(<Checkbox label="Test Label" />);
    expect(wrapper.find('label')).toHaveLength(1);
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(1);
    expect(wrapper.find('span').text()).toEqual('Test Label');
  });

  it('should handle onClick event', () => {
    const mockOnClick = jest.fn();
    const wrapper = mount(<Checkbox label="Test Label" onClick={mockOnClick} />);
    wrapper.find('input[type="checkbox"]').simulate('click');
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should render correctly with switchCheckbox', () => {
    const wrapper = mount(<Checkbox label="Test Label" switchCheckbox />);
    expect(wrapper.find(`.${styles.clSwitch}`)).toHaveLength(1);
    expect(wrapper.find(`.${styles.switcher}`)).toHaveLength(1);
    expect(wrapper.find(`.${styles.checkboxLabelText}`).text()).toEqual('Test Label');
  });

  it('should disable checkbox when readOnly is true', () => {
    const wrapper = mount(<Checkbox label="Test Label" readOnly />);
    expect(wrapper.find('input[type="checkbox"]').prop('disabled')).toEqual(undefined);
  });

  it('should handle Enter key press', () => {
    const mockOnClick = jest.fn();
    const wrapper = mount(<Checkbox label="Test Label" onClick={mockOnClick} />);
    wrapper.find('input[type="checkbox"]').simulate('keyPress', { key: 'Enter' });
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should handle inputProps correctly', () => {
    const wrapper = mount(<Checkbox label="Test Label" id="testId" data-testid="testCheckbox" />);
    expect(wrapper.find('input[type="checkbox"]').prop('id')).toEqual('testId');
    expect(wrapper.find('input[type="checkbox"]').prop('data-testid')).toEqual('testCheckbox');
  });
});


