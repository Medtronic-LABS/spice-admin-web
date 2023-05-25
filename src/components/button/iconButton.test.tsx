import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import IconButton from './IconButton';

describe('IconButton', () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  beforeEach(() => {
    const handleClick = jest.fn();
    wrapper = shallow(
      <IconButton label="Test Button" handleClick={handleClick} />
    )
  });

  it('should render with default props', () => {
    expect(wrapper.find('.primary-btn').exists()).toBe(true);
  });
});