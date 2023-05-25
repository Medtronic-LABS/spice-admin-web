import { SagaIterator } from 'redux-saga';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import * as accountService from '../../services/accountAPI';
import {
  IFetchAccountsRequest,
  ICreateAccountRequest,
  IFetchAccountDetailReq,
  IFetchDashboardAccount,
  IUpdateAccountReq,
  IUpdateAccountAdminReq,
  ICreateAccountAdminReq,
  IDeleteAccountAdminReq,
  IDeactivateAccountReq,
  IFetchAccountOptionsRequest,
  IFetchAccountAdminRequest,
  IActivateAccountReq,
  IAccount,
  ICreateAccountWorkflowModule,
  IFetchClinicalWorkflowReq,
  IClinicalWorkflow,
  IUpdateAccountWorkflowModule,
  IFetchClinicalWorkflowSuccessPayload,
  IDeleteAccountWorkflowModule,
  IFetchAccountOptionsPayload
} from './types';
import * as accountActions from './actions';
import * as siteActions from '../site/actions';
import {
  FETCH_ACCOUNTS_REQUEST,
  CREATE_ACCOUNT_REQUEST,
  FETCH_ACCOUNT_DETAIL_REQUEST,
  FETCH_ACCOUNT_DASHBOARD_LIST_REQUEST,
  UPDATE_ACCOUNT_DETAIL_REQUEST,
  CREATE_ACCOUNT_ADMIN_REQUEST,
  UPDATE_ACCOUNT_ADMIN_REQUEST,
  DELETE_ACCOUNT_ADMIN_REQUEST,
  DEACTIVATE_ACCOUNT_REQUEST,
  FETCH_ACCOUNT_OPTIONS_REQUEST,
  FETCH_ACCOUNT_ADMIN_REQUEST,
  ACTIVATE_ACCOUNT_REQUEST,
  FETCH_CLINICAL_WORKFLOW_REQUEST,
  CREATE_ACCOUNT_WORKFLOW_MODULE_REQUEST,
  UPDATE_ACCOUNT_WORKFLOW_MODULE_REQUEST,
  DELETE_ACCOUNT_WORKFLOW_MODULE_REQUEST
} from './actionTypes';
import { fetchAccountAdmins as fetchAccountAdminsApi } from '../../services/accountAPI';
import { AppState } from '../rootReducer';

/*
  Worker Saga: Fired on FETCH_AccountS_REQUEST action
*/
export function* fetchAccounts({
  tenantId,
  isActive,
  skip,
  limit,
  search,
  successCb,
  failureCb
}: IFetchAccountsRequest): SagaIterator {
  try {
    let response: { entityList: IAccount[]; totalCount: number };
    if (!isActive) {
      const { data } = yield call(
        accountService.fetchDeactivatedAccounts as any,
        skip,
        limit,
        undefined,
        search,
        tenantId
      );
      response = data;
    } else {
      const { data } = yield call(accountService.fetchAccounts as any, tenantId, isActive, skip, limit, search);
      response = data;
    }
    const payload = { accounts: response?.entityList || [], total: response.totalCount };
    successCb?.(payload);
    yield put(accountActions.fetchAccountsSuccess(payload));
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(accountActions.fetchAccountsFailure(e));
    }
  }
}

/*
  Worker Saga: Fired on CREATE_Account_REQUEST action
*/
export function* createAccount({ data, successCb, failureCb }: ICreateAccountRequest): SagaIterator {
  try {
    yield call(accountService.createAccount, data);
    successCb?.();
    yield put(accountActions.createAccountSuccess());
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(accountActions.createAccountFailure(e));
    }
  }
}

/*
  Worker Saga: Fired on FETCH_ACCOUNT_DETAIL_REQUEST action
*/
export function* fetchAccountDetail(action: IFetchAccountDetailReq): SagaIterator {
  const { tenantId, id, successCb, failureCb, searchTerm } = action.payload;
  try {
    if (searchTerm) {
      const {
        data: { entityList }
      } = yield call(fetchAccountAdminsApi as any, {
        userType: 'account',
        tenantId,
        searchTerm
      });
      yield put(accountActions.searchUserSuccess(entityList || []));
    } else {
      const response = yield call(accountService.fetchAccountDetails, {
        tenantId: Number(tenantId),
        id: Number(id)
      });
      yield put(accountActions.fetchAccountDetailSuccess(response.data?.entity));
      successCb?.(response.data?.entity);
    }
  } catch (e: any) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(accountActions.fetchAccountDetailFail(e));
    }
  }
}

