import regionReducer from '../reducer';
import * as REGION_TYPES from '../actionTypes';

describe('Region Reducer', () => {
    let initialState:any = {
      regions: [],
      total: 0,
      loading: false,
      loadingMore: false,
      error: null,
      detail: {
        id: '',
        name: '',
        countryCode: '',
        unitMeasurement: '',
        users: [],
        tenantId: '',
      },
    };

    let expectedState:any = {
        regions: [],
        total: 0,
        loading: false,
        loadingMore: false,
        error: null,
        detail: {
          id: '',
          name: '',
          countryCode: '',
          unitMeasurement: '',
          users: [],
          tenantId: '',
        },
      };
  it('should handle fetch regions request', () => {
    const action:any = { type: REGION_TYPES.FETCH_REGIONS_REQUEST, isLoadMore: false };
     expectedState = {
      ...initialState,
      loading: true,
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle fetch regions success', () => {
    const payload = {
      isLoadMore: false,
      regions: ['region1', 'region2'],
      total: 2,
    };
    const action:any = { type: REGION_TYPES.FETCH_REGIONS_SUCCESS, payload };
     expectedState = {
      ...initialState,
      loading: false,
      loadingMore: false,
      regions: payload.isLoadMore ? [...initialState.regions, ...payload.regions] : payload.regions,
      total: payload.total ? payload.total : initialState.total,
      error: null,
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle fetch regions failure', () => {
    const error = 'Failed to fetch regions';
    const action:any = { type: REGION_TYPES.FETCH_REGIONS_FAILURE, error };
     expectedState = {
      ...initialState,
      loading: false,
      loadingMore: false,
      error,
      detail: {
        id: '',
        name: '',
        countryCode: '',
        unitMeasurement: '',
        users: [],
        tenantId: '',
      },
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle default case', () => {
    const action:any = { type: 'UNKNOWN_ACTION_TYPE' };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
  it('should handle fetch regions failure', () => {
    const error = 'Failed to fetch regions';
    const action:any = { type: REGION_TYPES.FETCH_REGION_DETAIL_FAILURE, error };
     expectedState = {
      ...initialState,
      loading: false,
      loadingMore: false,
      error,
      detail: {
        id: '',
        name: '',
        countryCode: '',
        unitMeasurement: '',
        users: [],
        tenantId: '',
      },
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle default case', () => {
    const action:any = { type: 'UNKNOWN_ACTION_TYPE' };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
  it('should handle clear region detail', () => {
    const action:any = { type: REGION_TYPES.CLEAR_REGION_DETAIL };
    const expectedState = {
      ...initialState,
      detail: {
        id: '',
        name: '',
        countryCode: '',
        unitMeasurement: '',
        users: [],
        tenantId: '',
      },
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle fetch region detail success', () => {
    const payload = {
      id: 'region1',
      name: 'Region 1',
      countryCode: 'US',
      unitMeasurement: 'Metric',
      users: ['user1', 'user2'],
      tenantId: 'tenant1',
    };
    const action:any = { type: REGION_TYPES.FETCH_REGION_DETAIL_SUCCESS, payload };
    const expectedState = {
      ...initialState,
      detail: payload,
      loading: false,
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle search region user success', () => {
    const initialState = {
      regions: [],
      total: 0,
      loading: true,
      loadingMore: false,
      error: null,
      detail: {
        id: 'region1',
        name: 'Region 1',
        countryCode: 'US',
        unitMeasurement: 'Metric',
        users: [],
        tenantId: 'tenant1',
      },
    };
    const payload = ['user1', 'user2'];
    const action:any = { type: REGION_TYPES.SEACRH_REGION_USER_SUCCESS, payload };
    const expectedState = {
      ...initialState,
      loading: false,
      detail: {
        ...initialState.detail,
        users: payload,
      },
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle fetch region detail request', () => {
    const action:any = { type: REGION_TYPES.FETCH_REGION_DETAIL_REQUEST };
    const expectedState = {
      ...initialState,
      loading: true,
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle create region request', () => {
    const action:any = { type: REGION_TYPES.CREATE_REGION_REQUEST };
    const expectedState = {
      ...initialState,
      loading: true,
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle update region detail request', () => {
    const action:any = { type: REGION_TYPES.UPDATE_REGION_DETAIL_REQUEST };
    const expectedState = {
      ...initialState,
      loading: true,
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle create region admin request', () => {
    const action:any = { type: REGION_TYPES.CREATE_REGION_ADMIN_REQUEST };
    const expectedState = {
      ...initialState,
      loading: true,
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle update region admin request', () => {
    const action:any = { type: REGION_TYPES.UPDATE_REGION_ADMIN_REQUEST };
    const expectedState = {
      ...initialState,
      loading: true,
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle delete region  admin request', () => {
    const action:any = { type: REGION_TYPES.DELETE_REGION_ADMIN_REQUEST };
    const expectedState = {
      ...initialState,
      loading: true,
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle deactivate region request', () => {
    const action:any = { type: REGION_TYPES.DEACTIVATE_REGION_REQUEST };
    const expectedState = {
      ...initialState,
      loading: true,
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle create region success', () => {
    const action:any = { type: REGION_TYPES.CREATE_REGION_SUCCESS };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null,
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle create region admin success', () => {
    const action:any = { type: REGION_TYPES.CREATE_REGION_ADMIN_SUCCESS };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null,
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle update region admin success', () => {
    const action:any = { type: REGION_TYPES.UPDATE_REGION_ADMIN_SUCCESS };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null,
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle create region admin fail', () => {
    const action:any = { type: REGION_TYPES.CREATE_REGION_ADMIN_FAIL };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null,
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle update region admin fail', () => {
    const action:any = { type: REGION_TYPES.UPDATE_REGION_ADMIN_FAIL };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null,
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle delete region admin success', () => {
    const action:any = { type: REGION_TYPES.DELETE_REGION_ADMIN_SUCCESS };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null,
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle delete region admin fail', () => {
    const action:any = { type: REGION_TYPES.DELETE_REGION_ADMIN_FAIL };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null,
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle deactivate region success', () => {
    const action:any = { type: REGION_TYPES.DEACTIVATE_REGION_SUCCESS };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null,
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle update region detail success', () => {
    const action:any = {
      type: REGION_TYPES.UPDATE_REGION_DETAIL_SUCCESS,
      data: { name: 'Updated Region Name' },
    };
    const expectedState = {
      ...initialState,
      loading: false,
      detail: {
        ...initialState.detail,
        name: 'Updated Region Name',
      },
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle create region failure', () => {
    const action:any = {
      type: REGION_TYPES.CREATE_REGION_FAILURE,
      error: 'Failed to create region',
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: 'Failed to create region',
    };
    const newState = regionReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
});
