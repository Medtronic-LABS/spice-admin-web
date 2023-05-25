import * as ACCOUNT_TYPES from './actionTypes';
import {
  IFetchAccountsRequest,
  IFetchAccountsSuccess,
  IFetchAccountsFailure,
  IFetchAccountsSuccessPayload,
  ICreateAccountRequestPayload,
  ICreateAccountRequest,
  ICreateAccountSuccess,
  ICreateAccountFailure,
  IAccountAdmin,
  IFetchAccountDetailReq,
  IFetchAccountDetailReqPayload,
  ISearchAccountAdminSuccess,
  IAccount,
  IFetchAccountDetailSuccess,
  IFetchAccountDetailFail,
  IAccountDashboardReq,
  IFetchDashboardAccFail,
  IFetchDashboardAccount,
  IFetchDashboardAccSuccess,
  IFetchDashboardAccSuccessPayload,
  IAccountInfo,
  IUpdateAccountReq,
  IUpdateAccountSuccess,
  IUpdateAccountFailure,
  ICreateAccountAdminReq,
  ICreateAccountAdminSuccess,
  ICreateAccountAdminFail,
  IUpdateAccountAdminReq,
  IUpdateAccountAdminSuccess,
  IUpdateAccountAdminFail,
  IDeleteAccountAdminPayload,
  IDeleteAccountAdminReq,
  IDeleteAccountAdminSuccess,
  IDeleteAccountAdminFail,
  IDeactivateAccountReq,
  IDeactivateAccountSuccess,
  IDeactivateAccountFail,
  IAccountDeactivate,
  IFetchAccountOptionsRequest,
  IFetchAccountOptionsSuccess,
  IFetchAccountOptionsFailure,
  IAccountOption,
  IFetchAccountAdminSuccessPayload,
  IFetchAccountAdminRequest,
  IFetchAccountAdminSuccess,
  IFetchAccountAdminFailure,
  IFetchAccounts,
  IActivateAccountReq,
  IActivateAccountSuccess,
  IActivateAccountFail,
  ISetAccountDetails,
  IClearAccounts,
  IClearAccountAdmin,
  IFetchClinicalWorkflowReq,
  IFetchClinicalWorkflowSuccess,
  IFetchClinicalWorkflowFailure,
  ICreateAccountWorkflowModule,
  ICreateAccountWorkflowModuleSuccess,
  ICreateAccountWorkflowModuleFail,
  IUpdateAccountWorkflowModule,
  IUpdateAccountWorkflowModuleSuccess,
  IUpdateAccountWorkflowModuleFail,
  IDeleteAccountWorkflowModule,
  IDeleteAccountWorkflowModuleSuccess,
  IDeleteAccountWorkflowModuleFail,
  IFetchClinicalWorkflowReqPayload,
  IFetchClinicalWorkflowSuccessPayload
} from './types';

export const fetchAccountsRequest = ({
  tenantId,
  isActive,
  skip,
  limit,
  search,
  successCb,
  failureCb
}: {
  tenantId: string;
  isActive: boolean;
  skip: number;
  limit: number | null;
  search?: string;
  successCb?: (payload: IFetchAccountsSuccessPayload) => void;
  failureCb?: (error: Error) => void;
}): IFetchAccountsRequest => ({
  type: ACCOUNT_TYPES.FETCH_ACCOUNTS_REQUEST,
  tenantId,
  isActive,
  skip,
  limit,
  search,
  successCb,
  failureCb
});

export const fetchAccountsSuccess = (payload: IFetchAccountsSuccessPayload): IFetchAccountsSuccess => ({
  type: ACCOUNT_TYPES.FETCH_ACCOUNTS_SUCCESS,
  payload
});

export const fetchAccountsFailure = (error: Error): IFetchAccountsFailure => ({
  type: ACCOUNT_TYPES.FETCH_ACCOUNTS_FAILURE,
  error
});

export const searchUserSuccess = (payload: IAccountAdmin[]): ISearchAccountAdminSuccess => ({
  type: ACCOUNT_TYPES.SEACRH_ACCOUNT_USER_SUCCESS,
  payload
});

