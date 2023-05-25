import operatingUnitReducer from '../reducer';
import * as ACTION_TYPES from '../actionTypes';

describe('operatingUnitReducer', () => {
    let expectedState:any
  const initialState = {
    operatingUnitList: [],
    listTotal: 0,
    operatingUnitDetail: {
      id: '',
      name: '',
      tenantId: '',
      account: {
        id: '',
        name: ''
      },
      county: {
        id: '',
        name: ''
      }
    },
    admins: [],
    operatingUnitDashboardList: [],
    error: null,
    total: 0,
    loading: false,
    loadingMore: false,
    operatingUnitAdmins: [],
    dropdownOUList: [],
    dropdownOUListLoading: false
  };

   expectedState = {
    operatingUnitList: [],
    listTotal: 0,
    operatingUnitDetail: {
      id: '',
      name: '',
      tenantId: '',
      account: {
        id: '',
        name: ''
      },
      county: {
        id: '',
        name: ''
      }
    },
    admins: [],
    operatingUnitDashboardList: [],
    error: null,
    total: 0,
    loading: false,
    loadingMore: false,
    operatingUnitAdmins: [],
    dropdownOUList: [],
    dropdownOUListLoading: false
};


  it('should handle FETCH_OPERATING_UNIT_DASHBOARD_LIST_REQUEST', () => {
    const action:any = {
      type: ACTION_TYPES.FETCH_OPERATING_UNIT_DASHBOARD_LIST_REQUEST,
      isLoadMore: false
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(operatingUnitReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_OPERATING_UNIT_DASHBOARD_LIST_SUCCESS', () => {
    const action:any = {
      type: ACTION_TYPES.FETCH_OPERATING_UNIT_DASHBOARD_LIST_SUCCESS,
      payload: {
        isLoadMore: false,
        operatingUnitDashboardList: [],
        total: 0
      }
    };
    const expectedState = {
      ...initialState,
      loading: false,
      loadingMore: false,
      operatingUnitDashboardList: [],
      total: 0
    };
    expect(operatingUnitReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_OPERATING_UNIT_DASHBOARD_LIST_FAILURE', () => {
    const action:any = {
      type: ACTION_TYPES.FETCH_OPERATING_UNIT_DASHBOARD_LIST_FAILURE
    };
    const expectedState = {
      ...initialState,
      loading: false,
      loadingMore: false
    };
    expect(operatingUnitReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_OPERATING_UNIT_LIST_REQUEST', () => {
    const action:any = {
      type: ACTION_TYPES.FETCH_OPERATING_UNIT_LIST_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(operatingUnitReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_OPERATING_UNIT_DETAIL_REQUEST', () => {
    const action:any = {
      type: ACTION_TYPES.FETCH_OPERATING_UNIT_DETAIL_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(operatingUnitReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CREATE_OPERATING_UNIT_REQUEST', () => {
    const action:any = {
      type: ACTION_TYPES.CREATE_OPERATING_UNIT_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(operatingUnitReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_OPERATING_UNIT_REQUEST', () => {
    const action:any = {
      type: ACTION_TYPES.UPDATE_OPERATING_UNIT_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(operatingUnitReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_OPERATING_UNIT_ADMIN_REQUEST', () => {
    const action:any = {
      type: ACTION_TYPES.UPDATE_OPERATING_UNIT_ADMIN_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(operatingUnitReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CREATE_OPERATING_UNIT_ADMIN_REQUEST', () => {
    const action:any = {
      type: ACTION_TYPES.CREATE_OPERATING_UNIT_ADMIN_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(operatingUnitReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle DELETE_OPERATING_UNIT_ADMIN_REQUEST', () => {
    const action:any = {
      type: ACTION_TYPES.DELETE_OPERATING_UNIT_ADMIN_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(operatingUnitReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_OPERATING_UNIT_BY_ID_REQUEST', () => {
    const action:any = {
      type: ACTION_TYPES.FETCH_OPERATING_UNIT_BY_ID_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(operatingUnitReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_OPERATING_UNIT_ADMIN_LIST_REQUEST', () => {
    const action:any = {
      type: ACTION_TYPES.FETCH_OPERATING_UNIT_ADMIN_LIST_REQUEST
    };
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(operatingUnitReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_OPERATING_UNIT_DETAIL_FAILURE', () => {
    const action:any = {
      type: ACTION_TYPES.FETCH_OPERATING_UNIT_DETAIL_FAILURE,
      error: 'Failed to fetch operating unit detail'
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: action.error,
      operatingUnitDetail: initialState.operatingUnitDetail
    };
    expect(operatingUnitReducer(initialState, action)).toEqual(expectedState);
  });
    
  it('should handle SEARCH_OPERATING_UNIT_USER_SUCCESS', () => {
    const action:any = {
      type: ACTION_TYPES.SEARCH_OPERATING_UNIT_USER_SUCCESS,
      payload: ['admin1', 'admin2']
    };
    const expectedState = {
      ...initialState,
      loading: false,
      admins: action.payload
    };
    expect(operatingUnitReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_OPERATING_UNIT_LIST_SUCCESS', () => {
    const action:any = {
      type: ACTION_TYPES.FETCH_OPERATING_UNIT_LIST_SUCCESS,
      payload: {
        operatingUnitList: ['ou1', 'ou2'],
        total: 2
      }
    };
    const expectedState = {
      ...initialState,
      operatingUnitList: action.payload.operatingUnitList,
      listTotal: action.payload.total,
      loading: false
    };
    expect(operatingUnitReducer(initialState, action)).toEqual(expectedState);
  });

  it('should clear operating unit list', () => {
    const action:any = { type: ACTION_TYPES.CLEAR_OPERATING_UNIT_LIST };
    const expectedState = {
        operatingUnitList: [],
        listTotal: 0,
        operatingUnitDetail: {
          id: '',
          name: '',
          tenantId: '',
          account: {
            id: '',
            name: ''
          },
          county: {
            id: '',
            name: ''
          }
        },
        admins: [],
        operatingUnitDashboardList: [],
        error: null,
        total: 0,
        loading: false,
        loadingMore: false,
        operatingUnitAdmins: [],
        dropdownOUList: [],
        dropdownOUListLoading: false
    };
    const newState = operatingUnitReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should update operating unit detail', () => {
    const payload = {
      id: '123',
      name: 'Updated Operating Unit',
    };
    const action:any = {
      type: ACTION_TYPES.UPDATE_OPERATING_UNIT_SUCCESS,
      payload: payload,
    };
    const expectedState = {
        operatingUnitList: [],
        listTotal: 0,
        operatingUnitDetail: {
          id: '123',
          name: 'Updated Operating Unit',
          tenantId: '',
          account: {
            id: '',
            name: ''
          },
          county: {
            id: '',
            name: ''
          }
        },
        admins: [],
        operatingUnitDashboardList: [],
        error: null,
        total: 0,
        loading: false,
        loadingMore: false,
        operatingUnitAdmins: [],
        dropdownOUList: [],
        dropdownOUListLoading: false
    };
    const newState = operatingUnitReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should handle update operating unit admin success', () => {
    const action:any = { type: ACTION_TYPES.UPDATE_OPERATING_UNIT_ADMIN_SUCCESS };
    const expectedState = {
        operatingUnitList: [],
        listTotal: 0,
        operatingUnitDetail: {
          id: '',
          name: '',
          tenantId: '',
          account: {
            id: '',
            name: ''
          },
          county: {
            id: '',
            name: ''
          }
        },
        admins: [],
        operatingUnitDashboardList: [],
        error: null,
        total: 0,
        loading: false,
        loadingMore: false,
        operatingUnitAdmins: [],
        dropdownOUList: [],
        dropdownOUListLoading: false
    };
    const newState = operatingUnitReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should handle fetch operating unit list failure', () => {
    const action :any= { type: ACTION_TYPES.FETCH_OPERATING_UNIT_LIST_FAILURE };
    const newState = operatingUnitReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should handle fetch operating unit list success', () => {
    const action :any= { type: ACTION_TYPES.CREATE_OPERATING_UNIT_SUCCESS };
    const newState = operatingUnitReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should handle fetch operating unit list failure', () => {
    const action :any= { type: ACTION_TYPES.CREATE_OPERATING_UNIT_FAILURE };
    const newState = operatingUnitReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should handle fetch operating unit list failure', () => {
    const action :any= { type: ACTION_TYPES.UPDATE_OPERATING_UNIT_FAILURE };
    const newState = operatingUnitReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should handle fetch operating unit list failure', () => {
    const action :any= { type: ACTION_TYPES.UPDATE_OPERATING_UNIT_ADMIN_FAILURE };
    const newState = operatingUnitReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle fetch operating unit list success', () => {
    const action :any= { type: ACTION_TYPES.CREATE_OPERATING_UNIT_ADMIN_SUCCESS };
    const newState = operatingUnitReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle fetch operating unit list failure', () => {
    const action :any= { type: ACTION_TYPES.CREATE_OPERATING_UNIT_ADMIN_FAILURE };
    const newState = operatingUnitReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle fetch operating unit list success', () => {
    const action :any= { type: ACTION_TYPES.DELETE_OPERATING_UNIT_ADMIN_SUCCESS };
    const newState = operatingUnitReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle fetch operating unit list failure', () => {
    const action :any= { type: ACTION_TYPES.DELETE_OPERATING_UNIT_ADMIN_FAILURE };
    const newState = operatingUnitReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  it('should handle fetch operating unit list success', () => {
    const action :any= { type: ACTION_TYPES.FETCH_OPERATING_UNIT_BY_ID_SUCCESS };
    const newState = operatingUnitReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should handle fetch operating unit list failure', () => {
    const action :any= { type: ACTION_TYPES.FETCH_OPERATING_UNIT_BY_ID_FAILURE };
    const newState = operatingUnitReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should handle fetch operating unit admin list success', () => {
    const payload = {
      operatingUnitAdmins: [],
      total: 0,
    };
    const action:any = {
      type: ACTION_TYPES.FETCH_OPERATING_UNIT_ADMIN_LIST_SUCCESS,
      payload,
    };
    expectedState={
        ...expectedState,
        operatingUnitAdmins:  [],
             total:0
    }
    const newState = operatingUnitReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should handle clear operating unit admin list', () => {
    const action:any = { type: ACTION_TYPES.CLEAR_OPERATING_UNIT_ADMIN_LIST };
    const newState = operatingUnitReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should handle fetch operating unit admin list failure', () => {
    const error = 'Failed to fetch operating unit admin list';
    const action:any = {
      type: ACTION_TYPES.FETCH_OPERATING_UNIT_ADMIN_LIST_FAILURE,
      error,
    };
    expectedState={
        ...expectedState,
       error: "Failed to fetch operating unit admin list"
    }
    const newState = operatingUnitReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should handle clear operating unit detail', () => {
    const initialState:any = {
      operatingUnitDetail: {
        id: '1',
        name: 'Operating Unit 1',
        tenantId: 'tenant1',
        account: {
          id: 'account1',
          name: 'Account 1',
        },
        county: {
          id: 'county1',
          name: 'County 1',
        },
      },
      admins: ['admin1', 'admin2'],
    };
    const action:any = { type: ACTION_TYPES.CLEAR_OPERATING_UNIT_DETAIL };
    const expectedState = {
      operatingUnitDetail: {
        id: '',
        name: '',
        tenantId: '',
        account: {
          id: '',
          name: '',
        },
        county: {
          id: '',
          name: '',
        },
      },
      admins: [],
    };
    const newState = operatingUnitReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should handle set operating unit details', () => {
    const initialState:any = {
      operatingUnitDetail: {
        id: '1',
        name: 'Operating Unit 1',
        tenantId: 'tenant1',
        account: {
          id: 'account1',
          name: 'Account 1',
        },
        county: {
          id: 'county1',
          name: 'County 1',
        },
      },
    };
    const action:any = {
      type: ACTION_TYPES.SET_OPERATING_UNIT_DETAILS,
      data: {
        name: 'Updated Operating Unit',
        account: {
            id:'account1',
          name: 'Updated Account',
        },
      },
    };

    const expectedState = {
      operatingUnitDetail: {
        id: '1',
        name: 'Updated Operating Unit',
        tenantId: 'tenant1',
        account: {
          id: 'account1',
          name: 'Updated Account',
        },
        county: {
          id: 'county1',
          name: 'County 1',
        },
      },
    };
    const newState = operatingUnitReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should handle fetch operating unit dropdown request', () => {
    const initialState:any = {
      dropdownOUList: ['option1', 'option2'],
      dropdownOUListLoading: false,
    };
    const action:any = { type: ACTION_TYPES.FETCH_OPERATING_UNIT_DROPDOWN_REQUEST };
    const expectedState = {
      dropdownOUList: [],
      dropdownOUListLoading: true,
    };
    const newState = operatingUnitReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should handle fetch operating unit dropdown success', () => {
    const initialState:any = {
      dropdownOUList: [],
      dropdownOUListLoading: true,
    };
    const payload = {
      operatingUnitList: ['option1', 'option2'],
    };
    const action:any = {
      type: ACTION_TYPES.FETCH_OPERATING_UNIT_DROPDOWN_SUCCESS,
      payload,
    };
    const expectedState = {
      dropdownOUListLoading: false,
      dropdownOUList: payload.operatingUnitList || [],
    };
    const newState = operatingUnitReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should handle fetch operating unit dropdown fail', () => {
    const initialState:any = {
      dropdownOUList: [],
      dropdownOUListLoading: true,
    };
    const error = 'Failed to fetch operating unit dropdown';
    const action:any = {
      type: ACTION_TYPES.FETCH_OPERATING_UNIT_DROPDOWN_FAIL,
      error,
    };
    const expectedState = {
        dropdownOUList: [],
      dropdownOUListLoading: false,
      error
    };
    const newState = operatingUnitReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should handle clear dropdown values', () => {
    const initialState:any = {
      dropdownOUList: ['option1', 'option2'],
      dropdownOUListLoading: true
    };
    const action:any = { type: ACTION_TYPES.CLEAR_DROPDOWN_VALUES };
    const expectedState = {
      dropdownOUListLoading: false,
      dropdownOUList: []
    };
    const newState = operatingUnitReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });


})