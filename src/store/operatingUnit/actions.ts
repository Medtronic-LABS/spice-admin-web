import {
  IFetchOperatingUnitDetailFail,
  IFetchOperatingUnitDetailSuccess,
  IFetchOperaingUnitAdminsSuccess,
  IFetchOUDashboardListFailure,
  IFetchOUDashboardListRequest,
  IFetchOUDashboardListSuccess,
  IFetchOUDashboardListSuccessPayload,
  ICreateOperatingUnitRequest,
  IFetchOperatingUnitAdminsRequest,
  IFetchOperatingUnitAdminsSuccessPayload,
  IFetchOperatingUnitDetailReq,
  IFetchOperatingUnitDetailReqPayload,
  IOperatingUnitAdmin,
  ISearchOperatingUnitAdminSuccess,
  IFetchOperatingUnitListRequest,
  IFetchOperatingUnitListSuccess,
  IFetchOperatingUnitListFailure,
  IFetchOperatingUnitListSuccessPayload,
  IUpdateOperatingUnitSuccess,
  IUpdateOperatingUnitFailure,
  IUpdateOperatingUnitRequest,
  IUpdateOperatingUnitAdminRequest,
  IUpdateOperatingUnitAdminSuccess,
  IUpdateOperatingUnitAdminFailure,
  IFetchOperatingUnitDetailSuccessPayload,
  IOperatingUnitDetail,
  ICreateOperatingUnitAdminRequest,
  ICreateOperatingUnitAdminSuccess,
  ICreateOperatingUnitAdminFailure,
  IDeleteOperatingUnitAdminRequest,
  IDeleteOperatingUnitAdminSuccess,
  IDeleteOperatingUnitAdminFailure,
  IFetchOperatingUnitByIdFailure,
  IFetchOperatingUnitByIdSuccess,
  IFetchOperatingUnitByIdRequest,
  IFetchOperaingUnitAdminsFailure,
  ISetOperatingUnitDetails,
  IClearOperatingUnitAdminList,
  IClearOperatingUnitList,
  IOperatingUnitDropdownRequest,
  IOperatingUnitDropdownFailure,
  IOperatingUnitDropdownSuccess,
  IOperatingUnitDropdownSuccessPayload
} from './types';
import * as ACTION_TYPES from './actionTypes';

export const fetchOUDashboardListRequest = ({
  skip,
  limit,
  isLoadMore,
  search,
  successCb,
  failureCb
}: Omit<IFetchOUDashboardListRequest, 'type'>): IFetchOUDashboardListRequest => ({
  type: ACTION_TYPES.FETCH_OPERATING_UNIT_DASHBOARD_LIST_REQUEST,
  skip,
  limit,
  isLoadMore,
  search,
  successCb,
  failureCb
});

export const fetchOUDashboardListSuccess = (
  payload: IFetchOUDashboardListSuccessPayload
): IFetchOUDashboardListSuccess => ({
  type: ACTION_TYPES.FETCH_OPERATING_UNIT_DASHBOARD_LIST_SUCCESS,
  payload
});

export const fetchOUDashboardListFailure = (error: Error): IFetchOUDashboardListFailure => ({
  type: ACTION_TYPES.FETCH_OPERATING_UNIT_DASHBOARD_LIST_FAILURE,
  error
});

export const fetchOperatingUnitDetail = (
  payload: IFetchOperatingUnitDetailReqPayload
): IFetchOperatingUnitDetailReq => ({
  type: ACTION_TYPES.FETCH_OPERATING_UNIT_DETAIL_REQUEST,
  payload
});

export const fetchOperatingUnitDetailSuccess = (
  payload: IFetchOperatingUnitDetailSuccessPayload
): IFetchOperatingUnitDetailSuccess => ({
  type: ACTION_TYPES.FETCH_OPERATING_UNIT_DETAIL_SUCCESS,
  payload
});

export const fetchOperatingUnitDetailFail = (error: Error): IFetchOperatingUnitDetailFail => ({
  type: ACTION_TYPES.FETCH_OPERATING_UNIT_DETAIL_FAILURE,
  error
});

export const searchUserSuccess = (payload: IOperatingUnitAdmin[]): ISearchOperatingUnitAdminSuccess => ({
  type: ACTION_TYPES.SEARCH_OPERATING_UNIT_USER_SUCCESS,
  payload
});

