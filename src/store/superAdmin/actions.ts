import * as SUPERADMIN_TYPES from './actionTypes';
import {
  IFetchSuperAdminsRequest,
  IFetchSuperAdminsSuccess,
  IFetchSuperAdminsFailure,
  IFetchSuperAdminsSuccessPayload,
  ICreateSuperAdminFail,
  ICreateSuperAdminReq,
  ICreateSuperAdminSuccess,
  IDeleteSuperAdminReq,
  IDeleteSuperAdminPayload,
  IDeleteSuperAdminSuccess,
  IDeleteSuperAdminFail,
  ISuperAdminFormValues,
  IUpdateSuperAdminReq,
  IUpdateSuperAdminSuccess,
  IUpdateSuperAdminFail,
  IFetchSuperAdminReq,
  IFetchSuperAdminSuccess,
  IFetchSuperAdminFail
} from './types';

export const fetchSuperAdminsRequest = ({
  pageNo,
  limit,
  search,
  successCb,
  failureCb
}: {
  pageNo: number;
  limit: number | null;
  search?: string;
  successCb?: (payload: IFetchSuperAdminsSuccessPayload) => void;
  failureCb?: (error: Error) => void;
}): IFetchSuperAdminsRequest => ({
  type: SUPERADMIN_TYPES.FETCH_SUPERADMINS_REQUEST,
  pageNo,
  limit,
  search,
  successCb,
  failureCb
});

export const fetchSuperAdminsSuccess = (payload: IFetchSuperAdminsSuccessPayload): IFetchSuperAdminsSuccess => ({
  type: SUPERADMIN_TYPES.FETCH_SUPERADMINS_SUCCESS,
  payload
});

export const fetchSuperAdminsFailure = (error: Error): IFetchSuperAdminsFailure => ({
  type: SUPERADMIN_TYPES.FETCH_SUPERADMINS_FAILURE,
  error
});

export const createSuperAdmin = ({
  data,
  successCb,
  failureCb
}: {
  data: ISuperAdminFormValues[];
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}): ICreateSuperAdminReq => ({
  type: SUPERADMIN_TYPES.CREATE_SUPER_ADMIN_REQUEST,
  data,
  successCb,
  failureCb
});

export const createSuperAdminFail = (error: Error): ICreateSuperAdminFail => ({
  type: SUPERADMIN_TYPES.CREATE_SUPER_ADMIN_FAILURE,
  error
});

export const createSuperAdminSuccess = (): ICreateSuperAdminSuccess => ({
  type: SUPERADMIN_TYPES.CREATE_SUPER_ADMIN_SUCCESS
});

export const deleteSuperAdmin = ({
  data,
  successCb,
  failureCb
}: {
  data: IDeleteSuperAdminPayload;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}): IDeleteSuperAdminReq => ({
  type: SUPERADMIN_TYPES.DELETE_SUPER_ADMIN_REQUEST,
  data,
  successCb,
  failureCb
});

export const deleteSuperAdminSuccess = (): IDeleteSuperAdminSuccess => ({
  type: SUPERADMIN_TYPES.DELETE_SUPER_ADMIN_SUCCESS
});

export const deleteSuperAdminFail = (error: Error): IDeleteSuperAdminFail => ({
  type: SUPERADMIN_TYPES.DELETE_SUPER_ADMIN_FAIL,
  error
});

export const updateSuperAdmin = ({
  data,
  successCb,
  failureCb
}: {
  data: ISuperAdminFormValues;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}): IUpdateSuperAdminReq => ({
  type: SUPERADMIN_TYPES.UPDATE_SUPER_ADMIN_REQUEST,
  data,
  successCb,
  failureCb
});

export const updateSuperAdminSuccess = (): IUpdateSuperAdminSuccess => ({
  type: SUPERADMIN_TYPES.UPDATE_SUPER_ADMIN_SUCCESS
});

export const updateSuperAdminFail = (error: Error): IUpdateSuperAdminFail => ({
  type: SUPERADMIN_TYPES.UPDATE_SUPER_ADMIN_FAIL,
  error
});

export const fetchSuperAdmin = ({
  id,
  successCb,
  failureCb
}: {
  id: string;
  successCb?: (data: ISuperAdminFormValues) => void;
  failureCb?: (error: Error) => void;
}): IFetchSuperAdminReq => ({
  type: SUPERADMIN_TYPES.FETCH_SUPER_ADMIN_REQUEST,
  id,
  successCb,
  failureCb
});

export const fetchSuperAdminSuccess = (payload: ISuperAdminFormValues): IFetchSuperAdminSuccess => ({
  type: SUPERADMIN_TYPES.FETCH_SUPER_ADMIN_SUCCESS,
  payload
});

export const fetchSuperAdminFail = (error: Error): IFetchSuperAdminFail => ({
  type: SUPERADMIN_TYPES.FETCH_SUPER_ADMIN_FAIL,
  error
});
