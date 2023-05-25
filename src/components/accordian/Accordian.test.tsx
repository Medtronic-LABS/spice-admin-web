import { shallow, ShallowWrapper } from 'enzyme';
import { render, fireEvent } from '@testing-library/react';
import Accordian from './Accordian';

describe('Accordian component', () => {
    beforeEach(() => {
      shallow(
        <Accordian header={<h2>Header</h2>}
        body={<p>Body content</p>} />
      )
    });
  it('renders header and body contents', () => {
    const header = 'Header Content';
    const body = 'Body Content';
    const { getByText } = render(<Accordian header={header} body={body} />);
    expect(getByText(header)).toBeInTheDocument();
    expect(getByText(body)).toBeInTheDocument();
  });

  it('collapses and expands when clicked', () => {
    const header = 'Header Content';
    const body = 'Body Content';
    const { getByText } = render(<Accordian header={header} body={body} />);
    const accordionHeader = getByText(header);
    const accordionBody = getByText(body);

    // Default state: expanded
    expect(accordionHeader.classList.contains('collapsed')).toBe(false);
    expect(accordionBody.classList.contains('show')).toBe(false);

    // Click to collapse
    fireEvent.click(accordionHeader);
    expect(accordionHeader.classList.contains('collapsed')).toBe(true);
    expect(accordionBody.classList.contains('show')).toBe(false);

    // Click to expand
    fireEvent.click(accordionHeader);
    expect(accordionHeader.classList.contains('collapsed')).toBe(false);
    expect(accordionBody.classList.contains('show')).toBe(false);
  });

  it('handles `collapsed` prop correctly', () => {
    const header = 'Header Content';
    const body = 'Body Content';
    const { getByText } = render(<Accordian header={header} body={body} collapsed />);
    const accordionHeader = getByText(header);
    const accordionBody = getByText(body);

    // Default state: collapsed
    expect(accordionHeader.classList.contains('collapsed')).toBe(true);
    expect(accordionBody.classList.contains('show')).toBe(false);

    // Click to expand
    fireEvent.click(accordionHeader);
    expect(accordionHeader.classList.contains('collapsed')).toBe(true);
    expect(accordionBody.classList.contains('show')).toBe(false);
  });

  it('handles `defaultCollapsed` prop correctly', () => {
    const header = 'Header Content';
    const body = 'Body Content';
    const { getByText } = render(<Accordian header={header} body={body} defaultCollapsed />);
    const accordionHeader = getByText(header);
    const accordionBody = getByText(body);

    // Default state: collapsed
    expect(accordionHeader.classList.contains('collapsed')).toBe(true);
    expect(accordionBody.classList.contains('show')).toBe(false);

    // Click to expand
    fireEvent.click(accordionHeader);
    expect(accordionHeader.classList.contains('collapsed')).toBe(false);
    expect(accordionBody.classList.contains('show')).toBe(false);
  });

  it('calls `onToggle` prop when clicked', () => {
    const header = 'Header Content';
    const body = 'Body Content';
    const onToggle = jest.fn();
    const { getByText } = render(<Accordian header={header} body={body} onToggle={onToggle} />);
    const accordionHeader = getByText(header);

    // Click to collapse
    fireEvent.click(accordionHeader);
    expect(onToggle).toHaveBeenCalledTimes(1);

    // Click to expand
    fireEvent.click(accordionHeader);
    expect(onToggle).toHaveBeenCalledTimes(2);
  });
});
