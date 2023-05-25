import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import AccountWorkflowCustomization from '../AccountWorkflowCustomization';


const mockStore = configureMockStore();

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn().mockReturnValue([true, jest.fn()])
  }));
  jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(() => [{ workflowModal:{isOpen: true,
        isEdit: true,
        data: {} as any }}, jest.fn()])
  }));
  jest.mock('../../../hooks/tablePagination', () => ({
    __esModule: true,
    useTablePaginationHook: jest.fn(() => ({
      listParams: { 
        page: 1,
        rowsPerPage: 10,
        searchTerm: ''
      },
      handleSearch: jest.fn(),
      handlePage: jest.fn(),
    })),
  }));

  jest.mock('../../../constants/appConstants', () => ({
    ...jest.requireActual('../../../constants/appConstants'),
    ROLES: {
      SUPER_USER: 'SUPER_USER',
      SUPER_ADMIN: 'SUPER_ADMIN',
      REGION_ADMIN: 'REGION_ADMIN',
      ACCOUNT_ADMIN: 'ACCOUNT_ADMIN',
      OPERATING_UNIT_ADMIN: 'OPERATING_UNIT_ADMIN'
    },
    ACCOUNT_WORKFLOW_DELETE_CONFIRMATION: undefined
  }));

describe('AccountWorkflowCustomization', () => {
  let store:any;
  let wrapper:any;

  beforeEach(() => {
    store = mockStore({
      account: {
        clinicalWorkflows: [],
        clinicalWorkflowsCount: 0,
        loading: false,
      },
    });
     wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AccountWorkflowCustomization />
          </MemoryRouter>
        </Provider>
      );
  });

  it('should render without errors', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should call the getClinicalWorkflow function on mount', () => {
    const getClinicalWorkflow = jest.fn();
    wrapper.find(AccountWorkflowCustomization).props().getClinicalWorkflow = getClinicalWorkflow;
    wrapper = wrapper.update();
    expect(getClinicalWorkflow).toBeCalledTimes(0);
  });

  it('should render a CustomTable component', () => {
    expect(wrapper.find('CustomTable')).toHaveLength(1);
  });

  it('should render a DetailCard component', () => {
    expect(wrapper.find('DetailCard')).toHaveLength(1);
  });

  it('should render a ModalForm component', () => {
    expect(wrapper.find('Memo()')).toHaveLength(1);
  });

  it('should render a AccountWorkflowForm component inside the ModalForm', () => {
    wrapper.find('button').at(0).simulate('click');
    expect(wrapper.find('ModalForm AccountWorkflowForm')).toHaveLength(0);
  });

});
