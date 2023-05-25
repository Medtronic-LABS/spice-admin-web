import { mount, shallow } from 'enzyme';
import AppLayout from './AppLayout';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import REGION_MOCK_DATA_CONSTANTS from '../../tests/mockData/regionDataConstants';
import ACCOUNT_MOCK_DATA_CONSTANTS from '../../tests/mockData/accountDataConstants';
import OU_MOCK_DATA_CONSTANTS from '../../tests/mockData/operatingUnitDataConstants';
import {SITE_MOCK_DATA} from '../../../src/store/site/siteMockDataConstants';
import APPCONSTANTS from '../../constants/appConstants';

const mockStore = configureMockStore();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3000/region"
    })
  }));

  jest.mock('../../assets/images/home.svg', () => ({
    ReactComponent: 'HomeIcon'
  }));


describe('AppLayout component', () => {
    const store = mockStore({
        user: {
            initializing: false,
            user: {
                role:APPCONSTANTS.ROLES.SUPER_ADMIN
            }
        },
        region:{
            detail: REGION_MOCK_DATA_CONSTANTS.FETCH_REGION_DETAIL_RESPONSE_PAYLOAD
        },
        account:{
            account: ACCOUNT_MOCK_DATA_CONSTANTS.FETCH_ACCOUNTS_RESPONSE_PAYLOAD
        },
        operatingUnit:{
            operatingUnitDetail: OU_MOCK_DATA_CONSTANTS.OPERATING_UNIT_ADMIN_REQUEST_PAYLOAD
        },
        site: {
            site: SITE_MOCK_DATA.SITE_DATA_REQUEST_PAYLOAD
        }
      });
    it('renders component', ()=>{
        const wrapper = mount(
            <Provider store={store}>
                <Router>
            <AppLayout children={<div>RENDER</div>} />
            </Router>
            </Provider>
          )
          expect(wrapper.exists()).toBeTruthy();
    })


    it('test useEffect()', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 800 // Set the desired value here
          });

          const mockSetIsMenuTogglable = jest.fn();
          jest.mock('react', () => ({
            ...jest.requireActual('react'),
            useState: jest.fn().mockImplementation((initialState) => [initialState, mockSetIsMenuTogglable])
          }));
          const wrapper = shallow(
            <Provider store={store}>
                <Router>
            <AppLayout children={<div>RENDER</div>} />
            </Router>
            </Provider>
          )
          expect(wrapper.exists()).toBeTruthy();
    })
});
