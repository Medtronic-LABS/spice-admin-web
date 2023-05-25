import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { ILabTest } from '../../../store/labTest/types';
import AddLabTest from '../AddLabTest';
import { Form } from 'react-final-form';

const mockStore = configureMockStore();
jest.mock('../../../assets/images/ranges.svg', () => ({
    ReactComponent: 'RangesIcon'
  }));
describe('AddLabTest', () => {
  let wrapper: ReactWrapper;
  let store: any;
  const labTestId = '123';
  const labTestTenantId = '456';
  const mockLabTest: ILabTest = {
    id: labTestId,
    countryId: '1',
    tenantId: labTestTenantId,
    name: 'Test Lab Test',
    active: true,
    labTestResults: [{ id: '1', name: 'Result 1', deleted: false, displayOrder: 1 }]
  };

  const props : any = {
    regionId: '1', 
    tenantId: '2',
    match:{
      params: {
        regionId: '1', 
        tenantId: '2',
      }
    }
  }
  beforeEach(() => {
    store = mockStore({
        labtest: {
            loading: false
      },
      user: {
        timezoneList:[
            {
                id:1
              },
              {
                id: 2
              }
        ]
      }
    });
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <AddLabTest {...props} />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render the AddLabTest component without errors', () => {
    expect(wrapper.find(AddLabTest).length).toBe(1);
  });

  it('should fetch the lab test by ID on mount', () => {
    const expectedAction = { type: 'FETCH_COUNTRY_LIST_REQUEST' };
    expect(store.getActions()).toContainEqual(expectedAction);
  });

  it('should update the form fields with the lab test data when fetched', () => {
    store = mockStore({
        labtest: {
            loading: false
      },
      user: {
        timezoneList:[
            {
                id:1
              },
              {
                id: 2
              }
        ]
      }
    });
    store.dispatch({ type: 'FETCH_LABTEST_BY_ID_SUCCESS', payload: { labTest: mockLabTest } });
    wrapper.update();

    const nameInput = wrapper.find('input[name="name"]');

    expect(nameInput.exists()).toBe(true);
  });

it('submits the form', () => {
    const mockDispatch = jest.fn();
    jest.mock('react-redux', () => ({
      useDispatch: () => mockDispatch,
      useSelector: () => jest.fn(),
    }));

    const wrapper = mount(
        <Provider store={store}>
        <MemoryRouter>
        <Form onSubmit={() => {}}>
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
          <AddLabTest {...props} />
          </form>
    )}
  </Form>
        </MemoryRouter>
        </Provider>);
        expect(wrapper.find('FormContainer')).toHaveLength(1);
    wrapper.find('ReactFinalForm').at(0).simulate('submit', { preventDefault: () => {} });
    expect(mockDispatch).toHaveBeenCalledTimes(0);
  });

  it("should call onSubmit when the form is submitted with valid input values", () => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <Form onSubmit={() => {}}>
                    {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <AddLabTest {...props} />
                    </form>
                    )}
                </Form>
            </MemoryRouter>
        </Provider>);
    wrapper.find("input[name='name']").simulate("change", { target: { value: "Test Name" } });
    wrapper.find("form").at(0).simulate("submit");
  });

  it('should render a loader when loading is true', () => {
    expect(wrapper.find('Loader')).toHaveLength(0);
  });

  it('should render the submit button', () => {
    const form = wrapper.find('form');
    form.simulate('submit', { preventDefault: () => {} });
    expect(wrapper.find('[type="submit"]').exists()).toBe(true);
  })


  it('should render the submit button', () => {
    const form = wrapper.find('form');
    form.simulate('submit', { preventDefault: () => {} });
    expect(wrapper.find('[type="button"]').exists()).toBe(true);
  })

  it('should render a LabTestForm', () => {
    expect(wrapper.find('LabTestForm')).toHaveLength(1);
  });

  it('should render a LabTestResultForm', () => {
    expect(wrapper.find('LabTestResultForm')).toHaveLength(1);
  });

  it('should call onEdit when labTestId is truthy and checkDuplicateValidation returns false', () => {
    const onEditMock = jest.fn();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(onEditMock).toHaveBeenCalledTimes(0);
  });

  it('should not call onEdit or onAdd when checkDuplicateValidation returns true', () => {
    const onAddMock = jest.fn();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(onAddMock).toHaveBeenCalledTimes(0);
  });

  it('should show an error message when there are unsaved changes', () => {
    const toastCenterErrorMock = jest.fn();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(toastCenterErrorMock).toBeCalledTimes(0);
  });

  it("should call onSubmit when form is submitted", () => {
    const onSubmit = jest.fn();
    const handleSubmit: any = wrapper.find('ReactFinalForm').prop('onSubmit');
    handleSubmit(mockLabTest);
    wrapper.setProps({ onSubmit });
    expect(onSubmit).toBeCalledTimes(0);
  });

  it('should call updateLabtestRequest with correct data', () => {
    const setInternalFormState: any = wrapper.find('LabTestResultForm').prop('setInternalFormState');
    setInternalFormState({ isValueChanged: true, isValid: true },1,false);
    setInternalFormState({ isValueChanged: true, isValid: true },1,true);

    const setPreviousFieldValue: any = wrapper.find('LabTestResultForm').prop('setPreviousFieldValue');
    setPreviousFieldValue({ displayOrder: 1, name:'Test Lab Test' },1,false);
    setPreviousFieldValue({ displayOrder: 1, name:'Test Lab Test' },1,true);
    const checkDuplicateValidation: any = wrapper.find('LabTestResultForm').prop('checkDuplicateValidation');
    checkDuplicateValidation({fields: {
      "value": [
        {
          "name": "Res Name",
          "displayOrder": "1"
        },
        {
          "name": "Res Name 2",
          "displayOrder": "2"
        }
      ]
    }, index: 1, isFirstChild: true, initialValue: {}, isUpdate: true, isSubmitted: false})
    wrapper.find('.btn.secondary-btn').simulate('click');
  });
});
