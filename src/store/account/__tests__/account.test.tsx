import { runSaga } from 'redux-saga';
import {
  activateAccount,
  createAccount,
  createAccountAdminInfo,
  createAccountWorkflowRequest,
  deactivateAccount,
  deleteAccountWorkflowRequest,
  fetchAccountAdmins,
  fetchAccountDetail,
  fetchAccountOptions,
  fetchAccounts,
  fetchClinicalWorkflows,
  getDashboardAccounts,
  removeAccountAdmin,
  updateAccountAdminInfo,
  updateAccountDetail,
  updateAccountWorkflowRequest
} from '../sagas';
import * as accountService from '../../../services/accountAPI';
import * as accountActions from '../actions';
import * as siteActions from '../../site/actions';
import MOCK_DATA_CONSTANTS from '../../../tests/mockData/accountDataConstants';
import * as ACTION_TYPES from '../actionTypes';
import { AxiosPromise, AxiosResponse } from 'axios';

const createAccountMockData = MOCK_DATA_CONSTANTS.CREATE_ACCOUNT_PAYLOAD;
const updateAccountMockData = MOCK_DATA_CONSTANTS.UPDATE_ACCOUNT_PAYLOAD;
const accountAdminMockData = MOCK_DATA_CONSTANTS.ACCOUNT_ADMIN;
const defaultRequestMockData = MOCK_DATA_CONSTANTS.DEFAULT_REQUEST_PAYLOAD;
const accountAdminListRequestMockData = MOCK_DATA_CONSTANTS.ACCOUNT_ADMIN_LIST_REQUEST_PAYLOAD;
const searchAccountAdminRequestMockData = MOCK_DATA_CONSTANTS.SEARCH_ACCOUNT_ADMIN_REQUEST_PAYLOAD;
const accountDetailResponseMockData = MOCK_DATA_CONSTANTS.ACCOUNT_DETAIL_RESPONSE_PAYLOAD;
const accountWorkflowMockData = MOCK_DATA_CONSTANTS.ACCOUNT_WORLFOW_PAYLOAD;
const deleteAccountWorkflowMockData = MOCK_DATA_CONSTANTS.DELETE_ACCOUNT_WORLFOW_PAYLOAD;
const fetchClinicalWorkflowsRequestMockData = MOCK_DATA_CONSTANTS.FETCH_CLINICAL_WORKFLOWS_REQUEST_PAYLOAD;
const fetchClinicalWorkflowsResponseMockData = MOCK_DATA_CONSTANTS.FETCH_CLINICAL_WORKFLOWS_RESPONSE_PAYLOAD;
const fetchActiveAccountsRequestMockData = MOCK_DATA_CONSTANTS.FETCH_ACTIVE_ACCOUNTS_REQUEST_PAYLOAD;
const fetchInactiveAccountsRequestMockData = MOCK_DATA_CONSTANTS.FETCH_INACTIVE_ACCOUNTS_REQUEST_PAYLOAD;
const fetchAccountsResponseMockData = MOCK_DATA_CONSTANTS.FETCH_ACCOUNTS_RESPONSE_PAYLOAD;
const fetchDashboardAccountsRequestMockData = MOCK_DATA_CONSTANTS.FETCH_DASHBOARD_ACCOUNTS_PAYLOAD;
const dashboardAccountsResponseMockData = MOCK_DATA_CONSTANTS.DASHBOARD_ACCOUNTS_RESPONSE_PAYLOAD;
const activateAccountRequestMockData = MOCK_DATA_CONSTANTS.ACTIVATE_ACCOUNT_PAYLOAD;
const deactivateAccountRequestMockData = MOCK_DATA_CONSTANTS.DEACTIVATE_ACCOUNT_PAYLOAD;
const fetchAccountOptionsRequestMockData = MOCK_DATA_CONSTANTS.FETCH_ACCOUNT_OPTIONS_REQUEST_PAYLOAD;
const fetchAccountOptionsResponseMockData = MOCK_DATA_CONSTANTS.FETCH_ACCOUNT_OPTIONS_RESPONSE_PAYLOAD;

