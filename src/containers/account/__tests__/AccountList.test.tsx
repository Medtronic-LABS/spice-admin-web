import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import AccountList from '../AccountList';

const mockStore = configureMockStore([]);
const store = mockStore({
  account: {
    loading: false,
    accounts: [],
    count: 0,
    clinicalWorkflows: []
  },
  workflow: {
    loading: false
  }
});

const matchProps = {
  params: {
    regionId: '1',
    tenantId: '12345'
  },
  history: {},
  location: {},
  match: {
    isExact: false,
    path: '',
    url: '',
    params: {
      regionId: '1',
      tenantId: '12345'
    }
  }
};

jest.mock('../../../components/modal/ModalForm', () => () => null);

jest.mock('../AccountConsentForm', () => () => null);

describe('AccountList', () => {
  it('should render without errors', () => {
    mount(
      <Provider store={store}>
        <MemoryRouter>
          <AccountList decactivateAccountReq={() => {}} {...matchProps} />
        </MemoryRouter>
      </Provider>
    );
  });

  it('should dispatch fetchAccountsRequest action on mount', () => {
    mount(
      <Provider store={store}>
        <MemoryRouter>
          <AccountList decactivateAccountReq={() => {}} {...matchProps} />
        </MemoryRouter>
      </Provider>
    );

    expect(store.getActions()).toContainEqual(expect.objectContaining({ type: 'FETCH_ACCOUNTS_REQUEST' }));
  });

  it('should handle search and call handleSearch', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <AccountList decactivateAccountReq={() => {}} {...matchProps} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('input').simulate('change', { target: { value: 'searchTerm' } });
  });
});