export const fetchOperatingUnitListRequest = ({
  tenantId,
  skip,
  limit,
  search,
  failureCb
}: {
  tenantId: string;
  skip: number;
  limit: number | null;
  search?: string;
  failureCb?: (error: Error) => void;
}): IFetchOperatingUnitListRequest => ({
  type: ACTION_TYPES.FETCH_OPERATING_UNIT_LIST_REQUEST,
  tenantId,
  skip,
  limit,
  search,
  failureCb
});

export const fetchOperatingUnitListSuccess = (
  payload: IFetchOperatingUnitListSuccessPayload
): IFetchOperatingUnitListSuccess => ({
  type: ACTION_TYPES.FETCH_OPERATING_UNIT_LIST_SUCCESS,
  payload
});

export const fetchOperatingUnitListFailure = (error: Error): IFetchOperatingUnitListFailure => ({
  type: ACTION_TYPES.FETCH_OPERATING_UNIT_LIST_FAILURE,
  error
});

export const createOperatingUnitRequest = ({
  payload,
  successCb,
  failureCb
}: Omit<ICreateOperatingUnitRequest, 'type'>): ICreateOperatingUnitRequest => ({
  type: ACTION_TYPES.CREATE_OPERATING_UNIT_REQUEST,
  payload,
  successCb,
  failureCb
});

export const createOperatingUnitSuccess = () => ({
  type: ACTION_TYPES.CREATE_OPERATING_UNIT_SUCCESS
});

export const createOperatingUnitFailure = () => ({
  type: ACTION_TYPES.CREATE_OPERATING_UNIT_FAILURE
});

export const updateOperatingUnitReq = ({
  payload,
  isSuccessPayloadNeeded,
  successCb,
  failureCb
}: Omit<IUpdateOperatingUnitRequest, 'type'>): IUpdateOperatingUnitRequest => ({
  type: ACTION_TYPES.UPDATE_OPERATING_UNIT_REQUEST,
  payload,
  isSuccessPayloadNeeded,
  successCb,
  failureCb
});

export const updateOperatingUnitSuccess = (payload?: Partial<IOperatingUnitDetail>): IUpdateOperatingUnitSuccess => ({
  type: ACTION_TYPES.UPDATE_OPERATING_UNIT_SUCCESS,
  payload
});

export const updateOperatingUnitFailure = (): IUpdateOperatingUnitFailure => ({
  type: ACTION_TYPES.UPDATE_OPERATING_UNIT_FAILURE
});

export const updateOperatingUnitAdminReq = ({
  payload,
  successCb,
  failureCb
}: Omit<IUpdateOperatingUnitAdminRequest, 'type'>): IUpdateOperatingUnitAdminRequest => ({
  type: ACTION_TYPES.UPDATE_OPERATING_UNIT_ADMIN_REQUEST,
  payload,
  successCb,
  failureCb
});

export const updateOperatingUnitAdminSuccess = (): IUpdateOperatingUnitAdminSuccess => ({
  type: ACTION_TYPES.UPDATE_OPERATING_UNIT_ADMIN_SUCCESS
});

export const updateOperatingUnitAdminFailure = (): IUpdateOperatingUnitAdminFailure => ({
  type: ACTION_TYPES.UPDATE_OPERATING_UNIT_ADMIN_FAILURE
});

export const createOperatingUnitAdminReq = ({
  payload,
  successCb,
  failureCb
}: Omit<ICreateOperatingUnitAdminRequest, 'type'>): ICreateOperatingUnitAdminRequest => ({
  type: ACTION_TYPES.CREATE_OPERATING_UNIT_ADMIN_REQUEST,
  payload,
  successCb,
  failureCb
});

export const createOperatingUnitAdminSuccess = (): ICreateOperatingUnitAdminSuccess => ({
  type: ACTION_TYPES.CREATE_OPERATING_UNIT_ADMIN_SUCCESS
});

export const createOperatingUnitAdminFailure = (): ICreateOperatingUnitAdminFailure => ({
  type: ACTION_TYPES.CREATE_OPERATING_UNIT_ADMIN_FAILURE
});

