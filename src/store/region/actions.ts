import * as REGION_TYPES from './actionTypes';
import {
  IFetchRegionsRequest,
  IFetchRegionsSuccess,
  IFetchRegionsFailure,
  IFetchRegionsSuccessPayload,
  ICreateRegionRequest,
  ICreateRegionFailure,
  ICreateRegionSuccess,
  ICreateRegionRequestPayload,
  IFetchRegionDetailReq,
  IFetchRegionDetailSuccess,
  IFetchRegionDetailFail,
  IRegionDetail,
  IFetchRegionDetailReqPayload,
  IRegionAdmin,
  ISearchRegionAdminSuccess,
  IRegionInfo,
  IUpdateRegionFailure,
  IUpdateRegionReq,
  IUpdateRegionSuccess,
  ICreateRegionAdminFail,
  ICreateRegionAdminReq,
  ICreateRegionAdminSuccess,
  IUpdateRegionAdminFail,
  IUpdateRegionAdminReq,
  IUpdateRegionAdminSuccess,
  IDeleteRegionAdminFail,
  IDeleteRegionAdminSuccess,
  IDeleteRegionAdminReq,
  IDeleteRegionAdminPayload,
  IDeactivateRegionFail,
  IDeactivateRegionReq,
  IDeactivateRegionSuccess,
  IDeactivateReqPayload,
  ISetRegionDetails,
  IRegionAdminAddPayload,
  IClearRegionDetail
} from './types';

export const fetchRegionsRequest = ({
  skip,
  limit,
  isLoadMore,
  search,
  successCb,
  failureCb
}: {
  skip: number;
  limit: number | null;
  isLoadMore?: boolean;
  search?: string;
  successCb?: (payload: IFetchRegionsSuccessPayload) => void;
  failureCb?: (error: Error) => void;
}): IFetchRegionsRequest => ({
  type: REGION_TYPES.FETCH_REGIONS_REQUEST,
  skip,
  limit,
  isLoadMore,
  search,
  successCb,
  failureCb
});

export const fetchRegionsSuccess = (payload: IFetchRegionsSuccessPayload): IFetchRegionsSuccess => ({
  type: REGION_TYPES.FETCH_REGIONS_SUCCESS,
  payload
});

export const fetchRegionsFailure = (error: Error): IFetchRegionsFailure => ({
  type: REGION_TYPES.FETCH_REGIONS_FAILURE,
  error
});

export const createRegionRequest = ({
  data,
  successCb,
  failureCb
}: ICreateRegionRequestPayload): ICreateRegionRequest => ({
  type: REGION_TYPES.CREATE_REGION_REQUEST,
  data,
  successCb,
  failureCb
});

export const createRegionSuccess = (): ICreateRegionSuccess => ({
  type: REGION_TYPES.CREATE_REGION_SUCCESS
});

export const createRegionFailure = (error: Error): ICreateRegionFailure => ({
  type: REGION_TYPES.CREATE_REGION_FAILURE,
  error
});

export const fetchRegionDetailReq = (payload: IFetchRegionDetailReqPayload): IFetchRegionDetailReq => ({
  type: REGION_TYPES.FETCH_REGION_DETAIL_REQUEST,
  payload
});

export const fetchRegionDetailSuccess = (payload: IRegionDetail): IFetchRegionDetailSuccess => ({
  type: REGION_TYPES.FETCH_REGION_DETAIL_SUCCESS,
  payload
});

export const fetchRegionDetailFail = (error: Error): IFetchRegionDetailFail => ({
  type: REGION_TYPES.FETCH_REGION_DETAIL_FAILURE,
  error
});

export const clearRegionDetail = (): IClearRegionDetail => ({
  type: REGION_TYPES.CLEAR_REGION_DETAIL
});

export const searchUserSuccess = (payload: IRegionAdmin[]): ISearchRegionAdminSuccess => ({
  type: REGION_TYPES.SEACRH_REGION_USER_SUCCESS,
  payload
});

export const updateRegionDetail = ({
  data,
  successCb,
  failureCb
}: {
  data: IRegionInfo;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}): IUpdateRegionReq => ({
  type: REGION_TYPES.UPDATE_REGION_DETAIL_REQUEST,
  data,
  successCb,
  failureCb
});

export const updateRegionDetailSuccess = (data: IRegionInfo): IUpdateRegionSuccess => ({
  type: REGION_TYPES.UPDATE_REGION_DETAIL_SUCCESS,
  data
});

export const updateRegionDetailFail = (error: Error): IUpdateRegionFailure => ({
  type: REGION_TYPES.UPDATE_REGION_DETAIL_FAIL,
  error
});

export const updateRegionAdmin = ({
  data,
  successCb,
  failureCb
}: {
  data: IRegionAdminAddPayload;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}): IUpdateRegionAdminReq => ({
  type: REGION_TYPES.UPDATE_REGION_ADMIN_REQUEST,
  data,
  successCb,
  failureCb
});

export const updateRegionAdminSuccess = (): IUpdateRegionAdminSuccess => ({
  type: REGION_TYPES.UPDATE_REGION_ADMIN_SUCCESS
});

export const updateRegionAdminFail = (error: Error): IUpdateRegionAdminFail => ({
  type: REGION_TYPES.UPDATE_REGION_ADMIN_FAIL,
  error
});

export const createRegionAdmin = ({
  data,
  successCb,
  failureCb
}: {
  data: IRegionAdminAddPayload;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}): ICreateRegionAdminReq => ({
  type: REGION_TYPES.CREATE_REGION_ADMIN_REQUEST,
  data,
  successCb,
  failureCb
});

export const createRegionAdminSuccess = (): ICreateRegionAdminSuccess => ({
  type: REGION_TYPES.CREATE_REGION_ADMIN_SUCCESS
});

export const createRegionAdminFail = (error: Error): ICreateRegionAdminFail => ({
  type: REGION_TYPES.CREATE_REGION_ADMIN_FAIL,
  error
});

export const deleteRegionAdmin = ({
  data,
  successCb,
  failureCb
}: {
  data: IDeleteRegionAdminPayload;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}): IDeleteRegionAdminReq => ({
  type: REGION_TYPES.DELETE_REGION_ADMIN_REQUEST,
  data,
  successCb,
  failureCb
});

export const deleteRegionAdminSuccess = (): IDeleteRegionAdminSuccess => ({
  type: REGION_TYPES.DELETE_REGION_ADMIN_SUCCESS
});

export const deleteRegionAdminFail = (error: Error): IDeleteRegionAdminFail => ({
  type: REGION_TYPES.DELETE_REGION_ADMIN_FAIL,
  error
});

export const decactivateRegionReq = (payload: IDeactivateReqPayload): IDeactivateRegionReq => ({
  type: REGION_TYPES.DEACTIVATE_REGION_REQUEST,
  payload
});

export const deactivateRegionSuccess = (): IDeactivateRegionSuccess => ({
  type: REGION_TYPES.DEACTIVATE_REGION_SUCCESS
});

export const deactivateRegionFail = (error: Error): IDeactivateRegionFail => ({
  type: REGION_TYPES.DEACTIVATE_REGION_FAIL,
  error
});

export const setRegionDetails = (data?: Partial<IRegionDetail>): ISetRegionDetails => ({
  type: REGION_TYPES.SET_REGION_DETAILS,
  data
});
