import { ISelectOption } from '../../components/formFields/SelectInput';
import { IAddUserFormValues } from '../../containers/createSite/CreateSite';
import { ICulture, ITimezone } from '../user/types';
import * as ACTION_TYPES from './actionTypes';

export interface ISite {
  name: string;
  _id: string;
  tenant_id: string;
}

export interface ISiteState {
  site: ISiteSummary;
  loading: boolean;
  siteList: ISiteList[];
  siteUserList: ISiteUserList[];
  total: number;
  error: string | null | Error;
  accountList?: ISiteDropdownList[];
  accountDropdownLoading?: boolean;
  countyList?: ISiteCountyList[];
  countyDropdownLoading?: boolean;
  subCountyList?: ISubCountyList[];
  subCountyDropdownLoading?: boolean;
  cultureList?: ISiteCultureList[];
  cultureListLoading?: boolean;
  loadingMore?: boolean;
  siteDashboardList: ISiteDashboard[];
  siteDropdownLoading: boolean;
  siteDropdownOptions: {
    list: ISiteDropdownList[];
    regionTenantId: string;
  };
}

export interface ISiteList {
  id: number;
  name: string;
  siteType: string;
  tenantId: number;
  cultureName?: string;
  siteLevel: string;
  operatingUnitName: string;
}

export interface ISiteListState {
  loading: boolean;
  siteList: ISiteList[];
  total: number;
  error: string | null | Error;
}

export interface IFetchSiteListSuccessPayload {
  total: number;
  sites: ISiteList[];
  limit: number | null;
}

export interface IFetchSiteListRequest {
  type: typeof ACTION_TYPES.FETCH_SITE_LIST_REQUEST;
  isLoadMore?: boolean;
  tenantId: number;
  skip: number;
  limit: number | null;
  search?: string;
  failureCb?: (error: Error) => void;
}

export interface IFetchSiteListSuccess {
  type: typeof ACTION_TYPES.FETCH_SITE_LIST_SUCCESS;
  payload: IFetchSiteListSuccessPayload;
}

export interface IFetchSiteListFailure {
  type: typeof ACTION_TYPES.FETCH_SITE_LIST_FAILURE;
  error: Error;
}
export interface ISiteDropdownList {
  id: string;
  name: string;
  email?: string;
  tenantId: string;
}

export interface ICultureDropdownFailure {
  type: typeof ACTION_TYPES.FETCH_CULTURE_DROPDOWN_FAILURE;
  error: Error;
}

export interface ISiteCountyList {
  id: string;
  name: string;
}

export interface ISubCountyList {
  id: string;
  name: string;
}

export interface IFetchCountyDropdownSuccessPayload {
  countyList: ISiteCountyList[];
}

export interface IFetchSubCountyDropdownSuccessPayload {
  subCountyList: ISubCountyList[];
}

export interface IFetchCountyDropdownRequest {
  type: typeof ACTION_TYPES.FETCH_COUNTY_DROPDOWN_REQUEST;
  countryId: string;
}

export interface IFetchCountyDropdownSuccess {
  type: typeof ACTION_TYPES.FETCH_COUNTY_DROPDOWN_SUCCESS;
  payload: IFetchCountyDropdownSuccessPayload;
}

export interface IFetchCountyDropdownFailure {
  type: typeof ACTION_TYPES.FETCH_COUNTY_DROPDOWN_FAILURE;
  error: Error;
}

export interface IFetchSubCountyDropdownRequest {
  type: typeof ACTION_TYPES.FETCH_SUB_COUNTY_DROPDOWN_REQUEST;
  countyId: string;
}

export interface IFetchSubCountyDropdownSuccess {
  type: typeof ACTION_TYPES.FETCH_SUB_COUNTY_DROPDOWN_SUCCESS;
  payload: IFetchSubCountyDropdownSuccessPayload;
}

export interface IFetchSubCountyDropdownFailure {
  type: typeof ACTION_TYPES.FETCH_SUB_COUNTY_DROPDOWN_FAILURE;
  error: Error;
}

export interface ISiteCultureList {
  id: string;
  name: string;
  deleted?: boolean;
  code?: string;
}

export interface IFetchCultureDropdownSuccessPayload {
  cultureList: ISiteCultureList[];
}
export interface IFetchCultureDropdownRequest {
  type: typeof ACTION_TYPES.FETCH_CULTURE_DROPDOWN_REQUEST;
}

