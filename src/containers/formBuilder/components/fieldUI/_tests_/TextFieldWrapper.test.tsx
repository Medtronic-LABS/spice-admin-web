import { mount } from 'enzyme';
import { Field, Form } from 'react-final-form';
import TextFieldWrapper from '../TextFieldWrapper';
import TextInput from '../../../../../components/formFields/TextInput';

describe('TextFieldWrapper', () => {
  const props = {
    name: 'testName',
    inputProps: {
      label: 'Test Label',
      type: 'text',
      visible: true,
      required: true
    },
    fieldName: 'name'
  };

  const buildWrapper = (customProps = {}) => {
    const mergedProps = { ...props, ...customProps };
    return mount(
      <Form onSubmit={() => {}}>
        {({ handleSubmit }: any) => (
          <form onSubmit={handleSubmit}>
            <TextFieldWrapper {...mergedProps} />
          </form>
        )}
      </Form>
    );
  };

  it('should render a Field component with correct props', () => {
    const wrapper = buildWrapper();
    expect(wrapper.find(Field).props()).toMatchObject({
      name: props.name,
      parse: expect.any(Function),
      type: 'text',
      value: null,
      validate: expect.any(Function)
    });
  });

  it('should render a TextInput component with correct props', () => {
    const wrapper = buildWrapper();
    expect(wrapper.find(TextInput).props()).toMatchObject({
      label: props.inputProps.label,
      onKeyDown: expect.any(Function),
      onBlurCapture: expect.any(Function),
      error: 'Please enter  test label',
      isShowLabel: props.inputProps.visible,
      required: props.inputProps.required,
      capitalize: false,
      disabled: undefined
    });
  });
  it('should set the input type to "number" if the inputProps type is "number" or "decimal"', () => {
    const numberWrapper = mount(
      <Form onSubmit={() => {}}>
        {({ handleSubmit }: any) => (
          <form onSubmit={handleSubmit}>
            <TextFieldWrapper inputProps={{ ...props.inputProps, type: 'number' }} fieldName='name' />
          </form>
        )}
      </Form>
    );
    expect(numberWrapper.find(TextInput).prop('type')).toBe('number');

    const decimalWrapper = mount(
      <Form onSubmit={() => {}}>
        {({ handleSubmit }: any) => (
          <form onSubmit={handleSubmit}>
            <TextFieldWrapper inputProps={{ ...props.inputProps, type: 'decimal' }} fieldName='name' />
          </form>
        )}
      </Form>
    );
    decimalWrapper.setProps({ inputProps: { type: 'decimal' } });
    expect(decimalWrapper.find(TextInput).prop('type')).toBe('number');
  });

  it('should not set the input type to "number" if the inputProps type is not "number" or "decimal"', () => {
    const wrapper = buildWrapper();
    expect(wrapper.find(TextInput).prop('type')).toBe('text');
  });

  it('should render the label from inputProps', () => {
    const wrapper = buildWrapper();
    expect(wrapper.find(TextInput).prop('label')).toBe('Test Label');
  });
});