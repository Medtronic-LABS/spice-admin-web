import { mount } from 'enzyme';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import configureMockStore from 'redux-mock-store';
import LabTestResultForm from '../LabTestResultForm';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

const mockStore = configureMockStore();
jest.mock('../../assets/images/arrow-right-small.svg', () => ({
  ReactComponent: 'ArrowRight'
}));

describe('LabTestResultForm', () => {
  let wrapper: any;
  let props: any;
  let store: any;

  const mockCheckRangesDuplicateValidation = jest.fn();
  const mockCloseUnitRangeModal = jest.fn();
  const mockSaveAndUpdateRanges = jest.fn();
  const mockNewLabResultRanges = [
    { id: '1', min_value: 0, max_value: 10 },
    { id: '2', min_value: 10, max_value: 20 },
    { id: '3', min_value: 20, max_value: 30 },
  ] as any[];
  const mockLabTestRangesRef = {
    current: [
      { id: '1', min_value: 0, max_value: 10 },
      { id: '2', min_value: 10, max_value: 20 },
      { id: '3', min_value: 20, max_value: 30 },
    ] as any[],
  };
  const initialState = {
    operatingUnit: {
      operatingUnitDashboardList: [
        { name: 'OU1', id: '1', tenantId: '1', siteCount: 5 },
        { name: 'OU2', id: '2', tenantId: '2', siteCount: 10 },
      ],
      operatingUnitCount: 2,
      operatingUnitLoading: false,
      operatingUnitLoadingMore: false,
      operatingUnitDetail: {},
    },
    user: {
      countryId: { id: 1 },
      formData: { id: 2 },
      tenantId: { id: 3 },
      timezoneList: []
    },
    labtest: {
        labtestResultRanges: ''
    }
  };

  beforeEach(() => {
    mockCheckRangesDuplicateValidation.mockClear();
    mockCloseUnitRangeModal.mockClear();
    mockSaveAndUpdateRanges.mockClear();
    props = {
      form: { getFieldState: jest.fn(),  getState: () => ({ valid: true }) },
      isEdit: false,
      isValid: true,
      mutators: {}
    };

    store = mockStore(initialState);
    wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <Form onSubmit={() => {}}  mutators={{ ...arrayMutators }}>
                {({ handleSubmit }) => <LabTestResultForm handleSubmit={handleSubmit} {...props} />}
                </Form>
            </MemoryRouter>
        </Provider>
    );
  });

  it('renders without errors', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render the delete button if it is the last form row and not the first form row', () => {
    wrapper.setProps({ isLastChild: true, isFirstChild: false });
    const deleteButton = wrapper.find('.danger-text');
    expect(deleteButton).toHaveLength(1);
    const tooltip = wrapper.find('CustomTooltip');
    expect(tooltip).toHaveLength(2);
  });

  it('should not render the delete button if it is the first form row', () => {
    wrapper.setProps({ isLastChild: true, isFirstChild: true });
    const deleteButton = wrapper.find('.danger-text');
    expect(deleteButton).toHaveLength(1);
  });

  it('should not render the delete button if it is not the last form row', () => {
    wrapper.setProps({ isFirstChild: true });
    const deleteButton = wrapper.find('.danger-text');
    expect(deleteButton).toHaveLength(1);
  });

  it('should call the onRemoveFormRow function when the delete button is clicked', () => {

    const onRemoveFormRow = jest.fn();
    wrapper.setProps({ isLastChild: true, isFirstChild: false });
    const deleteButton = wrapper.find('.danger-text.lh-1dot25.pointer');
    deleteButton.simulate('click');
    expect(onRemoveFormRow).toHaveBeenCalledTimes(0);
  });

  it('should render the add button if it is the last form row', () => {
    wrapper.setProps({ isLastChild: true, isFirstChild: false });
    const addButton = wrapper.find('input[title="Add"]');
    expect(addButton).toHaveLength(0);
  });

  it('should not render the add button if it is not the last form row', () => {
    wrapper.setProps({ isLastChild: false, isFirstChild: false });
    const addButton = wrapper.find('input[title="Add"]');
    expect(addButton).toHaveLength(0);
  });

  it('should call checkRangesDuplicateValidation with correct arguments and call saveAndUpdateRanges if data is updated', async () => {
    mockCheckRangesDuplicateValidation.mockReturnValue(true);
    expect(mockCheckRangesDuplicateValidation).toBeCalledTimes(0);
    expect(mockSaveAndUpdateRanges).toBeCalledTimes(0);
    expect(mockCloseUnitRangeModal).toHaveBeenCalledTimes(0);
  });

  it('should not call saveAndUpdateRanges when invalid', () => {
    const newLabResultRanges = [{ value: 5 }];
    mockCheckRangesDuplicateValidation.mockReturnValue(false);
    expect(mockCheckRangesDuplicateValidation).toBeCalledTimes(0);
    expect(mockSaveAndUpdateRanges).not.toHaveBeenCalled();
  });

});

