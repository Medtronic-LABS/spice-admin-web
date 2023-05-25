import * as ACTION_TYPES from './actionTypes';

export interface IProgramState {
  loading: boolean;
  total: number;
  programList: IProgramList[] | [];
  program: IProgramDetails;
  error: string | null | Error;
}

export interface IProgramList {
  id: string;
  name: string;
  tenantId: string;
  active: boolean;
  createdAt: string;
}

export interface ISites {
  name: string;
  id: string;
}

export interface IFetchProgramListSuccessPayload {
  total: number;
  programs: IProgramList[];
  limit: number | null;
}
export interface IProgramFormValues {
  name: string;
  sites: ISites[];
}

export interface IFetchProgramListRequest {
  type: typeof ACTION_TYPES.FETCH_PROGRAM_LIST_REQUEST;
  data: IFetchPayload;
  failureCb?: (error: Error) => void;
}

export interface IFetchPayload {
  country?: string;
  account?: string;
  operating_unit?: string;
  site?: string;
  skip: number;
  limit: number | null;
  search?: string;
}

export interface IFetchProgramListSuccess {
  type: typeof ACTION_TYPES.FETCH_PROGRAM_LIST_SUCCESS;
  payload: IFetchProgramListSuccessPayload;
}

export interface IFetchProgramListFailure {
  type: typeof ACTION_TYPES.FETCH_PROGRAM_LIST_FAILURE;
  error: Error;
}

export interface IClearProgramList {
  type: typeof ACTION_TYPES.CLEAR_PROGRAM_LIST;
}
export interface IProgramDetails extends IProgramFormValues {
  id: string;
  country: { id: string };
  tenantId: string;
  deletedSites: string[];
  active: boolean;
}
export interface IFetchProgramDetailsRequest {
  type: typeof ACTION_TYPES.FETCH_PROGRAM_DETAILS_REQUEST;
  tenantId: string;
  id: string;
  successCb?: (data: IProgramDetails) => void;
  failureCb?: (error: Error) => void;
}

export interface IFetchProgramDetailsSuccess {
  type: typeof ACTION_TYPES.FETCH_PROGRAM_DETAILS_SUCCESS;
  payload: IProgramDetails;
}

export interface IFetchProgramDetailsFailure {
  type: typeof ACTION_TYPES.FETCH_PROGRAM_DETAILS_FAILURE;
}

export interface ICreateProgramReqPayload {
  name: string;
  country: string;
  sites: string[] | number[];
  tenantId: string;
}

export interface ICreateProgramPayload {
  data: ICreateProgramReqPayload;
  successCb: () => void;
  failureCb: (e: Error) => void;
}
export interface ICreateProgramRequest {
  type: typeof ACTION_TYPES.CREATE_PROGRAM_REQUEST;
  data: ICreateProgramReqPayload;
  successCb: () => void;
  failureCb: (e: Error) => void;
}

export interface ICreateProgramSuccess {
  type: typeof ACTION_TYPES.CREATE_PROGRAM_REQUEST_SUCCESS;
}

export interface ICreateProgramFail {
  type: typeof ACTION_TYPES.CREATE_PROGRAM_REQUEST_FAIL;
  error: Error;
}

export interface IUpdateProgramDetails {
  id: string;
  tenantId: string;
  sites: string[] | number[];
  deletedSites: string[];
  active: boolean;
}

export interface IUpdateProgramRequest {
  type: typeof ACTION_TYPES.UPDATE_PROGRAM_REQUEST;
  data: IUpdateProgramDetails;
  successCb: () => void;
  failureCb: (e: Error) => void;
}

export interface IUpdateProgramSuccess {
  type: typeof ACTION_TYPES.UPDATE_PROGRAM_SUCCESS;
}

export interface IUpdateProgramFail {
  type: typeof ACTION_TYPES.UPDATE_PROGRAM_FAILURE;
}

export interface IDeleteProgramRequest {
  type: typeof ACTION_TYPES.DELETE_PROGRAM_REQUEST;
  id: string;
  tenantId: string;
  successCb?: () => void;
  failureCb?: (e: Error) => void;
}

export interface IDeleteProgramSuccess {
  type: typeof ACTION_TYPES.DELETE_PROGRAM_SUCCESS;
}

export interface IDeleteProgramFailure {
  type: typeof ACTION_TYPES.DELETE_PROGRAM_FAILURE;
}

export type ProgramActions =
  | IFetchProgramListRequest
  | IFetchProgramListSuccess
  | IFetchProgramListFailure
  | IClearProgramList
  | ICreateProgramRequest
  | ICreateProgramSuccess
  | ICreateProgramFail
  | IFetchProgramDetailsRequest
  | IFetchProgramDetailsSuccess
  | IFetchProgramDetailsFailure
  | IUpdateProgramRequest
  | IUpdateProgramSuccess
  | IUpdateProgramFail
  | IDeleteProgramRequest
  | IDeleteProgramSuccess
  | IDeleteProgramFailure;
