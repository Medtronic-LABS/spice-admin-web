import * as ACTION_TYPES from './actionTypes';

export interface ILabTest {
  id: number | string;
  name: string;
  active: boolean;
  tenantId: number | string;
  countryId: number | string;
  updatedAt?: string;
  displayOrder?: number;
  labTestResults?: ILabResult[];
}

export interface ILabTestFormValues {
  name: string;
  active: boolean;
  labTestResults: ILabResult[];
  displayOrder: number;
}

export interface ILabResultRange {
  id?: string;
  displayOrder?: number;
  displayName: string;
  unitId?: IUnit | number;
  minimumValue?: number | null;
  maximumValue?: number | null;
}

export interface ILabResultUnitFormValues {
  lab_result_units: ILabResultRange[];
}

export interface IUnit {
  id: string;
  unit: string;
}
export interface ILabtestState {
  lab_tests: ILabTest[];
  loading: boolean;
  total: number;
  error: string | null | Error;
  units: IUnit[];
  unitType?: string;
  unitsLoading: boolean;
  labResultRanges: ILabResultRange[];
}

export interface ILabResult {
  id?: string;
  deleted?: boolean;
  displayOrder: number;
  name: string;
  labTestResultRanges?: any;
}
export interface ILabTestCreateReqPayload {
  labTestResults: ILabResult[];
  name: string;
  active: boolean;
  countryId: string;
  tenantId: string;
}