export const fetchAccountDetailReq = (payload: IFetchAccountDetailReqPayload): IFetchAccountDetailReq => ({
  type: ACCOUNT_TYPES.FETCH_ACCOUNT_DETAIL_REQUEST,
  payload
});

export const fetchAccountDetailSuccess = (payload: IAccount): IFetchAccountDetailSuccess => ({
  type: ACCOUNT_TYPES.FETCH_ACCOUNT_DETAIL_SUCCESS,
  payload
});

export const fetchAccountDetailFail = (error: Error): IFetchAccountDetailFail => ({
  type: ACCOUNT_TYPES.FETCH_ACCOUNT_DETAIL_FAILURE,
  error
});

export const createAccountRequest = ({
  data,
  successCb,
  failureCb
}: ICreateAccountRequestPayload): ICreateAccountRequest => ({
  type: ACCOUNT_TYPES.CREATE_ACCOUNT_REQUEST,
  data,
  successCb,
  failureCb
});

export const createAccountSuccess = (): ICreateAccountSuccess => ({
  type: ACCOUNT_TYPES.CREATE_ACCOUNT_SUCCESS
});

export const createAccountFailure = (error: Error): ICreateAccountFailure => ({
  type: ACCOUNT_TYPES.CREATE_ACCOUNT_FAILURE,
  error
});

export const fetchAccountsDashboardList = (payload: IAccountDashboardReq): IFetchDashboardAccount => ({
  type: ACCOUNT_TYPES.FETCH_ACCOUNT_DASHBOARD_LIST_REQUEST,
  payload
});

export const fetchDashboardAccSuccess = (payload: IFetchDashboardAccSuccessPayload): IFetchDashboardAccSuccess => ({
  type: ACCOUNT_TYPES.FETCH_ACCOUNT_DASHBOARD_LIST_SUCCESS,
  payload
});

export const fetchDashboardAccFail = (error: Error): IFetchDashboardAccFail => ({
  type: ACCOUNT_TYPES.FETCH_ACCOUNT_DASHBOARD_LIST_FAIL,
  error
});
export const updateAccountDetail = ({
  data,
  successCb,
  failureCb
}: {
  data: IAccountInfo;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}): IUpdateAccountReq => ({
  type: ACCOUNT_TYPES.UPDATE_ACCOUNT_DETAIL_REQUEST,
  data,
  successCb,
  failureCb
});

export const updateAccountDetailSuccess = (data: IAccountInfo): IUpdateAccountSuccess => ({
  type: ACCOUNT_TYPES.UPDATE_ACCOUNT_DETAIL_SUCCESS,
  data
});

export const updateAccountDetailFail = (error: Error): IUpdateAccountFailure => ({
  type: ACCOUNT_TYPES.UPDATE_ACCOUNT_DETAIL_FAIL,
  error
});

export const updateAccountAdmin = ({
  data,
  successCb,
  failureCb
}: {
  data: IAccountAdmin;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}): IUpdateAccountAdminReq => ({
  type: ACCOUNT_TYPES.UPDATE_ACCOUNT_ADMIN_REQUEST,
  data,
  successCb,
  failureCb
});

export const updateAccountAdminSuccess = (): IUpdateAccountAdminSuccess => ({
  type: ACCOUNT_TYPES.UPDATE_ACCOUNT_ADMIN_SUCCESS
});

export const updateAccountAdminFail = (error: Error): IUpdateAccountAdminFail => ({
  type: ACCOUNT_TYPES.UPDATE_ACCOUNT_ADMIN_FAIL,
  error
});

export const createAccountAdmin = ({
  data,
  successCb,
  failureCb
}: {
  data: IAccountAdmin;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}): ICreateAccountAdminReq => ({
  type: ACCOUNT_TYPES.CREATE_ACCOUNT_ADMIN_REQUEST,
  data,
  successCb,
  failureCb
});

export const createAccountAdminSuccess = (): ICreateAccountAdminSuccess => ({
  type: ACCOUNT_TYPES.CREATE_ACCOUNT_ADMIN_SUCCESS
});