describe('Create Account in Region', () => {
  it('Creates an account and dispatches success', async () => {
    const createAccountSpy = jest
      .spyOn(accountService, 'createAccount')
      .mockImplementation(() => Promise.resolve({}) as AxiosPromise);
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      createAccount,
      { data: createAccountMockData, type: ACTION_TYPES.CREATE_ACCOUNT_REQUEST }
    ).toPromise();
    expect(createAccountSpy).toHaveBeenCalledWith(createAccountMockData);
    expect(dispatched).toEqual([accountActions.createAccountSuccess()]);
  });

  it('Fails to create an account and dispatches failure', async () => {
    const error = new Error('Failed to create account');
    const createAccountSpy = jest
      .spyOn(accountService, 'createAccount')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      createAccount,
      { data: createAccountMockData, type: ACTION_TYPES.CREATE_ACCOUNT_REQUEST }
    ).toPromise();
    expect(createAccountSpy).toHaveBeenCalledWith(createAccountMockData);
    expect(dispatched).toEqual([accountActions.createAccountFailure(error)]);
  });
});

describe('Update an Account Detail', () => {
  it('Updates an account and dispatches success', async () => {
    const updateAccountSpy = jest
      .spyOn(accountService, 'updateAccount')
      .mockImplementation(() => Promise.resolve({}) as AxiosPromise);
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateAccountDetail,
      { data: updateAccountMockData, type: ACTION_TYPES.UPDATE_ACCOUNT_DETAIL_REQUEST }
    ).toPromise();
    expect(updateAccountSpy).toHaveBeenCalledWith(updateAccountMockData);
    expect(dispatched).toEqual([accountActions.updateAccountDetailSuccess(updateAccountMockData)]);
  });

  it('Fails to update an account and dispatches failure', async () => {
    const error = new Error('Failed to update account');
    const updateAccountSpy = jest
      .spyOn(accountService, 'updateAccount')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateAccountDetail,
      { data: updateAccountMockData, type: ACTION_TYPES.UPDATE_ACCOUNT_DETAIL_REQUEST }
    ).toPromise();
    expect(updateAccountSpy).toHaveBeenCalledWith(updateAccountMockData);
    expect(dispatched).toEqual([accountActions.updateAccountDetailFail(error)]);
  });
});

