import { SagaIterator } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as regionService from '../../services/regionAPI';
import {
  ICreateRegionRequest,
  IFetchRegionsRequest,
  IFetchRegionDetailReq,
  IDeactivateRegionReq,
  IDeleteRegionAdminReq,
  ICreateRegionAdminReq,
  IUpdateRegionAdminReq,
  IUpdateRegionReq
} from './types';
import {
  createRegionSuccess,
  fetchRegionsFailure,
  fetchRegionsSuccess,
  fetchRegionDetailFail,
  fetchRegionDetailSuccess,
  updateRegionDetailSuccess,
  createRegionFailure,
  updateRegionDetailFail,
  updateRegionAdminFail,
  updateRegionAdminSuccess,
  createRegionAdminFail,
  createRegionAdminSuccess,
  deleteRegionAdminSuccess,
  deleteRegionAdminFail,
  deactivateRegionFail,
  deactivateRegionSuccess,
  searchUserSuccess
} from './actions';
import {
  CREATE_REGION_ADMIN_REQUEST,
  CREATE_REGION_REQUEST,
  DEACTIVATE_REGION_REQUEST,
  DELETE_REGION_ADMIN_REQUEST,
  FETCH_REGIONS_REQUEST,
  FETCH_REGION_DETAIL_REQUEST,
  UPDATE_REGION_ADMIN_REQUEST,
  UPDATE_REGION_DETAIL_REQUEST
} from './actionTypes';

/*
  Worker Saga: Fired on FETCH_REGIONS_REQUEST action
*/
export function* fetchRegions({
  isLoadMore,
  skip,
  limit,
  search,
  successCb,
  failureCb
}: IFetchRegionsRequest): SagaIterator {
  try {
    const {
      data: { entityList: regions, totalCount: total }
    } = yield call(regionService.fetchRegions as any, limit, skip, undefined, search);
    const payload = { regions: regions || [], total, isLoadMore };
    successCb?.(payload);
    yield put(fetchRegionsSuccess(payload));
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(fetchRegionsFailure(e));
    }
  }
}

/*
  Worker Saga: Fired on FETCH_REGION_DETAIL_REQUEST action
*/
export function* fetchRegionDetail(action: IFetchRegionDetailReq): SagaIterator {
  const { tenantId, id, failureCb, searchTerm } = action.payload;
  try {
    if (searchTerm) {
      const {
        data: { entityList }
      } = yield call(regionService.fetchRegionAdmins as any, {
        tenantId,
        searchTerm,
        userType: 'country'
      });
      yield put(searchUserSuccess(entityList || []));
    } else {
      const response = yield call(regionService.getRegionDetail, {
        tenantId,
        id,
        searchTerm
      });
      yield put(fetchRegionDetailSuccess(response.data.entity));
    }
  } catch (e: any) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(fetchRegionDetailFail(e));
    }
  }
}

/*
  Worker Saga: Fired on CREATE_REGION_REQUEST action
*/
export function* createRegion({ data, successCb, failureCb }: ICreateRegionRequest): SagaIterator {
  try {
    yield call(regionService.createRegion as any, data);
    successCb?.();
    yield put(createRegionSuccess());
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(createRegionFailure(e));
    }
  }
}

/*
  Worker Saga: Fired on UPDATE_REGION_DETAIL_REQUEST action
*/
export function* updateRegionDetail({ data, successCb, failureCb }: IUpdateRegionReq) {
  try {
    yield call(regionService.updateRegion, data);
    successCb?.();
    yield put(updateRegionDetailSuccess(data));
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(updateRegionDetailFail(e));
    }
  }
}

/*
  Worker Saga: Fired on UPDATE_REGION_ADMIN_REQUEST action
*/
export function* updateRegionAdminInfo({ data, successCb, failureCb }: IUpdateRegionAdminReq): SagaIterator {
  try {
    yield call(regionService.updateRegionAdmin, data);
    yield put(updateRegionAdminSuccess());
    successCb?.();
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(updateRegionAdminFail(e));
    }
  }
}

/*
  Worker Saga: Fired on CREATE_REGION_ADMIN_REQUEST action
*/
export function* createRegionAdminInfo({ data, successCb, failureCb }: ICreateRegionAdminReq): SagaIterator {
  try {
    yield call(regionService.createRegionAdmin, data);
    yield put(createRegionAdminSuccess());
    successCb?.();
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(createRegionAdminFail(e));
    }
  }
}

/*
  Worker Saga: Fired on DELETE_REGION_ADMIN_REQUEST action
*/
export function* removeRegionAdmin({ data, successCb, failureCb }: IDeleteRegionAdminReq) {
  try {
    yield call(regionService.deleteRegionAdmin, data);
    yield put(deleteRegionAdminSuccess());
    successCb?.();
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(deleteRegionAdminFail(e));
    }
  }
}

/*
  Worker Saga: Fired on DEACTIVATE_REGION_REQUEST action
*/
export function* deactivateRegion(action: IDeactivateRegionReq): SagaIterator {
  const { tenantId, successCb, failureCb } = action.payload;
  try {
    yield call(regionService.deactivateRegion, { tenantId });
    yield put(deactivateRegionSuccess());
    successCb?.();
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(deactivateRegionFail(e));
    }
  }
}

/*
  Starts worker saga on latest dispatched specific action.
  Allows concurrent increments.
*/
function* regionSaga() {
  yield all([takeLatest(FETCH_REGIONS_REQUEST, fetchRegions)]);
  yield all([takeLatest(CREATE_REGION_REQUEST, createRegion)]);
  yield all([takeLatest(FETCH_REGION_DETAIL_REQUEST, fetchRegionDetail)]);
  yield all([takeLatest(UPDATE_REGION_DETAIL_REQUEST, updateRegionDetail)]);
  yield all([takeLatest(UPDATE_REGION_ADMIN_REQUEST, updateRegionAdminInfo)]);
  yield all([takeLatest(CREATE_REGION_ADMIN_REQUEST, createRegionAdminInfo)]);
  yield all([takeLatest(DELETE_REGION_ADMIN_REQUEST, removeRegionAdmin)]);
  yield all([takeLatest(DEACTIVATE_REGION_REQUEST, deactivateRegion)]);
}

export default regionSaga;
