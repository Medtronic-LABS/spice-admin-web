import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import OperatingunitAdmin from '../OperatingUnitAdmin';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router';
import MOCK_DATA_CONSTANTS from '../../../tests/mockData/operatingUnitDataConstants';
import APPCONSTANTS from '../../../constants/appConstants';

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
    OPERATING_UNIT_ADMIN_DELETE_CONFIRMATION: undefined
}));
describe('OperatingUnitAdmin component', () => {
  const store = mockStore({
    operatingUnit: {
      total: 2,
      loading: false,
      operatingUnitAdmins: MOCK_DATA_CONSTANTS.FETCH_OPERATING_UNIT_ADMINS_RESPONSE_PAYLOAD
    },
    user: {
      country: { id: '1', name: 'Country 1' }
    }
  });
  it('renders without crashing', () => {
    const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
        <OperatingunitAdmin />
        </MemoryRouter>
    </Provider>
    );
    expect(wrapper).toBeTruthy();
  });
});