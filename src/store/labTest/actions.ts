import * as ACTION_TYPES from './actionTypes';
import {
  ICreateLabtestFailure,
  ICreateLabtestRequest,
  ICreateLabtestRequestPayload,
  ICreateLabtestSuccess,
  IFetchLabtestsSuccessPayload,
  IFetchLabtestsRequest,
  IFetchLabtestsSuccess,
  IFetchLabtestsFailure,
  IFetchLabtest,
  IUpdateLabtestRequestPayload,
  IUpdateLabtestRequest,
  IUpdateLabtestSuccess,
  IUpdateLabtestFailure,
  IDeleteLabtestRequestPayload,
  IDeleteLabtestRequest,
  IDeleteLabtestSuccess,
  IDeleteLabtestFailure,
  ILabTest,
  IFetchLabtestByIdRequest,
  IFetchLabtestByIdSuccess,
  IFetchLabtestByIdFailure,
  IFetchUnitListRequest,
  IFetchUnitListSuccess,
  IFetchUnitListFailure,
  IFetchLabResultRangeListSuccess,
  IFetchLabResultRangeListFailure,
  IFetchLabResultRangeListRequest,
  ILabResultRange,
  ISaveUpdateLabResultRangesFailure,
  ISaveUpdateLabResultRangesSuccess,
  ISaveUpdateLabResultRangesRequest,
  ILabTestResultRangeDeleteRequest,
  ILabTestResultRangeDeleteSuccess,
  ILabTestResultRangeDeleteFailure,
  IUnit,
  IClearUnitListRequest
} from './types';

export const createLabtestRequest = ({
  data,
  successCb,
  failureCb
}: ICreateLabtestRequestPayload): ICreateLabtestRequest => ({
  type: ACTION_TYPES.CREATE_LABTEST_REQUEST,
  data,
  successCb,
  failureCb
});

export const createLabtestSuccess = (): ICreateLabtestSuccess => ({
  type: ACTION_TYPES.CREATE_LABTEST_SUCCESS
});

export const createLabtestFailure = (): ICreateLabtestFailure => ({
  type: ACTION_TYPES.CREATE_LABTEST_FAILURE
});

export const fetchLabtestsRequest = ({
  data,
  successCb,
  failureCb
}: {
  data: IFetchLabtest;
  successCb?: (payload: IFetchLabtestsSuccessPayload) => void;
  failureCb?: (error: Error) => void;
}): IFetchLabtestsRequest => ({
  type: ACTION_TYPES.FETCH_LABTEST_REQUEST,
  data,
  successCb,
  failureCb
});

export const fetchLabtestsSuccess = (payload: IFetchLabtestsSuccessPayload): IFetchLabtestsSuccess => ({
  type: ACTION_TYPES.FETCH_LABTEST_SUCCESS,
  payload
});

export const fetchLabtestsFailure = (error: Error): IFetchLabtestsFailure => ({
  type: ACTION_TYPES.FETCH_LABTEST_FAILURE,
  error
});

export const fetchLabtestByIdRequest = ({
  payload,
  successCb,
  failureCb
}: Omit<IFetchLabtestByIdRequest, 'type'>): IFetchLabtestByIdRequest => ({
  type: ACTION_TYPES.FETCH_LABTEST_BY_ID_REQUEST,
  payload,
  successCb,
  failureCb
});

export const fetchLabtestByIdSuccess = (payload: ILabTest): IFetchLabtestByIdSuccess => ({
  type: ACTION_TYPES.FETCH_LABTEST_BY_ID_SUCCESS,
  payload
});

export const fetchLabtestByIdFailure = (): IFetchLabtestByIdFailure => ({
  type: ACTION_TYPES.FETCH_LABTEST_BY_ID_FAILURE
});

export const updateLabtestRequest = ({
  data,
  successCb,
  failureCb
}: IUpdateLabtestRequestPayload): IUpdateLabtestRequest => ({
  type: ACTION_TYPES.UPDATE_LABTEST_REQUEST,
  data,
  successCb,
  failureCb
});

export const updateLabtestSuccess = (): IUpdateLabtestSuccess => ({
  type: ACTION_TYPES.UPDATE_LABTEST_SUCCESS
});

