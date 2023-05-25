import medicationReducer from '../reducer';
import * as actionTypes from '../actionTypes';

describe('medicationReducer', () => {
  const initialState = {
    loading: false,
    classificationsLoading: false,
    brandsLoading: false,
    dosageFormsLoading: false,
    error: null,
    total: 0,
    list: [],
    classifications: [],
    brands: [],
    dosageForms: []
  };
  it('should handle FETCH_MEDICATIONS_LIST_REQUEST', () => {
    const action:any = {
      type: actionTypes.FETCH_MEDICATIONS_LIST_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(medicationReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle CREATE_MEDICATION_REQUEST', () => {
    const action:any = {
      type: actionTypes.CREATE_MEDICATION_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(medicationReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle UPDATE_MEDICATION_REQUEST', () => {
    const action:any = {
      type: actionTypes.UPDATE_MEDICATION_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(medicationReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle DELETE_MEDICATION_REQUEST', () => {
    const action:any = {
      type: actionTypes.DELETE_MEDICATION_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(medicationReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_MEDICATIONS_LIST_SUCCESS', () => {
    const action:any = {
      type: actionTypes.FETCH_MEDICATIONS_LIST_SUCCESS,
      payload: {
        list: [],
        total: 10
      }
    };
    const expectedState = {
      ...initialState,
      list: action.payload.list,
      total: action.payload.total,
      loading: false
    };
    expect(medicationReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_MEDICATIONS_LIST_FAILURE', () => {
    const action:any = {
      type: actionTypes.FETCH_MEDICATIONS_LIST_FAILURE,
      error: 'Failed to fetch medication list'
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: action.error
    };
    expect(medicationReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CREATE_MEDICATION_FAILURE', () => {
    const action:any = {
      type: actionTypes.CREATE_MEDICATION_FAILURE,
      error: 'Failed to create medication'
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: action.error
    };
    expect(medicationReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle UPDATE_MEDICATION_FAILURE', () => {
    const action:any = {
      type: actionTypes.UPDATE_MEDICATION_FAILURE,
      error: 'Failed to update medication'
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: action.error
    };
    expect(medicationReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle DELETE_MEDICATION_FAILURE', () => {
    const action:any = {
      type: actionTypes.DELETE_MEDICATION_FAILURE,
      error: 'Failed to delete medication'
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: action.error
    };
    expect(medicationReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_MEDICATION_CLASSIFICATIONS_FAILURE', () => {
    const action:any = {
      type: actionTypes.FETCH_MEDICATION_CLASSIFICATIONS_FAILURE
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null
    };
    expect(medicationReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_MEDICATION_BRANDS_FAILURE', () => {
    const action:any = {
      type: actionTypes.FETCH_MEDICATION_BRANDS_FAILURE
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null
    };
    expect(medicationReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_MEDICATION_DOSAGE_FORM_FAILURE', () => {
    const action:any = {
      type: actionTypes.FETCH_MEDICATION_DOSAGE_FORM_FAILURE
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null
    };
    expect(medicationReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CREATE_MEDICATION_SUCCESS', () => {
    const action:any = {
      type: actionTypes.CREATE_MEDICATION_SUCCESS
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null
    };
    expect(medicationReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle UPDATE_MEDICATION_SUCCESS', () => {
    const action:any = {
      type: actionTypes.UPDATE_MEDICATION_SUCCESS
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null
    };
    expect(medicationReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle DELETE_MEDICATION_SUCCESS', () => {
    const action:any = {
      type: actionTypes.DELETE_MEDICATION_SUCCESS
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null
    };
    expect(medicationReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle VALIDATE_MEDICATION', () => {
    const action:any = {
      type: actionTypes.VALIDATE_MEDICATION
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null
    };
    expect(medicationReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_MEDICATION_CLASSIFICATIONS_REQUEST', () => {
    const action:any = {
      type: actionTypes.FETCH_MEDICATION_CLASSIFICATIONS_REQUEST
    };
    const expectedState = {
      ...initialState,
      classificationsLoading: true
    };
    expect(medicationReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_MEDICATION_BRANDS', () => {
    const action:any = {
      type: actionTypes.FETCH_MEDICATION_BRANDS
    };
    const expectedState = {
      ...initialState,
      brands: [],
      brandsLoading: true
    };
    expect(medicationReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_MEDICATION_DOSAGE_FORM', () => {
    const action:any = {
      type: actionTypes.FETCH_MEDICATION_DOSAGE_FORM
    };
    const expectedState = {
      ...initialState,
      dosageFormsLoading: true
    };
    expect(medicationReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_MEDICATION_CLASSIFICATIONS_SUCCESS', () => {
    const action:any = {
      type: actionTypes.FETCH_MEDICATION_CLASSIFICATIONS_SUCCESS,
      payload: {
        classifications: ['Class A', 'Class B']
      }
    };
    const expectedState = {
      ...initialState,
      classifications: action.payload.classifications,
      classificationsLoading: false
    };
    expect(medicationReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_MEDICATION_BRANDS_SUCCESS', () => {
    const action:any = {
      type: actionTypes.FETCH_MEDICATION_BRANDS_SUCCESS,
      payload: {
        brands: ['Brand A', 'Brand B']
      }
    };
    const expectedState = {
      ...initialState,
      brands: action.payload.brands,
      brandsLoading: false
    };
    expect(medicationReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle REMOVE_MEDICATION_BRANDS', () => {
    const action:any = {
      type: actionTypes.REMOVE_MEDICATION_BRANDS
    };
    const expectedState = {
      ...initialState,
      brands: []
    };
    expect(medicationReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_MEDICATION_DOSAGE_FORM_SUCCESS', () => {
    const action:any = {
      type: actionTypes.FETCH_MEDICATION_DOSAGE_FORM_SUCCESS,
      payload: {
        dosageForms: ['Tablet', 'Capsule']
      }
    };
    const expectedState = {
      ...initialState,
      dosageForms: action.payload.dosageForms,
      dosageFormsLoading: false
    };
    expect(medicationReducer(initialState, action)).toEqual(expectedState);
  });
});