describe('Fetch Account Detail', () => {
  it('Fetches an account detail and dispatches success', async () => {
    const fetchAccountDetailSpy = jest.spyOn(accountService, 'fetchAccountDetails').mockImplementation(() => {
      return Promise.resolve({ data: { entity: accountDetailResponseMockData } } as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchAccountDetail,
      { payload: defaultRequestMockData, type: ACTION_TYPES.FETCH_ACCOUNT_DETAIL_REQUEST }
    ).toPromise();
    expect(fetchAccountDetailSpy).toHaveBeenCalledWith(defaultRequestMockData);
    expect(dispatched).toEqual([accountActions.fetchAccountDetailSuccess(accountDetailResponseMockData as any)]);
  });

  it('Search for account admins in account detail and dispatches success', async () => {
    const fetchAccountDetailSpy = jest.spyOn(accountService, 'fetchAccountAdmins').mockImplementation(() => {
      return Promise.resolve({ data: { entityList: accountDetailResponseMockData.users } } as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchAccountDetail,
      {
        payload: searchAccountAdminRequestMockData as any,
        type: ACTION_TYPES.FETCH_ACCOUNT_DETAIL_REQUEST
      }
    ).toPromise();
    expect(fetchAccountDetailSpy).toHaveBeenCalledWith(searchAccountAdminRequestMockData);
    expect(dispatched).toEqual([accountActions.searchUserSuccess(accountDetailResponseMockData.users as any)]);
  });

  it('Search for account admins in account detail and dispatches failure', async () => {
    const error = new Error('Failed to search account detail');
    const fetchAccountDetailSpy = jest.spyOn(accountService, 'fetchAccountAdmins').mockImplementation(() => {
      return Promise.reject(error);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchAccountDetail,
      {
        payload: searchAccountAdminRequestMockData as any,
        type: ACTION_TYPES.FETCH_ACCOUNT_DETAIL_REQUEST
      }
    ).toPromise();
    expect(fetchAccountDetailSpy).toHaveBeenCalledWith(searchAccountAdminRequestMockData);
    expect(dispatched).toEqual([accountActions.fetchAccountDetailFail(error)]);
  });

  it('Fails to fetch an account detail and dispatches failure', async () => {
    const error = new Error('Failed to fetch account detail');
    const fetchAccountDetailSpy = jest
      .spyOn(accountService, 'fetchAccountDetails')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchAccountDetail,
      { payload: defaultRequestMockData, type: ACTION_TYPES.FETCH_ACCOUNT_DETAIL_REQUEST }
    ).toPromise();
    expect(fetchAccountDetailSpy).toHaveBeenCalledWith(defaultRequestMockData);
    expect(dispatched).toEqual([accountActions.fetchAccountDetailFail(error)]);
  });
});

describe('Create an Account Admin', () => {
  it('Creates an account admin and dispatches success', async () => {
    const createAccountAdminSpy = jest
      .spyOn(accountService, 'createAccountAdmin')
      .mockImplementation(() => Promise.resolve({} as AxiosResponse));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      createAccountAdminInfo,
      { data: accountAdminMockData, type: ACTION_TYPES.CREATE_ACCOUNT_ADMIN_REQUEST }
    ).toPromise();
    expect(createAccountAdminSpy).toHaveBeenCalledWith(accountAdminMockData);
    expect(dispatched).toEqual([accountActions.createAccountAdminSuccess()]);
  });

  it('Fails to create an account admin and dispatches failure', async () => {
    const error = new Error('Failed to create account admin');
    const createAccountAdminSpy = jest
      .spyOn(accountService, 'createAccountAdmin')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      createAccountAdminInfo,
      { data: accountAdminMockData, type: ACTION_TYPES.CREATE_ACCOUNT_ADMIN_REQUEST }
    ).toPromise();
    expect(createAccountAdminSpy).toHaveBeenCalledWith(accountAdminMockData);
    expect(dispatched).toEqual([accountActions.createAccountAdminFail(error)]);
  });
});

describe('Update an Account Admin', () => {
  it('Updates an account admin and dispatches success', async () => {
    const updateAccountAdminSpy = jest
      .spyOn(accountService, 'updateAccountAdmin')
      .mockImplementation(() => Promise.resolve({} as AxiosResponse));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateAccountAdminInfo,
      { data: accountAdminMockData, type: ACTION_TYPES.UPDATE_ACCOUNT_ADMIN_REQUEST }
    ).toPromise();
    expect(updateAccountAdminSpy).toHaveBeenCalledWith(accountAdminMockData);
    expect(dispatched).toEqual([accountActions.updateAccountAdminSuccess()]);
  });

  it('Fails to update account admin and dispatches failure', async () => {
    const error = new Error('Failed to update account admin');
    const updateAccountAdminSpy = jest
      .spyOn(accountService, 'updateAccountAdmin')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateAccountAdminInfo,
      { data: accountAdminMockData, type: ACTION_TYPES.UPDATE_ACCOUNT_ADMIN_REQUEST }
    ).toPromise();
    expect(updateAccountAdminSpy).toHaveBeenCalledWith(accountAdminMockData);
    expect(dispatched).toEqual([accountActions.updateAccountAdminFail(error)]);
  });
});

describe('Remove an Account Admin', () => {
  it('Remove an account admin and dispatches success', async () => {
    const updateAccountAdminSpy = jest
      .spyOn(accountService, 'deleteAccountAdmin')
      .mockImplementation(() => Promise.resolve({} as AxiosResponse));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      removeAccountAdmin,
      { data: defaultRequestMockData, type: ACTION_TYPES.DELETE_ACCOUNT_ADMIN_REQUEST }
    ).toPromise();
    expect(updateAccountAdminSpy).toHaveBeenCalledWith(defaultRequestMockData);
    expect(dispatched).toEqual([accountActions.deleteAccountAdminSuccess()]);
  });

  it('Fails to update account admin and dispatches failure', async () => {
    const error = new Error('Failed to update account admin');
    const updateAccountAdminSpy = jest
      .spyOn(accountService, 'deleteAccountAdmin')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      removeAccountAdmin,
      { data: defaultRequestMockData, type: ACTION_TYPES.DELETE_ACCOUNT_ADMIN_REQUEST }
    ).toPromise();
    expect(updateAccountAdminSpy).toHaveBeenCalledWith(defaultRequestMockData);
    expect(dispatched).toEqual([accountActions.deleteAccountAdminFail(error)]);
  });
});

