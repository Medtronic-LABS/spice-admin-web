import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter, Route } from 'react-router-dom';
import AccountSummary from './AccountSummary';
import MOCK_DATA_CONSTANTS from '../../tests/mockData/accountDataConstants'

const mockStore = configureMockStore();
jest.mock('../../assets/images/edit.svg', () => ({
  ReactComponent: 'EditIcon'
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn().mockReturnValue([true, jest.fn()])
  }));

  jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(() => [{ name: '', id: -1 }, jest.fn()])
  }));

jest.mock('../../constants/appConstants', () => ({
    ...jest.requireActual("../../constants/appConstants"),
    ROLES: {
        SUPER_USER: 'SUPER_USER',
        SUPER_ADMIN: 'SUPER_ADMIN',
        REGION_ADMIN: 'REGION_ADMIN',
        ACCOUNT_ADMIN: 'ACCOUNT_ADMIN',
        OPERATING_UNIT_ADMIN: 'OPERATING_UNIT_ADMIN'
      },
      OPERATING_UNIT_DELETE_CONFIRMATION: undefined,
      DELETE_CONSENT_TITLE:'Delete confirmation',
      DELETE_CONSENT_CONFIRMATION: 'Are you sure you want to delete the account consent form?'
  }));

  jest.mock('../../hooks/tablePagination', () => ({
    useTablePaginationHook: jest.fn(() => ({
      listParams: {
        page: 2,
        rowsPerPage: 10
      },
      setListReqParams: jest.fn()
    }))
  }));

describe('Account Summary', () => {
    let store: any;
    let wrapper : any;
    const props : any = {
        match:{
            params: {
                accountId: '1', 
                tenantId: '2'
            }
        }
      }
  
    beforeEach(() => {
      store = mockStore({
        account: {
            account: {
                id: '1',
                clinicalWorkflow:[1],
                users: MOCK_DATA_CONSTANTS.ACCOUNT_DETAIL_RESPONSE_PAYLOAD.users,
                name: 'AccountOne',
                maxNoOfUsers: '22',
                tenantId: '1'
              },
            loading: false,
            clinicalWorkflows: MOCK_DATA_CONSTANTS.FETCH_CLINICAL_WORKFLOWS_RESPONSE_PAYLOAD
        },
        workflow:{
            loading: false
        },
        user: {
            user: {
              role: 'SUPER_ADMIN',
              countryId: '1'
          },
          timezoneList: [
            {
              id:1
            },
            {
              id: 2
            }
        ],            
        countryList: [
          {id:1,
           countryCode: '91'
          },
          {
              id: 2,
              countryCode: '232'
          }
      ]
        }
      });
  
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/tenant/1']}>
            <Route path="/tenant/:tenantId">
              <AccountSummary {...props} />
            </Route>
          </MemoryRouter>
        </Provider>
      );
    });

    it('should render CustomTable component', () => {
        expect(wrapper.find('CustomTable')).toHaveLength(1);
      });

    it('should render DetailCard component', () => {
        expect(wrapper.find('DetailCard')).toHaveLength(2);
    });

    it('should render ModalForm component', () => {
        expect(wrapper.find('Memo()')).toHaveLength(3);
    });

      it('should handle render methods in Edit Account Admin ModalForm', () => {
        const ModalForm = wrapper.find('Memo()').at(1);
        const handleAdminSubmit = ModalForm.prop('handleFormSubmit');
        handleAdminSubmit({users: [MOCK_DATA_CONSTANTS.ACCOUNT_ADMIN]});
        const handleCancelClick = ModalForm.prop('handleCancel');
        handleCancelClick();
        const editModalRender = ModalForm.prop('render');
        editModalRender(jest.fn());
        
        expect(wrapper.find('Memo()')).toHaveLength(3);
      });

      it('should handle render methods in Deactivate Account ModalForm', () => {
        const ModalForm = wrapper.find('Memo()').at(2);
        const handleAdminSubmit = ModalForm.prop('handleFormSubmit');
        handleAdminSubmit({account: MOCK_DATA_CONSTANTS.CREATE_ACCOUNT_PAYLOAD});
        const showDeactivateModal = ModalForm.prop('handleDeactivate');
        showDeactivateModal();
        const handleDeactivateSubmit = ModalForm.prop('handleFormSubmit');
        handleDeactivateSubmit({account: MOCK_DATA_CONSTANTS.CREATE_ACCOUNT_PAYLOAD});
        const editDeactivateModalRender = ModalForm.prop('render');
        editDeactivateModalRender(jest.fn());
        
        expect(wrapper.find('Memo()')).toHaveLength(3);
      });

      it('should handle render methods in customTable', () => {
        const CustomTable = wrapper.find('CustomTable');
        const onDeleteClick = CustomTable.prop('onDeleteClick');
        onDeleteClick({data: {
          id: '1',
          name: 'Account Test',
          maxNoOfUsers: 100,
          tenantId: '1' 
        },index: 0});
        const openEditModal = CustomTable.prop('onRowEdit');
        openEditModal();        
        expect(wrapper.find('CustomTable')).toHaveLength(1);
      });
      
      it('should handle render methods in AccountConsentForm', () => {
        const AccountConsentForm = wrapper.find('AccountConsentForm');
        const handleConsentFormClose = AccountConsentForm.prop('handleConsentFormClose');
        handleConsentFormClose();
        expect(wrapper.find('CustomTable')).toHaveLength(1);
      });

      it('should handle render methods in DetailCard', () => {
        const DetailCard = wrapper.find('DetailCard').first();
        const onButtonClick = DetailCard.prop('onButtonClick');
        onButtonClick();
        expect(wrapper.find('DetailCard')).toHaveLength(2);
      });

      it('should handle render methods in DetailCard', () => {
        const DetailCard = wrapper.find('DetailCard').last();
        const handleSearch = DetailCard.prop('onSearch');
        handleSearch('Acc');
        const openAddModal = DetailCard.prop('onButtonClick');
        openAddModal({});
        expect(wrapper.find('DetailCard')).toHaveLength(2);
      });
});
