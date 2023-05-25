import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter, Route } from 'react-router-dom';
import OperatingUnitSummary from '../OperatingUnitSummary';
import OU_MOCK_DATA_CONSTANTS from '../../../tests/mockData/operatingUnitDataConstants';
import MOCK_DATA_CONSTANTS from '../../../tests/mockData/accountDataConstants';

const mockStore = configureMockStore();
jest.mock('../../assets/images/edit.svg', () => ({
  ReactComponent: 'EditIcon'
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn().mockReturnValue([true, jest.fn()])
  }));

jest.mock('../../../constants/appConstants', () => ({
    ...jest.requireActual("../../../constants/appConstants"),
    ROLES: {
        SUPER_USER: 'SUPER_USER',
        SUPER_ADMIN: 'SUPER_ADMIN',
        REGION_ADMIN: 'REGION_ADMIN',
        ACCOUNT_ADMIN: 'ACCOUNT_ADMIN',
        OPERATING_UNIT_ADMIN: 'OPERATING_UNIT_ADMIN'
      },
      OPERATING_UNIT_DELETE_CONFIRMATION: undefined
  }));

  jest.mock('../../../hooks/tablePagination', () => ({
    useTablePaginationHook: jest.fn(() => ({
      listParams: {
        page: 2,
        rowsPerPage: 10
      },
      setListReqParams: jest.fn()
    }))
  }));

describe('OperatingUnit Summary', () => {
    let store: any;
    let wrapper : any;
  
    beforeEach(() => {
      store = mockStore({
        operatingUnit: {
          operatingUnitDetail: OU_MOCK_DATA_CONSTANTS.OPERATING_UNIT_ADMIN_REQUEST_PAYLOAD,
          admins: OU_MOCK_DATA_CONSTANTS.FETCH_OPERATING_UNIT_ADMINS_RESPONSE_PAYLOAD,
          loading: false
        },
        account: {
            account: {
                id: '1',
                clinicalWorkflow:[1],
                users: MOCK_DATA_CONSTANTS.ACCOUNT_DETAIL_RESPONSE_PAYLOAD.users,
                name: 'AccountOne',
                maxNoOfUsers: '22',
                tenantId: '1'
              },
            accountOptions:[
                {
                    name: 'accOne',
                    id: '1',
                    tenantId: '1'
                  }
            ],
            loadingOptions: false
        },
        user: {
            user: {
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
              <OperatingUnitSummary />
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
        expect(wrapper.find('Memo()')).toHaveLength(2);
    });
});
