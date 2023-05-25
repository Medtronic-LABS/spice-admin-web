import { FormType } from './types';

const FETCH_FORM_DATA_INITIAL_PAYLOAD = {
  tenantId: '1',
  formType: 'screening',
  countryId: '1'
};

const INPUT_FORM_PAYLOAD = {
  tenantId: '156',
  type: 'Screening',
  category: 'Input_form',
  countryId: '4'
};

const WORKFLOW_MOCK_DATA = {
  FETCH_INPUT_FORM_REGION_REQ_PAYLOAD: {
    ...FETCH_FORM_DATA_INITIAL_PAYLOAD,
    category: 'Input_form'
  },
  FETCH_INPUT_FORM_ACCOUNT_REQ_PAYLOAD: {
    ...FETCH_FORM_DATA_INITIAL_PAYLOAD,
    category: 'Input_form',
    clinicalWorkflowId: '11'
  },
  FETCH_CONSENT_FORM_REGION_REQ_PAYLOAD: {
    ...FETCH_FORM_DATA_INITIAL_PAYLOAD,
    category: 'Consent_form'
  },
  FETCH_CONSENT_FORM_ACCOUNT_REQ_PAYLOAD: {
    ...FETCH_FORM_DATA_INITIAL_PAYLOAD,
    category: 'Consent_form',
    accountId: '12'
  },
  FETCH_INPUT_FORM_REGION_RES_PAYLOAD: {
    ...INPUT_FORM_PAYLOAD,
    id: 60,
    formInput: '{}',
    default: false,
    active: true,
    deleted: false
  },
  UPDATE_INPUT_FORM_REQ_PAYLOAD: {
    tenantId: '156',
    category: 'Input_form',
    countryId: '4',
    formType: 'Screening' as FormType,
    formId: '2',
    payload: '',
    accountId: undefined,
    clinicalWorkflowId: undefined,
    workflowId: undefined
  },
  FETCH_FORM_META_RESPONSE: {
    id: 1,
    formName: 'screeninglog',
    components: [
      {
        key: 'site',
        type: 'ID'
      }
    ]
  }
};

export default WORKFLOW_MOCK_DATA;