export const updateLabtestFailure = (error: Error): IUpdateLabtestFailure => ({
  type: ACTION_TYPES.UPDATE_LABTEST_FAILURE,
  error
});

export const deleteLabtestRequest = ({
  data,
  successCb,
  failureCb
}: {
  data: IDeleteLabtestRequestPayload;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}): IDeleteLabtestRequest => ({
  type: ACTION_TYPES.DELETE_LABTEST_REQUEST,
  data,
  successCb,
  failureCb
});

export const deleteLabtestSuccess = (): IDeleteLabtestSuccess => ({
  type: ACTION_TYPES.DELETE_LABTEST_SUCCESS
});

export const deleteLabtestFail = (error: Error): IDeleteLabtestFailure => ({
  type: ACTION_TYPES.DELETE_LABTEST_FAILURE,
  error
});

export const fetchUnitListRequest = (unitType: string): IFetchUnitListRequest => ({
  type: ACTION_TYPES.FETCH_UNIT_LIST_REQUEST,
  unitType
});

export const fetchUnitListSuccess = (payload: IUnit[], unitType: string): IFetchUnitListSuccess => ({
  type: ACTION_TYPES.FETCH_UNIT_LIST_SUCCESS,
  payload,
  unitType
});

export const fetchUnitListFail = (error: Error): IFetchUnitListFailure => ({
  type: ACTION_TYPES.FETCH_UNIT_LIST_FAILURE,
  error
});

export const clearUnitList = (): IClearUnitListRequest => ({
    type: ACTION_TYPES.CLEAR_UNIT_LIST_REQUEST
  });

/* labtest result unit list */

export const fetchLabResultRangeList = ({
  data,
  successCb,
  failureCb
}: Omit<IFetchLabResultRangeListRequest, 'type'>): IFetchLabResultRangeListRequest => ({
  type: ACTION_TYPES.FETCH_LABTEST_RESULT_RANGE_LIST_REQUEST,
  data,
  successCb,
  failureCb
});

export const fetchLabResultRangeListSuccess = (payload: ILabResultRange[]): IFetchLabResultRangeListSuccess => ({
  type: ACTION_TYPES.FETCH_LABTEST_RESULT_RANGE_LIST_SUCCESS,
  payload
});

export const fetchLabResultRangeListFail = (error: Error): IFetchLabResultRangeListFailure => ({
  type: ACTION_TYPES.FETCH_LABTEST_RESULT_RANGE_LIST_FAILURE,
  error
});

/* save labtest result unit */

export const saveUpdateLabResultRanges = ({
  data,
  isUpdate,
  successCb,
  failureCb
}: Omit<ISaveUpdateLabResultRangesRequest, 'type'>): ISaveUpdateLabResultRangesRequest => ({
  type: ACTION_TYPES.SAVE_LABTEST_RESULT_RANGES_REQUEST,
  data,
  isUpdate,
  successCb,
  failureCb
});

export const saveUpdateLabResultRangesSuccess = (): ISaveUpdateLabResultRangesSuccess => ({
  type: ACTION_TYPES.SAVE_LABTEST_RESULT_RANGES_SUCCESS
});

export const saveUpdateLabResultRangesFail = (error: Error): ISaveUpdateLabResultRangesFailure => ({
  type: ACTION_TYPES.SAVE_LABTEST_RESULT_RANGES_FAILURE,
  error
});

export const deleteLabTestRange = ({
  data,
  successCb,
  failureCb
}: Omit<ILabTestResultRangeDeleteRequest, 'type'>): ILabTestResultRangeDeleteRequest => ({
  type: ACTION_TYPES.LABTEST_RESULT_RANGE_DELETE_REQUEST,
  data,
  successCb,
  failureCb
});

export const deleteLabTestRangeSuccess = (): ILabTestResultRangeDeleteSuccess => ({
  type: ACTION_TYPES.LABTEST_RESULT_RANGE_DELETE_SUCCESS
});

export const deleteLabTestRangeFaliure = (error: Error): ILabTestResultRangeDeleteFailure => ({
  type: ACTION_TYPES.LABTEST_RESULT_RANGE_DELETE_FAILURE,
  error
});
