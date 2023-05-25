import { ITimezone } from '../user/types';
import * as ACTION_TYPES from './actionTypes';

export interface IOperatingUnit {
  name: string;
  _id: string;
  tenant_id: string;
}

export interface IOperatingUnitSummary {
  id: string;
  name: string;
  siteCount: number;
  groupCount: number;
  tenantId: string;
}

export interface IOperatingUnitList {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  county: string;
  account: { name: string };
}

export interface IOperatingUnitState {
  operatingUnit?: IOperatingUnit;
  operatingUnitList: IOperatingUnitList[];
  listTotal: number;
  operatingUnitDetail: IOperatingUnitDetail;
  admins: IOperatingUnitAdmin[];
  operatingUnitDashboardList: IOperatingUnitSummary[];
  total: number;
  error?: string | null | Error;
  loading: boolean;
  loadingMore: boolean;
  operatingUnitAdmins: IOperatingUnitAdmin[];
  dropdownOUList: IOperatingUnitList[];
  dropdownOUListLoading: boolean;
}

export interface IOperatingUnitAdmin {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  countryCode: string;
  phoneNumber: string;
  username: string;
  timezone: ITimezone;
  country?: string;
  model_org_Name: string;
  organizationName?: string;
}

export interface IOperatingUnitDetail {
  id: string;
  name: string;
  tenantId: string;
  account: { id: string; name: string; tenantId?: string };
  county: { id: string; name: string };
}

export interface IFetchOUDashboardListSuccessPayload {
  operatingUnitDashboardList: IOperatingUnitSummary[];
  total: number;
  isLoadMore?: boolean;
}

export interface IOperatingUnitAdminFormvalue {
  id?: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  timezone: { id: number };
  gender: string;
  tenantId?: string;
  country?: { id: number };
  countryCode: string;
}

export type IOuAdminApiData = IOperatingUnitAdminFormvalue;

export interface IOperatingUnitFormData {
  id?: string;
  name: string;
  account: { id: number };
  countryId: number;
  parentOrganizationId: number;
  tenantId: string;
  users: IOperatingUnitAdminFormvalue[];
}

export interface IFetchOUDashboardListRequest {
  type: typeof ACTION_TYPES.FETCH_OPERATING_UNIT_DASHBOARD_LIST_REQUEST;
  isLoadMore?: boolean;
  skip: number;
  limit: number | null;
  search?: string;
  successCb?: (payload: IFetchOUDashboardListSuccessPayload) => void;
  failureCb?: (error: Error) => void;
}

export interface IFetchOUDashboardListSuccess {
  type: typeof ACTION_TYPES.FETCH_OPERATING_UNIT_DASHBOARD_LIST_SUCCESS;
  payload: IFetchOUDashboardListSuccessPayload;
}

export interface IFetchOUDashboardListFailure {
  type: typeof ACTION_TYPES.FETCH_OPERATING_UNIT_DASHBOARD_LIST_FAILURE;
  error: Error;
}