export const createAccountAdminFail = (error: Error): ICreateAccountAdminFail => ({
  type: ACCOUNT_TYPES.CREATE_ACCOUNT_ADMIN_FAIL,
  error
});

export const deleteAccountAdmin = ({
  data,
  successCb,
  failureCb
}: {
  data: IDeleteAccountAdminPayload;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}): IDeleteAccountAdminReq => ({
  type: ACCOUNT_TYPES.DELETE_ACCOUNT_ADMIN_REQUEST,
  data,
  successCb,
  failureCb
});

export const deleteAccountAdminSuccess = (): IDeleteAccountAdminSuccess => ({
  type: ACCOUNT_TYPES.DELETE_ACCOUNT_ADMIN_SUCCESS
});

export const deleteAccountAdminFail = (error: Error): IDeleteAccountAdminFail => ({
  type: ACCOUNT_TYPES.DELETE_ACCOUNT_ADMIN_FAIL,
  error
});

export const activateAccountReq = ({
  data,
  successCb,
  failureCb
}: Omit<IActivateAccountReq, 'type'>): IActivateAccountReq => ({
  type: ACCOUNT_TYPES.ACTIVATE_ACCOUNT_REQUEST,
  data,
  successCb,
  failureCb
});

export const activateAccountSuccess = (): IActivateAccountSuccess => ({
  type: ACCOUNT_TYPES.ACTIVATE_ACCOUNT_SUCCESS
});

export const activateAccountFail = (error: Error): IActivateAccountFail => ({
  type: ACCOUNT_TYPES.ACTIVATE_ACCOUNT_FAIL,
  error
});

export const removeDeactivatedAccountList = () => ({
  type: ACCOUNT_TYPES.REMOVE_DEACTIVATED_ACCOUNT_LIST
});

export const decactivateAccountReq = ({
  data,
  successCb,
  failureCb
}: {
  data: IAccountDeactivate;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}): IDeactivateAccountReq => ({
  type: ACCOUNT_TYPES.DEACTIVATE_ACCOUNT_REQUEST,
  data,
  successCb,
  failureCb
});

export const deactivateAccountSuccess = (): IDeactivateAccountSuccess => ({
  type: ACCOUNT_TYPES.DEACTIVATE_ACCOUNT_SUCCESS
});

export const deactivateAccountFail = (error: Error): IDeactivateAccountFail => ({
  type: ACCOUNT_TYPES.DEACTIVATE_ACCOUNT_FAIL,
  error
});

export const fetchAccountOptionsRequest = (tenantId: string): IFetchAccountOptionsRequest => ({
  type: ACCOUNT_TYPES.FETCH_ACCOUNT_OPTIONS_REQUEST,
  tenantId
});

export const fetchAccountOptionsSuccess = (payload: IAccountOption[]): IFetchAccountOptionsSuccess => ({
  type: ACCOUNT_TYPES.FETCH_ACCOUNT_OPTIONS_SUCCESS,
  payload
});

export const fetchAccountOptionsFailure = (): IFetchAccountOptionsFailure => ({
  type: ACCOUNT_TYPES.FETCH_ACCOUNT_OPTIONS_FAILURE
});

export const fetchAccountAdminsRequest = ({
  data,
  successCb,
  failureCb
}: {
  data: IFetchAccounts;
  successCb?: (payload: IFetchAccountAdminSuccessPayload) => void;
  failureCb?: (error: Error) => void;
}): IFetchAccountAdminRequest => ({
  type: ACCOUNT_TYPES.FETCH_ACCOUNT_ADMIN_REQUEST,
  data,
  successCb,
  failureCb
});

export const fetchAccountAdminsSuccess = (payload: IFetchAccountAdminSuccessPayload): IFetchAccountAdminSuccess => ({
  type: ACCOUNT_TYPES.FETCH_ACCOUNT_ADMIN_SUCCESS,
  payload
});

export const fetchAccountAdminsFailure = (error: Error): IFetchAccountAdminFailure => ({
  type: ACCOUNT_TYPES.FETCH_ACCOUNT_ADMIN_FAILURE,
  error
});