export interface IFetchCultureDropdownSuccess {
  type: typeof ACTION_TYPES.FETCH_CULTURE_DROPDOWN_SUCCESS;
  payload: IFetchCultureDropdownSuccessPayload;
}

export interface IFetchCultureDropdownFailure {
  type: typeof ACTION_TYPES.FETCH_CULTURE_DROPDOWN_FAILURE;
  error: Error;
}

export interface ISiteUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phoneNumber?: string;
  timezone: string | { id: number | string };
  roleName?: string | ISelectOption;
  country?: { id: number };
  countryCode?: string;
  redRisk?: boolean;
  culture?: ICulture;
  cultureId?: number;
}

export interface ISiteEditUser extends Omit<ISiteUser, 'timezone'> {
  site_id: string;
  timezone: ITimezone;
}
export interface ISiteUserFormValues extends Omit<ISiteUser, 'country'> {
  country: { countryCode: string } | string;
}

export interface IOptionsResponse {
  name: string;
  _id: string;
}

export interface ISiteFormValues {
  name: string;
  siteType: ISelectOption;
  email: string;
  account: ISiteDropdownList;
  operatingUnit: ISiteDropdownList;
  address1: string;
  address2: string;
  county: ISiteCountyList;
  postalCode: string;
  phoneNumber: string;
  location: string;
  culture: ISiteCultureList;
  addressUse: ISelectOption;
  addressType: string[];
  subCounty: ISubCountyList;
  city: { label: string; value: { Latitude: number; Longitude: number } };
  latitude: string;
  longitude: string;
  country: ISiteDropdownList;
  siteLevel: ISelectOption;
  tenantId?: string;
}

export interface ISiteUserCreatePayload extends Omit<IAddUserFormValues, 'timezone' | 'roleName'> {
  timezone: { id: number };
}
export interface ICreateSiteFormValues {
  site: ISiteFormValues;
  users: IAddUserFormValues[];
}

export interface ICreateSiteRequestPayload {
  name: string;
  siteType: string;
  email: string;
  accountId: number;
  operatingUnit: object;
  address1: string;
  address2: string;
  countyId: number;
  postalCode: string;
  phoneNumber: string;
  location: string;
  cultureId: number;
  addressUse: string;
  addressType: string;
  subCountyId: number;
  city: string;
  latitude: string;
  longitude: string;
  countryId: number;
  siteLevel: string;
  parentOrganizationId: number;
  tenantId: number;
  users: ISiteUserCreatePayload[];
}

export interface ISiteUpdateReqPayload
  extends Omit<ICreateSiteRequestPayload, 'users' | 'parentOrganizationId' | 'operatingUnit' | 'account'> {
  id: string;
  operatingUnit: object;
  accountId: number;
  users?: any[];
}

export interface ISiteSummary {
  name: string;
  siteType: string;
  email: string;
  account: ISiteDropdownList;
  operatingUnit: ISiteDropdownList;
  address1: string;
  address2: string;
  county: ISiteCountyList;
  postalCode: string;
  phoneNumber: string;
  location?: string;
  culture: ISiteCultureList;
  addressUse: string;
  addressType: string;
  subCounty: ISubCountyList;
  city?: { label: string; value: { Latitude: number | string; Longitude: number | string } };
  country: string | ISiteDropdownList;
  siteLevel: ISelectOption;
  id: number;
  tenantId: number | string;
}

