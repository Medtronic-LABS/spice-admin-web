import { AppState } from '../rootReducer';

export const formMetaSelector = (state: AppState) => state.workflow.formMeta;
export const formJSONSelector = (state: AppState) => state.workflow.formJSON;
export const consentFormSelector = (state: AppState) => state.workflow.consentForm;
export const loadingSelector = (state: AppState) => state.workflow.loading;