/*
  Worker Saga: Fired on FETCH_ACCOUNT_DASHBOARD_LIST_REQUEST action
*/
export function* getDashboardAccounts(action: IFetchDashboardAccount): SagaIterator {
  try {
    const { skip, limit, searchTerm, successCb, isLoadMore } = action.payload;
    const tenantId = yield select((state: AppState) => state.user.user.tenantId);
    const {
      data: { entityList: data, totalCount: total }
    }: any = yield call(accountService.fetchDashboardAccounts as any, {
      skip,
      limit,
      tenantId,
      searchTerm: searchTerm || ''
    });
    successCb?.();
    const payload = { data: data || [], total, isLoadMore };
    yield put(accountActions.fetchDashboardAccSuccess(payload));
  } catch (e) {
    if (e instanceof Error) {
      action.payload.failureCb?.(e);
      yield put(accountActions.fetchDashboardAccFail(e));
    }
  }
}

/*
  Worker Saga: Fired on UPDATE_ACCOUNT_DETAIL_REQUEST action
*/
export function* updateAccountDetail({ data, successCb, failureCb }: IUpdateAccountReq): SagaIterator {
  try {
    yield call(accountService.updateAccount, data);
    successCb?.();
    yield put(accountActions.updateAccountDetailSuccess(data));
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(accountActions.updateAccountDetailFail(e));
    }
  }
}

/*
  Worker Saga: Fired on UPDATE_ACCOUNT_ADMIN_REQUEST action
*/
export function* updateAccountAdminInfo({ data, successCb, failureCb }: IUpdateAccountAdminReq): SagaIterator {
  try {
    yield call(accountService.updateAccountAdmin, data);
    yield put(accountActions.updateAccountAdminSuccess());
    successCb?.();
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(accountActions.updateAccountAdminFail(e));
    }
  }
}

/*
  Worker Saga: Fired on CREATE_ACCOUNT_ADMIN_REQUEST action
*/
export function* createAccountAdminInfo({ data, successCb, failureCb }: ICreateAccountAdminReq): SagaIterator {
  try {
    yield call(accountService.createAccountAdmin, data);
    yield put(accountActions.createAccountAdminSuccess());
    successCb?.();
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(accountActions.createAccountAdminFail(e));
    }
  }
}

/*
  Worker Saga: Fired on DELETE_ACCOUNT_ADMIN_REQUEST action
*/
export function* removeAccountAdmin({ data, successCb, failureCb }: IDeleteAccountAdminReq) {
  try {
    yield call(accountService.deleteAccountAdmin, data);
    yield put(accountActions.deleteAccountAdminSuccess());
    successCb?.();
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(accountActions.deleteAccountAdminFail(e));
    }
  }
}

/*
  Worker Saga: Fired on DEACTIVATE_ACCOUNT_REQUEST action
*/
export function* deactivateAccount({ data, successCb, failureCb }: IDeactivateAccountReq) {
  try {
    yield call(accountService.deactivateAccount, data);
    yield put(accountActions.deactivateAccountSuccess());
    yield put(siteActions.clearSiteDropdown());
    successCb?.();
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(accountActions.deactivateAccountFail(e));
    }
  }
}

/*
  Worker Saga: Fired on ACTIVATE_ACCOUNT_REQUEST action
*/
export function* activateAccount({ data, successCb, failureCb }: IActivateAccountReq) {
  try {
    yield call(accountService.activateAccount, data);
    yield put(accountActions.activateAccountSuccess());
    successCb?.();
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(accountActions.activateAccountFail(e));
    }
  }
}

/*
  Worker Saga: Fired on FETCH_ACCOUNT_OPTIONS_REQUEST action
*/
export function* fetchAccountOptions(action: IFetchAccountOptionsRequest): SagaIterator {
  try {
    const {
      data: { entityList: data }
    } = yield call(accountService.fetchAccountOptions, {
      tenantId: action.tenantId,
      skip: 0,
      limit: null,
      searchTerm: ''
    } as IFetchAccountOptionsPayload);
    yield put(accountActions.fetchAccountOptionsSuccess(data));
  } catch (e) {
    yield put(accountActions.fetchAccountOptionsFailure());
  }
}

/*
  Worker Saga: Fired on FETCH_ACCOUNT_ADMIN_REQUEST action
*/
export function* fetchAccountAdmins({ data, successCb, failureCb }: IFetchAccountAdminRequest): SagaIterator {
  try {
    const {
      data: { entityList: admins, totalCount: total }
    } = yield call(accountService.fetchAccountAdmins, { ...data, userType: 'account' });
    const payload = { admins: admins || [], total };
    payload.admins.map((admin: any) => (admin.organizationName = admin.organizations?.[0]?.name));
    successCb?.(payload);
    yield put(accountActions.fetchAccountAdminsSuccess(payload));
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(accountActions.fetchAccountAdminsFailure(e));
    }
  }
}

