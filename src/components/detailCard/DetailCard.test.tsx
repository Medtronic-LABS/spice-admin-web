import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DetailCard from './DetailCard';

describe('DetailCard', () => {
    beforeEach(() => {
        const headerText = 'Test Header';
        const buttonLabel = 'Test Button';
        const onButtonClick = jest.fn();
        const onSearch = jest.fn();
        shallow(
            <DetailCard header={headerText} buttonLabel={buttonLabel} onButtonClick={onButtonClick} onSearch={onSearch} isSearch>
            <div>Test Child</div>
          </DetailCard>
        )
      });
  it('renders header and children', () => {
    const headerText = 'Test Header';
    const childText = 'Test Child';
    render(
      <DetailCard header={headerText}>
        <div>{childText}</div>
      </DetailCard>
    );
    expect(screen.getByText(headerText)).toBeInTheDocument();
    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  it('renders searchbar and button', () => {
    const headerText = 'Test Header';
    const buttonLabel = 'Test Button';
    const onButtonClick = jest.fn();
    const onSearch = jest.fn();
    render(
      <DetailCard header={headerText} buttonLabel={buttonLabel} onButtonClick={onButtonClick} onSearch={onSearch} isSearch={true} searchPlaceholder='Search Name' >
        <div>Test Child</div>
      </DetailCard>
    );
    const searchbar = screen.getByPlaceholderText('Search Name');
    const button = screen.getByText(buttonLabel);
    userEvent.type(searchbar, 'Test');
    userEvent.click(button);
    expect(onButtonClick).toHaveBeenCalled();
  });

  it('renders custom icon and label', () => {
    const headerText = 'Test Header';
    const customLabel = 'Test Custom Label';
    const customIcon = 'test-icon.png';
    const onCustomClick = jest.fn();
    render(
      <DetailCard header={headerText} customLabel={customLabel} customIcon={customIcon} onCustomClick={onCustomClick}>
        <div>Test Child</div>
      </DetailCard>
    );
    const icon = screen.getByAltText('custom-icon');
    userEvent.click(icon);
    expect(onCustomClick).toHaveBeenCalled();
  });
});
