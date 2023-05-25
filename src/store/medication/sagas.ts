import { SagaIterator } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  ICreateMedicationRequest,
  IDeleteMedicationRequest,
  IFetchBrandReq,
  IFetchClassificationsReq,
  IFetchMedicationListReq,
  IUpdateMedicationReq,
  IValidateMedication
} from './types';
import * as medicationService from '../../services/medicationAPI';
import {
  createMedicationFailure,
  createMedicationSuccess,
  deleteMedicationFail,
  deleteMedicationSuccess,
  fetchClassificationsFailure,
  fetchClassificationsSuccess,
  fetchDosageFormsFailure,
  fetchDosageFormsSuccess,
  fetchMedicationBrandsFailure,
  fetchMedicationBrandsSuccess,
  fetchMedicationlistFail,
  fetchMedicationListSuccess,
  updateMedicationFail,
  updateMedicationSuccess
} from './actions';
import {
  CREATE_MEDICATION_REQUEST,
  DELETE_MEDICATION_REQUEST,
  FETCH_MEDICATIONS_LIST_REQUEST,
  FETCH_MEDICATION_BRANDS,
  FETCH_MEDICATION_CLASSIFICATIONS_REQUEST,
  FETCH_MEDICATION_DOSAGE_FORM,
  UPDATE_MEDICATION_REQUEST,
  VALIDATE_MEDICATION
} from './actionTypes';

/*
  Worker Saga: Fired on FETCH_MEDICATIONS_LIST_REQUEST action
*/
export function* fetchMedicationList({
  skip,
  limit,
  search,
  payload: { tenantId, countryId },
  failureCb
}: IFetchMedicationListReq): SagaIterator {
  try {
    const {
      data: { entityList: list, totalCount: total }
    } = yield call(medicationService.getMedicationList, skip, limit, tenantId, countryId, search);
    const response = { list: list || [], total };
    yield put(fetchMedicationListSuccess(response));
  } catch (e: any) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(fetchMedicationlistFail(e));
    }
  }
}

/*
  Worker Saga: Fired on FETCH_MEDICATION_CLASSIFICATIONS_REQUEST action
*/
export function* fetchMedicationClassifications({ countryId }: IFetchClassificationsReq): SagaIterator {
  try {
    const { data } = yield call(medicationService.getMedicationClassifications as any, countryId);
    const payload = { classifications: data || [] };
    yield put(fetchClassificationsSuccess(payload));
  } catch {
    yield put(fetchClassificationsFailure());
  }
}

/*
  Worker Saga: Fired on FETCH_MEDICATION_BRANDS action
*/
export function* fetchMedicationBrands({ countryId, classificationId, successCb }: IFetchBrandReq): SagaIterator {
  try {
    const { data } = yield call(medicationService.getMedicationBrands as any, countryId, classificationId);
    const payload = { brands: data };
    successCb?.(data);
    yield put(fetchMedicationBrandsSuccess(payload));
  } catch {
   yield put(fetchMedicationBrandsFailure());
  }
}

/*
  Worker Saga: Fired on FETCH_MEDICATION_DOSAGE_FORM action
*/
export function* fetchMedicationDosageForms(): SagaIterator {
  try {
    const { data } = yield call(medicationService.getMedicationDosageForm as any);
    const payload = { dosageForms: data };
    yield put(fetchDosageFormsSuccess(payload));
  } catch {
   yield put(fetchDosageFormsFailure());
  }
}

/*
  Worker Saga: Fired on CREATE_MEDICATION_REQUEST action
*/
export function* createMedication({ data, successCb, failureCb }: ICreateMedicationRequest): SagaIterator {
  try {
    yield call(medicationService.createMedication as any, data);
    successCb?.();
    yield put(createMedicationSuccess());
  } catch (e) {
    if (e instanceof Error) {
     failureCb?.(e);
      yield put(createMedicationFailure(e));
    }
  }
}

/*
  Worker Saga: Fired on UPDATE_MEDICATION_REQUEST action
*/
export function* updateMedication({ data, successCb, failureCb }: IUpdateMedicationReq): SagaIterator {
  try {
    const validationData = JSON.parse(JSON.stringify(data));
    yield call(medicationService.validateMedication, validationData);
    yield call(medicationService.updateMedication, data);
    successCb?.();
    yield put(updateMedicationSuccess());
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(updateMedicationFail(e));
    }
  }
}

/*
  Worker Saga: Fired on DELETE_MEDICATION_REQUEST action
*/
export function* deleteMedication({ data, successCb, failureCb }: IDeleteMedicationRequest): SagaIterator {
  try {
    yield call(medicationService.deleteMedication, data);
    successCb?.();
    yield put(deleteMedicationSuccess());
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(deleteMedicationFail(e));
    }
  }
}

/*
  Worker Saga: Fired on VALIDATE_MEDICATION action
*/
export function* validateMedication({ data, successCb, failureCb }: IValidateMedication): SagaIterator {
  try {
    const response = yield call(medicationService.validateMedication, data);
    if (response?.status) {
      successCb?.();
    }
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
    }
  }
}

/*
  Starts worker saga on latest dispatched specific action.
  Allows concurrent increments.
*/
function* medicationSaga() {
  yield all([takeLatest(FETCH_MEDICATIONS_LIST_REQUEST, fetchMedicationList)]);
  yield all([takeLatest(FETCH_MEDICATION_CLASSIFICATIONS_REQUEST, fetchMedicationClassifications)]);
  yield all([takeLatest(FETCH_MEDICATION_BRANDS, fetchMedicationBrands)]);
  yield all([takeLatest(FETCH_MEDICATION_DOSAGE_FORM, fetchMedicationDosageForms)]);
  yield all([takeLatest(CREATE_MEDICATION_REQUEST, createMedication)]);
  yield all([takeLatest(UPDATE_MEDICATION_REQUEST, updateMedication)]);
  yield all([takeLatest(DELETE_MEDICATION_REQUEST, deleteMedication)]);
  yield all([takeLatest(VALIDATE_MEDICATION, validateMedication)]);
}

export default medicationSaga;