export interface IFetchOperatingUnitDetailReqPayload {
  tenantId: string;
  id: string;
  searchTerm?: string;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface IFetchOperatingUnitDetailReq {
  type: typeof ACTION_TYPES.FETCH_OPERATING_UNIT_DETAIL_REQUEST;
  payload: IFetchOperatingUnitDetailReqPayload;
}

export interface IFetchOperatingUnitDetailSuccessPayload {
  operatingUnitDetail: IOperatingUnitDetail;
  operatingUnitAdmins: IOperatingUnitAdmin[];
}

export interface IFetchOperatingUnitDetailSuccess {
  type: typeof ACTION_TYPES.FETCH_OPERATING_UNIT_DETAIL_SUCCESS;
  payload: IFetchOperatingUnitDetailSuccessPayload;
}
export interface IFetchOperatingUnitDetailFail {
  type: typeof ACTION_TYPES.FETCH_OPERATING_UNIT_DETAIL_FAILURE;
  error: Error;
}

export interface ISearchOperatingUnitAdminSuccess {
  type: typeof ACTION_TYPES.SEARCH_OPERATING_UNIT_USER_SUCCESS;
  payload: IOperatingUnitAdmin[];
}

export interface IFetchOperatingUnitListSuccessPayload {
  operatingUnitList: IOperatingUnitList[];
  total: number;
}

export interface IFetchOperatingUnitListRequest {
  type: typeof ACTION_TYPES.FETCH_OPERATING_UNIT_LIST_REQUEST;
  tenantId: string;
  skip: number;
  limit: number | null;
  search?: string;
  failureCb?: (error: Error) => void;
}

export interface IFetchOperatingUnitListSuccess {
  type: typeof ACTION_TYPES.FETCH_OPERATING_UNIT_LIST_SUCCESS;
  payload: IFetchOperatingUnitListSuccessPayload;
}

export interface IFetchOperatingUnitListFailure {
  type: typeof ACTION_TYPES.FETCH_OPERATING_UNIT_LIST_FAILURE;
  error: Error;
}

export interface ICreateOperatingUnitRequest {
  type: typeof ACTION_TYPES.CREATE_OPERATING_UNIT_REQUEST;
  payload: IOperatingUnitFormData;
  successCb?: () => void;
  failureCb?: (e: Error) => void;
}

export interface ICreateOperatingUnitSuccess {
  type: typeof ACTION_TYPES.CREATE_OPERATING_UNIT_SUCCESS;
}

export interface ICreateOperatingUnitFailure {
  type: typeof ACTION_TYPES.CREATE_OPERATING_UNIT_FAILURE;
}

export interface IUpdateOperatingUnitRequest {
  type: typeof ACTION_TYPES.UPDATE_OPERATING_UNIT_REQUEST;
  payload: Omit<IOperatingUnitFormData, 'users' | 'parentOrganizationId'>;
  isSuccessPayloadNeeded?: boolean;
  successCb?: () => void;
  failureCb?: (e: Error) => void;
}

export interface IUpdateOperatingUnitSuccess {
  type: typeof ACTION_TYPES.UPDATE_OPERATING_UNIT_SUCCESS;
  payload?: Partial<IOperatingUnitDetail>;
}

export interface IUpdateOperatingUnitFailure {
  type: typeof ACTION_TYPES.UPDATE_OPERATING_UNIT_FAILURE;
}

export interface ICreateOperatingUnitAdminRequest {
  type: typeof ACTION_TYPES.CREATE_OPERATING_UNIT_ADMIN_REQUEST;
  payload: IOperatingUnitAdminFormvalue;
  successCb?: () => void;
  failureCb?: (e: Error) => void;
}

export interface ICreateOperatingUnitAdminSuccess {
  type: typeof ACTION_TYPES.CREATE_OPERATING_UNIT_ADMIN_SUCCESS;
}

export interface ICreateOperatingUnitAdminFailure {
  type: typeof ACTION_TYPES.CREATE_OPERATING_UNIT_ADMIN_FAILURE;
}

export interface IUpdateOperatingUnitAdminRequest {
  type: typeof ACTION_TYPES.UPDATE_OPERATING_UNIT_ADMIN_REQUEST;
  payload: IOperatingUnitAdminFormvalue;
  successCb?: () => void;
  failureCb?: (e: Error) => void;
}

export interface IUpdateOperatingUnitAdminSuccess {
  type: typeof ACTION_TYPES.UPDATE_OPERATING_UNIT_ADMIN_SUCCESS;
}

export interface IUpdateOperatingUnitAdminFailure {
  type: typeof ACTION_TYPES.UPDATE_OPERATING_UNIT_ADMIN_FAILURE;
}

export interface IDeleteOperatingUnitAdminRequest {
  type: typeof ACTION_TYPES.DELETE_OPERATING_UNIT_ADMIN_REQUEST;
  payload: { tenantId: string; id: string };
  successCb?: () => void;
  failureCb?: (e: Error) => void;
}

export interface IDeleteOperatingUnitAdminSuccess {
  type: typeof ACTION_TYPES.DELETE_OPERATING_UNIT_ADMIN_SUCCESS;
}

export interface IDeleteOperatingUnitAdminFailure {
  type: typeof ACTION_TYPES.DELETE_OPERATING_UNIT_ADMIN_FAILURE;
}

export interface IFetchOperatingUnitByIdRequest {
  type: typeof ACTION_TYPES.FETCH_OPERATING_UNIT_BY_ID_REQUEST;
  payload: { tenantId: string; id: string };
  successCb?: (payload: IOperatingUnitDetail) => void;
  failureCb?: (e: Error) => void;
}

export interface IFetchOperatingUnitByIdSuccess {
  type: typeof ACTION_TYPES.FETCH_OPERATING_UNIT_BY_ID_SUCCESS;
}

export interface IFetchOperatingUnitByIdFailure {
  type: typeof ACTION_TYPES.FETCH_OPERATING_UNIT_BY_ID_FAILURE;
}

export interface IFetchRegReqPayload {
  tenantId: string;
  _id: string;
  searchParams?: string;
  failureCb: (error: Error) => void;
}

export interface IFetchOperatingUnitAdminsSuccessPayload {
  operatingUnitAdmins: IOperatingUnitAdmin[];
  total: number;
}

export interface IFetchOperatingUnitAdminsRequest {
  type: typeof ACTION_TYPES.FETCH_OPERATING_UNIT_ADMIN_LIST_REQUEST;
  payload: {
    skip?: number;
    userType?: string;
    limit?: number | null;
    searchTerm?: string;
    tenantId: string;
  };
  successCb?: (payload: IFetchOperatingUnitAdminsSuccessPayload) => void;
  failureCb?: (error: Error) => void;
}

export interface IFetchOperaingUnitAdminsSuccess {
  type: typeof ACTION_TYPES.FETCH_OPERATING_UNIT_ADMIN_LIST_SUCCESS;
  payload: IFetchOperatingUnitAdminsSuccessPayload;
}

export interface IFetchOperaingUnitAdminsFailure {
  type: typeof ACTION_TYPES.FETCH_OPERATING_UNIT_ADMIN_LIST_FAILURE;
  error: Error;
}

export interface IClearOperatingUnitDetail {
  type: typeof ACTION_TYPES.CLEAR_OPERATING_UNIT_DETAIL;
}

export interface ISetOperatingUnitDetails {
  type: typeof ACTION_TYPES.SET_OPERATING_UNIT_DETAILS;
  data?: Partial<IOperatingUnitDetail>;
}

export interface IClearOperatingUnitList {
  type: typeof ACTION_TYPES.CLEAR_OPERATING_UNIT_LIST;
}

export interface IClearOperatingUnitAdminList {
  type: typeof ACTION_TYPES.CLEAR_OPERATING_UNIT_ADMIN_LIST;
}

export interface IOperatingUnitDropdownRequest {
  type: typeof ACTION_TYPES.FETCH_OPERATING_UNIT_DROPDOWN_REQUEST;
  tenantId: string;
}

export interface IOperatingUnitDropdownSuccessPayload {
  total: number;
  operatingUnitList: IOperatingUnitList[];
  limit: number | null;
}
export interface IOperatingUnitDropdownSuccess {
  type: typeof ACTION_TYPES.FETCH_OPERATING_UNIT_DROPDOWN_SUCCESS;
  payload: IOperatingUnitDropdownSuccessPayload;
}

export interface IOperatingUnitDropdownFailure {
  type: typeof ACTION_TYPES.FETCH_OPERATING_UNIT_DROPDOWN_FAIL;
  error: Error;
}

export interface IClearOUDropdown {
  type: typeof ACTION_TYPES.CLEAR_DROPDOWN_VALUES;
}

export type OperatingUnitActions =
  | IFetchOUDashboardListRequest
  | IFetchOUDashboardListSuccess
  | IFetchOUDashboardListFailure
  | IFetchOperatingUnitDetailReq
  | IFetchOperatingUnitDetailSuccess
  | IFetchOperatingUnitDetailFail
  | ISearchOperatingUnitAdminSuccess
  | IFetchOperatingUnitListRequest
  | IFetchOperatingUnitListSuccess
  | IFetchOperatingUnitListFailure
  | ICreateOperatingUnitRequest
  | ICreateOperatingUnitSuccess
  | ICreateOperatingUnitFailure
  | IUpdateOperatingUnitRequest
  | IUpdateOperatingUnitSuccess
  | IUpdateOperatingUnitFailure
  | ICreateOperatingUnitAdminRequest
  | ICreateOperatingUnitAdminSuccess
  | ICreateOperatingUnitAdminFailure
  | IUpdateOperatingUnitAdminRequest
  | IUpdateOperatingUnitAdminSuccess
  | IUpdateOperatingUnitAdminFailure
  | IDeleteOperatingUnitAdminRequest
  | IDeleteOperatingUnitAdminSuccess
  | IDeleteOperatingUnitAdminFailure
  | IFetchOperatingUnitByIdRequest
  | IFetchOperatingUnitByIdSuccess
  | IFetchOperatingUnitByIdFailure
  | IFetchOperatingUnitAdminsRequest
  | IFetchOperaingUnitAdminsSuccess
  | IFetchOperaingUnitAdminsFailure
  | IClearOperatingUnitDetail
  | ISetOperatingUnitDetails
  | IClearOperatingUnitList
  | IClearOperatingUnitAdminList
  | IOperatingUnitDropdownRequest
  | IOperatingUnitDropdownSuccess
  | IOperatingUnitDropdownFailure
  | IClearOUDropdown;
