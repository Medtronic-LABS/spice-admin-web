import * as ACTION_TYPES from './actionTypes';
import { ITimezone } from '../user/types';

export interface IAccount {
  id: string;
  users: IAccountAdmin[];
  name: string;
  maxNoOfUsers: string;
  tenantId: string;
  updatedAt?: string;
  clinicalWorkflow?: IClinicalWorkflow[] | string[];
  customizedWorkflow?: IClinicalWorkflow[] | string[];
  country?: {
    countryCode: string;
    tenantId?: string;
    id?: string;
  };
}
export interface IAccountDetail {
  id: string;
  users: IAccountAdmin[];
  name: string;
  country_code: string;
  maxNoOfUsers: string;
  tenantId: string;
  clinicalworkflow: number[];
  customizedworkflow: number[];
}

export interface IAccountOption {
  name: string;
  id: string;
  tenantId: string;
}

export interface IFetchAccounts {
  tenantId: string;
  skip?: number;
  limit?: number | null;
  searchTerm?: string;
  userType?: string;
}
export interface IAccountState {
  account: IAccount;
  loading: boolean;
  loadingOptions: boolean;
  accounts: IAccount[];
  accountOptions: IAccountOption[];
  admins: IAdminEditFormValues[];
  total: number;
  error: string | null | Error;
  dashboardList: IDashboardAccounts[];
  clinicalWorkflows: IClinicalWorkflow[];
  clinicalWorkflowsCount: number;
  loadingMore: boolean;
}

export interface IAccountInfo {
  id: string;
  name: string;
  maxNoOfUsers: string;
  tenantId: string;
}

export interface IAccountDeactivate {
  tenantId: number;
  status: string;
  reason: string;
}

export interface IAccountDeactivateFormValues extends Omit<IAccountDeactivate, 'status'> {
  status: { value: string };
}

export interface IFetchAccountsSuccessPayload {
  accounts: IAccount[];
  total: number;
}

export interface IFetchAccountAdminSuccessPayload {
  admins: IAdminEditFormValues[];
  total: number;
}
export interface IFetchAccountDetailSuccess {
  type: typeof ACTION_TYPES.FETCH_ACCOUNT_DETAIL_SUCCESS;
  payload: IAccount;
}

export interface IFetchAccountDetailFail {
  type: typeof ACTION_TYPES.FETCH_ACCOUNT_DETAIL_FAILURE;
  error: Error;
}

export interface IAccountPayload {
  name: string;
  maxNoOfUsers?: number;
  parentOrganizationId: number;
  clinicalWorkflow: number[];
  customizedWorkflow: number[];
  tenantId: number;
  users: Array<{
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
    gender: string;
    timezone: object;
    country: string;
  }>;
}

export interface IFetchAccountsRequest {
  type: typeof ACTION_TYPES.FETCH_ACCOUNTS_REQUEST;
  isActive: boolean;
  skip: number;
  limit: number | null;
  tenantId?: string;
  search?: string;
  successCb?: (payload: IFetchAccountsSuccessPayload) => void;
  failureCb?: (error: Error) => void;
}

export interface IFetchAccountsSuccess {
  type: typeof ACTION_TYPES.FETCH_ACCOUNTS_SUCCESS;
  payload: IFetchAccountsSuccessPayload;
}

export interface IFetchAccountsFailure {
  type: typeof ACTION_TYPES.FETCH_ACCOUNTS_FAILURE;
  error: Error;
}

export interface IFetchAccountAdminRequest {
  type: typeof ACTION_TYPES.FETCH_ACCOUNT_ADMIN_REQUEST;
  data: IFetchAccounts;
  successCb?: (payload: IFetchAccountAdminSuccessPayload) => void;
  failureCb?: (error: Error) => void;
}

export interface IFetchAccountAdminSuccess {
  type: typeof ACTION_TYPES.FETCH_ACCOUNT_ADMIN_SUCCESS;
  payload: IFetchAccountAdminSuccessPayload;
}