export interface ICreateLabtestRequest {
  type: typeof ACTION_TYPES.CREATE_LABTEST_REQUEST;
  data: ILabTestCreateReqPayload;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface ICreateLabtestRequestPayload {
  data: ILabTestCreateReqPayload;
  successCb: () => void;
  failureCb: (error: Error) => void;
}
export interface ICreateLabtestSuccess {
  type: typeof ACTION_TYPES.CREATE_LABTEST_SUCCESS;
}
export interface ICreateLabtestFailure {
  type: typeof ACTION_TYPES.CREATE_LABTEST_FAILURE;
}

export interface IFetchLabtest {
  tenantId: string;
  skip: number;
  limit: number | null;
  searchTerm?: string;
  countryId?: string;
  paginated?: boolean;
}

export interface IFetchLabtestsSuccessPayload {
  labtests: ILabTest[];
  total: number;
}

export interface IFetchLabtestsRequest {
  type: typeof ACTION_TYPES.FETCH_LABTEST_REQUEST;
  data: IFetchLabtest;
  successCb?: (payload: IFetchLabtestsSuccessPayload) => void;
  failureCb?: (error: Error) => void;
}

export interface IFetchLabtestsSuccess {
  type: typeof ACTION_TYPES.FETCH_LABTEST_SUCCESS;
  payload: IFetchLabtestsSuccessPayload;
}

export interface IFetchLabtestsFailure {
  type: typeof ACTION_TYPES.FETCH_LABTEST_FAILURE;
  error: Error;
}

export interface IFetchLabtestByIdRequest {
  type: typeof ACTION_TYPES.FETCH_LABTEST_BY_ID_REQUEST;
  payload: { id: string; tenantId: string };
  successCb?: (payload: ILabTest) => void;
  failureCb?: (error: Error) => void;
}

export interface IFetchLabtestByIdSuccess {
  type: typeof ACTION_TYPES.FETCH_LABTEST_BY_ID_SUCCESS;
  payload: ILabTest;
}

export interface IFetchLabtestByIdFailure {
  type: typeof ACTION_TYPES.FETCH_LABTEST_BY_ID_FAILURE;
}
export interface IFetchLabtestDetailReqPayload {
  tenant_id: string;
  _id: string;
  successCb?: (data: ILabTest) => void;
  failureCb: (error: Error) => void;
}

export interface IUpdateLabtestRequest {
  type: typeof ACTION_TYPES.UPDATE_LABTEST_REQUEST;
  data: ILabTest;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface IUpdateLabtestRequestPayload {
  data: ILabTest;
  successCb: () => void;
  failureCb: (error: Error) => void;
}
export interface IUpdateLabtestSuccess {
  type: typeof ACTION_TYPES.UPDATE_LABTEST_SUCCESS;
}
export interface IUpdateLabtestFailure {
  type: typeof ACTION_TYPES.UPDATE_LABTEST_FAILURE;
  error: Error;
}

export interface IDeleteLabtestRequestPayload {
  id: number;
  tenantId: number;
}

export interface IDeleteLabtestRequest {
  type: typeof ACTION_TYPES.DELETE_LABTEST_REQUEST;
  data: IDeleteLabtestRequestPayload;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface IDeleteLabtestSuccess {
  type: typeof ACTION_TYPES.DELETE_LABTEST_SUCCESS;
}

export interface IDeleteLabtestFailure {
  type: typeof ACTION_TYPES.DELETE_LABTEST_FAILURE;
  error: Error;
}
export interface IFetchUnitListRequest {
  type: typeof ACTION_TYPES.FETCH_UNIT_LIST_REQUEST;
  unitType: string;
}

export interface IFetchUnitListSuccess {
  type: typeof ACTION_TYPES.FETCH_UNIT_LIST_SUCCESS;
  payload: any;
  unitType: string;
}

export interface IFetchUnitListFailure {
  type: typeof ACTION_TYPES.FETCH_UNIT_LIST_FAILURE;
  error: Error;
}

export interface IClearUnitListRequest {
    type: typeof ACTION_TYPES.CLEAR_UNIT_LIST_REQUEST;
}

/* List of labtest result units */

export interface IFetchLabResultRangeListRequestPayload {
  tenantId: string;
  labtestResultId: string;
}

export interface IFetchLabResultRangeListRequest {
  type: typeof ACTION_TYPES.FETCH_LABTEST_RESULT_RANGE_LIST_REQUEST;
  data: IFetchLabResultRangeListRequestPayload;
  successCb?: (data: ILabResultRange[]) => void;
  failureCb?: (error: Error) => void;
}

export interface IFetchLabResultRangeListSuccess {
  type: typeof ACTION_TYPES.FETCH_LABTEST_RESULT_RANGE_LIST_SUCCESS;
  payload: ILabResultRange[];
}

export interface IFetchLabResultRangeListFailure {
  type: typeof ACTION_TYPES.FETCH_LABTEST_RESULT_RANGE_LIST_FAILURE;
  error: Error;
}

/* Save & Update labtest result ranges */
export interface ISaveUpdateLabResultRangesRequestPayload {
  tenantId: string;
  labTestResultId: string;
  labTestResultRanges: ILabResultRange[];
}
export interface ISaveUpdateLabResultRangesRequest {
  type: typeof ACTION_TYPES.SAVE_LABTEST_RESULT_RANGES_REQUEST;
  data: ISaveUpdateLabResultRangesRequestPayload;
  isUpdate: boolean;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}
export interface ISaveUpdateLabResultRangesSuccess {
  type: typeof ACTION_TYPES.SAVE_LABTEST_RESULT_RANGES_SUCCESS;
}
export interface ISaveUpdateLabResultRangesFailure {
  type: typeof ACTION_TYPES.SAVE_LABTEST_RESULT_RANGES_FAILURE;
  error: Error;
}

export interface ILabTestResultRangeDeleteRequest {
  type: typeof ACTION_TYPES.LABTEST_RESULT_RANGE_DELETE_REQUEST;
  data: { id: string; tenantId: string };
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface ILabTestResultRangeDeleteSuccess {
  type: typeof ACTION_TYPES.LABTEST_RESULT_RANGE_DELETE_SUCCESS;
}
export interface ILabTestResultRangeDeleteFailure {
  type: typeof ACTION_TYPES.LABTEST_RESULT_RANGE_DELETE_FAILURE;
  error: Error;
}

export type LabtestActions =
  | ICreateLabtestRequest
  | ICreateLabtestSuccess
  | ICreateLabtestFailure
  | IFetchLabtestsRequest
  | IFetchLabtestsSuccess
  | IFetchLabtestsFailure
  | IFetchLabtestByIdRequest
  | IFetchLabtestByIdSuccess
  | IFetchLabtestByIdFailure
  | IUpdateLabtestRequest
  | IUpdateLabtestSuccess
  | IUpdateLabtestFailure
  | IDeleteLabtestRequest
  | IDeleteLabtestSuccess
  | IDeleteLabtestFailure
  | IFetchUnitListRequest
  | IFetchUnitListSuccess
  | IFetchUnitListFailure
  | IClearUnitListRequest
  | IFetchLabResultRangeListRequest
  | IFetchLabResultRangeListSuccess
  | IFetchLabResultRangeListFailure
  | ISaveUpdateLabResultRangesRequest
  | ISaveUpdateLabResultRangesSuccess
  | ISaveUpdateLabResultRangesFailure
  | ILabTestResultRangeDeleteRequest
  | ILabTestResultRangeDeleteSuccess
  | ILabTestResultRangeDeleteFailure;