describe('Fetches Account Admin List', () => {
  it('Fetches list of Account admins and dispatches success', async () => {
    const fetchClinicalWorkflowsSpy = jest
      .spyOn(accountService, 'fetchAccountAdmins')
      .mockImplementation(() =>
        Promise.resolve({ data: { entityList: accountDetailResponseMockData.users, totalCount: 10 } } as AxiosResponse)
      );
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchAccountAdmins,
      { data: accountAdminListRequestMockData, type: ACTION_TYPES.FETCH_ACCOUNT_ADMIN_REQUEST }
    ).toPromise();
    expect(fetchClinicalWorkflowsSpy).toHaveBeenCalledWith(accountAdminListRequestMockData);
    expect(dispatched).toEqual([
      accountActions.fetchAccountAdminsSuccess({ admins: accountDetailResponseMockData.users, total: 10 })
    ]);
  });

  it('Fetch list account admins and dispatches failure', async () => {
    const error = new Error('Failed to fetch account admins');
    const fetchClinicalWorkflowsSpy = jest
      .spyOn(accountService, 'fetchAccountAdmins')
      .mockImplementation(() => Promise.reject(error) as any);
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchAccountAdmins,
      { data: accountAdminListRequestMockData, type: ACTION_TYPES.FETCH_ACCOUNT_ADMIN_REQUEST }
    ).toPromise();
    expect(fetchClinicalWorkflowsSpy).toHaveBeenCalledWith(accountAdminListRequestMockData);
    expect(dispatched).toEqual([accountActions.fetchAccountAdminsFailure(error)]);
  });
});

describe('Create an Account Workflow', () => {
  it('Creates an account workflow and dispatches success', async () => {
    const createAccountWorkflowSpy = jest
      .spyOn(accountService, 'createAccountWorkflowModule')
      .mockImplementation(() => Promise.resolve({} as AxiosResponse));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      createAccountWorkflowRequest,
      { data: accountWorkflowMockData, type: ACTION_TYPES.CREATE_ACCOUNT_WORKFLOW_MODULE_REQUEST }
    ).toPromise();
    expect(createAccountWorkflowSpy).toHaveBeenCalledWith(accountWorkflowMockData);
    expect(dispatched).toEqual([accountActions.createAccountWorkflowModuleSuccess()]);
  });

  it('Fails to create an account workflow and dispatches failure', async () => {
    const error = new Error('Failed to create account workflow');
    const createAccountWorkflowSpy = jest
      .spyOn(accountService, 'createAccountWorkflowModule')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      createAccountWorkflowRequest,
      { data: accountWorkflowMockData, type: ACTION_TYPES.CREATE_ACCOUNT_WORKFLOW_MODULE_REQUEST }
    ).toPromise();
    expect(createAccountWorkflowSpy).toHaveBeenCalledWith(accountWorkflowMockData);
    expect(dispatched).toEqual([accountActions.createAccountWorkflowModuleFailure(error)]);
  });
});

