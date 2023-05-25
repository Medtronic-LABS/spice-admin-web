import * as MEDICATION_TYPES from './actionTypes';
import {
  IFetchMedicationListReq,
  IFetchMedicationListReqPayload,
  IFetchMedicationListSuccess,
  IFetchMedicationListFailure,
  IFetchMedicationListSuccessPayload,
  IFetchClassificationSuccessPayload,
  IFetchBrandsSuccessPayload,
  ICreateMedicationRequest,
  ICreateMedicationSuccess,
  ICreateMedicationFailure,
  ICreateMedicationRequestPayload,
  IFetchDosageFormSuccessPayload,
  IMedicationPayload,
  IUpdateMedicationReq,
  IUpdateMedicationSuccess,
  IUpdateMedicationFailure,
  IDeleteMedicationRequestPayload,
  IDeleteMedicationRequest,
  IDeleteMedicationSuccess,
  IDeleteMedicationFailure,
  IValidateMedication,
  IFetchBrandReq
} from './types';

export const fetchMedicationListReq = ({
  skip,
  limit,
  search,
  payload,
  failureCb
}: {
  skip: number;
  limit: number | null;
  search: string;
  payload: IFetchMedicationListReqPayload;
  failureCb?: (error: Error) => void;
}): IFetchMedicationListReq => ({
  type: MEDICATION_TYPES.FETCH_MEDICATIONS_LIST_REQUEST,
  skip,
  limit,
  search,
  payload,
  failureCb
});

export const fetchMedicationListSuccess = (
  payload: IFetchMedicationListSuccessPayload
): IFetchMedicationListSuccess => ({
  type: MEDICATION_TYPES.FETCH_MEDICATIONS_LIST_SUCCESS,
  payload
});

export const fetchMedicationlistFail = (error: Error): IFetchMedicationListFailure => ({
  type: MEDICATION_TYPES.FETCH_MEDICATIONS_LIST_FAILURE,
  error
});

export const fetchClassifications = ({ countryId }: { countryId: string }) => ({
  type: MEDICATION_TYPES.FETCH_MEDICATION_CLASSIFICATIONS_REQUEST,
  countryId
});

export const fetchClassificationsSuccess = (payload: IFetchClassificationSuccessPayload) => ({
  type: MEDICATION_TYPES.FETCH_MEDICATION_CLASSIFICATIONS_SUCCESS,
  payload
});

export const fetchClassificationsFailure = () => ({
  type: MEDICATION_TYPES.FETCH_MEDICATION_CLASSIFICATIONS_FAILURE
});

export const fetchMedicationBrands = ({
  countryId,
  classificationId,
  successCb
}: Omit<IFetchBrandReq, 'type'>): IFetchBrandReq => ({
  type: MEDICATION_TYPES.FETCH_MEDICATION_BRANDS,
  countryId,
  classificationId,
  successCb
});

export const fetchMedicationBrandsSuccess = (payload: IFetchBrandsSuccessPayload) => ({
  type: MEDICATION_TYPES.FETCH_MEDICATION_BRANDS_SUCCESS,
  payload
});

export const fetchMedicationBrandsFailure = () => ({
  type: MEDICATION_TYPES.FETCH_MEDICATION_BRANDS_FAILURE
});

export const removeMedicationBrands = () => ({
  type: MEDICATION_TYPES.REMOVE_MEDICATION_BRANDS
});

export const fetchDosageForms = () => ({
  type: MEDICATION_TYPES.FETCH_MEDICATION_DOSAGE_FORM
});

export const fetchDosageFormsSuccess = (payload: IFetchDosageFormSuccessPayload) => ({
  type: MEDICATION_TYPES.FETCH_MEDICATION_DOSAGE_FORM_SUCCESS,
  payload
});

export const fetchDosageFormsFailure = () => ({
  type: MEDICATION_TYPES.FETCH_MEDICATION_DOSAGE_FORM_FAILURE
});

export const createMedicationRequest = ({
  data,
  successCb,
  failureCb
}: ICreateMedicationRequestPayload): ICreateMedicationRequest => ({
  type: MEDICATION_TYPES.CREATE_MEDICATION_REQUEST,
  data,
  successCb,
  failureCb
});

export const createMedicationSuccess = (): ICreateMedicationSuccess => ({
  type: MEDICATION_TYPES.CREATE_MEDICATION_SUCCESS
});

export const createMedicationFailure = (error: Error): ICreateMedicationFailure => ({
  type: MEDICATION_TYPES.CREATE_MEDICATION_FAILURE,
  error
});

export const updateMedication = ({
  data,
  successCb,
  failureCb
}: {
  data: IMedicationPayload;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}): IUpdateMedicationReq => ({
  type: MEDICATION_TYPES.UPDATE_MEDICATION_REQUEST,
  data,
  successCb,
  failureCb
});

export const updateMedicationSuccess = (): IUpdateMedicationSuccess => ({
  type: MEDICATION_TYPES.UPDATE_MEDICATION_SUCCESS
});

export const updateMedicationFail = (error: Error): IUpdateMedicationFailure => ({
  type: MEDICATION_TYPES.UPDATE_MEDICATION_FAILURE,
  error
});

export const deleteMedication = ({
  data,
  successCb,
  failureCb
}: {
  data: IDeleteMedicationRequestPayload;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}): IDeleteMedicationRequest => ({
  type: MEDICATION_TYPES.DELETE_MEDICATION_REQUEST,
  data,
  successCb,
  failureCb
});

export const deleteMedicationSuccess = (): IDeleteMedicationSuccess => ({
  type: MEDICATION_TYPES.DELETE_MEDICATION_SUCCESS
});

export const deleteMedicationFail = (error: Error): IDeleteMedicationFailure => ({
  type: MEDICATION_TYPES.DELETE_MEDICATION_FAILURE,
  error
});

export const validateMedication = ({
  data,
  successCb,
  failureCb
}: Omit<IValidateMedication, 'type'>): IValidateMedication => ({
  type: MEDICATION_TYPES.VALIDATE_MEDICATION,
  data,
  successCb,
  failureCb
});
