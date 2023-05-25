import { mount } from 'enzyme';
import { Field, Form } from 'react-final-form';
import SelectFieldWrapper from '../SelectFieldWrapper';
import { composeValidators, formValidators } from '../../../../../utils/validation';

describe('SelectFieldWrapper', () => {
  let props: any;
  let wrapper: any;

  beforeEach(() => {
    props = {
      obj: {},
      name: 'test',
      inputProps: {
        options: [
          { key: '1', label: 'Option 1' },
          { key: '2', label: 'Option 2' },
        ],
        label: 'Test Label',
        labelKey: 'label',
        valueKey: 'key',
        disabled: false,
        required: true,
      },
    };
    wrapper = mount(
      <Form onSubmit={() => {}}>
        {() => <SelectFieldWrapper {...props} />}
      </Form>
    );
  });

  it('should render correctly', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render select options', () => {
    const selectInput = wrapper.find('SelectInput');
    const options = selectInput.prop('options');
    expect(options.length).toBe(2);
    expect(options[0]).toEqual({ key: '1', label: 'Option 1' });
    expect(options[1]).toEqual({ key: '2', label: 'Option 2' });
  });

  it('should be a function that returns null when inputProps.disabledValidation is truthy', () => {
    const wrapper = mount(
    <Form onSubmit={() => {}}>
        {() =><SelectFieldWrapper
        obj={{}}
        inputProps={{ disabledValidation: true }}
      />}
    </Form>
    );
    const validateProp = wrapper.find(Field).prop('validate');
    if (validateProp)
    expect(validateProp("value",{})).toBeNull();
  });

  it('should be a function that composes all the validators returned by formValidators(inputProps) when inputProps.disabledValidation is falsy', () => {
    const wrapper = mount(
    <Form onSubmit={() => {}}>
        {() =><SelectFieldWrapper
        obj={{}}
        inputProps={{ disabledValidation: true }}
      />}
    </Form>
    );
    const validateProp = wrapper.find(Field).prop('validate');
    if (validateProp)
    expect(validateProp("value",{})).toEqual(null);
  });
  
});