describe('Update an Account Workflow', () => {
  it('Updates an account workflow and dispatches success', async () => {
    const updateAccountWorkflowSpy = jest
      .spyOn(accountService, 'updateAccountWorkflowModule')
      .mockImplementation(() => Promise.resolve({} as AxiosResponse));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateAccountWorkflowRequest,
      { data: accountWorkflowMockData, type: ACTION_TYPES.UPDATE_ACCOUNT_WORKFLOW_MODULE_REQUEST }
    ).toPromise();
    expect(updateAccountWorkflowSpy).toHaveBeenCalledWith(accountWorkflowMockData);
    expect(dispatched).toEqual([accountActions.updateAccountWorkflowModuleSuccess()]);
  });

  it('Fails to update an account workflow and dispatches failure', async () => {
    const error = new Error('Failed to update account workflow');
    const updateAccountWorkflowSpy = jest
      .spyOn(accountService, 'updateAccountWorkflowModule')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateAccountWorkflowRequest,
      { data: accountWorkflowMockData, type: ACTION_TYPES.UPDATE_ACCOUNT_WORKFLOW_MODULE_REQUEST }
    ).toPromise();
    expect(updateAccountWorkflowSpy).toHaveBeenCalledWith(accountWorkflowMockData);
    expect(dispatched).toEqual([accountActions.updateAccountWorkflowModuleFailure(error)]);
  });
});

describe('Delete an Account Workflow', () => {
  it('Removes an account workflow and dispatches success', async () => {
    const deleteAccountWorkflowSpy = jest
      .spyOn(accountService, 'deleteAccountWorkflowModule')
      .mockImplementation(() => Promise.resolve({} as AxiosResponse));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      deleteAccountWorkflowRequest,
      { data: deleteAccountWorkflowMockData, type: ACTION_TYPES.DELETE_ACCOUNT_WORKFLOW_MODULE_REQUEST }
    ).toPromise();
    expect(deleteAccountWorkflowSpy).toHaveBeenCalledWith(deleteAccountWorkflowMockData);
    expect(dispatched).toEqual([accountActions.deleteAccountWorkflowModuleSuccess()]);
  });

  it('Fails to remove an account workflow and dispatches failure', async () => {
    const error = new Error('Failed to delete account workflow');
    const deleteAccountWorkflowSpy = jest
      .spyOn(accountService, 'deleteAccountWorkflowModule')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      deleteAccountWorkflowRequest,
      { data: deleteAccountWorkflowMockData, type: ACTION_TYPES.DELETE_ACCOUNT_WORKFLOW_MODULE_REQUEST }
    ).toPromise();
    expect(deleteAccountWorkflowSpy).toHaveBeenCalledWith(deleteAccountWorkflowMockData);
    expect(dispatched).toEqual([accountActions.deleteAccountWorkflowModuleFailure(error)]);
  });
});

describe('Fetches Clinical Workflow List', () => {
  it('Fetches list of clinical workflows and dispatches success', async () => {
    const fetchClinicalWorkflowsSpy = jest.spyOn(accountService, 'fetchClinicalWorkflows').mockImplementation(() =>
      Promise.resolve({
        data: { entityList: fetchClinicalWorkflowsResponseMockData, totalCount: 10 }
      } as AxiosResponse)
    );
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchClinicalWorkflows,
      { data: fetchClinicalWorkflowsRequestMockData, type: ACTION_TYPES.FETCH_CLINICAL_WORKFLOW_REQUEST }
    ).toPromise();
    expect(fetchClinicalWorkflowsSpy).toHaveBeenCalledWith(fetchClinicalWorkflowsRequestMockData);
    expect(dispatched).toEqual([
      accountActions.fetchClinicalWorkflowSuccess({
        data: fetchClinicalWorkflowsResponseMockData,
        total: 10
      })
    ]);
  });

  it('Fails to fetch list of clinical workflows and dispatches failure', async () => {
    const error = new Error('Failed to fetch clinical workflows');
    const fetchClinicalWorkflowsSpy = jest
      .spyOn(accountService, 'fetchClinicalWorkflows')
      .mockImplementation(() => Promise.reject(error) as any);
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchClinicalWorkflows,
      { data: fetchClinicalWorkflowsRequestMockData, type: ACTION_TYPES.FETCH_CLINICAL_WORKFLOW_REQUEST }
    ).toPromise();
    expect(fetchClinicalWorkflowsSpy).toHaveBeenCalledWith(fetchClinicalWorkflowsRequestMockData);
    expect(dispatched).toEqual([accountActions.fetchClinicalWorkflowFailure()]);
  });
});

