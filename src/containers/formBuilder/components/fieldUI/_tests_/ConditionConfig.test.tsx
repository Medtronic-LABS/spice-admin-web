import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import arrayMutators from 'final-form-arrays';
import ConditionConfig from '../ConditionConfig';
import { Form } from 'react-final-form';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
describe('ConditionConfig Component', () => {
  const item = {
    lengthGreaterThan: 5,
    targetId: 'field1'
  };

  let store = mockStore({});
  const conditionFieldConfigs = {
    lengthGreaterThan: {
      name: '.lengthGreaterThan',
      type: 'number',
      label: 'Length Greater Than',
      error: 'Please enter a valid number',
      required: true,
      disabledValidation: true,
      component: 'TEXT_INPUT'
    },
    targetId: {
      name: '.targetId',
      label: 'Target Id',
      labelKey: 'label',
      valueKey: 'key',
      options: [
        { key: 'field1', label: 'Field 1' },
        { key: 'field2', label: 'Field 2' }
      ],
      component: 'SELECT_INPUT'
    },
    array: [
      {
        targetId: '1',
        targetOption: 'option'
      }
    ]
  };

  const props = {
    item,
    name: 'myFormName',
    obj: {
      id: 'myId',
      array: [
        {
          targetId: 0,
          targetOption: 'option'
        }
      ]
    },
    config: [],
    field: 'array',
    index: 0,
    conditionFieldConfigs,
    newlyAddedIds: ['field1', 'field2'],
    unAddedFields: [{ key: 'field3', label: 'Field 3' }],
    targetIds: [
      { key: 'field1', label: 'Field 1' },
      { key: 'field2', label: 'Field 2' }
    ]
  };

  const propsWithTextInput = {
    item,
    name: 'myFormName',
    obj: {
      id: 'myId',
      array: [
        {
          lengthGreaterThan: 0,
          targetOption: 'option'
        }
      ]
    },
    config: [],
    field: 'array',
    index: 0,
    conditionFieldConfigs,
    newlyAddedIds: ['field1', 'field2'],
    unAddedFields: [{ key: 'field3', label: 'Field 3' }],
    targetIds: [
      { key: 'field1', label: 'Field 1' },
      { key: 'field2', label: 'Field 2' }
    ]
  };

  const propsWithFieldNameEnabled = {
    item,
    name: 'myFormName',
    obj: {
      id: 'myId',
      array: [
        {
          enabled: false,
          targetOption: 'option'
        }
      ]
    },
    config: [],
    field: 'array',
    index: 0,
    conditionFieldConfigs,
    newlyAddedIds: ['field1', 'field2'],
    unAddedFields: [{ key: 'field3', label: 'Field 3' }],
    targetIds: [
      { key: 'field1', label: 'Field 1' },
      { key: 'field2', label: 'Field 2' }
    ]
  };

  const propsWithFieldNameVisibilty = {
    item,
    name: 'myFormName',
    obj: {
      id: 'myId',
      array: [
        {
          visibility: false,
          targetOption: 'option'
        }
      ]
    },
    config: [],
    field: 'array',
    index: 0,
    conditionFieldConfigs,
    newlyAddedIds: ['field1', 'field2'],
    unAddedFields: [{ key: 'field3', label: 'Field 3' }],
    targetIds: [
      { key: 'field1', label: 'Field 1' },
      { key: 'field2', label: 'Field 2' }
    ]
  };

  const propsWithFieldNameEq = {
    item,
    name: 'myFormName',
    obj: {
      id: 'myId',
      array: [
        {
          eq: false,
          targetOption: 'option'
        }
      ]
    },
    config: [],
    field: 'array',
    index: 0,
    conditionFieldConfigs,
    newlyAddedIds: ['field1', 'field2'],
    unAddedFields: [{ key: 'field3', label: 'Field 3' }],
    targetIds: [
      { key: 'field1', label: 'Field 1' },
      { key: 'field2', label: 'Field 2' }
    ]
  };

  const propsWithoutComponent = {
    item,
    name: 'myFormName',
    obj: {
      id: 'myId',
      array: [
        {
          targetId: 1,
          targetOption: 'option'
        }
      ]
    },
    config: [],
    field: 'array',
    index: 0,
    conditionFieldConfigs,
    newlyAddedIds: ['field1', 'field2'],
    unAddedFields: [{ key: 'field3', label: 'Field 3' }],
    targetIds: [
      { key: 'field1', label: 'Field 1' },
      { key: 'field2', label: 'Field 2' }
    ]
  };

  it('renders without error', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Form onSubmit={() => {}} mutators={{ ...arrayMutators }}>
            {({ handleSubmit }) => <ConditionConfig {...props} />}
          </Form>
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders with Text Input component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Form onSubmit={() => {}} mutators={{ ...arrayMutators }}>
            {({ handleSubmit }) => <ConditionConfig {...propsWithTextInput} />}
          </Form>
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders with fieldName as enabled', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Form onSubmit={() => {}} mutators={{ ...arrayMutators }}>
            {({ handleSubmit }) => <ConditionConfig {...propsWithFieldNameEnabled} />}
          </Form>
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  
  it('renders with fieldName as visibility', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Form onSubmit={() => {}} mutators={{ ...arrayMutators }}>
            {({ handleSubmit }) => <ConditionConfig {...propsWithFieldNameVisibilty} />}
          </Form>
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders with fieldName as eq', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Form onSubmit={() => {}} mutators={{ ...arrayMutators }}>
            {({ handleSubmit }) => <ConditionConfig {...propsWithFieldNameEq} />}
          </Form>
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });


  it('renders without component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Form onSubmit={() => {}} mutators={{ ...arrayMutators }}>
            {({ handleSubmit }) => <ConditionConfig {...propsWithoutComponent} />}
          </Form>
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
