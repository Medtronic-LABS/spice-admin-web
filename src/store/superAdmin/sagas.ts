import { SagaIterator } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as superAdminService from '../../services/superAdminAPI';
import {
  IFetchSuperAdminsRequest,
  ICreateSuperAdminReq,
  IDeleteSuperAdminReq,
  IUpdateSuperAdminReq,
  IFetchSuperAdminReq
} from './types';
import {
  fetchSuperAdminsFailure,
  fetchSuperAdminsSuccess,
  createSuperAdminFail,
  createSuperAdminSuccess,
  deleteSuperAdminSuccess,
  deleteSuperAdminFail,
  updateSuperAdminSuccess,
  updateSuperAdminFail,
  fetchSuperAdminSuccess,
  fetchSuperAdminFail
} from './actions';
import {
  FETCH_SUPERADMINS_REQUEST,
  CREATE_SUPER_ADMIN_REQUEST,
  DELETE_SUPER_ADMIN_REQUEST,
  UPDATE_SUPER_ADMIN_REQUEST,
  FETCH_SUPER_ADMIN_REQUEST
} from './actionTypes';

/*
  Worker Saga: Fired on FETCH_SUPERADMINS_REQUEST action
*/
export function* fetchSuperAdmins({
  pageNo,
  limit,
  search,
  successCb,
  failureCb
}: IFetchSuperAdminsRequest): SagaIterator {
  try {
    const {
      data: { entityList: superAdmins, totalCount: total }
    } = yield call(superAdminService.fetchSuperAdmins as any, pageNo, limit, search);
    const payload = { superAdmins: superAdmins || [], total };
    successCb?.(payload);
    yield put(fetchSuperAdminsSuccess(payload));
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(fetchSuperAdminsFailure(e));
    }
  }
}

/*
  Worker Saga: Fired on CREATE_SUPER_ADMIN_REQUEST action
*/
export function* createSuperAdminInfo({ data, successCb, failureCb }: ICreateSuperAdminReq): SagaIterator {
  try {
    yield call(superAdminService.createSuperAdmin, data);
    successCb?.();
    yield put(createSuperAdminSuccess());
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(createSuperAdminFail(e));
    }
  }
}

/*
  Worker Saga: Fired on DELETE_SUPER_ADMIN_REQUEST action
*/
export function* deleteSuperAdmin({ data, successCb, failureCb }: IDeleteSuperAdminReq) {
  try {
    yield call(superAdminService.deleteSuperAdmin, data);
    yield put(deleteSuperAdminSuccess());
    successCb?.();
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(deleteSuperAdminFail(e));
    }
  }
}

/*
  Worker Saga: Fired on UPDATE_SUPER_ADMIN_REQUEST action
*/
export function* updateSuperAdmin({ data, successCb, failureCb }: IUpdateSuperAdminReq): SagaIterator {
  try {
    yield call(superAdminService.updateSuperAdmin, data);
    yield put(updateSuperAdminSuccess());
    successCb?.();
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(updateSuperAdminFail(e));
    }
  }
}

/*
  Worker Saga: Fired on FETCH_SUPERADMINS_REQUEST action
*/
export function* fetchSuperAdmin({ id, successCb, failureCb }: IFetchSuperAdminReq): SagaIterator {
  try {
    const response = yield call(superAdminService.fetchSuperAdmin, id);
    yield put(fetchSuperAdminSuccess(response.data.entity));
    successCb?.(response.data.entity);
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(fetchSuperAdminFail(e));
    }
  }
}

/*
  Starts worker saga on latest dispatched specific action.
  Allows concurrent increments.
*/
function* superAdminSaga() {
  yield all([takeLatest(FETCH_SUPERADMINS_REQUEST, fetchSuperAdmins)]);
  yield all([takeLatest(CREATE_SUPER_ADMIN_REQUEST, createSuperAdminInfo)]);
  yield all([takeLatest(DELETE_SUPER_ADMIN_REQUEST, deleteSuperAdmin)]);
  yield all([takeLatest(UPDATE_SUPER_ADMIN_REQUEST, updateSuperAdmin)]);
  yield all([takeLatest(FETCH_SUPER_ADMIN_REQUEST, fetchSuperAdmin)]);
}

export default superAdminSaga;
