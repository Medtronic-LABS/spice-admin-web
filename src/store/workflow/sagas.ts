import { SagaIterator } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as workflowService from '../../services/workflowAPI';
import {
  FormLogType,
  ICustomizeFormRequest,
  IFetchFormMetaRequest,
  IFetchCustomizationFormRequest,
  IDeactivateConsentRequest
} from './types';
import * as workflowActions from './actions';
import { FormTypes } from '../../containers/region/RegionCustomization';
import {
  CUSTOMIZE_FORM_REQUEST,
  FETCH_FORM_META_REQUEST,
  FETCH_CUSTOMIZATION_FORM_REQUEST,
  DEACTIVATE_CONSENT_FORM_REQUEST
} from './actionTypes';
import { camel2Title } from '../../utils/validation';

/*
  Worker Saga: Fired on FETCH_CUSTOMIZATION_FORM_REQUEST action
*/
export function* fetchCustomizationForm({
  tenantId,
  countryId,
  accountId,
  formType,
  category,
  cultureId,
  clinicalWorkflowId,
  successCb,
  failureCb
}: IFetchCustomizationFormRequest): SagaIterator {
  try {
    const {
      data: { entity: data }
    } = yield call(workflowService.fetchCustomizationForm, {
      tenantId,
      countryId,
      accountId,
      formType,
      category,
      cultureId,
      clinicalWorkflowId
    } as any);
    successCb?.(data);
    if (category === 'Input_form') {
      const newData = { ...data, form_input: JSON.parse(data?.formInput) };
      yield put(workflowActions.fetchCustomizationFormSuccess({ payload: newData }));
    } else if (category === 'Consent_form') {
      yield put(workflowActions.fetchConsentFormSuccess({ payload: data }));
    }
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(workflowActions.fetchCustomizationFormFailure(e));
    }
  }
}

/*
  Worker Saga: Fired on FETCH_FORM_META_REQUEST action
*/
export function* fetchFormMeta({ formType, successCb, failureCb }: IFetchFormMetaRequest): SagaIterator {
  let result = [];
  try {
    switch (formType) {
      case FormTypes.Screening:
        const {
          data: {
            entity: { components: screening }
          }
        } = yield call(workflowService.fetchFormMeta, 'screeninglog' as FormLogType);
        result = screening || [];
        break;
      case FormTypes.Enrollment:
        const {
          data: {
            entity: { components: enrollment }
          }
        } = yield call(workflowService.fetchFormMeta, 'patient' as FormLogType);
        result = enrollment || [];
        break;
      case FormTypes.Assessment:
        const {
          data: {
            entity: { components: bplog }
          }
        } = yield call(workflowService.fetchFormMeta, 'bplog' as FormLogType);
        const {
          data: {
            entity: { components: glucoselog }
          }
        } = yield call(workflowService.fetchFormMeta, `glucoselog` as FormLogType);
        result = (([...(bplog || []), ...(glucoselog || [])]).filter(
          (value, index, self) => index === self.findIndex((t) => t.key === value.key && t.type === value.type)
        ));        
        break;
      default:
        break;
    }
    result.forEach((obj: { key: string; type: string; label: string }) => {
      obj.label = camel2Title(obj.key);
    });
    successCb?.(result);
    yield put(
      workflowActions.fetchFormMetaSuccess({
        formType,
        payload: result
      })
    );
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(workflowActions.fetchFormMetaFailure());
    }
  }
}

/*
  Worker Saga: Fired on CUSTOMIZE_FORM_REQUEST action
*/
export function* customizeForm({
  formType,
  formId,
  category,
  payload,
  tenantId,
  countryId,
  accountId,
  cultureId,
  clinicalWorkflowId,
  workflowId,
  successCb,
  failureCb
}: ICustomizeFormRequest): SagaIterator {
  try {
    const newFormType = formType.charAt(0).toUpperCase() + formType.slice(1);
    yield call(workflowService.updateCustomizationForm as any, {
      formType: newFormType,
      formId,
      category,
      payload,
      tenantId,
      countryId,
      accountId,
      clinicalWorkflowId,
      workflowId,
      cultureId
    });
    successCb?.();
    yield put(workflowActions.customizeFormSuccess());
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(workflowActions.customizeFormFailure());
    }
  }
}

/*
  Worker Saga: Fired on DEACTIVATE_CONSENT_FORM_REQUEST action
*/
export function* deactivateConsentForm({
  formType,
  formId,
  category,
  tenantId,
  successCb,
  failureCb
}: IDeactivateConsentRequest): SagaIterator {
  try {
    const newFormType = formType.charAt(0).toUpperCase() + formType.slice(1);
    yield call(workflowService.deactivateConsentForm as any, {
      formType: newFormType,
      formId,
      category,
      tenantId
    });
    successCb?.();
    yield put(workflowActions.deactivateConsentSuccess());
  } catch (e) {
    if (e instanceof Error) {
      failureCb?.(e);
      yield put(workflowActions.deactivateConsentFailure());
    }
  }
}

/*
  Starts worker saga on latest dispatched specific action.
*/
function* workflowSaga() {
  yield all([takeLatest(FETCH_CUSTOMIZATION_FORM_REQUEST, fetchCustomizationForm)]);
  yield all([takeLatest(FETCH_FORM_META_REQUEST, fetchFormMeta)]);
  yield all([takeLatest(CUSTOMIZE_FORM_REQUEST, customizeForm)]);
  yield all([takeLatest(DEACTIVATE_CONSENT_FORM_REQUEST, deactivateConsentForm)]);
}

export default workflowSaga;
