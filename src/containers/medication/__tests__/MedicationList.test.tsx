import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MedicationList from '../MedicationList';

jest.mock('react-router', () => ({
  useParams: () => ({ regionId: 'mockRegionId', tenantId: 'mockTenantId' }),
  useHistory: () => ({ push: jest.fn() }) // Mock useHistory with a push function
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
  ACTIVATE_ACCOUNT_CONFIRMATION: undefined
}));

describe('MedicationList', () => {
  const mockStore = configureStore([]);
  const initialState = {
    medication: {
      list: [], // Add the initial list state here
      loading: false // Add the initial loading state here
    }
  };
  const store = mockStore(initialState);

  it('renders without error', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MedicationList />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
  it('renders loader when loading is true', () => {
    const loadingState = {
      medication: {
        list: [],
        loading: true
      }
    };
    const loadingStore = mockStore(loadingState);

    const wrapper = mount(
      <Provider store={loadingStore}>
        <MedicationList />
      </Provider>
    );
    expect(wrapper.find('Loader').exists()).toBe(true);
  });
});
