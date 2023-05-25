import * as WORKFLOW_TYPES from './actionTypes';

import { WorkflowActions, IWorkflowState } from './types';

const initialState: IWorkflowState = {
  formJSON: null,
  consentForm: null,
  formMeta: null,
  loading: false,
  loadingMeta: false
};

const workflowReducer = (state = initialState, action = {} as WorkflowActions): IWorkflowState => {
  switch (action.type) {
    case WORKFLOW_TYPES.FETCH_CONSENT_FORM_SUCCESS:
      return {
        ...state,
        loading: false,
        consentForm: action.payload
      };
    case WORKFLOW_TYPES.DEACTIVATE_CONSENT_FORM_SUCCESS:
      return {
        ...state,
        loading: false,
        consentForm: null
      };
    case WORKFLOW_TYPES.FETCH_CUSTOMIZATION_FORM_SUCCESS:
      return {
        ...state,
        loading: false,
        formJSON: action.payload
      };
    case WORKFLOW_TYPES.FETCH_CUSTOMIZATION_FORM_REQUEST:
    case WORKFLOW_TYPES.DEACTIVATE_CONSENT_FORM_REQUEST:
    case WORKFLOW_TYPES.FETCH_FORM_META_REQUEST:
    case WORKFLOW_TYPES.CUSTOMIZE_FORM_REQUEST:
      return {
        ...state,
        loading: true
      };
    case WORKFLOW_TYPES.FETCH_FORM_META_SUCCESS:
      return {
        ...state,
        loading: false,
        formMeta: action.payload
      };
    case WORKFLOW_TYPES.CUSTOMIZE_FORM_SUCCESS:
    case WORKFLOW_TYPES.CUSTOMIZE_FORM_FAILURE:
    case WORKFLOW_TYPES.DEACTIVATE_CONSENT_FORM_FAILURE:
    case WORKFLOW_TYPES.FETCH_FORM_META_FAILURE:
    case WORKFLOW_TYPES.FETCH_CUSTOMIZATION_FORM_FAILURE:
    case WORKFLOW_TYPES.FETCH_CONSENT_FORM_FAILURE:
      return {
        ...state,
        loading: false
      };
    case WORKFLOW_TYPES.CLEAR_FORM_META:
      return {
        ...state,
        formMeta: null
      };
    case WORKFLOW_TYPES.CLEAR_FORM_JSON:
      return {
        ...state,
        formJSON: null
      };
    case WORKFLOW_TYPES.CLEAR_CONSENT_FORM:
      return {
        ...state,
        consentForm: null
      };
    default:
      return {
        ...state
      };
  }
};

export default workflowReducer;
