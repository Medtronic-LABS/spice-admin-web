import * as ACTION_TYPES from './actionTypes';

export type FormLogType = 'screeninglog' | 'bplog' | 'glucoselog' | 'patient';
export type FormType = 'screening' | 'enrollment' | 'assessment' | 'Module';

export interface IWorkflowState {
  formJSON: null | any;
  consentForm: null | any;
  formMeta: null | any;
  loading: boolean;
  loadingMeta: boolean;
}

export interface IFetchCustomizationFormRequest {
  type: typeof ACTION_TYPES.FETCH_CUSTOMIZATION_FORM_REQUEST;
  tenantId: string;
  formType: string;
  category: string;
  cultureId?: number;
  countryId: string;
  accountId?: string;
  clinicalWorkflowId?: string;
  successCb?: (payload: any) => void;
  failureCb?: (error: Error) => void;
}

export interface IFetchCustomizationFormSuccess {
  type: typeof ACTION_TYPES.FETCH_CUSTOMIZATION_FORM_SUCCESS;
  payload: any;
}

export interface IFetchCustomizationFormFailure {
  type: typeof ACTION_TYPES.FETCH_CUSTOMIZATION_FORM_FAILURE;
  error: any;
}

export interface IFetchConsentFormSuccess {
  type: typeof ACTION_TYPES.FETCH_CONSENT_FORM_SUCCESS;
  payload: any;
}

export interface IFetchConsentFormFailure {
  type: typeof ACTION_TYPES.FETCH_CONSENT_FORM_FAILURE;
  error: any;
}

export interface IFetchFormMetaRequest {
  type: typeof ACTION_TYPES.FETCH_FORM_META_REQUEST;
  formType: FormType;
  successCb?: (payload: any) => void;
  failureCb?: (error: Error) => void;
}

export interface IFetchFormMetaSuccess {
  type: typeof ACTION_TYPES.FETCH_FORM_META_SUCCESS;
  payload: any;
  formType: FormType;
}
export interface IFetchFormMetaFailure {
  type: typeof ACTION_TYPES.FETCH_FORM_META_FAILURE;
}

export interface ICustomizeFormRequest {
  type: typeof ACTION_TYPES.CUSTOMIZE_FORM_REQUEST;
  formType: FormType;
  formId: string;
  category: string;
  tenantId: string;
  countryId: string;
  cultureId?: number;
  payload: any;
  accountId?: string;
  clinicalWorkflowId?: string;
  workflowId?: string;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface ICustomizeFormSuccess {
  type: typeof ACTION_TYPES.CUSTOMIZE_FORM_SUCCESS;
}
export interface ICustomizeFormFailure {
  type: typeof ACTION_TYPES.CUSTOMIZE_FORM_FAILURE;
}
export interface IDeactivateConsentRequest {
  type: typeof ACTION_TYPES.DEACTIVATE_CONSENT_FORM_REQUEST;
  formType: FormType;
  formId: string;
  category: string;
  tenantId: string;
  successCb?: () => void;
  failureCb?: (error: Error) => void;
}

export interface IDeactivateConsentSuccess {
  type: typeof ACTION_TYPES.DEACTIVATE_CONSENT_FORM_SUCCESS;
}
export interface IDeactivateConsentFailure {
  type: typeof ACTION_TYPES.DEACTIVATE_CONSENT_FORM_FAILURE;
}

export interface IClearFormMeta {
  type: typeof ACTION_TYPES.CLEAR_FORM_META;
  formType: FormType;
}

export interface IClearFormJSON {
  type: typeof ACTION_TYPES.CLEAR_FORM_JSON;
}

export interface IClearConsentForm {
  type: typeof ACTION_TYPES.CLEAR_CONSENT_FORM;
}

export type WorkflowActions =
  | IFetchCustomizationFormRequest
  | IFetchCustomizationFormSuccess
  | IFetchCustomizationFormFailure
  | IFetchConsentFormSuccess
  | IFetchConsentFormFailure
  | ICustomizeFormRequest
  | ICustomizeFormSuccess
  | ICustomizeFormFailure
  | IFetchFormMetaRequest
  | IFetchFormMetaSuccess
  | IFetchFormMetaFailure
  | IClearFormMeta
  | IClearFormJSON
  | IClearConsentForm
  | IDeactivateConsentRequest
  | IDeactivateConsentSuccess
  | IDeactivateConsentFailure;
