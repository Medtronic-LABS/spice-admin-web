import { ISelectOption } from '../../components/formFields/SelectInput';
import { ITimezone } from '../user/types';
import * as ACTION_TYPES from './actionTypes';

interface IRegion {
  id: string;
  name: string;
  applicationName: string;
  accountsCount: number;
  ouCount: number;
  siteCount: number;
  tenantId: string;
}

export interface IRegionState {
  loading: boolean;
  loadingMore: boolean;
  regions: IRegion[];
  total: number;
  error: string | null | Error;
  detail: IRegionDetail;
}

export interface IRegionDetailFormValues {
  region: {
    name: string;
    countryCode: string;
    unitMeasurement: ISelectOption;
    tenantId?: string;
  };
}
export interface IFetchRegionsSuccessPayload {
  regions: IRegion[];
  total: number;
  isLoadMore?: boolean;
}

export interface IRegionPayload {
  name: string;
  countryCode: string;
  unitMeasurement: string;
  users: Array<{
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
    gender: string;
    timezone: any;
  }>;
}

export interface ICreateRegionRequestPayload {
  data: IRegionPayload;
  successCb: () => void;
  failureCb: (error: Error) => void;
}

export interface IFetchRegionsRequest {
  type: typeof ACTION_TYPES.FETCH_REGIONS_REQUEST;
  isLoadMore?: boolean;
  skip: number;
  limit: number | null;
  search?: string;
  successCb?: (payload: IFetchRegionsSuccessPayload) => void;
  failureCb?: (error: Error) => void;
}

export interface IFetchRegionsSuccess {
  type: typeof ACTION_TYPES.FETCH_REGIONS_SUCCESS;
  payload: IFetchRegionsSuccessPayload;
}

export interface IFetchRegionsFailure {
  type: typeof ACTION_TYPES.FETCH_REGIONS_FAILURE;
  error: Error;
}

export interface IFetchRegionDetailReqPayload {
  tenantId: string;
  id: string;
  searchTerm?: string;
  failureCb?: (error: Error) => void;
}
export interface IFetchRegionAdmins {
  tenantId: string;
  skip?: number;
  limit?: number | null;
  searchTerm?: string;
}
export interface IFetchRegionDetailReq {
  type: typeof ACTION_TYPES.FETCH_REGION_DETAIL_REQUEST;
  payload: IFetchRegionDetailReqPayload;
}

export interface IRegionAdmin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  username: string;
  gender: string;
  countryCode: string;
  timezone: ITimezone;
  country?: string;
  tenantId?: string;
}

export interface IRegionAdminAddPayload extends Omit<IRegionAdmin, 'timezone' | 'country'> {
  timezone: { id: number };
  country: { id: number };
}

export interface IRegionDetail {
  id: string;
  users: IRegionAdmin[];
  name: string;
  countryCode: string;
  unitMeasurement: string;
  tenantId: string;
}

export interface IRegionInfo {
  id: string;
  name: string;
  countryCode: string;
  unitMeasurement: string;
}

export interface IFetchRegionDetailFailurePayload {
  error: string;
}

export interface IFetchRegionDetailSuccess {
  type: typeof ACTION_TYPES.FETCH_REGION_DETAIL_SUCCESS;
  payload: IRegionDetail;
}

export interface IFetchRegionDetailFail {
  type: typeof ACTION_TYPES.FETCH_REGION_DETAIL_FAILURE;
  error: Error;
}

export interface IClearRegionDetail {
  type: typeof ACTION_TYPES.CLEAR_REGION_DETAIL;
}

export interface ISearchRegionAdminSuccess {
  type: typeof ACTION_TYPES.SEACRH_REGION_USER_SUCCESS;
  payload: IRegionAdmin[];
}

