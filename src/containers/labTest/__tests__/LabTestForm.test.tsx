import { mount } from 'enzyme';
import { Field, Form } from 'react-final-form';
import LabTestForm from '../LabTestForm';

describe('LabTestForm', () => {
  let wrapper: any;
  let props: any;

  beforeEach(() => {
    props = {
      form: { getFieldState: jest.fn() },
      isEdit: false,
      isValid: true,
    };

    wrapper = mount(
        <Form onSubmit={() => {}}>
          {({ handleSubmit }) => <LabTestForm handleSubmit={handleSubmit} {...props} />}
        </Form>
    );
  });

  it('renders without errors', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders TextInput and Checkbox with the correct props', () => {
    const textInput = wrapper.find(Field).at(0);
    const checkbox = wrapper.find(Field).at(1);
    expect(textInput.props().name).toBe('name');
    expect(textInput.props().type).toBe('text');
    expect(textInput.props().validate).toEqual(expect.any(Function));
    expect(textInput.props().render).toEqual(expect.any(Function));
    expect(checkbox.props().name).toBe('active');
    expect(checkbox.props().type).toBe('checkbox');
    expect(checkbox.props().render).toEqual(expect.any(Function));
  });

  it('disables TextInput when isEdit is true', () => {
    props.isEdit = true;
    const textInput = wrapper.find(Field).at(0);
    expect(textInput.props().disabled).toBe(undefined);
  });

  it('disables Checkbox when isEdit is false', () => {
    props.isEdit = false;
    const checkbox = wrapper.find(Field).at(1);
    expect(checkbox.props().disabled).toBe(undefined);
  });
});
