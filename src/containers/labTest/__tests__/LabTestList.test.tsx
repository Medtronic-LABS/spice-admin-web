import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter, Route } from 'react-router-dom';
import LabTestList from '../LabTestList';
import CustomTable from '../../../components/customtable/CustomTable';
import MOCK_DATA_CONSTANTS from '../../../tests/mockData/labTestDataConstants';

const mockStore = configureMockStore();
jest.mock('../../assets/images/edit.svg', () => ({
  ReactComponent: 'EditIcon'
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
    LABTEST_DELETE_CONFIRMATION: undefined
  }));
describe('LabTestList', () => {
  let store: any;
  let wrapper : any;
  const props : any = {
    match:{
        params:{
            regionId: '1', 
            tenantId: '2'
        }
    }
  }

  it('should render CustomTable component', () => {
    store = mockStore({
        labtest: {
          total:1,
          loading:false,
          lab_tests:[
            MOCK_DATA_CONSTANTS.FETCH_LABTEST_BY_ID_RESPONSE_PAYLOAD
          ]
        },
        user: {
          role: 'SUPER_ADMIN',
          user: {
              countryId: '1'
          },
          country: {
            id: 1,
          },
        },
      });
    const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/tenant/1']}>
            <Route path="/tenant/:tenantId">
              <LabTestList {...props}/>
            </Route>
          </MemoryRouter>
        </Provider>
      );
    expect(wrapper.find('CustomTable')).toHaveLength(1);
  });

  it('should open Labtest edit modal', () => {
    const wrapper = mount(<Provider store={store}>
        <MemoryRouter initialEntries={['/tenant/1']}>
          <Route path="/tenant/:tenantId">
            <LabTestList {...props}/>
          </Route>
        </MemoryRouter>
      </Provider>);
    
    expect(wrapper.find(CustomTable)).toHaveLength(1);
  });
});
