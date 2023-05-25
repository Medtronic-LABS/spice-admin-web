import { SagaIterator } from 'redux-saga';
import { all, call, put, takeLatest, select } from 'redux-saga/effects';

import * as operatingUnitAPI from '../../services/operatingUnitAPI';
import * as operatinUnitActions from './actions';
import {
  IFetchOUDashboardListRequest,
  IFetchOperatingUnitDetailReq,
  IFetchOperatingUnitListRequest,
  ICreateOperatingUnitRequest,
  IUpdateOperatingUnitRequest,
  IUpdateOperatingUnitAdminRequest,
  IDeleteOperatingUnitAdminRequest,
  IFetchOperatingUnitByIdRequest,
  IFetchOperatingUnitAdminsRequest,
  ICreateOperatingUnitAdminRequest,
  IOperatingUnitDropdownRequest
} from './types';
import * as ACTION_TYPES from './actionTypes';
import { AppState } from '../rootReducer';
import { fetchOperatingUnitAdmins } from '../../services/operatingUnitAPI';
import {
  fetchOperatingUnitAdminsFailure,
  fetchOperatingUnitAdminsSuccess,
  fetchOperatingUnitDropdownFailure,
  fetchOperatingUnitDropdownSuccess
} from './actions';

/*
  Worker Saga: Fired on FETCH_REGIONS_REQUEST action
*/
export function* fetchOperatingUnitDashboardList({
  isLoadMore,
  skip,
  limit,
  search,
  successCb,
  failureCb
}: IFetchOUDashboardListRequest): SagaIterator {
  try {
    const tenantId = yield select((state: AppState) => state.user.user.tenantId);
    const {
      data: { entityList: operatingUnitDashboardList, totalCount: total }
    } = yield call(operatingUnitAPI.fetchOperatingUnitDashboardList as any, tenantId, limit, skip, undefined, search);
    const payload = { operatingUnitDashboardList: operatingUnitDashboardList || [], total, isLoadMore };
    successCb?.(payload);
    yield put(operatinUnitActions.fetchOUDashboardListSuccess(payload));
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(operatinUnitActions.fetchOUDashboardListFailure(e));
    }
  }
}

/*
  Worker Saga: Fired on FETCH_OPERATING_UNIT_DETAIL_REQUEST action
*/
export function* fetchOperatingUnitDetail(action: IFetchOperatingUnitDetailReq): SagaIterator {
  const { tenantId, id, successCb, failureCb, searchTerm } = action.payload;
  try {
    if (searchTerm) {
      const {
        data: { entityList: userResponse }
      } = yield call(fetchOperatingUnitAdmins, {
        tenantId,
        searchTerm,
        userType: 'operatingunit'
      });
      yield put(operatinUnitActions.searchUserSuccess(userResponse || []));
    } else {
      const {
        data: {
          entity: { users: operatingUnitAdmins, ...operatingUnitDetail }
        }
      } = yield call(operatingUnitAPI.getOperatingUnitDetails, { tenantId, id });
      yield put(
        operatinUnitActions.fetchOperatingUnitDetailSuccess({
          operatingUnitDetail: {
            ...operatingUnitDetail,
            county: {
              id: operatingUnitDetail.county?.id || operatingUnitDetail.county,
              name: operatingUnitDetail.county?.name
            },
            account: {
              id: operatingUnitDetail.account?.id || operatingUnitDetail.account,
              name: operatingUnitDetail.account?.name,
              tenantId: operatingUnitDetail.account?.tenantId
            }
          },
          operatingUnitAdmins
        })
      );
      successCb?.();
    }
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(operatinUnitActions.fetchOperatingUnitDetailFail(e));
    }
  }
}

