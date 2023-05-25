import { mount, shallow } from 'enzyme';
import Searchbar from '../Searchbar';

describe('Searchbar', () => {
  const mockOnSearch = jest.fn();
  jest.useFakeTimers();

  it('renders without crashing', () => {
    shallow(<Searchbar onSearch={mockOnSearch} />);
  });

  it('renders with default placeholder text', () => {
    const wrapper = shallow(<Searchbar onSearch={mockOnSearch} />);
    const input = wrapper.find('input');
    expect(input.prop('placeholder')).toEqual('Search');
  });

  it('renders with custom placeholder text', () => {
    const placeholder = 'Type something to search...';
    const wrapper = shallow(<Searchbar placeholder={placeholder} onSearch={mockOnSearch} />);
    const input = wrapper.find('input');
    expect(input.prop('placeholder')).toEqual(placeholder);
  });

  it('calls onSearch when input value changes', () => {
    const mockOnSearch = jest.fn();
    const searchText = 'Hello world';
    const wrapper = mount(<Searchbar onSearch={mockOnSearch} />);
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: searchText } });
    jest.runOnlyPendingTimers(); // execute the setTimeout callback
    expect(mockOnSearch).toHaveBeenCalledWith(searchText);
  });

  it('clears the timer and updates search text when input value changes', () => {
    const searchText = 'Hello world';
    const wrapper = shallow(<Searchbar onSearch={mockOnSearch} />);
    const input = wrapper.find('input');
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    input.simulate('change', { target: { value: searchText } });
    expect(clearTimeoutSpy).toHaveBeenCalled();
    expect(wrapper.find('input').prop('value')).toEqual(searchText);
  });

  it('renders an outlined searchbar by default', () => {
    const wrapper = shallow(<Searchbar onSearch={mockOnSearch} />);
    const input = wrapper.find('input');
    expect(input.hasClass('searchbarOutlined')).toBe(false);
  });

  it('renders a non-outlined searchbar when isOutlined is false', () => {
    const wrapper = shallow(<Searchbar onSearch={mockOnSearch} isOutlined={false} />);
    const input = wrapper.find('input');
    expect(input.hasClass('searchbar')).toBe(false);
  });
});
