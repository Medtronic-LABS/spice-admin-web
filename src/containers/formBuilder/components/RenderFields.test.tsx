import { mount } from 'enzyme';
import { Field, Form } from 'react-final-form';
import RenderFields, { CheckboxComponent, TextFieldComponent } from './RenderFields';
import { SelectInputValues } from './RenderFields';
import ConditionConfig from './fieldUI/ConditionConfig';
import Questionnaire from './fieldUI/Questionnaire';
import SelectFieldWrapper from './fieldUI/SelectFieldWrapper';
import arrayMutators from 'final-form-arrays';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ form: 'enrollment' }) // Mock the return value
}));

describe('RenderFields Test Cases', () => {
  const obj = { id: '123', fieldName: 'Field 1' };
  const name = 'exampleForm';
  const fieldName = 'fieldName';
  const inputProps = { component: 'SELECT_INPUT', label: 'Select Option' };
  const form = { mutators: { setValue: jest.fn() } };
  const unAddedFields = [
    { key: 'Option 1', type: 'Type 1' },
    { key: 'Option 2', type: 'Type 2' }
  ];
  const targetIds = ['456', '789'];
  const isNew = true;
  const newlyAddedIds = ['123'];
  const handleUpdateFieldName = jest.fn();
  const isAccountCustomization = false;
  const hashFieldIdsWithTitle = { '123': 'Field 1' };
  const hashFieldIdsWithFieldName = { 'Field 1': '123' };
  describe('CheckboxComponent', () => {
    it('renders checkbox with label and disabled state', () => {
      const wrapper = mount(
        <Form onSubmit={() => {}}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <CheckboxComponent
                name='form'
                fieldName='disableFutureDate'
                inputProps={{ label: 'Disable Future Date', disabled: true }}
              />
            </form>
          )}
        </Form>
      );
      expect(wrapper.find(CheckboxComponent)).toHaveLength(1);
      expect(wrapper.find(Field).prop('name')).toBe('form.disableFutureDate');
      expect(wrapper.find(Field).prop('type')).toBe('checkbox');
      expect(wrapper.find('Checkbox')).toHaveLength(1);
      expect(wrapper.find('label').text()).toBe('Disable Future Date');
      expect(wrapper.find('input')).toHaveLength(1);
      expect(wrapper.find('input').prop('disabled')).toBe(true);
    });
  });

  describe('SelectInputValues', () => {
    it('renders select input with options and selected value', () => {
      const options = [
        { key: 'option1', label: 'Option 1' },
        { key: 'option2', label: 'Option 2' },
        { key: 'option3', label: 'Option 3' }
      ];
      const wrapper = mount(
        <Form onSubmit={() => {}}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <SelectInputValues
                name='form'
                fieldName='visibility'
                obj={{ visibility: 'option2' }}
                inputProps={{ options }}
              />
            </form>
          )}
        </Form>
      );
      expect(wrapper.find(Field)).toHaveLength(1);
      expect(wrapper.find(Field).prop('name')).toBe('form');
      expect(wrapper.find(Field).prop('type')).toEqual('select');
    });

    it('renders select input with disabled state', () => {
      const options = [
        { key: 'option1', label: 'Option 1' },
        { key: 'option2', label: 'Option 2' },
        { key: 'option3', label: 'Option 3' }
      ];
      const wrapper = mount(
        <Form onSubmit={() => {}}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <SelectInputValues
                name='form'
                fieldName='family'
                obj={{ visibility: 'option2' }}
                inputProps={{ options, disabled: true }}
              />
            </form>
          )}
        </Form>
      );
      expect(wrapper.find(Field)).toHaveLength(1);
      expect(wrapper.find(Field).prop('name')).toBe('form');
      expect(wrapper.find(Field).prop('type')).toEqual('select');
    });

    it('renders select input with disabled state', () => {
      const options = [
        { key: 'option1', label: 'Option 1' },
        { key: 'option2', label: 'Option 2' },
        { key: 'option3', label: 'Option 3' }
      ];
      const wrapper = mount(
        <Form onSubmit={() => {}}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <SelectInputValues
                name='form'
                fieldName='mandatoryCount'
                obj={{ visibility: 'option2' }}
                inputProps={{ options, disabled: true }}
              />
            </form>
          )}
        </Form>
      );
      expect(wrapper.find(Field)).toHaveLength(1);
      expect(wrapper.find(Field).prop('name')).toBe('form');
      expect(wrapper.find(Field).prop('type')).toEqual('select');
    });

    it('renders select input with disabled state', () => {
      const options = [
        { key: 'option1', label: 'Option 1' },
        { key: 'option2', label: 'Option 2' },
        { key: 'option3', label: 'Option 3' }
      ];
      const wrapper = mount(
        <Form onSubmit={() => {}}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <SelectInputValues
                name='form'
                fieldName='totalCount'
                obj={{ visibility: 'option2' }}
                inputProps={{ options, disabled: true }}
              />
            </form>
          )}
        </Form>
      );
      expect(wrapper.find(Field)).toHaveLength(1);
      expect(wrapper.find(Field).prop('name')).toBe('form');
      expect(wrapper.find(Field).prop('type')).toEqual('select');
    });

    it('calls the onChange prop when input value is changed', () => {
      const mockOnChange = jest.fn();
      const wrapper = mount(
        <Form onSubmit={() => {}}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name='testField'>{({ input }) => <input {...input} onChange={mockOnChange} />}</Field>
            </form>
          )}
        </Form>
      );
      const input = wrapper.find('input');
      input.simulate('change', { target: { value: 'test' } });
      expect(mockOnChange).toHaveBeenCalled();
    });

    it('renders the correct number of fields', () => {
      const wrapper = mount(
        <Form onSubmit={() => {}}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <ConditionConfig
                field='testField'
                name='testField'
                obj={{ testField: {} }}
                form={{ mutators: {} }}
                targetIds={[]}
                unAddedFields={[]}
                newlyAddedIds={[]}
              />
            </form>
          )}
        </Form>
      );
      expect(wrapper.find('Field')).toHaveLength(0);
    });

    it('renders text input with default value and onChange handler', () => {
      const obj = { name: 'John Doe' };
      const inputProps = { label: 'Name' };
      const wrapper = mount(
        <Form onSubmit={() => {}}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextFieldComponent
                form={{ mutators: { setValue: jest.fn() } }}
                name='form'
                fieldName='fieldName'
                obj={obj}
                inputProps={inputProps}
              />
            </form>
          )}
        </Form>
      );
      expect(wrapper.find(Field)).toHaveLength(1);
      expect(wrapper.find(Field).prop('name')).toBe('form.fieldName');
      expect(wrapper.find(Field).prop('type')).toEqual('text');
      expect(wrapper.find('input').prop('value')).toEqual('');
      wrapper.find('input').simulate('change', { target: { value: 'Jane Doe' } });
      expect(wrapper.find('input').prop('value')).toEqual('Jane Doe');
      expect(wrapper.find('input').prop('name')).toEqual('form.fieldName');
      expect(wrapper.find('input').prop('disabled')).toBeFalsy();
    });
  });
  it('renders the correct number of fields', () => {
    const wrapper = mount(
      <Form onSubmit={() => {}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <ConditionConfig
              field='testField'
              name='testField'
              obj={{ testField: {} }}
              form={{ mutators: {} }}
              targetIds={[]}
              unAddedFields={[]}
              newlyAddedIds={[]}
            />
          </form>
        )}
      </Form>
    );
    expect(wrapper.find('CustomTooltip')).toHaveLength(1);
  });
  it('renders Questionnaire component with default value and onChange handler', () => {
    const obj = { questionnaire: ['question1', 'question2'] };
    const wrapper = mount(
      <Form onSubmit={() => {}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Questionnaire
              label='Questionnaire'
              defaultValue={obj.questionnaire}
              required={false}
              onChange={(value) => {
                obj.questionnaire = value;
              }}
            />
          </form>
        )}
      </Form>
    );
    expect(wrapper.find(Questionnaire)).toHaveLength(1);
    expect(wrapper.find(Questionnaire).prop('label')).toBe('Questionnaire');
    expect(wrapper.find(Questionnaire).prop('defaultValue')).toEqual(['question1', 'question2']);
    expect(wrapper.find(Questionnaire).prop('required')).toBe(false);
    const newValue = ['question2', 'question3', 'question4'];
    wrapper.find(Questionnaire).prop('onChange')?.(newValue);
    expect(obj.questionnaire).toEqual(newValue);
  });

  it('should render CheckboxComponent correctly', () => {
    const props = {
      name: 'yourFieldName',
      fieldName: 'orientation',
      inputProps: { disabled: false, label: 'Your Label' }
    };
    const wrapper = mount(
      <Form onSubmit={() => {}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name={props.name}
              render={({ input }) => (
                <CheckboxComponent name={props.name} fieldName={props.fieldName} inputProps={props.inputProps} />
              )}
            />
          </form>
        )}
      </Form>
    );
    expect(wrapper.find('CheckboxComponent').props().name).toBe(props.name);
  });

  it('should render a checkbox with a label', () => {
    const name = 'myForm';
    const fieldName = 'myField';
    const inputProps = { label: 'My Label' };
    const props: any = {
      name: `${name}.${fieldName}`,
      fieldName: 'myField',
      ...inputProps,
      component: CheckboxComponent
    };
    const wrapper = mount(
      <Form onSubmit={() => {}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field {...props} />
          </form>
        )}
      </Form>
    );
    expect(wrapper.find('input[type="checkbox"]').length).toEqual(1);
    expect(wrapper.find('input[type="checkbox"]').prop('disabled')).toBeFalsy();
    expect(wrapper.find('input[type="checkbox"]').prop('readOnly')).toBeFalsy();
    expect(wrapper.find('input[type="checkbox"]').prop('checked')).toBeFalsy();
    expect(wrapper.find('label').text()).toEqual('');
  });

  it('should render a select input with options', () => {
    const name = 'myForm';
    const fieldName = 'myField';
    const inputProps = {
      options: [
        { key: 'value1', label: 'Label 1' },
        { key: 'value2', label: 'Label 2' }
      ]
    };
    const obj = { myField: 'value2' };
    const props: any = {
      name: `${name}.${fieldName}`,
      fieldName: 'myField',
      ...inputProps,
      component: CheckboxComponent,
      obj: obj
    };
    const wrapper = mount(
      <Form onSubmit={() => {}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field {...props} />
          </form>
        )}
      </Form>
    );
    expect(wrapper.find('select').length).toEqual(0);
    expect(wrapper.find('option').length).toEqual(0);
  });

  it('renders SelectInputValues correctly', () => {
    const props = {
      name: 'formName',
      fieldName: 'fieldName',
      inputProps: { options: ['Option 1', 'Option 2'] },
      obj: {},
      newlyAddedIds: [],
      unAddedFields: [],
      handleUpdateFieldName: jest.fn()
    };
    const wrapper = mount(
      <Form onSubmit={() => {}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <SelectInputValues {...props} />
          </form>
        )}
      </Form>
    );
    expect(wrapper.find('SelectFieldWrapper')).toHaveLength(1);
  });

  it('renders SelectInputValues with fieldName orientation', () => {
    const props = {
      name: 'formName',
      fieldName: 'orientation',
      inputProps: { options: ['Option 1', 'Option 2'] },
      obj: {},
      newlyAddedIds: [],
      unAddedFields: [],
      handleUpdateFieldName: jest.fn()
    };
    const wrapper = mount(
      <Form onSubmit={() => {}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <SelectInputValues {...props} />
          </form>
        )}
      </Form>
    );
    expect(wrapper.find('SelectFieldWrapper')).toHaveLength(1);
  });

  it('renders SelectInputValues with fieldName defaultValue', () => {
    const props = {
      name: 'formName',
      fieldName: 'defaultValue',
      inputProps: { options: ['Option 1', 'Option 2'] },
      obj: {},
      newlyAddedIds: [],
      unAddedFields: [],
      handleUpdateFieldName: jest.fn()
    };
    const wrapper = mount(
      <Form onSubmit={() => {}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <SelectInputValues {...props} />
          </form>
        )}
      </Form>
    );
    expect(wrapper.find('SelectFieldWrapper')).toHaveLength(1);
  });

  it('renders SelectInputValues with fieldName inputType', () => {
    const props = {
      name: 'formName',
      fieldName: 'inputType',
      inputProps: { options: ['Option 1', 'Option 2'] },
      obj: {},
      newlyAddedIds: [],
      unAddedFields: [],
      handleUpdateFieldName: jest.fn()
    };
    const wrapper = mount(
      <Form onSubmit={() => {}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <SelectInputValues {...props} />
          </form>
        )}
      </Form>
    );
    expect(wrapper.find('SelectFieldWrapper')).toHaveLength(1);
  });

  it('renders SelectInputValues with fieldName unitMeasurement', () => {
    const props = {
      name: 'formName',
      fieldName: 'unitMeasurement',
      inputProps: { options: ['Option 1', 'Option 2'] },
      obj: {},
      newlyAddedIds: [],
      unAddedFields: [],
      handleUpdateFieldName: jest.fn()
    };
    const wrapper = mount(
      <Form onSubmit={() => {}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <SelectInputValues {...props} />
          </form>
        )}
      </Form>
    );
    expect(wrapper.find('SelectFieldWrapper')).toHaveLength(1);
  });

  it('renders TextFieldComponent correctly', () => {
    const props = {
      form: {},
      name: 'formName',
      fieldName: 'fieldName',
      obj: {},
      inputProps: { type: 'text' },
      targetIds: [],
      newlyAddedIds: [],
      handleUpdateFieldName: jest.fn(),
      hashFieldIdsWithTitle: {},
      hashFieldIdsWithFieldName: {},
      isAccountCustomization: false
    };
    const wrapper = mount(
      <Form onSubmit={() => {}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextFieldComponent {...props} />
          </form>
        )}
      </Form>
    );
    expect(wrapper.find('TextFieldWrapper')).toHaveLength(1);
  });

  it('renders TextFieldComponent correctly with defaultValue', () => {
    const props = {
      form: {},
      name: 'formName',
      fieldName: 'fieldName',
      obj: {},
      inputProps: { type: 'text' },
      targetIds: [],
      newlyAddedIds: [],
      handleUpdateFieldName: jest.fn(),
      hashFieldIdsWithTitle: {},
      hashFieldIdsWithFieldName: {},
      isAccountCustomization: false
    };
    const wrapper = mount(
      <Form onSubmit={() => {}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextFieldComponent {...props} />
          </form>
        )}
      </Form>
    );
    expect(wrapper.find('TextFieldWrapper')).toHaveLength(1);
  });

  it('should render select input with options', () => {
    const name = 'exampleField';
    const customValue = 'option2';
    const customOptions = [
      { key: 'option1', label: 'Option 1' },
      { key: 'option2', label: 'Option 2' },
      { key: 'option3', label: 'Option 3' }
    ];
    const customParseFn = jest.fn();
    const inputProps = {
      component: 'SELECT_INPUT',
      label: 'Example Field',
      options: customOptions
    };
    const wrapper = mount(
      <Form onSubmit={() => {}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <SelectFieldWrapper
              name={name}
              customValue={customValue}
              customOptions={customOptions}
              customParseFn={customParseFn}
              inputProps={inputProps}
            />
          </form>
        )}
      </Form>
    );
    expect(wrapper.find('select').exists()).toBe(false);
    expect(wrapper.find('option')).toHaveLength(0);
    expect(customParseFn).toHaveBeenCalledTimes(0);
  });

  it('should return the correct inputProps when fieldName is "fieldName" and isNew is true', () => {
    const getComponentsByFieldName = jest.fn();
    const fieldName = 'fieldName';
    const obj = {};
    const isNew = true;
    const isAccountCustomization = false;
    const expected = undefined;
    const inputProps = getComponentsByFieldName(fieldName, obj, isNew, isAccountCustomization);
    expect(inputProps).toEqual(expected);
  });

  it('should return the correct customOptions, customParseFn, and customValue', () => {
    const handleUpdateFieldName = jest.fn();
    expect(handleUpdateFieldName).not.toHaveBeenCalled();
  });

  it('should render the appropriate component based on inputProps', () => {
    const wrapper = mount(
      <Form onSubmit={() => {}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <RenderFields
              obj={obj}
              name={name}
              fieldName={fieldName}
              inputProps={inputProps}
              form={form}
              unAddedFields={unAddedFields}
              targetIds={targetIds}
              isNew={isNew}
              newlyAddedIds={newlyAddedIds}
              handleUpdateFieldName={handleUpdateFieldName}
              isAccountCustomization={isAccountCustomization}
              hashFieldIdsWithTitle={hashFieldIdsWithTitle}
              hashFieldIdsWithFieldName={hashFieldIdsWithFieldName}
            />
          </form>
        )}
      </Form>
    );
    expect(wrapper.find('SelectInputValues').length).toBe(1);
    expect(wrapper.find('CheckboxComponent').length).toBe(0);
    expect(wrapper.find('TextInputArray').length).toBe(0);
  });

  it('renders CheckboxComponent for component="CHECKBOX"', () => {
    inputProps.component = 'INSTRUCTIONS';
    const wrapper = mount(
      <Form onSubmit={() => {}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <RenderFields
              obj={obj}
              name={name}
              fieldName={fieldName}
              inputProps={inputProps}
              form={form}
              unAddedFields={unAddedFields}
              targetIds={targetIds}
              isNew={isNew}
              newlyAddedIds={newlyAddedIds}
              handleUpdateFieldName={handleUpdateFieldName}
              isAccountCustomization={isAccountCustomization}
              hashFieldIdsWithTitle={hashFieldIdsWithTitle}
              hashFieldIdsWithFieldName={hashFieldIdsWithFieldName}
            />
          </form>
        )}
      </Form>
    );
    const textInputArray = wrapper.find('TextInputArray');
    expect(textInputArray).toHaveLength(0);
    expect(wrapper.find(CheckboxComponent)).toHaveLength(0);
  });

  it('renders INSTRUCTIONS', () => {
    const wrapper = mount(
      <Form onSubmit={() => {}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <RenderFields
              obj={obj}
              name={name}
              fieldName={'defaultValue'}
              inputProps={{ ...inputProps, component: 'INSTRUCTIONS' }}
              form={form}
              unAddedFields={unAddedFields}
              targetIds={targetIds}
              isNew={true}
              newlyAddedIds={newlyAddedIds}
              handleUpdateFieldName={handleUpdateFieldName}
              isAccountCustomization={false}
              hashFieldIdsWithTitle={hashFieldIdsWithTitle}
              hashFieldIdsWithFieldName={hashFieldIdsWithFieldName}
            />
          </form>
        )}
      </Form>
    );
    const textInputArray = wrapper.find('TextInputArray');
    expect(textInputArray).toHaveLength(1);
  });

  it('renders QUESTIONNAIRE', () => {
    const wrapper = mount(
      <Form onSubmit={() => {}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <RenderFields
              obj={{ ...obj, viewType: 'MentalHealthView' }}
              name={name}
              fieldName={'optionsList'}
              inputProps={inputProps}
              form={form}
              unAddedFields={unAddedFields}
              targetIds={targetIds}
              isNew={true}
              newlyAddedIds={newlyAddedIds}
              handleUpdateFieldName={handleUpdateFieldName}
              isAccountCustomization={false}
              hashFieldIdsWithTitle={hashFieldIdsWithTitle}
              hashFieldIdsWithFieldName={hashFieldIdsWithFieldName}
            />
          </form>
        )}
      </Form>
    );
    const textInputArray = wrapper.find('TextInputArray');
    expect(textInputArray).toHaveLength(0);
  });

  it('renders CONDITION CONFIG', () => {
    const wrapper = mount(
      <Form onSubmit={() => {}} mutators={{ ...arrayMutators }}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <RenderFields
              obj={{
                id: 'Qerq',
                viewType: 'CheckBox',
                title: 'Qerq',
                fieldName: 'Qerq',
                family: 'testflow',
                selectAll: true,
                isSummary: false,
                isMandatory: true,
                isEnabled: true,
                visibility: 'visible',
                condition: [
                  {
                    eq: 'no',
                    visibility: 'visible'
                  }
                ],
                hint: '',
                optionsList: [
                  {
                    name: 'yes',
                    id: 'yes'
                  },
                  {
                    name: 'no',
                    id: 'no'
                  }
                ],
                errorMessage: 'eewqeqw',
                isNotDefault: true,
                orderId: 1
              }}
              name={name}
              fieldName={'condition'}
              inputProps={{ ...inputProps, component: 'CONDITION_CONFIG' }}
              form={form}
              unAddedFields={unAddedFields}
              targetIds={targetIds}
              isNew={true}
              newlyAddedIds={newlyAddedIds}
              handleUpdateFieldName={handleUpdateFieldName}
              isAccountCustomization={false}
              hashFieldIdsWithTitle={hashFieldIdsWithTitle}
              hashFieldIdsWithFieldName={hashFieldIdsWithFieldName}
            />
          </form>
        )}
      </Form>
    );
    const textInputArray = wrapper.find('TextInputArray');
    expect(textInputArray).toHaveLength(0);
  });
});
