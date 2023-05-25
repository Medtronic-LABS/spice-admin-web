import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import AccountAdminList from '../AccountAdminList';


const mockStore = configureMockStore();

jest.mock('../../../constants/appConstants', () => ({
    ...jest.requireActual('../../../constants/appConstants'),
    ROLES: {
      SUPER_USER: 'SUPER_USER',
      SUPER_ADMIN: 'SUPER_ADMIN',
      REGION_ADMIN: 'REGION_ADMIN',
      ACCOUNT_ADMIN: 'ACCOUNT_ADMIN',
      OPERATING_UNIT_ADMIN: 'OPERATING_UNIT_ADMIN'
    },
    ACCOUNT_WORKFLOW_DELETE_CONFIRMATION: undefined
  }));

describe('AccountAdminList component', () => {
  let store;
  let wrapper:any;

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
        admins: [],
        count: 0,
        loading: false,
      },
      user: {
        countryId: null,
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <AccountAdminList {...props} />
        </MemoryRouter>
      </Provider>
    );
  });


  it('should render without errors', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should fetch account admins list on mount', () => {
    const fetchAccountAdminsRequest = jest.fn();
    wrapper.update();
    expect(fetchAccountAdminsRequest).toHaveBeenCalledTimes(0);
  });

  it('should dispatch fetchAccountAdminsRequest on mount', () => {
    const fetchAccountAdminsRequest = jest.fn();
    const clearAccountAdmin = jest.fn();
    expect(fetchAccountAdminsRequest).toHaveBeenCalledTimes(0);
    expect(clearAccountAdmin).toHaveBeenCalledTimes(0);
  });

  it('should render a CustomTable component', () => {
    expect(wrapper.find('CustomTable')).toHaveLength(1);
  });

  it('should render a DetailCard component', () => {
    expect(wrapper.find('DetailCard')).toHaveLength(1);
    expect(wrapper.find('.card-header').text()).toEqual('Account Admin');
  });

  it('should render a ModalForm component', () => {
    expect(wrapper.find('Memo()')).toHaveLength(1);
  });

  it('should call the getClinicalWorkflow function on mount', () => {
    const getClinicalWorkflow = jest.fn();
    wrapper.find(AccountAdminList).props().getClinicalWorkflow = getClinicalWorkflow;
    wrapper = wrapper.update();
    expect(getClinicalWorkflow).toBeCalledTimes(0);
  });

});