describe('Fetches Account List', () => {
  it('Fetches list of Deactivated Accounts and dispatches success', async () => {
    const fetchDeactivatedAccountsSpy = jest
      .spyOn(accountService, 'fetchDeactivatedAccounts')
      .mockImplementation(() =>
        Promise.resolve({ data: { entityList: fetchAccountsResponseMockData, totalCount: 10 } } as AxiosResponse)
      );
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchAccounts,
      { ...(fetchInactiveAccountsRequestMockData as any), type: ACTION_TYPES.FETCH_ACCOUNTS_REQUEST }
    ).toPromise();
    expect(fetchDeactivatedAccountsSpy).toHaveBeenCalledWith(0, 10, undefined, 'Sample', '3');
    expect(dispatched).toEqual([
      accountActions.fetchAccountsSuccess({
        accounts: fetchAccountsResponseMockData as any,
        total: 10
      })
    ]);
  });

  it('Fetches list of Active Accounts and dispatches success', async () => {
    const fetchActivateAccountsSpy = jest
      .spyOn(accountService, 'fetchAccounts')
      .mockImplementation(() =>
        Promise.resolve({ data: { entityList: fetchAccountsResponseMockData, totalCount: 10 } } as AxiosResponse)
      );
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchAccounts,
      { ...fetchActiveAccountsRequestMockData, type: ACTION_TYPES.FETCH_ACCOUNTS_REQUEST }
    ).toPromise();
    expect(fetchActivateAccountsSpy).toHaveBeenCalledWith('5', true, 0, 10, 'Sample');
    expect(dispatched).toEqual([
      accountActions.fetchAccountsSuccess({
        accounts: fetchAccountsResponseMockData as any,
        total: 10
      })
    ]);
  });

  it('Fails to fetch list of Accounts and dispatches failure', async () => {
    const error = new Error('Failed to fetch Accounts');
    const fetchAccountsSpy = jest
      .spyOn(accountService, 'fetchAccounts')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchAccounts,
      { ...fetchActiveAccountsRequestMockData, type: ACTION_TYPES.FETCH_ACCOUNTS_REQUEST }
    ).toPromise();
    expect(fetchAccountsSpy).toHaveBeenCalledWith('5', true, 0, 10, 'Sample');
    expect(dispatched).toEqual([accountActions.fetchAccountsFailure(error)]);
  });
});

describe('Fetches Account List for Dashboard', () => {
  it('Fetches list of accounts for dashboard and dispatches success', async () => {
    const fetchDashboardAccountsSpy = jest
      .spyOn(accountService, 'fetchDashboardAccounts')
      .mockImplementation(() =>
        Promise.resolve({ data: { entityList: dashboardAccountsResponseMockData, totalCount: 10 } } as AxiosResponse)
      );
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ user: { user: { tenantId: '4' } } })
      },
      getDashboardAccounts,
      { payload: fetchDashboardAccountsRequestMockData, type: ACTION_TYPES.FETCH_ACCOUNT_DASHBOARD_LIST_REQUEST }
    ).toPromise();
    expect(fetchDashboardAccountsSpy).toHaveBeenCalledWith(fetchDashboardAccountsRequestMockData);
    expect(dispatched).toEqual([
      accountActions.fetchDashboardAccSuccess({
        data: dashboardAccountsResponseMockData,
        total: 10
      })
    ]);
  });

  it('Fails to fetch list of accounts for dashboard and dispatches failure', async () => {
    const error = new Error('Failed to fetch dashboard accounts');
    const fetchDashboardAccountsSpy = jest
      .spyOn(accountService, 'fetchDashboardAccounts')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ user: { user: { tenantId: '4' } } })
      },
      getDashboardAccounts,
      { payload: fetchDashboardAccountsRequestMockData, type: ACTION_TYPES.FETCH_ACCOUNT_DASHBOARD_LIST_REQUEST }
    ).toPromise();
    expect(fetchDashboardAccountsSpy).toHaveBeenCalledWith(fetchDashboardAccountsRequestMockData);
    expect(dispatched).toEqual([accountActions.fetchDashboardAccFail(error)]);
  });
});