export const clearAccountDetails = () => ({
  type: ACCOUNT_TYPES.CLEAR_ACCOUNT_DETAILS
});

export const setAccountDetails = (data?: Partial<IAccount>): ISetAccountDetails => ({
  type: ACCOUNT_TYPES.SET_ACCOUNT_DETAILS,
  data
});

export const clearAccounts = (): IClearAccounts => ({
  type: ACCOUNT_TYPES.CLEAR_ACCOUNTS
});

export const clearAccountAdmin = (): IClearAccountAdmin => ({
  type: ACCOUNT_TYPES.CLEAR_ACCOUNT_ADMIN
});

export const fetchClinicalWorkflow = (data: IFetchClinicalWorkflowReqPayload): IFetchClinicalWorkflowReq => ({
  type: ACCOUNT_TYPES.FETCH_CLINICAL_WORKFLOW_REQUEST,
  data
});

export const fetchClinicalWorkflowSuccess = (
  payload: IFetchClinicalWorkflowSuccessPayload
): IFetchClinicalWorkflowSuccess => ({
  type: ACCOUNT_TYPES.FETCH_CLINICAL_WORKFLOW_SUCCESS,
  payload
});

export const fetchClinicalWorkflowFailure = (): IFetchClinicalWorkflowFailure => ({
  type: ACCOUNT_TYPES.FETCH_CLINICAL_WORKFLOW_FAILURE
});

export const createAccountWorkflowModule = ({
  data,
  successCb,
  failureCb
}: Omit<ICreateAccountWorkflowModule, 'type'>): ICreateAccountWorkflowModule => ({
  type: ACCOUNT_TYPES.CREATE_ACCOUNT_WORKFLOW_MODULE_REQUEST,
  data,
  successCb,
  failureCb
});

export const createAccountWorkflowModuleSuccess = (): ICreateAccountWorkflowModuleSuccess => ({
  type: ACCOUNT_TYPES.CREATE_ACCOUNT_WORKFLOW_MODULE_SUCCESS
});

export const createAccountWorkflowModuleFailure = (error: Error): ICreateAccountWorkflowModuleFail => ({
  type: ACCOUNT_TYPES.CREATE_ACCOUNT_WORKFLOW_MODULE_FAILURE,
  error
});

export const updateAccountWorkflowModule = ({
  data,
  successCb,
  failureCb
}: Omit<IUpdateAccountWorkflowModule, 'type'>): IUpdateAccountWorkflowModule => ({
  type: ACCOUNT_TYPES.UPDATE_ACCOUNT_WORKFLOW_MODULE_REQUEST,
  data,
  successCb,
  failureCb
});

export const updateAccountWorkflowModuleSuccess = (): IUpdateAccountWorkflowModuleSuccess => ({
  type: ACCOUNT_TYPES.UPDATE_ACCOUNT_WORKFLOW_MODULE_SUCCESS
});

export const updateAccountWorkflowModuleFailure = (error: Error): IUpdateAccountWorkflowModuleFail => ({
  type: ACCOUNT_TYPES.UPDATE_ACCOUNT_WORKFLOW_MODULE_FAILURE,
  error
});

export const deleteAccountWorkflowModule = ({
  data,
  successCb,
  failureCb
}: Omit<IDeleteAccountWorkflowModule, 'type'>): IDeleteAccountWorkflowModule => ({
  type: ACCOUNT_TYPES.DELETE_ACCOUNT_WORKFLOW_MODULE_REQUEST,
  data,
  successCb,
  failureCb
});

export const deleteAccountWorkflowModuleSuccess = (): IDeleteAccountWorkflowModuleSuccess => ({
  type: ACCOUNT_TYPES.DELETE_ACCOUNT_WORKFLOW_MODULE_SUCCESS
});

export const deleteAccountWorkflowModuleFailure = (error: Error): IDeleteAccountWorkflowModuleFail => ({
  type: ACCOUNT_TYPES.DELETE_ACCOUNT_WORKFLOW_MODULE_FAILURE,
  error
});

export const resetClinicalWorkflow = () => ({
  type: ACCOUNT_TYPES.RESET_CLINICAL_WORKFLOW_REQUEST
});