export interface ICreateRegionRequest {
  type: typeof ACTION_TYPES.CREATE_REGION_REQUEST;
  data: any;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface ICreateRegionSuccess {
  type: typeof ACTION_TYPES.CREATE_REGION_SUCCESS;
}

export interface ICreateRegionFailure {
  type: typeof ACTION_TYPES.CREATE_REGION_FAILURE;
  error: Error;
}

export interface IUpdateRegionReq {
  type: typeof ACTION_TYPES.UPDATE_REGION_DETAIL_REQUEST;
  data: IRegionInfo;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface IUpdateRegionSuccess {
  type: typeof ACTION_TYPES.UPDATE_REGION_DETAIL_SUCCESS;
  data: IRegionInfo;
}

export interface IUpdateRegionFailure {
  type: typeof ACTION_TYPES.UPDATE_REGION_DETAIL_FAIL;
  error: Error;
}

export interface ICreateRegionAdminReq {
  type: typeof ACTION_TYPES.CREATE_REGION_ADMIN_REQUEST;
  data: IRegionAdminAddPayload;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface ICreateRegionAdminSuccess {
  type: typeof ACTION_TYPES.CREATE_REGION_ADMIN_SUCCESS;
}

export interface ICreateRegionAdminFail {
  type: typeof ACTION_TYPES.CREATE_REGION_ADMIN_FAIL;
  error: Error;
}

export interface IUpdateRegionAdminReq {
  type: typeof ACTION_TYPES.UPDATE_REGION_ADMIN_REQUEST;
  data: IRegionAdminAddPayload;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface IUpdateRegionAdminSuccess {
  type: typeof ACTION_TYPES.UPDATE_REGION_ADMIN_SUCCESS;
}

export interface IUpdateRegionAdminFail {
  type: typeof ACTION_TYPES.UPDATE_REGION_ADMIN_FAIL;
  error: Error;
}

export interface IDeleteRegionAdminPayload {
  id: string;
  tenantId: string;
}
export interface IDeleteRegionAdminReq {
  type: typeof ACTION_TYPES.DELETE_REGION_ADMIN_REQUEST;
  data: IDeleteRegionAdminPayload;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface IDeleteRegionAdminSuccess {
  type: typeof ACTION_TYPES.DELETE_REGION_ADMIN_SUCCESS;
}

export interface IDeleteRegionAdminFail {
  type: typeof ACTION_TYPES.DELETE_REGION_ADMIN_FAIL;
  error: Error;
}

export interface IDeactivateReqPayload {
  tenantId: string;
  successCb?: () => void;
  failureCb?: (e: Error) => void;
}

export interface IDeactivateRegionReq {
  type: typeof ACTION_TYPES.DEACTIVATE_REGION_REQUEST;
  payload: IDeactivateReqPayload;
}

export interface IDeactivateRegionSuccess {
  type: typeof ACTION_TYPES.DEACTIVATE_REGION_SUCCESS;
}

export interface IDeactivateRegionFail {
  type: typeof ACTION_TYPES.DEACTIVATE_REGION_FAIL;
  error: Error;
}

export interface ISetRegionDetails {
  type: typeof ACTION_TYPES.SET_REGION_DETAILS;
  data?: Partial<IRegionDetail>;
}

export type RegionActions =
  | IFetchRegionsRequest
  | IFetchRegionsSuccess
  | IFetchRegionsFailure
  | ICreateRegionRequest
  | ICreateRegionSuccess
  | ICreateRegionFailure
  | IFetchRegionDetailReq
  | IFetchRegionDetailSuccess
  | IFetchRegionDetailFail
  | ISearchRegionAdminSuccess
  | IUpdateRegionReq
  | IUpdateRegionSuccess
  | IUpdateRegionFailure
  | ICreateRegionAdminReq
  | ICreateRegionAdminSuccess
  | ICreateRegionAdminFail
  | IUpdateRegionAdminReq
  | IUpdateRegionAdminSuccess
  | IUpdateRegionAdminFail
  | IDeleteRegionAdminReq
  | IDeleteRegionAdminSuccess
  | IDeleteRegionAdminFail
  | IDeactivateRegionReq
  | IDeactivateRegionSuccess
  | IDeactivateRegionFail
  | ISetRegionDetails
  | IClearRegionDetail;
