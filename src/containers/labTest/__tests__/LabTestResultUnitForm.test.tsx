import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import LabTestResultUnitForm from '../LabTestResultUnitForm';

import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import arrayMutators from 'final-form-arrays';
import { Form } from 'react-final-form';

jest.mock('../../../components/customtable/ConfirmationModalPopup', () => () => null);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ tenantId: '3' })
}));

describe('LabTestResultUnitForm', () => {
  let store: any;
  let component: any;

  const initialState = {
    labtest: {
      units: ['unit1', 'unit2', 'unit3'],
      total: 3
    }
  };

  const mockStore = configureMockStore();
  store = mockStore(initialState);

  const labTestResultUnitFormProps:any = {
    form: {
      name: 'John Doe',
      age: 30,
      getState: () => ({
        values: {
          lab_result_units: [
            {
              unitId: 1,
              displayOrder: 1,
              minimumValue: 1,
              maximumValue: 10,
              displayName: 'name'
            }
          ]
        }
      })
    },
    initialEditValue: 'Initial value',
    setPreviousFieldValue: (fieldName: string, value: string) => {
    },
    setInternalFormState: (newState: any) => {
    },
    labResultRangesRefts: {
      range1: {
        min: 0,
        max: 100
      },
      range2: {
        min: 101,
        max: 200
      }
    },
    labResultRangesRef: {}
  };

  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Form onSubmit={() => {}} mutators={{ ...arrayMutators }}>
            {() => <LabTestResultUnitForm {...labTestResultUnitFormProps as any}  isLastChild={true} isFirstChild={false}/>}
          </Form>
        </MemoryRouter>
      </Provider>
    );
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('displays the correct initial values', () => {
    const textInput = component.find('TextInput');
    expect(textInput).toHaveLength(4);
  });

  
  it('Select Input to be rendered', () => {
    const selectInput = component.find('SelectInput');
    expect(selectInput).toHaveLength(1);
  });

  it('Field Array to be rendered', () => {
    const selectInput = component.find('FieldArray');
    expect(selectInput).toHaveLength(1);
    const actionButtons = component.find('ActionButtons');
    expect(actionButtons).toHaveLength(1);
  });
   
  it('Field Array to be rendered', () => {
    const mainDiv = component.find('.d-flex.flex-row');
    expect(mainDiv).toHaveLength(1);
  });
});
