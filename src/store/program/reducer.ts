import * as PROGRAM_ACTION_TYPES from './actionTypes';

import { ProgramActions, IProgramState } from './types';

const initialState: IProgramState = {
  loading: false,
  total: 0,
  programList: [],
  program: {
    id: '',
    name: '',
    sites: [],
    country: { id: '' },
    tenantId: '',
    deletedSites: [],
    active: false
  },
  error: null
};

const programReducer = (state: IProgramState = initialState, action = {} as ProgramActions) => {
  switch (action.type) {
    case PROGRAM_ACTION_TYPES.FETCH_PROGRAM_LIST_REQUEST:
    case PROGRAM_ACTION_TYPES.CREATE_PROGRAM_REQUEST:
    case PROGRAM_ACTION_TYPES.FETCH_PROGRAM_DETAILS_REQUEST:
    case PROGRAM_ACTION_TYPES.UPDATE_PROGRAM_REQUEST:
    case PROGRAM_ACTION_TYPES.DELETE_PROGRAM_REQUEST:
      return {
        ...state,
        loading: true
      };
    case PROGRAM_ACTION_TYPES.FETCH_PROGRAM_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        total: action.payload.total || 0,
        programList: action.payload.programs || []
      };
    case PROGRAM_ACTION_TYPES.FETCH_PROGRAM_LIST_FAILURE:
    case PROGRAM_ACTION_TYPES.CREATE_PROGRAM_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case PROGRAM_ACTION_TYPES.CLEAR_PROGRAM_LIST:
      return {
        ...state,
        total: 0,
        programList: []
      };
    case PROGRAM_ACTION_TYPES.CREATE_PROGRAM_REQUEST_SUCCESS:
    case PROGRAM_ACTION_TYPES.UPDATE_PROGRAM_SUCCESS:
    case PROGRAM_ACTION_TYPES.FETCH_PROGRAM_DETAILS_FAILURE:
    case PROGRAM_ACTION_TYPES.UPDATE_PROGRAM_FAILURE:
    case PROGRAM_ACTION_TYPES.DELETE_PROGRAM_SUCCESS:
    case PROGRAM_ACTION_TYPES.DELETE_PROGRAM_FAILURE:
      return {
        ...state,
        loading: false
      };
    case PROGRAM_ACTION_TYPES.FETCH_PROGRAM_DETAILS_SUCCESS:
      return {
        ...state,
        program: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default programReducer;