/*
  Worker Saga: Fired on FETCH_OPERATING_UNIT_LIST_REQUEST action
*/
export function* fetchOperatingUnitList({
  tenantId,
  skip,
  limit,
  search,
  failureCb
}: IFetchOperatingUnitListRequest): SagaIterator {
  try {
    const {
      data: { entityList: operatingUnitList, totalCount: total }
    } = yield call(operatingUnitAPI.fetchOperatingUnitList, tenantId, limit, skip, search);
    const payload = { operatingUnitList: operatingUnitList || [], total };
    yield put(operatinUnitActions.fetchOperatingUnitListSuccess(payload));
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(operatinUnitActions.fetchOperatingUnitListFailure(e));
    }
  }
}

/*
  Worker Saga: Fired on CREATE_OPERATING_UNIT_REQUEST action
*/
export function* createOperatingUnit(action: ICreateOperatingUnitRequest) {
  try {
    yield call(operatingUnitAPI.createOperatingUnit, action.payload);
    action.successCb?.();
    yield put(operatinUnitActions.createOperatingUnitSuccess());
  } catch (e) {
    if (e instanceof Error) {
      action.failureCb?.(e);
    }
    yield put(operatinUnitActions.createOperatingUnitFailure());
  }
}

/*
  Worker Saga: Fired on UPDATE_OPERATING_UNIT_REQUEST action
*/
export function* updateOperatingUnit(action: IUpdateOperatingUnitRequest) {
  try {
    const { payload } = action;
    yield call(operatingUnitAPI.updateOperatingUnit, payload);
    action.successCb?.();
    let newOuDetail;
    if (action.isSuccessPayloadNeeded) {
      newOuDetail = {
        name: payload.name
      };
    }
    yield put(operatinUnitActions.updateOperatingUnitSuccess(newOuDetail));
  } catch (e) {
    if (e instanceof Error) {
      action.failureCb?.(e);
    }
    yield put(operatinUnitActions.updateOperatingUnitFailure());
  }
}

/*
  Worker Saga: Fired on UPDATE_OPERATING_UNIT_ADMIN_REQUEST action
*/
export function* updateOperatingUnitAdmin(action: IUpdateOperatingUnitAdminRequest) {
  try {
    yield call(operatingUnitAPI.updateOperatingUnitAdmin, action.payload);
    action.successCb?.();
    yield put(operatinUnitActions.updateOperatingUnitAdminSuccess());
  } catch (e) {
    if (e instanceof Error) {
      action.failureCb?.(e);
    }
    yield put(operatinUnitActions.updateOperatingUnitAdminFailure());
  }
}

/*
  Worker Saga: Fired on CREATE_OPERATING_UNIT_ADMIN_REQUEST action
*/
export function* createOperatingUnitAdmin(action: ICreateOperatingUnitAdminRequest) {
  try {
    yield call(operatingUnitAPI.createOperatingUnitAdmin, action.payload);
    action.successCb?.();
    yield put(operatinUnitActions.createOperatingUnitAdminSuccess());
  } catch (e) {
    if (e instanceof Error) {
      action.failureCb?.(e);
    }
    yield put(operatinUnitActions.createOperatingUnitAdminFailure());
  }
}

/*
  Worker Saga: Fired on DELETE_OPERATING_UNIT_ADMIN_REQUEST action
*/
export function* deleteOperatingUnitAdmin(action: IDeleteOperatingUnitAdminRequest) {
  try {
    yield call(operatingUnitAPI.deleteOperatingUnitAdmin, action.payload);
    action.successCb?.();
    yield put(operatinUnitActions.deleteOperatingUnitAdminSuccess());
  } catch (e) {
    if (e instanceof Error) {
      action.failureCb?.(e);
    }
    yield put(operatinUnitActions.deleteOperatingUnitAdminFailure());
  }
}

