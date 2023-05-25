import { SagaIterator } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as labtestService from '../../services/labtestAPI';
import {
  ICreateLabtestRequest,
  IDeleteLabtestRequest,
  IFetchLabResultRangeListRequest,
  IFetchLabtestByIdRequest,
  IFetchLabtestsRequest,
  IFetchUnitListRequest,
  ILabTestResultRangeDeleteRequest,
  ISaveUpdateLabResultRangesRequest,
  IUnit,
  IUpdateLabtestRequest
} from './types';
import * as labtestActions from './actions';
import {
  CREATE_LABTEST_REQUEST,
  DELETE_LABTEST_REQUEST,
  FETCH_LABTEST_BY_ID_REQUEST,
  FETCH_LABTEST_REQUEST,
  FETCH_LABTEST_RESULT_RANGE_LIST_REQUEST,
  FETCH_UNIT_LIST_REQUEST,
  LABTEST_RESULT_RANGE_DELETE_REQUEST,
  SAVE_LABTEST_RESULT_RANGES_REQUEST,
  UPDATE_LABTEST_REQUEST
} from './actionTypes';
/*
  Worker Saga: Fired on CREATE_LABTEST_REQUEST action
*/
export function* addLabTest({ data, successCb, failureCb }: ICreateLabtestRequest): SagaIterator {
  try {
    yield call(labtestService.addLabTest, data);
    yield put(labtestActions.createLabtestSuccess());
    successCb?.();
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(labtestActions.createLabtestFailure());
    }
  }
}

/*
  Worker Saga: Fired on FETCH_LABTEST_REQUEST action
*/
export function* fetchLabTest({ data, failureCb }: IFetchLabtestsRequest): SagaIterator {
  try {
    const {
      data: { entityList: labtests, totalCount: total }
    } = yield call(labtestService.fetchLabTest, data);
    const payload = { labtests: labtests || [], total };
    yield put(labtestActions.fetchLabtestsSuccess(payload));
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(labtestActions.fetchLabtestsFailure(e));
    }
  }
}

/*
  Worker Saga: Fired on FETCH_LABTEST_BY_ID_REQUEST action
*/
export function* fetchLabTestById({ payload, successCb, failureCb }: IFetchLabtestByIdRequest): SagaIterator {
  try {
    const {
      data: { entity: labTest }
    } = yield call(labtestService.fetchLabTestbyId, payload);
    yield put(labtestActions.fetchLabtestByIdSuccess(labTest));
    successCb?.(labTest);
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
    }
    yield put(labtestActions.fetchLabtestByIdFailure());
  }
}

/*
  Worker Saga: Fired on UPDATE_LABTEST_REQUEST action
*/
export function* updateLabTest({ data, successCb, failureCb }: IUpdateLabtestRequest): SagaIterator {
  try {
    yield call(labtestService.updateLabTest, data);
    yield put(labtestActions.updateLabtestSuccess());
    successCb?.();
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(labtestActions.updateLabtestFailure(e));
    }
  }
}

/*
  Worker Saga: Fired on DELETE_LABTEST_REQUEST action
*/
export function* deleteLabtest({ data, successCb, failureCb }: IDeleteLabtestRequest): SagaIterator {
  try {
    yield call(labtestService.deleteLabtest, data);
    yield put(labtestActions.deleteLabtestSuccess());
    successCb?.();
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(labtestActions.deleteLabtestFail(e));
    }
  }
}

/*
  Worker Saga: Fired on FETCH_UNIT_LIST_REQUEST action
*/
export function* fetchUnitList({ unitType }: IFetchUnitListRequest): SagaIterator {
  try {
    const { data } = yield call(labtestService.fetchUnitList, unitType);
    const units: IUnit[] = data.map(({ name, id }: any) => ({
      unit: name,
      id
    }));
    yield put(labtestActions.fetchUnitListSuccess(units, unitType));
  } catch (e) {
    if (e instanceof Error) {
      yield put(labtestActions.fetchUnitListFail(e));
    }
  }
}

/*
  Worker Saga: Fired on FETCH_LABTEST_RESULT_RANGE_LIST_REQUEST action
*/
export function* fetchLabResultUnitList({ data, successCb, failureCb }: IFetchLabResultRangeListRequest): SagaIterator {
  try {
    const {
      data: { entityList: labResultRangeList }
    } = yield call(labtestService.fetchLabTestRange, data);
    labResultRangeList.map(
      (labResultRange: any) =>
        (labResultRange.unitId = {
          id: labResultRange.unitId,
          unit: labResultRange.unit
        })
    );
    yield put(labtestActions.fetchLabResultRangeListSuccess(labResultRangeList || []));
    successCb?.(labResultRangeList || []);
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(labtestActions.fetchLabResultRangeListFail(e));
    }
  }
}

/*
  Worker Saga: Fired on SAVE_LABTEST_RESULT_RANGES_REQUEST action
*/
export function* saveLabTestResultUnit({
  data,
  isUpdate,
  successCb,
  failureCb
}: ISaveUpdateLabResultRangesRequest): SagaIterator {
  try {
    yield call(labtestService.saveUpdateLabTestResultRanges, data, isUpdate);
    yield put(labtestActions.saveUpdateLabResultRangesSuccess());
    successCb?.();
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(labtestActions.saveUpdateLabResultRangesFail(e));
    }
  }
}

/*
  Worker Saga: Fired on LABTEST_RESULT_RANGE_DELETE_REQUEST action
*/
export function* deleteLabTestRange({ data, successCb, failureCb }: ILabTestResultRangeDeleteRequest): SagaIterator {
  try {
    yield call(labtestService.deleteLabTestRange, data);
    yield put(labtestActions.deleteLabTestRangeSuccess());
    successCb?.();
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(labtestActions.deleteLabTestRangeFaliure(e));
    }
  }
}

/*
  Starts worker saga on latest dispatched specific action.
*/
function* labtestSaga() {
  yield all([takeLatest(CREATE_LABTEST_REQUEST, addLabTest)]);
  yield all([takeLatest(FETCH_LABTEST_REQUEST, fetchLabTest)]);
  yield all([takeLatest(UPDATE_LABTEST_REQUEST, updateLabTest)]);
  yield all([takeLatest(DELETE_LABTEST_REQUEST, deleteLabtest)]);
  yield all([takeLatest(FETCH_LABTEST_BY_ID_REQUEST, fetchLabTestById)]);
  yield all([takeLatest(FETCH_UNIT_LIST_REQUEST, fetchUnitList)]);
  yield all([takeLatest(FETCH_LABTEST_RESULT_RANGE_LIST_REQUEST, fetchLabResultUnitList)]);
  yield all([takeLatest(SAVE_LABTEST_RESULT_RANGES_REQUEST, saveLabTestResultUnit)]);
  yield all([takeLatest(LABTEST_RESULT_RANGE_DELETE_REQUEST, deleteLabTestRange)]);
}

export default labtestSaga;