export interface IFetchAccountAdminFailure {
  type: typeof ACTION_TYPES.FETCH_ACCOUNT_ADMIN_FAILURE;
  error: Error;
}
export interface ICreateAccountRequest {
  type: typeof ACTION_TYPES.CREATE_ACCOUNT_REQUEST;
  data: IAccountPayload;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface ICreateAccountRequestPayload {
  data: IAccountPayload;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}
export interface ICreateAccountSuccess {
  type: typeof ACTION_TYPES.CREATE_ACCOUNT_SUCCESS;
}
export interface ICreateAccountFailure {
  type: typeof ACTION_TYPES.CREATE_ACCOUNT_FAILURE;
  error: Error;
}
export interface IAdminEditFormValues {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  username: string;
  gender: string;
  countryCode: string;
  timezone: ITimezone;
  country: { countryCode?: string; id?: string };
  tenantId?: string;
}

export interface IAccountAdmin extends Omit<IAdminEditFormValues, 'timezone'> {
  timezone: string;
}

export interface IFetchAccountDetailReqPayload {
  tenantId: number | string;
  id: number | string;
  searchTerm?: string;
  successCb?: (data: IAccountDetail) => void;
  failureCb?: (error: Error) => void;
}
export interface IFetchAccountDetailReq {
  type: typeof ACTION_TYPES.FETCH_ACCOUNT_DETAIL_REQUEST;
  payload: IFetchAccountDetailReqPayload;
}
export interface ISearchAccountAdminSuccess {
  type: typeof ACTION_TYPES.SEACRH_ACCOUNT_USER_SUCCESS;
  payload: IAccountAdmin[];
}

export interface IAccountDashboardReq {
  skip: number;
  limit: number | null;
  searchTerm?: string;
  isLoadMore?: boolean;
  tenantId?: string;
  successCb?: () => void;
  failureCb?: (e: Error) => void;
}

export interface IFetchDashboardAccount {
  type: typeof ACTION_TYPES.FETCH_ACCOUNT_DASHBOARD_LIST_REQUEST;
  payload: IAccountDashboardReq;
}

export interface IDashboardAccounts {
  id: string;
  name: string;
  ouCount: number;
  siteCount: number;
  tenantId: string;
}

export interface IFetchDashboardAccSuccessPayload {
  data: IDashboardAccounts[];
  total: number;
  isLoadMore?: boolean;
}

export interface IFetchDashboardAccSuccess {
  type: typeof ACTION_TYPES.FETCH_ACCOUNT_DASHBOARD_LIST_SUCCESS;
  payload: IFetchDashboardAccSuccessPayload;
}

export interface IFetchDashboardAccFail {
  type: typeof ACTION_TYPES.FETCH_ACCOUNT_DASHBOARD_LIST_FAIL;
  error: Error;
}
export interface IUpdateAccountReq {
  type: typeof ACTION_TYPES.UPDATE_ACCOUNT_DETAIL_REQUEST;
  data: IAccountInfo;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}
export interface IUpdateAccountSuccess {
  type: typeof ACTION_TYPES.UPDATE_ACCOUNT_DETAIL_SUCCESS;
  data: IAccountInfo;
}

export interface IUpdateAccountFailure {
  type: typeof ACTION_TYPES.UPDATE_ACCOUNT_DETAIL_FAIL;
  error: Error;
}

export interface ICreateAccountAdminReq {
  type: typeof ACTION_TYPES.CREATE_ACCOUNT_ADMIN_REQUEST;
  data: IAccountAdmin;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface ICreateAccountAdminSuccess {
  type: typeof ACTION_TYPES.CREATE_ACCOUNT_ADMIN_SUCCESS;
}

export interface ICreateAccountAdminFail {
  type: typeof ACTION_TYPES.CREATE_ACCOUNT_ADMIN_FAIL;
  error: Error;
}

export interface IUpdateAccountAdminReq {
  type: typeof ACTION_TYPES.UPDATE_ACCOUNT_ADMIN_REQUEST;
  data: IAccountAdmin;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface IUpdateAccountAdminSuccess {
  type: typeof ACTION_TYPES.UPDATE_ACCOUNT_ADMIN_SUCCESS;
}

export interface IUpdateAccountAdminFail {
  type: typeof ACTION_TYPES.UPDATE_ACCOUNT_ADMIN_FAIL;
  error: Error;
}
export interface IDeleteAccountAdminPayload {
  id: string | number;
  tenantId: string | number;
}
export interface IDeleteAccountAdminReq {
  type: typeof ACTION_TYPES.DELETE_ACCOUNT_ADMIN_REQUEST;
  data: IDeleteAccountAdminPayload;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface IDeleteAccountAdminSuccess {
  type: typeof ACTION_TYPES.DELETE_ACCOUNT_ADMIN_SUCCESS;
}

export interface IDeleteAccountAdminFail {
  type: typeof ACTION_TYPES.DELETE_ACCOUNT_ADMIN_FAIL;
  error: Error;
}

export interface IActivateReqPayload {
  data: { tenant_id: string };
  successCb: () => void;
  failureCb: () => void;
}
export interface IActivateAccountReq {
  type: typeof ACTION_TYPES.ACTIVATE_ACCOUNT_REQUEST;
  data: { tenantId: number };
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface IActivateAccountSuccess {
  type: typeof ACTION_TYPES.ACTIVATE_ACCOUNT_SUCCESS;
}

export interface IActivateAccountFail {
  type: typeof ACTION_TYPES.ACTIVATE_ACCOUNT_FAIL;
  error: Error;
}

export interface IRemoveDeactivatedAccountList {
  type: typeof ACTION_TYPES.REMOVE_DEACTIVATED_ACCOUNT_LIST;
}
export interface IDeactivateReqPayload {
  data: IAccountDeactivate;
  successCb: () => void;
  failureCb: (e: Error) => void;
}
export interface IDeactivateAccountReq {
  type: typeof ACTION_TYPES.DEACTIVATE_ACCOUNT_REQUEST;
  data: IAccountDeactivate;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface IDeactivateAccountSuccess {
  type: typeof ACTION_TYPES.DEACTIVATE_ACCOUNT_SUCCESS;
}

export interface IDeactivateAccountFail {
  type: typeof ACTION_TYPES.DEACTIVATE_ACCOUNT_FAIL;
  error: Error;
}

export interface IFetchAccountOptionsRequest {
  type: typeof ACTION_TYPES.FETCH_ACCOUNT_OPTIONS_REQUEST;
  tenantId: string;
  skip?: number;
  limit?: number | null;
  searchTerm?: string;
}

export interface IFetchAccountOptionsPayload {
  tenantId: string;
  skip?: number;
  limit?: number | null;
  searchTerm?: string;
}

export interface IFetchAccountOptionsSuccess {
  type: typeof ACTION_TYPES.FETCH_ACCOUNT_OPTIONS_SUCCESS;
  payload: IAccountOption[];
}

export interface IFetchAccountOptionsFailure {
  type: typeof ACTION_TYPES.FETCH_ACCOUNT_OPTIONS_FAILURE;
}

export interface IClearAccountDetail {
  type: typeof ACTION_TYPES.CLEAR_ACCOUNT_DETAILS;
}

export interface ISetAccountDetails {
  type: typeof ACTION_TYPES.SET_ACCOUNT_DETAILS;
  data?: Partial<IAccount>;
}

export interface IClearAccounts {
  type: typeof ACTION_TYPES.CLEAR_ACCOUNTS;
}

export interface IClearAccountAdmin {
  type: typeof ACTION_TYPES.CLEAR_ACCOUNT_ADMIN;
}

export interface IClinicalWorkflow {
  id: string;
  name: string;
  isActive?: boolean;
  default?: boolean;
  isDeleted?: boolean;
  coreType?: string;
  workflowId?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  moduleType?: string;
  country?: string;
  tenantId?: string;
  viewScreens?: string[];
}

export interface IFetchClinicalWorkflowReqPayload {
  countryId: string;
  tenantId?: string;
  limit: number | null;
  skip: number;
  searchTerm: string;
}
export interface IFetchClinicalWorkflowReq {
  type: typeof ACTION_TYPES.FETCH_CLINICAL_WORKFLOW_REQUEST;
  data: IFetchClinicalWorkflowReqPayload;
}

export interface IFetchClinicalWorkflowSuccessPayload {
  data: IClinicalWorkflow[];
  total: number;
}
export interface IFetchClinicalWorkflowSuccess {
  type: typeof ACTION_TYPES.FETCH_CLINICAL_WORKFLOW_SUCCESS;
  payload: IFetchClinicalWorkflowSuccessPayload;
}

export interface IFetchClinicalWorkflowFailure {
  type: typeof ACTION_TYPES.FETCH_CLINICAL_WORKFLOW_FAILURE;
}

export interface IAccountWorkflowModuleReqPayload {
  name?: string;
  viewScreens?: string[];
  countryId?: string;
  tenantId: string;
  id?: string;
}
export interface IDeleteAccountWorkflowModuleReqPayload {
  id: string;
  tenantId: string;
}
export interface ICreateAccountWorkflowModule {
  type: typeof ACTION_TYPES.CREATE_ACCOUNT_WORKFLOW_MODULE_REQUEST;
  data: IAccountWorkflowModuleReqPayload;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface ICreateAccountWorkflowModuleSuccess {
  type: typeof ACTION_TYPES.CREATE_ACCOUNT_WORKFLOW_MODULE_SUCCESS;
}

export interface ICreateAccountWorkflowModuleFail {
  type: typeof ACTION_TYPES.CREATE_ACCOUNT_WORKFLOW_MODULE_FAILURE;
  error: Error;
}

export interface IUpdateAccountWorkflowModule {
  type: typeof ACTION_TYPES.UPDATE_ACCOUNT_WORKFLOW_MODULE_REQUEST;
  data: IAccountWorkflowModuleReqPayload;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}
export interface IDeleteAccountWorkflowModule {
  type: typeof ACTION_TYPES.DELETE_ACCOUNT_WORKFLOW_MODULE_REQUEST;
  data: IDeleteAccountWorkflowModuleReqPayload;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface IUpdateAccountWorkflowModuleSuccess {
  type: typeof ACTION_TYPES.UPDATE_ACCOUNT_WORKFLOW_MODULE_SUCCESS;
}

export interface IUpdateAccountWorkflowModuleFail {
  type: typeof ACTION_TYPES.UPDATE_ACCOUNT_WORKFLOW_MODULE_FAILURE;
  error: Error;
}
export interface IDeleteAccountWorkflowModuleSuccess {
  type: typeof ACTION_TYPES.DELETE_ACCOUNT_WORKFLOW_MODULE_SUCCESS;
}

export interface IDeleteAccountWorkflowModuleFail {
  type: typeof ACTION_TYPES.DELETE_ACCOUNT_WORKFLOW_MODULE_FAILURE;
  error: Error;
}

export interface IResetAccountWorkFlowModule {
  type: typeof ACTION_TYPES.RESET_CLINICAL_WORKFLOW_REQUEST;
}

export type AccountActions =
  | IFetchAccountsRequest
  | IFetchAccountsSuccess
  | IFetchAccountsFailure
  | ICreateAccountSuccess
  | ICreateAccountRequest
  | ICreateAccountFailure
  | IFetchAccountDetailReq
  | ISearchAccountAdminSuccess
  | IFetchAccountDetailSuccess
  | IFetchAccountDetailFail
  | IFetchDashboardAccount
  | IFetchDashboardAccSuccess
  | IFetchDashboardAccFail
  | IUpdateAccountReq
  | IUpdateAccountSuccess
  | IUpdateAccountFailure
  | ICreateAccountAdminReq
  | ICreateAccountAdminSuccess
  | ICreateAccountAdminFail
  | IUpdateAccountAdminReq
  | IUpdateAccountAdminSuccess
  | IUpdateAccountAdminFail
  | IDeleteAccountAdminReq
  | IDeleteAccountAdminSuccess
  | IDeleteAccountAdminFail
  | IActivateAccountReq
  | IActivateAccountSuccess
  | IActivateAccountFail
  | IRemoveDeactivatedAccountList
  | IDeactivateAccountReq
  | IDeactivateAccountSuccess
  | IDeactivateAccountFail
  | IFetchAccountOptionsRequest
  | IFetchAccountOptionsSuccess
  | IFetchAccountOptionsFailure
  | IFetchAccountAdminRequest
  | IFetchAccountAdminSuccess
  | IFetchAccountAdminFailure
  | IClearAccountDetail
  | ISetAccountDetails
  | IClearAccounts
  | IClearAccountAdmin
  | IFetchClinicalWorkflowReq
  | IFetchClinicalWorkflowSuccess
  | IFetchClinicalWorkflowFailure
  | ICreateAccountWorkflowModule
  | ICreateAccountWorkflowModuleSuccess
  | ICreateAccountWorkflowModuleFail
  | IUpdateAccountWorkflowModule
  | IUpdateAccountWorkflowModuleSuccess
  | IUpdateAccountWorkflowModuleFail
  | IDeleteAccountWorkflowModule
  | IDeleteAccountWorkflowModuleSuccess
  | IDeleteAccountWorkflowModuleFail
  | IResetAccountWorkFlowModule;
