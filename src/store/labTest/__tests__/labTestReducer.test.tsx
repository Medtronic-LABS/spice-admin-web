import labtestReducer from '../reducer';
import * as actionTypes from '../actionTypes';

describe('labtestReducer', () => {
  const initialState = {
    lab_tests: [
      {
        id: '',
        name: '',
        active: true,
        tenantId: '',
        countryId: ''
      }
    ],
    total: 0,
    loading: false,
    error: null,
    units: [],
    unitType: '',
    unitsLoading: true,
    labResultRanges: []
  };

  it('should handle FETCH_LABTEST_SUCCESS', () => {
    const action:any = {
      type: actionTypes.FETCH_LABTEST_SUCCESS,
      payload: {
        labtests: [
          {
            id: '1',
            name: 'Lab Test 1',
            active: true,
            tenantId: '123',
            countryId: '456'
          },
          {
            id: '2',
            name: 'Lab Test 2',
            active: true,
            tenantId: '123',
            countryId: '456'
          }
        ],
        total: 2
      }
    };
    const expectedState = {
      ...initialState,
      lab_tests: action.payload.labtests,
      total: action.payload.total,
      loading: false
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_LABTEST_FAILURE', () => {
    const error = 'Error fetching lab tests';
    const action :any= {
      type: actionTypes.FETCH_LABTEST_FAILURE,
      error: error
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: error
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_UNIT_LIST_SUCCESS', () => {
    const action:any = {
      type: actionTypes.FETCH_UNIT_LIST_SUCCESS,
      payload: ['unit1', 'unit2'],
      unitType: 'type1'
    };
    const expectedState = {
      ...initialState,
      units: action.payload,
      unitType: action.unitType,
      unitsLoading: false
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle CREATE_LABTEST_REQUEST', () => {
    const action:any = {
      type: actionTypes.CREATE_LABTEST_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_LABTEST_REQUEST', () => {
    const action:any = {
      type: actionTypes.FETCH_LABTEST_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle UPDATE_LABTEST_REQUEST', () => {
    const action:any = {
      type: actionTypes.UPDATE_LABTEST_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle DELETE_LABTEST_REQUEST', () => {
    const action:any = {
      type: actionTypes.DELETE_LABTEST_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_LABTEST_BY_ID_REQUEST', () => {
    const action:any = {
      type: actionTypes.FETCH_LABTEST_BY_ID_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_LABTEST_RESULT_RANGE_LIST_REQUEST', () => {
    const action:any = {
      type: actionTypes.FETCH_LABTEST_RESULT_RANGE_LIST_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle CREATE_LABTEST_SUCCESS', () => {
    const action:any = {
      type: actionTypes.CREATE_LABTEST_SUCCESS
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_LABTEST_SUCCESS', () => {
    const action:any = {
      type: actionTypes.UPDATE_LABTEST_SUCCESS
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle DELETE_LABTEST_SUCCESS', () => {
    const action:any = {
      type: actionTypes.DELETE_LABTEST_SUCCESS
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_LABTEST_BY_ID_SUCCESS', () => {
    const action:any = {
      type: actionTypes.FETCH_LABTEST_BY_ID_SUCCESS
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_LABTEST_BY_ID_FAILURE', () => {
    const action:any = {
      type: actionTypes.FETCH_LABTEST_BY_ID_FAILURE
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_LABTEST_SUCCESS', () => {
    const labtests = [{ id: '1', name: 'Lab Test 1' }];
    const total = 1;
    const action:any = {
      type: actionTypes.FETCH_LABTEST_SUCCESS,
      payload: { labtests, total }
    };
    const expectedState = {
      ...initialState,
      lab_tests: labtests,
      total: total,
      loading: false,
      error: null
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_LABTEST_FAILURE', () => {
    const error = 'Failed to fetch lab tests.';
    const action:any = {
      type: actionTypes.FETCH_LABTEST_FAILURE,
      error: error
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: error
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle UPDATE_LABTEST_FAILURE', () => {
    const error = 'Failed to update lab test.';
    const action:any = {
      type: actionTypes.UPDATE_LABTEST_FAILURE,
      error: error
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: error
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle DELETE_LABTEST_FAILURE', () => {
    const error = 'Failed to delete lab test.';
    const action:any = {
      type: actionTypes.DELETE_LABTEST_FAILURE,
      error: error
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: error
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_LABTEST_RESULT_RANGE_LIST_FAILURE', () => {
    const error = 'Failed to fetch lab test result ranges.';
    const action:any = {
      type: actionTypes.FETCH_LABTEST_RESULT_RANGE_LIST_FAILURE,
      error: error
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: error
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SAVE_LABTEST_RESULT_RANGES_FAILURE', () => {
    const error = 'Failed to save lab test result ranges.';
    const action:any = {
      type: actionTypes.SAVE_LABTEST_RESULT_RANGES_FAILURE,
      error: error
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: error
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle CREATE_LABTEST_FAILURE', () => {
    const error = 'Failed to create lab test.';
    const action:any = {
      type: actionTypes.CREATE_LABTEST_FAILURE,
      error: error
    };
    const expectedState = {
      ...initialState,
      loading: false
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SAVE_LABTEST_RESULT_RANGES_SUCCESS', () => {
    const action:any = {
      type: actionTypes.SAVE_LABTEST_RESULT_RANGES_SUCCESS
    };
    const expectedState = {
      ...initialState,
      loading: false
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle CLEAR_UNIT_LIST_REQUEST', () => {
    const action:any = {
      type: actionTypes.CLEAR_UNIT_LIST_REQUEST
    };
    const expectedState = {
      ...initialState,
      units: []
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_UNIT_LIST_REQUEST', () => {
    const action:any = {
      type: actionTypes.FETCH_UNIT_LIST_REQUEST
    };
    const expectedState = {
      ...initialState,
      unitsLoading: true
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_UNIT_LIST_SUCCESS', () => {
    const units = ['unit1', 'unit2'];
    const unitType = 'type';
    const action:any = {
      type: actionTypes.FETCH_UNIT_LIST_SUCCESS,
      payload: units,
      unitType: unitType
    };
    const expectedState = {
      ...initialState,
      units: units,
      unitType: unitType,
      unitsLoading: false
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_UNIT_LIST_FAILURE', () => {
    const error = 'Failed to fetch unit list.';
    const action:any = {
      type: actionTypes.FETCH_UNIT_LIST_FAILURE,
      error: error
    };
    const expectedState = {
      ...initialState,
      unitsLoading: false,
      error: error
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SAVE_LABTEST_RESULT_RANGES_REQUEST', () => {
    const action:any = {
      type: actionTypes.SAVE_LABTEST_RESULT_RANGES_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true,
      labResultRanges: []
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_LABTEST_RESULT_RANGE_LIST_SUCCESS', () => {
    const labResultRanges = ['range1', 'range2'];
    const action:any = {
      type: actionTypes.FETCH_LABTEST_RESULT_RANGE_LIST_SUCCESS,
      payload: labResultRanges
    };
    const expectedState = {
      ...initialState,
      labResultRanges: labResultRanges,
      loading: false
    };
    expect(labtestReducer(initialState, action)).toEqual(expectedState);
  });

});