export interface ICreateSiteRequest {
  type: typeof ACTION_TYPES.CREATE_SITE_REQUEST;
  data: ICreateSiteRequestPayload;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface ISubCountyRequest {
  type: typeof ACTION_TYPES.CREATE_SITE_REQUEST;
  countyId: string;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface ICreateSiteSuccess {
  type: typeof ACTION_TYPES.CREATE_SITE_SUCCESS;
}

export interface ICreateSiteFailure {
  type: typeof ACTION_TYPES.CREATE_SITE_FAILURE;
  error: Error;
}

export interface IClearDropdownValues {
  type: typeof ACTION_TYPES.CLEAR_DROPDOWN_VALUES;
}

export interface IFetchSiteSummaryRequest {
  type: typeof ACTION_TYPES.FETCH_SITE_SUMMARY_REQUEST;
  tenantId: number;
  id: number;
  successCb?: (data: ISiteSummary) => void;
  failureCb?: (error: Error) => void;
}

export interface IFetchSiteSummarySuccess {
  type: typeof ACTION_TYPES.FETCH_SITE_SUMMARY_SUCCESS;
  payload: ISiteSummary;
}

export interface IFetchSiteSummaryFailure {
  type: typeof ACTION_TYPES.FETCH_SITE_SUMMARY_FAILURE;
  error: Error;
}

export interface ISiteUserPayLoad {
  id: string;
  tenantId: string;
  user: ISiteUser;
}
export interface ICreateSiteUserRequest {
  type: typeof ACTION_TYPES.CREATE_SITE_USER_REQUEST;
  data: ISiteUserPayLoad;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface ICreateSiteUserSuccess {
  type: typeof ACTION_TYPES.CREATE_SITE_USER_SUCCESS;
}

export interface ICreateSiteUserFailure {
  type: typeof ACTION_TYPES.CREATE_SITE_USER_FAILURE;
  error: Error;
}

export interface IUpdateSiteDetailsRequest {
  type: typeof ACTION_TYPES.UPDATE_SITE_DETAILS_REQUEST;
  data: ISiteUpdateReqPayload;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface IUpdateSiteDetailsSuccess {
  type: typeof ACTION_TYPES.UPDATE_SITE_DETAILS_SUCCESS;
}

export interface IUpdateSiteDetailsFailure {
  type: typeof ACTION_TYPES.UPDATE_SITE_DETAILS_FAILURE;
  error: Error;
}

export interface IUpdateSiteUserRequest {
  type: typeof ACTION_TYPES.UPDATE_SITE_USER_REQUEST;
  data: ISiteUser;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface IUpdateSiteUserSuccess {
  type: typeof ACTION_TYPES.UPDATE_SITE_USER_SUCCESS;
}

export interface IUpdateSiteUserFailure {
  type: typeof ACTION_TYPES.UPDATE_SITE_USER_FAILURE;
  error: Error;
}

export interface IFetchSiteSummaryUsersRequest {
  type: typeof ACTION_TYPES.FETCH_SITE_USERS_REQUEST;
  tenantId: string;
  searchParams?: string;
  limit?: number | null;
  skip?: number;
  successCb?: (data: ISiteUser[], total: number) => void;
  failureCb?: (error: Error) => void;
}

export interface IFetchSiteSummaryUsersSuccess {
  type: typeof ACTION_TYPES.FETCH_SITE_USERS_SUCCESS;
  payload: ISiteUser[];
}

export interface IFetchSiteSummaryUsersFailure {
  type: typeof ACTION_TYPES.FETCH_SITE_USERS_FAILURE;
  error: Error;
}

export interface ISiteUserList {
  id: string;
  firstName: string;
  lastName: string;
  tenantId: string;
  email?: string;
  username: string;
  gender: string;
  phoneNumber: string;
  organizationName: string;
  modelOrgId: string;
  address: string;
  roleId: string;
  roleName: string;
}

export interface IEditUserFormValues extends IAddUserFormValues {
  site_id: string;
  tenant_id: string;
}

export interface IFetchSiteUserListSuccessPayload {
  total: number;
  siteUsers: ISiteUserList[];
  limit: number | null;
}

export interface IFetchSiteUserListRequest {
  type: typeof ACTION_TYPES.FETCH_SITE_USER_LIST_REQUEST;
  tenantId: string;
  skip: number;
  limit: number | null;
  search?: string;
  userType?: string;
  failureCb?: (error: Error) => void;
}

export interface IFetchSiteUserListSuccess {
  type: typeof ACTION_TYPES.FETCH_SITE_USER_LIST_SUCCESS;
  payload: IFetchSiteUserListSuccessPayload;
}

export interface IFetchSiteUserListFailure {
  type: typeof ACTION_TYPES.FETCH_SITE_USER_LIST_FAILURE;
  error: Error;
}

export interface IDeleteUserSuccessPayload {
  id: number;
  tenantId: number;
}

export interface IDeleteSiteUserRequest {
  type: typeof ACTION_TYPES.DELETE_SITE_USER_REQUEST;
  isAllSites?: boolean;
  data: IDeleteUserSuccessPayload;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface IDeleteSiteUserSuccess {
  type: typeof ACTION_TYPES.DELETE_SITE_USER_SUCCESS;
}

export interface IDeleteSiteUserFailure {
  type: typeof ACTION_TYPES.DELETE_SITE_USER_FAILURE;
  error: Error;
}

export interface IFetchSiteDashboardListRequest {
  type: typeof ACTION_TYPES.FETCH_SITE_DASHBOARD_LIST_REQUEST;
  isLoadMore?: boolean;
  skip: number;
  limit: number | null;
  search?: string;
  successCb?: (payload: IFetchSiteDashboardListSuccessPayload) => void;
  failureCb?: (error: Error) => void;
}

export interface ISiteDashboard {
  id: number;
  name: string;
  siteType: string;
  tenantId: number;
  subCounty?: string;
}
export interface IFetchSiteDashboardListSuccess {
  type: typeof ACTION_TYPES.FETCH_SITE_DASHBOARD_LIST_SUCCESS;
  payload: IFetchSiteDashboardListSuccessPayload;
}

export interface IFetchSiteDashboardListFailure {
  type: typeof ACTION_TYPES.FETCH_SITE_DASHBOARD_LIST_FAILURE;
  error: Error;
}

export interface IFetchSiteDashboardListSuccessPayload {
  siteDashboardList: ISiteDashboard[];
  total: number;
  isLoadMore?: boolean;
}

export interface IClearSiteList {
  type: typeof ACTION_TYPES.CLEAR_SITE_LIST;
}

export interface IClearSiteUserList {
  type: typeof ACTION_TYPES.CLEAR_SITE_USER_LIST;
}

export interface IClearSiteSummary {
  type: typeof ACTION_TYPES.CLEAR_SITE_SUMMARY;
}

export interface ISetSiteSummary {
  type: typeof ACTION_TYPES.SET_SITE_SUMMARY;
  data?: Partial<ISiteSummary>;
}

export interface IFetchSiteDropdownSuccessPayload {
  total: number;
  siteList: Array<{
    id: string;
    name: string;
    email?: string;
    tenantId: string;
  }>;
  regionTenantId: string;
}

export interface IFetchSiteDropdownRequest {
  type: typeof ACTION_TYPES.FETCH_SITE_DROPDOWN_REQUEST;
  tenantId: string;
  regionTenantId?: string;
}

export interface IFetchSiteDropdownSuccess {
  type: typeof ACTION_TYPES.FETCH_SITE_DROPDOWN_SUCCESS;
  payload: IFetchSiteDropdownSuccessPayload;
}

export interface IFetchSiteDropdownFailure {
  type: typeof ACTION_TYPES.FETCH_SITE_DROPDOWN_FAILURE;
  error: Error;
}

export interface IClearSiteDropdown {
  type: typeof ACTION_TYPES.CLEAR_SITE_DROPDOWN_OPTIONS;
}

export type SiteActions =
  | IFetchSiteListRequest
  | IFetchSiteListSuccess
  | IFetchSiteListFailure
  | ICultureDropdownFailure
  | IFetchCountyDropdownRequest
  | IFetchCountyDropdownSuccess
  | IFetchCountyDropdownFailure
  | IFetchSubCountyDropdownRequest
  | IFetchSubCountyDropdownSuccess
  | IFetchSubCountyDropdownFailure
  | ICreateSiteRequest
  | ICreateSiteSuccess
  | ICreateSiteFailure
  | IClearDropdownValues
  | IFetchSiteSummaryRequest
  | IFetchSiteSummarySuccess
  | IFetchSiteSummaryFailure
  | IFetchSiteSummaryUsersRequest
  | IFetchSiteSummaryUsersSuccess
  | IFetchSiteSummaryUsersFailure
  | ICreateSiteUserRequest
  | ICreateSiteUserSuccess
  | ICreateSiteUserFailure
  | IUpdateSiteDetailsRequest
  | IUpdateSiteDetailsSuccess
  | IUpdateSiteDetailsFailure
  | IUpdateSiteUserRequest
  | IUpdateSiteUserSuccess
  | IUpdateSiteUserFailure
  | IFetchCultureDropdownRequest
  | IFetchCultureDropdownSuccess
  | IFetchCultureDropdownFailure
  | IFetchSiteUserListRequest
  | IFetchSiteUserListSuccess
  | IFetchSiteUserListFailure
  | IDeleteSiteUserRequest
  | IDeleteSiteUserSuccess
  | IDeleteSiteUserFailure
  | IFetchSiteDashboardListRequest
  | IFetchSiteDashboardListSuccess
  | IFetchSiteDashboardListFailure
  | IClearSiteSummary
  | IClearSiteList
  | IClearSiteUserList
  | ISetSiteSummary
  | IFetchSiteDropdownRequest
  | IFetchSiteDropdownSuccess
  | IFetchSiteDropdownFailure
  | IClearSiteDropdown;