describe('Activates an inactive account', () => {
  it('Activates an account and dispatches success', async () => {
    const activateAccountSpy = jest
      .spyOn(accountService, 'activateAccount')
      .mockImplementation(() => Promise.resolve({} as AxiosResponse));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      activateAccount,
      { data: activateAccountRequestMockData, type: ACTION_TYPES.ACTIVATE_ACCOUNT_REQUEST }
    ).toPromise();
    expect(activateAccountSpy).toHaveBeenCalledWith(activateAccountRequestMockData);
    expect(dispatched).toEqual([accountActions.activateAccountSuccess()]);
  });

  it('Fails to activate account and dispatches failure', async () => {
    const error = new Error('Failed to activate account');
    const activateAccountSpy = jest
      .spyOn(accountService, 'activateAccount')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      activateAccount,
      { data: activateAccountRequestMockData, type: ACTION_TYPES.ACTIVATE_ACCOUNT_REQUEST }
    ).toPromise();
    expect(activateAccountSpy).toHaveBeenCalledWith(activateAccountRequestMockData);
    expect(dispatched).toEqual([accountActions.activateAccountFail(error)]);
  });
});

describe('Deactivates an account', () => {
  it('Deactivates an account and dispatches success', async () => {
    const deactivateAccountSpy = jest
      .spyOn(accountService, 'deactivateAccount')
      .mockImplementation(() => Promise.resolve({} as AxiosResponse));
    const dispatched: any = [];
    const task = runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      deactivateAccount,
      { data: deactivateAccountRequestMockData, type: ACTION_TYPES.DEACTIVATE_ACCOUNT_REQUEST }
    );

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(task.toPromise());
      }, 1000);
    });

    expect(deactivateAccountSpy).toHaveBeenCalledWith(deactivateAccountRequestMockData);
    expect(dispatched).toEqual([accountActions.deactivateAccountSuccess(), siteActions.clearSiteDropdown()]);
  });

  it('Fails to deactivate account and dispatches failure', async () => {
    const error = new Error('Failed to deactivate account');
    const deactivateAccountSpy = jest
      .spyOn(accountService, 'deactivateAccount')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      deactivateAccount,
      { data: deactivateAccountRequestMockData, type: ACTION_TYPES.DEACTIVATE_ACCOUNT_REQUEST }
    ).toPromise();
    expect(deactivateAccountSpy).toHaveBeenCalledWith(deactivateAccountRequestMockData);
    expect(dispatched).toEqual([accountActions.deactivateAccountFail(error)]);
  });
});

describe('Fetches Account Options', () => {
  it('Fetches list of account options and dispatches success', async () => {
    const fetchAccountOptionsSpy = jest
      .spyOn(accountService, 'fetchAccountOptions')
      .mockImplementation(() =>
        Promise.resolve({ data: { entityList: fetchAccountOptionsResponseMockData } } as AxiosResponse)
      );
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchAccountOptions,
      { ...fetchAccountOptionsRequestMockData, type: ACTION_TYPES.FETCH_ACCOUNT_OPTIONS_REQUEST }
    ).toPromise();
    expect(fetchAccountOptionsSpy).toHaveBeenCalledWith(fetchAccountOptionsRequestMockData);
    expect(dispatched).toEqual([accountActions.fetchAccountOptionsSuccess(fetchAccountOptionsResponseMockData)]);
  });

  it('Fails to fetch list of account options and dispatches failure', async () => {
    const error = new Error('Failed to fetch dashboard accounts');
    const fetchAccountOptionsSpy = jest
      .spyOn(accountService, 'fetchAccountOptions')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ user: { user: { tenantId: '4' } } })
      },
      fetchAccountOptions,
      { ...fetchAccountOptionsRequestMockData, type: ACTION_TYPES.FETCH_ACCOUNT_OPTIONS_REQUEST }
    ).toPromise();
    expect(fetchAccountOptionsSpy).toHaveBeenCalledWith(fetchAccountOptionsRequestMockData);
    expect(dispatched).toEqual([accountActions.fetchAccountOptionsFailure()]);
  });
});
