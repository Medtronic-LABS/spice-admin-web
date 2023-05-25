import workflowReducer from '../reducer';
import * as actionTypes from '../actionTypes';

describe('workflowReducer', () => {
  const initialState = {
    formJSON: null,
    consentForm: null,
    formMeta: null,
    loading: false,
    loadingMeta: false
  };

  it('should handle FETCH_CONSENT_FORM_SUCCESS', () => {
    const action:any = {
      type: actionTypes.FETCH_CONSENT_FORM_SUCCESS,
      payload: {  formJSON: null,
        consentForm: null,
        formMeta: null,
        loading: false,
        loadingMeta: false}
    };
    const expectedState = {
      ...initialState,
      loading: false,
      consentForm: action.payload
    };
    expect(workflowReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle DEACTIVATE_CONSENT_FORM_SUCCESS', () => {
    const action:any = {
      type: actionTypes.DEACTIVATE_CONSENT_FORM_SUCCESS
    };
    const expectedState = {
      ...initialState,
      loading: false,
      consentForm: null
    };
    expect(workflowReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_CUSTOMIZATION_FORM_SUCCESS', () => {
    const action:any = {
      type: actionTypes.FETCH_CUSTOMIZATION_FORM_SUCCESS,
      payload: {  formJSON: null,
        consentForm: null,
        formMeta: null,
        loading: false,
        loadingMeta: false}
    };
    const expectedState = {
      ...initialState,
      loading: false,
      formJSON: action.payload
    };
    expect(workflowReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_CUSTOMIZATION_FORM_REQUEST', () => {
    const action:any = {
      type: actionTypes.FETCH_CUSTOMIZATION_FORM_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(workflowReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle DEACTIVATE_CONSENT_FORM_REQUEST', () => {
    const action:any = {
      type: actionTypes.DEACTIVATE_CONSENT_FORM_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(workflowReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_FORM_META_REQUEST', () => {
    const action:any = {
      type: actionTypes.FETCH_FORM_META_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(workflowReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle CUSTOMIZE_FORM_REQUEST', () => {
    const action:any = {
      type: actionTypes.CUSTOMIZE_FORM_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(workflowReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_FORM_META_SUCCESS', () => {
    const action:any = {
      type: actionTypes.FETCH_FORM_META_SUCCESS,
      payload: {  formJSON: null,
        consentForm: null,
        formMeta: null,
        loading: false,
        loadingMeta: false}
    };
    const expectedState = {
      ...initialState,
      loading: false,
      formMeta: action.payload
    };
    expect(workflowReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle CUSTOMIZE_FORM_SUCCESS', () => {
    const action:any = {
      type: actionTypes.CUSTOMIZE_FORM_SUCCESS
    };
    const expectedState = {
      ...initialState,
      loading: false
    };
    expect(workflowReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle CUSTOMIZE_FORM_FAILURE', () => {
    const action:any = {
      type: actionTypes.CUSTOMIZE_FORM_FAILURE
    };
    const expectedState = {
      ...initialState,
      loading: false
    };
    expect(workflowReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle DEACTIVATE_CONSENT_FORM_FAILURE', () => {
    const action:any = {
      type: actionTypes.DEACTIVATE_CONSENT_FORM_FAILURE
    };
    const expectedState = {
      ...initialState,
      loading: false
    };
    expect(workflowReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_FORM_META_FAILURE', () => {
    const action:any = {
      type: actionTypes.FETCH_FORM_META_FAILURE
    };
    const expectedState = {
      ...initialState,
      loading: false
    };
    expect(workflowReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_CUSTOMIZATION_FORM_FAILURE', () => {
    const action:any = {
      type: actionTypes.FETCH_CUSTOMIZATION_FORM_FAILURE
    };
    const expectedState = {
      ...initialState,
      loading: false
    };
    expect(workflowReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_CONSENT_FORM_FAILURE', () => {
    const action:any = {
      type: actionTypes.FETCH_CONSENT_FORM_FAILURE
    };
    const expectedState = {
      ...initialState,
      loading: false
    };
    expect(workflowReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle CLEAR_FORM_META', () => {
    const action:any = {
      type: actionTypes.CLEAR_FORM_META
    };
    const expectedState = {
      ...initialState,
      formMeta: null
    };
    expect(workflowReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle CLEAR_FORM_JSON', () => {
    const action:any = {
      type: actionTypes.CLEAR_FORM_JSON
    };
    const expectedState = {
      ...initialState,
      formJSON: null
    };
    expect(workflowReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle CLEAR_CONSENT_FORM', () => {
    const action:any = {
      type: actionTypes.CLEAR_CONSENT_FORM
    };
    const expectedState = {
      ...initialState,
      consentForm: null
    };
    expect(workflowReducer(initialState, action)).toEqual(expectedState);
  });
});
