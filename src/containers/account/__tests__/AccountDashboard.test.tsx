import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AccountDashboard from '../AccountDashboard';
import { BrowserRouter as Router } from 'react-router-dom';
import styles from './Account.module.scss';
import ACCOUNT_MOCK_DATA_CONSTANTS from '../../../tests/mockData/accountDataConstants';

const mockStore = configureStore([]);

jest.mock('../../../assets/images/arrow-right-small.svg', () => ({
    ReactComponent: 'ArrowRight'
  }));
describe('AccountDashboard', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore({
      account: {
        dashboardList: ACCOUNT_MOCK_DATA_CONSTANTS.DASHBOARD_ACCOUNTS_RESPONSE_PAYLOAD,
        loading: false,
        loadingMore: false
      },
      user:{
        user: {
          formDataId: '1',
          tenantId: '1'
        }
    }
    });

    wrapper = mount(
      <Provider store={store}>
        <Router>
        <AccountDashboard />
        </Router>
      </Provider>
    );
  });
  it('should render without errors', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should display loader when loading is true', () => {
    store = mockStore({
        account: {
          dashboardList: ACCOUNT_MOCK_DATA_CONSTANTS.DASHBOARD_ACCOUNTS_RESPONSE_PAYLOAD,
          loading: true,
        loadingMore: true
        },
        user:{
          user: {
            formDataId: '1',
            tenantId: '1'
          }
      }
      });

    wrapper = mount(
      <Provider store={store}>
        <Router>
        <AccountDashboard />
        </Router>
      </Provider>
    );

    const loader = wrapper.find(`.${styles.loaderWrapper}.d-flex.align-items-center.justify-content-center.mt-2dot5`);
    expect(loader.length).toBe(1);
  });

  it('should display no data message when siteDashboardList is empty', () => {
    store = mockStore({
      account: {
        dashboardList: [],
        loading: false,
        loadingMore: false,
        error: null
      },
      user:{
          user: {
            formDataId: '1',
            tenantId: '1'
          }
      }
    });

    wrapper = mount(
      <Provider store={store}>
       <Router>
        <AccountDashboard />
        </Router>
      </Provider>
    );
    const noDataMessage = wrapper.find('.fw-bold.highlight-text');
    
    expect(noDataMessage.text()).toBe('Let’s Get Started!');
  });
});