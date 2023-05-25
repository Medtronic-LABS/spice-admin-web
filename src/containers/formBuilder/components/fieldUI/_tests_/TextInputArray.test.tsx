import { mount, shallow } from 'enzyme';
import TextInputArray from '../TextInputArray';

describe('TextInputArray', () => {
  const onChange = jest.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  it('renders without crashing', () => {
    shallow(<TextInputArray />);
  });

  it('renders with props', () => {
    const wrapper = mount(<TextInputArray defaultValue={['test1', 'test2']} label='test label' required={true} disabled={false}/>);
    expect(wrapper.prop('defaultValue')).toEqual(['test1', 'test2']);
    expect(wrapper.prop('label')).toEqual('test label');
    expect(wrapper.prop('required')).toEqual(true);
    expect(wrapper.prop('disabled')).toEqual(false);
  });

  it('triggers onChange when input values change', () => {
    const wrapper = mount(<TextInputArray defaultValue={['test1', 'test2']} onChange={onChange} />);
    wrapper
      .find('div[contentEditable=true]')
      .at(0)
      .simulate('blur', { target: { innerText: 'new test' } });
    expect(onChange).toHaveBeenCalledWith(['new test', 'test2']);

    wrapper
      .find('div[contentEditable=true]')
      .at(1)
      .simulate('blur', { target: { innerText: 'another new test' } });
    expect(onChange).toHaveBeenCalledWith(['new test', 'another new test']);
  });

  it('triggers onChange when inputs are deleted', () => {
    const wrapper = mount(<TextInputArray defaultValue={['test1', 'test2']} onChange={onChange} />);
    wrapper.find('img').at(0).simulate('click');
    expect(onChange).toHaveBeenCalledWith(['test2']);
  });

  it('adds a new input when add button is clicked', () => {
    const handleAdd= jest.fn()
    const wrapper = mount(<TextInputArray defaultValue={['test1', 'test2']} onChange={handleAdd} />);
    wrapper.find('.pointer.d-flex.align-items-center.mt-0dot5').at(0).simulate('click');
    expect(handleAdd).not.toHaveBeenCalled();
  });

  it('does not add a new input when disabled', () => {
    const handleAdd= jest.fn()
    const wrapper = mount(<TextInputArray defaultValue={['test1', 'test2']} onChange={handleAdd} />);
    wrapper.find('.pointer.d-flex.align-items-center.mt-0dot5').at(0).simulate('click');
    expect(handleAdd).not.toHaveBeenCalled();
  });
});
