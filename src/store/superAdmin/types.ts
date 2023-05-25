import * as ACTION_TYPES from './actionTypes';
import { ITimezone } from '../user/types';

interface ISuperAdmin {
  id: string;
  name: string;
  email: string;
  view_reports: boolean;
}

export interface ISuperAdminState {
  loading: boolean;
  superAdmins: ISuperAdmin[];
  total: number;
  error: string | null | Error;
}

export interface IFetchSuperAdminsSuccessPayload {
  superAdmins: ISuperAdmin[];
  total: number;
}

export interface IFetchSuperAdminsRequest {
  type: typeof ACTION_TYPES.FETCH_SUPERADMINS_REQUEST;
  pageNo: number;
  limit: number | null;
  search?: string;
  successCb?: (payload: IFetchSuperAdminsSuccessPayload) => void;
  failureCb?: (error: Error) => void;
}

export interface IFetchSuperAdminsSuccess {
  type: typeof ACTION_TYPES.FETCH_SUPERADMINS_SUCCESS;
  payload: IFetchSuperAdminsSuccessPayload;
}

export interface IFetchSuperAdminsFailure {
  type: typeof ACTION_TYPES.FETCH_SUPERADMINS_FAILURE;
  error: Error;
}

export interface ISuperAdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  username: string;
  gender: string;
  countryCode: string;
  country?: string;
  // is_report_admin: string;
}

export interface ICreateSuperAdminReq {
  type: typeof ACTION_TYPES.CREATE_SUPER_ADMIN_REQUEST;
  data: ISuperAdminFormValues[];
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface ICreateSuperAdminFail {
  type: typeof ACTION_TYPES.CREATE_SUPER_ADMIN_FAILURE;
  error: Error;
}

export interface ICreateSuperAdminSuccess {
  type: typeof ACTION_TYPES.CREATE_SUPER_ADMIN_SUCCESS;
}

export interface ISuperAdminFormValues {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  username: string;
  gender: string;
  timezone: ITimezone;
  country?: string;
  roles: { default: string[] };
  is_super_admin: boolean;
  countryCode: string;
  // is_report_admin: string | boolean;
}

export interface IDeleteSuperAdminPayload {
  id: string;
  isDeleted: boolean;
}

export interface IDeleteSuperAdminReq {
  type: typeof ACTION_TYPES.DELETE_SUPER_ADMIN_REQUEST;
  data: IDeleteSuperAdminPayload;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface IDeleteSuperAdminSuccess {
  type: typeof ACTION_TYPES.DELETE_SUPER_ADMIN_SUCCESS;
}

export interface IDeleteSuperAdminFail {
  type: typeof ACTION_TYPES.DELETE_SUPER_ADMIN_FAIL;
  error: Error;
}

export interface IUpdateSuperAdminReq {
  type: typeof ACTION_TYPES.UPDATE_SUPER_ADMIN_REQUEST;
  data: ISuperAdminFormValues;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface IUpdateSuperAdminSuccess {
  type: typeof ACTION_TYPES.UPDATE_SUPER_ADMIN_SUCCESS;
}

export interface IUpdateSuperAdminFail {
  type: typeof ACTION_TYPES.UPDATE_SUPER_ADMIN_FAIL;
  error: Error;
}

export interface IFetchSuperAdminReq {
  type: typeof ACTION_TYPES.FETCH_SUPER_ADMIN_REQUEST;
  id: string;
  successCb?: (data: ISuperAdminFormValues) => void;
  failureCb?: (error: Error) => void;
}

export interface IFetchSuperAdminSuccess {
  type: typeof ACTION_TYPES.FETCH_SUPER_ADMIN_SUCCESS;
  payload: ISuperAdminFormValues;
}

export interface IFetchSuperAdminFail {
  type: typeof ACTION_TYPES.FETCH_SUPER_ADMIN_FAIL;
  error: Error;
}

export type SuperAdminActions =
  | ICreateSuperAdminReq
  | ICreateSuperAdminFail
  | ICreateSuperAdminSuccess
  | IFetchSuperAdminsRequest
  | IFetchSuperAdminsSuccess
  | IFetchSuperAdminsFailure
  | IDeleteSuperAdminReq
  | IDeleteSuperAdminSuccess
  | IDeleteSuperAdminFail
  | IUpdateSuperAdminReq
  | IUpdateSuperAdminSuccess
  | IUpdateSuperAdminFail
  | IFetchSuperAdminReq
  | IFetchSuperAdminSuccess
  | IFetchSuperAdminFail;
