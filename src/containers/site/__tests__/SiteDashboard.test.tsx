import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SiteDashboard from '../SiteDashboard';
import { BrowserRouter as Router } from 'react-router-dom';

import styles from './site.module.scss';

const mockStore = configureStore([]);

jest.mock('../../assets/images/arrow-right-small.svg', () => ({
    ReactComponent: 'ArrowRight'
  }));
describe('SiteDashboard', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore({
      site: {
        siteDashboardList: [
            {
                id: 1,
                name: 'One',
                siteType: 'Postal',
                tenantId: 1
              },
              {
                id: 2,
                name: 'Two',
                siteType: 'Postal',
                tenantId: 2
              }
        ],
        loading: false,
        loadingMore: false,
        error: null,
        siteSummary: null,
        siteDetails: null,
        siteListTotal: 0
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
        <SiteDashboard />
        </Router>
      </Provider>
    );
  });

  it('should render without errors', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should display loader when loading is true', () => {
    store = mockStore({
      site: {
        siteDashboardList: [
            {
                id: 1,
                name: 'One',
                siteType: 'Postal',
                tenantId: 1
              },
              {
                id: 2,
                name: 'Two',
                siteType: 'Postal',
                tenantId: 2
              }
        ],
        loading: true,
        loadingMore: true,
        error: null,
        siteSummary: null,
        siteDetails: null,
        siteListTotal: 0
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
        <SiteDashboard />
        </Router>
      </Provider>
    );

    const loader = wrapper.find(`.${styles.loaderWrapper}.d-flex.align-items-center.justify-content-center.mt-2dot5`);
    expect(loader.length).toBe(1);
  });

  it('should display no data message when siteDashboardList is empty', () => {
    store = mockStore({
      site: {
        siteDashboardList: [],
        loading: false,
        loadingMore: false,
        error: null,
        siteSummary: null,
        siteDetails: null,
        siteListTotal: 0
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
        <SiteDashboard />
        </Router>
      </Provider>
    );
    const noDataMessage = wrapper.find('.fw-bold.highlight-text');
    
    expect(noDataMessage.text()).toBe('Let’s Get Started!');
  });
});
