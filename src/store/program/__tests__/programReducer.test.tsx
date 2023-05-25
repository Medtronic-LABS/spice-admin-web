import programReducer from '../reducer';
import * as PROGRAM_ACTION_TYPES from '../actionTypes';

describe('Program Reducer', () => {
    const initialState = {
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
  it('should handle fetch program list request', () => {
    const action:any = { type: PROGRAM_ACTION_TYPES.FETCH_PROGRAM_LIST_REQUEST };
    const expectedState = {
      ...initialState,
      loading: true
    };
    const newState = programReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle create program request', () => {
    const action:any = { type: PROGRAM_ACTION_TYPES.CREATE_PROGRAM_REQUEST };
    const expectedState = {
      ...initialState,
      loading: true
    };
    const newState = programReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle fetch program details request', () => {
    const action:any = { type: PROGRAM_ACTION_TYPES.FETCH_PROGRAM_DETAILS_REQUEST };
    const expectedState = {
      ...initialState,
      loading: true
    };
    const newState = programReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle update program request', () => {
    const action:any = { type: PROGRAM_ACTION_TYPES.UPDATE_PROGRAM_REQUEST };
    const expectedState = {
      ...initialState,
      loading: true
    };
    const newState = programReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle delete program request', () => {
    const action:any = { type: PROGRAM_ACTION_TYPES.DELETE_PROGRAM_REQUEST };
    const expectedState = {
      ...initialState,
      loading: true
    };
    const newState = programReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle fetch program list success', () => {
    const action:any = {
      type: PROGRAM_ACTION_TYPES.FETCH_PROGRAM_LIST_SUCCESS,
      payload: {
        total: 2,
        programs: [{ id: '1', name: 'Program 1' }, { id: '2', name: 'Program 2' }]
      }
    };
    const expectedState = {
      ...initialState,
      loading: false,
      total: 2,
      programList: [{ id: '1', name: 'Program 1' }, { id: '2', name: 'Program 2' }]
    };
    const newState = programReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle fetch program list request', () => {
    const action:any = { type: PROGRAM_ACTION_TYPES.FETCH_PROGRAM_LIST_REQUEST };
    const expectedState = {
      ...initialState,
      loading: true
    };
    const newState = programReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle fetch program list success', () => {
    const action:any = {
      type: PROGRAM_ACTION_TYPES.FETCH_PROGRAM_LIST_SUCCESS,
      payload: {
        total: 2,
        programs: [{ id: '1', name: 'Program 1' }, { id: '2', name: 'Program 2' }]
      }
    };
    const expectedState = {
      ...initialState,
      loading: false,
      total: 2,
      programList: [{ id: '1', name: 'Program 1' }, { id: '2', name: 'Program 2' }]
    };
    const newState = programReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle fetch program list failure', () => {
    const action:any = {
      type: PROGRAM_ACTION_TYPES.FETCH_PROGRAM_LIST_FAILURE,
      error: 'Failed to fetch program list'
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: 'Failed to fetch program list'
    };
    const newState = programReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle create program request fail', () => {
    const action:any = {
      type: PROGRAM_ACTION_TYPES.CREATE_PROGRAM_REQUEST_FAIL,
      error: 'Failed to create program'
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: 'Failed to create program'
    };
    const newState = programReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle clear program list', () => {
    const action:any = { type: PROGRAM_ACTION_TYPES.CLEAR_PROGRAM_LIST };
    const expectedState = {
      ...initialState,
      total: 0,
      programList: []
    };
    const newState = programReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle create program request success', () => {
    const action:any = { type: PROGRAM_ACTION_TYPES.CREATE_PROGRAM_REQUEST_SUCCESS };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null
    };
    const newState = programReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle update program success', () => {
    const action:any = { type: PROGRAM_ACTION_TYPES.UPDATE_PROGRAM_SUCCESS };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null
    };
    const newState = programReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle fetch program details failure', () => {
    const action:any = {
      type: PROGRAM_ACTION_TYPES.FETCH_PROGRAM_DETAILS_FAILURE,
      error: 'Failed to fetch program details'
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null
    };
    const newState = programReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle update program failure', () => {
    const action:any = { type: PROGRAM_ACTION_TYPES.UPDATE_PROGRAM_FAILURE };
    const expectedState = {
      ...initialState,
      loading: false
    };
    const newState = programReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle delete program success', () => {
    const action:any = { type: PROGRAM_ACTION_TYPES.DELETE_PROGRAM_SUCCESS };
    const expectedState = {
      ...initialState,
      loading: false
    };
    const newState = programReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle delete program failure', () => {
    const action:any = { type: PROGRAM_ACTION_TYPES.DELETE_PROGRAM_FAILURE };
    const expectedState = {
      ...initialState,
      loading: false
    };
    const newState = programReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle fetch program details success', () => {
    const action:any = {
      type: PROGRAM_ACTION_TYPES.FETCH_PROGRAM_DETAILS_SUCCESS,
      payload: {
        id: '1',
        name: 'Program 1',
        sites: [],
        country: { id: '1', name: 'Country 1' },
        tenantId: '123',
        deletedSites: [],
        active: true
      }
    };
    const expectedState = {
      ...initialState,
      program: {
        id: '1',
        name: 'Program 1',
        sites: [],
        country: { id: '1', name: 'Country 1' },
        tenantId: '123',
        deletedSites: [],
        active: true
      },
      loading: false
    };
    const newState = programReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
});