export const deleteOperatingUnitAdminReq = ({
  payload,
  successCb,
  failureCb
}: Omit<IDeleteOperatingUnitAdminRequest, 'type'>): IDeleteOperatingUnitAdminRequest => ({
  type: ACTION_TYPES.DELETE_OPERATING_UNIT_ADMIN_REQUEST,
  payload,
  successCb,
  failureCb
});

export const deleteOperatingUnitAdminSuccess = (): IDeleteOperatingUnitAdminSuccess => ({
  type: ACTION_TYPES.DELETE_OPERATING_UNIT_ADMIN_SUCCESS
});

export const deleteOperatingUnitAdminFailure = (): IDeleteOperatingUnitAdminFailure => ({
  type: ACTION_TYPES.DELETE_OPERATING_UNIT_ADMIN_FAILURE
});

export const fetchOperatingUnitByIdReq = ({
  payload,
  successCb,
  failureCb
}: Omit<IFetchOperatingUnitByIdRequest, 'type'>): IFetchOperatingUnitByIdRequest => ({
  type: ACTION_TYPES.FETCH_OPERATING_UNIT_BY_ID_REQUEST,
  payload,
  successCb,
  failureCb
});

export const fetchOperatingUnitByIdSuccess = (): IFetchOperatingUnitByIdSuccess => ({
  type: ACTION_TYPES.FETCH_OPERATING_UNIT_BY_ID_SUCCESS
});

export const fetchOperatingUnitByIdFailure = (): IFetchOperatingUnitByIdFailure => ({
  type: ACTION_TYPES.FETCH_OPERATING_UNIT_BY_ID_FAILURE
});

export const fetchOperatingUnitAdminRequest = ({
  payload,
  successCb,
  failureCb
}: {
  payload: { skip: number; limit: number | null; searchTerm?: string; tenantId: string };
  successCb?: (payload: IFetchOperatingUnitAdminsSuccessPayload) => void;
  failureCb?: (error: Error) => void;
}): IFetchOperatingUnitAdminsRequest => ({
  type: ACTION_TYPES.FETCH_OPERATING_UNIT_ADMIN_LIST_REQUEST,
  payload,
  successCb,
  failureCb
});

export const fetchOperatingUnitAdminsSuccess = (
  payload: IFetchOperatingUnitAdminsSuccessPayload
): IFetchOperaingUnitAdminsSuccess => ({
  type: ACTION_TYPES.FETCH_OPERATING_UNIT_ADMIN_LIST_SUCCESS,
  payload
});

export const fetchOperatingUnitAdminsFailure = (error: Error): IFetchOperaingUnitAdminsFailure => ({
  type: ACTION_TYPES.FETCH_OPERATING_UNIT_ADMIN_LIST_FAILURE,
  error
});

export const clearOperatingUnitDetail = () => ({
  type: ACTION_TYPES.CLEAR_OPERATING_UNIT_DETAIL
});

export const setOperatingUnitDetails = (data?: Partial<IOperatingUnitDetail>): ISetOperatingUnitDetails => ({
  type: ACTION_TYPES.SET_OPERATING_UNIT_DETAILS,
  data
});

export const clearOperatingUnitList = (): IClearOperatingUnitList => ({
  type: ACTION_TYPES.CLEAR_OPERATING_UNIT_LIST
});

export const clearOperatingUnitAdminList = (): IClearOperatingUnitAdminList => ({
  type: ACTION_TYPES.CLEAR_OPERATING_UNIT_ADMIN_LIST
});

export const fetchOperatingUnitDropdownRequest = ({
  tenantId
}: {
  tenantId: string;
}): IOperatingUnitDropdownRequest => ({
  type: ACTION_TYPES.FETCH_OPERATING_UNIT_DROPDOWN_REQUEST,
  tenantId
});

export const fetchOperatingUnitDropdownSuccess = (
  payload: IOperatingUnitDropdownSuccessPayload
): IOperatingUnitDropdownSuccess => ({
  type: ACTION_TYPES.FETCH_OPERATING_UNIT_DROPDOWN_SUCCESS,
  payload
});

export const fetchOperatingUnitDropdownFailure = (error: Error): IOperatingUnitDropdownFailure => ({
  type: ACTION_TYPES.FETCH_OPERATING_UNIT_DROPDOWN_FAIL,
  error
});

export const clearOUDropdown = () => ({
  type: ACTION_TYPES.CLEAR_DROPDOWN_VALUES
});
