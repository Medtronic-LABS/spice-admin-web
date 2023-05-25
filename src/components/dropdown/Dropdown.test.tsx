import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dropdown from './Dropdown';

describe('Dropdown', () => {
  const menuItems = [
    { menuText: 'Item 1', route: '/item1' },
    { menuText: 'Item 2', route: '/item2' },
    { menuText: 'Item 3', onClick: jest.fn() },
  ];

  beforeEach(() => {
    shallow(
      <Dropdown label="Test Button" menuItems={menuItems} />
    )
  });

  it('should render the label and menu items', () => {
    const { getByText } = render(
      <Router>
        <Dropdown label="Dropdown" menuItems={menuItems} />
      </Router>
    );

    const dropdownButton = getByText('Dropdown');
    fireEvent.click(dropdownButton);

    const item1Link = getByText('Item 1');
    expect(item1Link).toHaveAttribute('href', '/item1');

    const item2Link = getByText('Item 2');
    expect(item2Link).toHaveAttribute('href', '/item2');

    const item3 = getByText('Item 3');
    fireEvent.click(item3);
    expect(menuItems[2].onClick).toHaveBeenCalled();
  });

  it('should apply the className prop to the button', () => {
    const { getByText } = render(
      <Router>
        <Dropdown label="Dropdown" menuItems={menuItems} className="my-dropdown" />
      </Router>
    );

    const dropdownButton = getByText('Dropdown');
    expect(dropdownButton).toHaveClass('my-dropdown');
  });

  it('should apply the menuClass prop to the menu items', () => {
    const { getByText } = render(
      <Router>
        <Dropdown label="Dropdown" menuItems={[{ menuText: 'Item', menuClass: 'my-item' }]} />
      </Router>
    );

    const item = getByText('Item');
    expect(item).toHaveClass('my-item');
  });
});
