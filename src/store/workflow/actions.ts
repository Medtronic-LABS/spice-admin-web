import * as WORKFLOW_TYPES from './actionTypes';
import {
  IFetchFormMetaRequest,
  IFetchFormMetaSuccess,
  IFetchFormMetaFailure,
  ICustomizeFormRequest,
  ICustomizeFormSuccess,
  ICustomizeFormFailure,
  IClearFormMeta,
  FormType,
  IFetchCustomizationFormRequest,
  IFetchCustomizationFormSuccess,
  IFetchCustomizationFormFailure,
  IClearFormJSON,
  IFetchConsentFormSuccess,
  IFetchConsentFormFailure,
  IDeactivateConsentRequest,
  IDeactivateConsentSuccess,
  IDeactivateConsentFailure
} from './types';

export const fetchCustomizationFormRequest = ({
  tenantId,
  countryId,
  accountId,
  formType,
  category,
  cultureId,
  clinicalWorkflowId,
  successCb,
  failureCb
}: Omit<IFetchCustomizationFormRequest, 'type'>): IFetchCustomizationFormRequest => ({
  type: WORKFLOW_TYPES.FETCH_CUSTOMIZATION_FORM_REQUEST,
  tenantId,
  countryId,
  accountId,
  formType,
  category,
  cultureId,
  clinicalWorkflowId,
  successCb,
  failureCb
});

export const fetchCustomizationFormSuccess = ({
  payload
}: Omit<IFetchCustomizationFormSuccess, 'type'>): IFetchCustomizationFormSuccess => ({
  type: WORKFLOW_TYPES.FETCH_CUSTOMIZATION_FORM_SUCCESS,
  payload
});

export const fetchCustomizationFormFailure = (error: any): IFetchCustomizationFormFailure => ({
  type: WORKFLOW_TYPES.FETCH_CUSTOMIZATION_FORM_FAILURE,
  error
});

export const fetchConsentFormSuccess = ({
  payload
}: Omit<IFetchConsentFormSuccess, 'type'>): IFetchConsentFormSuccess => ({
  type: WORKFLOW_TYPES.FETCH_CONSENT_FORM_SUCCESS,
  payload
});

export const fetchConsentFormFailure = (error: any): IFetchConsentFormFailure => ({
  type: WORKFLOW_TYPES.FETCH_CONSENT_FORM_FAILURE,
  error
});

export const fetchFormMetaRequest = ({
  formType,
  successCb,
  failureCb
}: Omit<IFetchFormMetaRequest, 'type'>): IFetchFormMetaRequest => ({
  type: WORKFLOW_TYPES.FETCH_FORM_META_REQUEST,
  formType,
  successCb,
  failureCb
});

export const fetchFormMetaSuccess = ({
  formType,
  payload
}: Omit<IFetchFormMetaSuccess, 'type'>): IFetchFormMetaSuccess => ({
  type: WORKFLOW_TYPES.FETCH_FORM_META_SUCCESS,
  payload,
  formType
});

export const fetchFormMetaFailure = (): IFetchFormMetaFailure => ({
  type: WORKFLOW_TYPES.FETCH_FORM_META_FAILURE
});

export const clearFormMeta = (formType: FormType): IClearFormMeta => ({
  type: WORKFLOW_TYPES.CLEAR_FORM_META,
  formType
});

export const clearFormJSON = (): IClearFormJSON => ({
  type: WORKFLOW_TYPES.CLEAR_FORM_JSON
});

export const customizeFormRequest = ({
  formType,
  formId,
  category,
  payload,
  tenantId,
  countryId,
  accountId,
  workflowId,
  cultureId,
  clinicalWorkflowId,
  successCb,
  failureCb
}: Omit<ICustomizeFormRequest, 'type'>): ICustomizeFormRequest => ({
  type: WORKFLOW_TYPES.CUSTOMIZE_FORM_REQUEST,
  payload,
  tenantId,
  countryId,
  formType,
  formId,
  category,
  accountId,
  workflowId,
  cultureId,
  clinicalWorkflowId,
  successCb,
  failureCb
});

export const customizeFormSuccess = (): ICustomizeFormSuccess => ({
  type: WORKFLOW_TYPES.CUSTOMIZE_FORM_SUCCESS
});

export const customizeFormFailure = (): ICustomizeFormFailure => ({
  type: WORKFLOW_TYPES.CUSTOMIZE_FORM_FAILURE
});

export const deactivateConsentRequest = ({
  formType,
  formId,
  category,
  tenantId,
  successCb,
  failureCb
}: Omit<IDeactivateConsentRequest, 'type'>): IDeactivateConsentRequest => ({
  type: WORKFLOW_TYPES.DEACTIVATE_CONSENT_FORM_REQUEST,
  tenantId,
  formType,
  formId,
  category,
  successCb,
  failureCb
});

export const deactivateConsentSuccess = (): IDeactivateConsentSuccess => ({
  type: WORKFLOW_TYPES.DEACTIVATE_CONSENT_FORM_SUCCESS
});

export const deactivateConsentFailure = (): IDeactivateConsentFailure => ({
  type: WORKFLOW_TYPES.DEACTIVATE_CONSENT_FORM_FAILURE
});

export const clearConsentForm = () => ({
  type: WORKFLOW_TYPES.CLEAR_CONSENT_FORM
});
