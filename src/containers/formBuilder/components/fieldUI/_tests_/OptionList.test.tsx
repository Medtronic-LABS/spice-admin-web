import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Field, Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import configureMockStore from 'redux-mock-store';
import OptionList from '../OptionList';

const mockStore = configureMockStore();
describe('OptionList Component', () => {
  const obj = {
    id: '1684392315398Spinner',
    viewType: 'RadioGroup',
    title: '',
    fieldName: '',
    family: 'flu',
    isSummary: false,
    isMandatory: false,
    isEnabled: true,
    visibility: 'visible',
    condition: [{ eq: '' }],
    hint: '',
    optionsList: [],
    errorMessage: '',
    defaultValue: null,
    isNotDefault: true,
    orderId: 1
  };
  const inputProps = {
    label: 'Test Label'
  };

  it('should render StringOptionsRender when viewType is not RadioGroup or optionType is not checkbox', () => {
    const store = mockStore({
      workflow: {
        formMeta: [
          { key: 'age', type: 'number', label: 'Age' },
          { key: 'avgDiastolic', type: 'number', label: 'Avg Diastolic' }
        ]
      }
    });
    const mockParse = jest.fn((value) => value);
    const wrapper = mount(
      <Provider store={store}>
        <Form onSubmit={() => {}}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <OptionList name='testName' obj={obj} field='optionsList' inputProps={inputProps}>
                <Field name='testName' parse={mockParse} />
              </OptionList>
            </form>
          )}
        </Form>
      </Provider>
    );
    const parse = wrapper.find('ForwardRef(Field)');
    const parseFn: any = parse.prop('parse');
    parseFn(['New Option']);
    expect(wrapper.find('StringOptionsRender')).toHaveLength(1);
  });

  it('should render BooleanOptionsRender when viewType is RadioGroup and optionType is checkbox', () => {
    obj.id = 'isDeleted';
    const store = mockStore({
      workflow: {
        formMeta: [{ key: 'isDeleted', type: 'checkbox', label: 'Is Deleted' }]
      }
    });
    const mockParse = jest.fn((value) => value);
    const wrapper = mount(
      <Provider store={store}>
        <Form onSubmit={() => {}} mutators={{ ...arrayMutators }}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <OptionList name='testName' obj={obj} field='optionsList' inputProps={inputProps}>
                <Field name='testName' parse={mockParse} />
              </OptionList>
            </form>
          )}
        </Form>
      </Provider>
    );
    expect(wrapper.find('BooleanOptionsRender')).toHaveLength(1);
    const parse = wrapper.find('ForwardRef(Field)').first();
    const parseFn: any = parse.prop('parse');
    parseFn(['New Option']);
  });

  it('should render TagInput when viewType is not RadioGroup or optionType is not checkbox', () => {
    const store = mockStore({
      workflow: {
        formMeta: [
          { key: 'age', type: 'number', label: 'Age' },
          { key: 'avgDiastolic', type: 'number', label: 'Avg Diastolic' }
        ]
      }
    });
    const wrapper = mount(
      <Provider store={store}>
        <Form onSubmit={() => {}} mutators={{ ...arrayMutators }}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <OptionList name='testName' obj={obj} field='optionsList' inputProps={inputProps} />
            </form>
          )}
        </Form>
      </Provider>
    );
    expect(wrapper.find('StringOptionsRender').find('TagInput')).toHaveLength(1);
  });

  it('should render TextInput when viewType is RadioGroup and optionType is checkbox', () => {
    obj.id = 'isDeleted';
    const store = mockStore({
      workflow: {
        formMeta: [{ key: 'isDeleted', type: 'checkbox', label: 'Is Deleted' }]
      }
    });
    const wrapper = mount(
      <Provider store={store}>
        <Form onSubmit={() => {}} mutators={{ ...arrayMutators }}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <OptionList name='testName' obj={obj} field='optionsList' inputProps={inputProps} />
            </form>
          )}
        </Form>
      </Provider>
    );
    expect(wrapper.find('BooleanOptionsRender').find('TextInput')).toHaveLength(2);
  });
});