/*
  Worker Saga: Fired on FETCH_CLINICAL_WORKFLOW_REQUEST action
*/
export function* fetchClinicalWorkflows({ data }: IFetchClinicalWorkflowReq): SagaIterator {
  try {
    const { data: worflowsResponse } = yield call(accountService.fetchClinicalWorkflows, data);
    const { entityList: workflows } = worflowsResponse;
    const { totalCount: total } = worflowsResponse;
    const sortedWokflows = workflows.sort((workflowA: IClinicalWorkflow, workflowB: IClinicalWorkflow) =>
      (workflowA.moduleType || 0) > (workflowB.moduleType || 0) ? 1 : -1
    );
    const payload: IFetchClinicalWorkflowSuccessPayload = {
      data: (sortedWokflows || []) as IClinicalWorkflow[],
      total
    };
    yield put(accountActions.fetchClinicalWorkflowSuccess(payload));
  } catch (e) {
    if (e instanceof Error) {
      yield put(accountActions.fetchClinicalWorkflowFailure());
    }
  }
}

/*
  Worker Saga: Fired on CREATE_ACCOUNT_WORKFLOW_MODULE_REQUEST action
*/
export function* createAccountWorkflowRequest({
  data,
  successCb,
  failureCb
}: ICreateAccountWorkflowModule): SagaIterator {
  try {
    yield call(accountService.createAccountWorkflowModule, data);
    successCb?.();
    yield put(accountActions.createAccountWorkflowModuleSuccess());
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(accountActions.createAccountWorkflowModuleFailure(e));
    }
  }
}

/*
  Worker Saga: Fired on UPDATE_ACCOUNT_WORKFLOW_MODULE_REQUEST action
*/
export function* updateAccountWorkflowRequest({
  data,
  successCb,
  failureCb
}: IUpdateAccountWorkflowModule): SagaIterator {
  try {
    yield call(accountService.updateAccountWorkflowModule, data);
    successCb?.();
    yield put(accountActions.updateAccountWorkflowModuleSuccess());
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(accountActions.updateAccountWorkflowModuleFailure(e));
    }
  }
}

/*
  Worker Saga: Fired on DELETE_ACCOUNT_WORKFLOW_MODULE_REQUEST action
*/
export function* deleteAccountWorkflowRequest({
  data,
  successCb,
  failureCb
}: IDeleteAccountWorkflowModule): SagaIterator {
  try {
    yield call(accountService.deleteAccountWorkflowModule, data);
    successCb?.();
    yield put(accountActions.deleteAccountWorkflowModuleSuccess());
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(accountActions.deleteAccountWorkflowModuleFailure(e));
    }
  }
}

/*
  Starts worker saga on latest dispatched specific action.
*/
function* accountSaga() {
  yield all([takeLatest(FETCH_ACCOUNTS_REQUEST, fetchAccounts)]);
  yield all([takeLatest(CREATE_ACCOUNT_REQUEST, createAccount)]);
  yield all([takeLatest(FETCH_ACCOUNT_DETAIL_REQUEST, fetchAccountDetail)]);
  yield all([takeLatest(FETCH_ACCOUNT_DASHBOARD_LIST_REQUEST, getDashboardAccounts)]);
  yield all([takeLatest(UPDATE_ACCOUNT_DETAIL_REQUEST, updateAccountDetail)]);
  yield all([takeLatest(UPDATE_ACCOUNT_ADMIN_REQUEST, updateAccountAdminInfo)]);
  yield all([takeLatest(CREATE_ACCOUNT_ADMIN_REQUEST, createAccountAdminInfo)]);
  yield all([takeLatest(DELETE_ACCOUNT_ADMIN_REQUEST, removeAccountAdmin)]);
  yield all([takeLatest(ACTIVATE_ACCOUNT_REQUEST, activateAccount)]);
  yield all([takeLatest(DEACTIVATE_ACCOUNT_REQUEST, deactivateAccount)]);
  yield all([takeLatest(FETCH_ACCOUNT_OPTIONS_REQUEST, fetchAccountOptions)]);
  yield all([takeLatest(FETCH_ACCOUNT_ADMIN_REQUEST, fetchAccountAdmins)]);
  yield all([takeLatest(FETCH_CLINICAL_WORKFLOW_REQUEST, fetchClinicalWorkflows)]);
  yield all([takeLatest(CREATE_ACCOUNT_WORKFLOW_MODULE_REQUEST, createAccountWorkflowRequest)]);
  yield all([takeLatest(UPDATE_ACCOUNT_WORKFLOW_MODULE_REQUEST, updateAccountWorkflowRequest)]);
  yield all([takeLatest(DELETE_ACCOUNT_WORKFLOW_MODULE_REQUEST, deleteAccountWorkflowRequest)]);
}

export default accountSaga;
