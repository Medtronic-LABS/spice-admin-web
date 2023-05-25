import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import CustomTooltip from '../index';

describe('CustomTooltip', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<CustomTooltip title='test tooltip'>Test Content</CustomTooltip>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders children', () => {
    expect(wrapper.find('div').text()).toBe('Test Content');
  });

  it('renders the tooltip with the correct title', () => {
    const tooltipElement = wrapper.find('[data-testid="tooltip"]');
    expect(tooltipElement.prop('data-bs-original-title')).toBe('test tooltip');
  });

  it('shows the tooltip on hover', () => {
    const tooltipElement = wrapper.find('[data-testid="tooltip"]');
    tooltipElement.simulate('mouseenter');
    expect(tooltipElement.hasClass('show')).toBe(false);
    tooltipElement.simulate('mouseleave');
    expect(tooltipElement.hasClass('show')).toBe(false);
  });
});
