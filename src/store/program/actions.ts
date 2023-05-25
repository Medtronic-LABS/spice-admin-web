import * as PROGRAM_TYPES from './actionTypes';

import {
  IClearProgramList,
  IFetchProgramListFailure,
  IFetchProgramListRequest,
  IFetchProgramListSuccess,
  IFetchProgramListSuccessPayload,
  ICreateProgramFail,
  ICreateProgramRequest,
  ICreateProgramSuccess,
  ICreateProgramPayload,
  IFetchProgramDetailsFailure,
  IFetchProgramDetailsRequest,
  IFetchProgramDetailsSuccess,
  IProgramDetails,
  IUpdateProgramFail,
  IUpdateProgramRequest,
  IUpdateProgramSuccess,
  IDeleteProgramFailure,
  IDeleteProgramRequest,
  IDeleteProgramSuccess
} from './types';

export const fetchProgramListRequest = ({
  data,
  failureCb
}: Omit<IFetchProgramListRequest, 'type'>): IFetchProgramListRequest => ({
  type: PROGRAM_TYPES.FETCH_PROGRAM_LIST_REQUEST,
  data,
  failureCb
});

export const fetchProgramListSuccess = (payload: IFetchProgramListSuccessPayload): IFetchProgramListSuccess => ({
  type: PROGRAM_TYPES.FETCH_PROGRAM_LIST_SUCCESS,
  payload
});

export const fetchProgramListFailure = (error: Error): IFetchProgramListFailure => ({
  type: PROGRAM_TYPES.FETCH_PROGRAM_LIST_FAILURE,
  error
});

export const clearProgramList = (): IClearProgramList => ({
  type: PROGRAM_TYPES.CLEAR_PROGRAM_LIST
});

export const fetchProgramDetailsRequest = ({
  tenantId,
  id,
  failureCb,
  successCb
}: Omit<IFetchProgramDetailsRequest, 'type'>): IFetchProgramDetailsRequest => ({
  type: PROGRAM_TYPES.FETCH_PROGRAM_DETAILS_REQUEST,
  tenantId,
  id,
  failureCb,
  successCb
});

export const fetchProgramDetailsSuccess = (payload: IProgramDetails): IFetchProgramDetailsSuccess => ({
  type: PROGRAM_TYPES.FETCH_PROGRAM_DETAILS_SUCCESS,
  payload
});

export const fetchProgramDetailsFailure = (): IFetchProgramDetailsFailure => ({
  type: PROGRAM_TYPES.FETCH_PROGRAM_DETAILS_FAILURE
});

export const createProgram = ({ data, successCb, failureCb }: ICreateProgramPayload): ICreateProgramRequest => ({
  type: PROGRAM_TYPES.CREATE_PROGRAM_REQUEST,
  data,
  successCb,
  failureCb
});

export const createProgramSuccess = (): ICreateProgramSuccess => ({
  type: PROGRAM_TYPES.CREATE_PROGRAM_REQUEST_SUCCESS
});

export const createProgramFail = (error: Error): ICreateProgramFail => ({
  type: PROGRAM_TYPES.CREATE_PROGRAM_REQUEST_FAIL,
  error
});

export const updateProgram = ({
  data,
  successCb,
  failureCb
}: Omit<IUpdateProgramRequest, 'type'>): IUpdateProgramRequest => ({
  type: PROGRAM_TYPES.UPDATE_PROGRAM_REQUEST,
  data,
  successCb,
  failureCb
});

export const updateProgramSuccess = (): IUpdateProgramSuccess => ({
  type: PROGRAM_TYPES.UPDATE_PROGRAM_SUCCESS
});

export const updateProgramFail = (): IUpdateProgramFail => ({
  type: PROGRAM_TYPES.UPDATE_PROGRAM_FAILURE
});

export const deleteProgramRequest = ({
  id,
  tenantId,
  successCb,
  failureCb
}: Omit<IDeleteProgramRequest, 'type'>): IDeleteProgramRequest => ({
  type: PROGRAM_TYPES.DELETE_PROGRAM_REQUEST,
  id,
  tenantId,
  successCb,
  failureCb
});

export const deleteProgramSuccess = (): IDeleteProgramSuccess => ({
  type: PROGRAM_TYPES.DELETE_PROGRAM_SUCCESS
});

export const deleteProgramFailure = (): IDeleteProgramFailure => ({
  type: PROGRAM_TYPES.DELETE_PROGRAM_FAILURE
});
