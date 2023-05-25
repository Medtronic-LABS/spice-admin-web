import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ACCOUNT_MOCK_DATA_CONSTANTS from '../../../tests/mockData/accountDataConstants';
import DeactivatedRecords from '../DeactivatedRecords';
import { BrowserRouter as Router } from 'react-router-dom';


const mockStore = configureStore([]);
jest.mock('../../assets/images/icon-activate.svg', () => ({
    ReactComponent: 'ActivateIcon'
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
      ACTIVATE_ACCOUNT_CONFIRMATION: undefined
  }));
  
describe('DeactivatedRecords component', () => {
    let store;
    let wrapper;
    
    it('should render without errors', () => {
        store = mockStore({
          account: {
            loading: false,
            accounts: [
                ACCOUNT_MOCK_DATA_CONSTANTS.FETCH_ACCOUNTS_RESPONSE_PAYLOAD
            ],
            total: 2,
          },
          user: {
            user:{
                role: 'REGION_ADMIN',
                tenantId: 123,
            }
          },
        });
    
        wrapper = mount(
          <Provider store={store}>
            <Router>
                <DeactivatedRecords />
            </Router>
          </Provider>
        );
        expect(wrapper.length).toBe(1);
      });
})