/*
  Worker Saga: Fired on FETCH_OPERATING_UNIT_BY_ID_REQUEST action
*/
export function* fetchOperatingUnitById(action: IFetchOperatingUnitByIdRequest): SagaIterator {
  try {
    const {
      data: { entity: data }
    } = yield call(operatingUnitAPI.fetchOperatingUnitById, action.payload);
    action.successCb?.({ ...data, county: { id: data.county?.id || data.county } });
    yield put(operatinUnitActions.fetchOperatingUnitByIdSuccess());
  } catch (e) {
    if (e instanceof Error) {
      action.failureCb?.(e);
    }
    yield put(operatinUnitActions.fetchOperatingUnitByIdFailure());
  }
}

/*
  Worker Saga: Fired on FETCH_OPERATING_UNIT_ADMIN_LIST_REQUEST action
*/
export function* fetchOperatingUnitAdminList({
  payload,
  successCb,
  failureCb
}: IFetchOperatingUnitAdminsRequest): SagaIterator {
  payload.userType = 'operatingunit';
  try {
    const {
      data: { entityList: operatingUnitAdmins, totalCount: total }
    } = yield call(operatingUnitAPI.fetchOperatingUnitAdmins as any, payload);
    const successPayload = { operatingUnitAdmins, total };
    (successPayload.operatingUnitAdmins || []).map(
      (admin: any) => (admin.organizationName = admin.organizations[0].name)
    );
    successCb?.(successPayload);
    yield put(fetchOperatingUnitAdminsSuccess(successPayload));
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(fetchOperatingUnitAdminsFailure(e));
    }
  }
}

/*
  Worker Saga: Fired on FETCH_OPERATING_UNIT_DROPDOWN_REQUEST action
*/
export function* getOUListForDropdown({ tenantId }: IOperatingUnitDropdownRequest): SagaIterator {
  try {
    const {
      data: { entityList: operatingUnitList, total, limit }
    } = yield call(operatingUnitAPI.fetchOperatingUnitForDropdown as any, { tenantId });
    const payload = { operatingUnitList: operatingUnitList || [], total, limit };
    yield put(fetchOperatingUnitDropdownSuccess(payload));
  } catch (e) {
    if (e instanceof Error) {
      yield put(fetchOperatingUnitDropdownFailure(e));
    }
  }
}

/*
  Starts worker saga on latest dispatched specific action.
  Allows concurrent increments.
*/
function* operatingUnitSaga() {
  yield all([takeLatest(ACTION_TYPES.FETCH_OPERATING_UNIT_DASHBOARD_LIST_REQUEST, fetchOperatingUnitDashboardList)]);
  yield all([takeLatest(ACTION_TYPES.FETCH_OPERATING_UNIT_DETAIL_REQUEST, fetchOperatingUnitDetail)]);
  yield all([takeLatest(ACTION_TYPES.FETCH_OPERATING_UNIT_LIST_REQUEST, fetchOperatingUnitList)]);
  yield all([takeLatest(ACTION_TYPES.CREATE_OPERATING_UNIT_REQUEST, createOperatingUnit)]);
  yield all([takeLatest(ACTION_TYPES.UPDATE_OPERATING_UNIT_REQUEST, updateOperatingUnit)]);
  yield all([takeLatest(ACTION_TYPES.UPDATE_OPERATING_UNIT_ADMIN_REQUEST, updateOperatingUnitAdmin)]);
  yield all([takeLatest(ACTION_TYPES.CREATE_OPERATING_UNIT_ADMIN_REQUEST, createOperatingUnitAdmin)]);
  yield all([takeLatest(ACTION_TYPES.DELETE_OPERATING_UNIT_ADMIN_REQUEST, deleteOperatingUnitAdmin)]);
  yield all([takeLatest(ACTION_TYPES.FETCH_OPERATING_UNIT_BY_ID_REQUEST, fetchOperatingUnitById)]);
  yield all([takeLatest(ACTION_TYPES.FETCH_OPERATING_UNIT_ADMIN_LIST_REQUEST, fetchOperatingUnitAdminList)]);
  yield all([takeLatest(ACTION_TYPES.FETCH_OPERATING_UNIT_DROPDOWN_REQUEST, getOUListForDropdown)]);
}

export default operatingUnitSaga;
