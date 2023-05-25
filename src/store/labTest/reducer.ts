import * as ACTION_TYPES from './actionTypes';

import { LabtestActions, ILabtestState } from './types';

const initialState: ILabtestState = {
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

const labtestReducer = (state = initialState, action = {} as LabtestActions): ILabtestState => {
  switch (action.type) {
    case ACTION_TYPES.CREATE_LABTEST_REQUEST:
    case ACTION_TYPES.FETCH_LABTEST_REQUEST:
    case ACTION_TYPES.UPDATE_LABTEST_REQUEST:
    case ACTION_TYPES.DELETE_LABTEST_REQUEST:
    case ACTION_TYPES.FETCH_LABTEST_BY_ID_REQUEST:
    case ACTION_TYPES.FETCH_LABTEST_RESULT_RANGE_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ACTION_TYPES.CREATE_LABTEST_SUCCESS:
    case ACTION_TYPES.UPDATE_LABTEST_SUCCESS:
    case ACTION_TYPES.DELETE_LABTEST_SUCCESS:
    case ACTION_TYPES.FETCH_LABTEST_BY_ID_SUCCESS:
    case ACTION_TYPES.FETCH_LABTEST_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: null
      };
    case ACTION_TYPES.FETCH_LABTEST_SUCCESS:
      return {
        ...state,
        lab_tests: action.payload.labtests,
        total: action.payload.total,
        loading: false
      };
    case ACTION_TYPES.FETCH_LABTEST_FAILURE:
    case ACTION_TYPES.UPDATE_LABTEST_FAILURE:
    case ACTION_TYPES.DELETE_LABTEST_FAILURE:
    case ACTION_TYPES.FETCH_LABTEST_RESULT_RANGE_LIST_FAILURE:
    case ACTION_TYPES.SAVE_LABTEST_RESULT_RANGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case ACTION_TYPES.CREATE_LABTEST_FAILURE:
    case ACTION_TYPES.SAVE_LABTEST_RESULT_RANGES_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case ACTION_TYPES.CLEAR_UNIT_LIST_REQUEST:
      return {
      ...state,
      units: []
    };
    case ACTION_TYPES.FETCH_UNIT_LIST_REQUEST:
      return {
        ...state,
        unitsLoading: true
      };
    case ACTION_TYPES.FETCH_UNIT_LIST_SUCCESS:
      return {
        ...state,
        units: action.payload,
        unitType: action.unitType,
        unitsLoading: false
      };
    case ACTION_TYPES.FETCH_UNIT_LIST_FAILURE:
      return {
        ...state,
        unitsLoading: false,
        error: action.error
      };
    case ACTION_TYPES.SAVE_LABTEST_RESULT_RANGES_REQUEST:
      return {
        ...state,
        loading: true,
        labResultRanges: []
      };
    case ACTION_TYPES.FETCH_LABTEST_RESULT_RANGE_LIST_SUCCESS:
      return {
        ...state,
        labResultRanges: action.payload,
        loading: false
      };
    default:
      return {
        ...state
      };
  }
};

export default labtestReducer;
