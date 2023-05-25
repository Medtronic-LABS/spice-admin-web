import accountReducer from '../reducer';
import * as types from '../actionTypes';

describe('accountReducer', () => {
  it('should handle loading actions as true', () => {
     const initialState: any = {
      loading: false
    };
    const loadingActions = [
      types.FETCH_ACCOUNTS_REQUEST,
      types.FETCH_ACCOUNT_ADMIN_REQUEST,
      types.FETCH_ACCOUNT_DETAIL_REQUEST,
      types.FETCH_CLINICAL_WORKFLOW_REQUEST,
      types.CREATE_ACCOUNT_REQUEST,
      types.UPDATE_ACCOUNT_DETAIL_REQUEST,
      types.DELETE_ACCOUNT_ADMIN_REQUEST,
      types.ACTIVATE_ACCOUNT_REQUEST,
      types.DEACTIVATE_ACCOUNT_REQUEST,
      types.CREATE_ACCOUNT_ADMIN_REQUEST,
      types.UPDATE_ACCOUNT_ADMIN_REQUEST,
      types.CREATE_ACCOUNT_WORKFLOW_MODULE_REQUEST,
      types.UPDATE_ACCOUNT_WORKFLOW_MODULE_REQUEST,
      types.DELETE_ACCOUNT_WORKFLOW_MODULE_REQUEST
    ];
    loadingActions.forEach((actionType) => {
      const action:any = { type: actionType };
      const expectedState = {
        loading: true
      };
      expect(accountReducer(initialState, action)).toEqual(expectedState);
    });
  });

  it('should handle loading actions as false with error null', () => {
    const initialState: any = {
     loading: false,
     error: null
   };
   const loadingActions = [
    types.CREATE_ACCOUNT_SUCCESS,
    types.CREATE_ACCOUNT_ADMIN_SUCCESS,
    types.UPDATE_ACCOUNT_ADMIN_SUCCESS,
    types.CREATE_ACCOUNT_ADMIN_FAIL,
    types.UPDATE_ACCOUNT_ADMIN_FAIL,
    types.DELETE_ACCOUNT_ADMIN_SUCCESS,
    types.DELETE_ACCOUNT_ADMIN_FAIL,
    types.ACTIVATE_ACCOUNT_SUCCESS,
    types.ACTIVATE_ACCOUNT_FAIL,
    types.DEACTIVATE_ACCOUNT_SUCCESS,
    types.DEACTIVATE_ACCOUNT_FAIL,
    types.FETCH_CLINICAL_WORKFLOW_FAILURE,
    types.CREATE_ACCOUNT_WORKFLOW_MODULE_SUCCESS,
    types.UPDATE_ACCOUNT_WORKFLOW_MODULE_SUCCESS,
    types.DELETE_ACCOUNT_WORKFLOW_MODULE_SUCCESS
   ];
   loadingActions.forEach((actionType) => {
     const action:any = { type: actionType };
     const expectedState = {
       loading: false,
       error: null
     };
     expect(accountReducer(initialState, action)).toEqual(expectedState);
   });
 });

  it('should handle FETCH_ACCOUNTS_SUCCESS', () => {
    const initialState: any = {
      loading: false,
      accounts: [],
      total: 0,
      error: null,
    };
    const action: any = {
      type: types.FETCH_ACCOUNTS_SUCCESS,
      payload: {
        accounts: [{ id: 1, name: 'Account 1' }, { id: 2, name: 'Account 2' }],
        total: 2,
      },
    };
    const expectedState = {
      loading: false,
      accounts: [{ id: 1, name: 'Account 1' }, { id: 2, name: 'Account 2' }],
      total: 2,
      error: null,
    };
    expect(accountReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_ACCOUNTS', () => {
    const initialState: any = {
      loading: false,
      accounts: [],
      total: 0,
      error: null,
    };
    const action: any = {
      type: types.CLEAR_ACCOUNTS,
    };
    const expectedState = {
      loading: false,
      accounts: [],
      total: 0,
      error: null,
    };
    expect(accountReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_ACCOUNTS_FAILURE', () => {
    const initialState: any = {
      loading: false,
      error: null,
    };
    const error: any = 'Error fetching accounts';
    const loadingActions = [
      types.FETCH_ACCOUNTS_FAILURE,
      types.FETCH_ACCOUNT_ADMIN_FAILURE,
      types.CREATE_ACCOUNT_FAILURE,
      types.UPDATE_ACCOUNT_DETAIL_FAIL,
      types.CREATE_ACCOUNT_WORKFLOW_MODULE_FAILURE,
      types.UPDATE_ACCOUNT_WORKFLOW_MODULE_FAILURE,
      types.DELETE_ACCOUNT_WORKFLOW_MODULE_FAILURE
    ];
    loadingActions.forEach((actionType) => {
      const action: any = { type: actionType, error: error };
      const expectedState = {
        loading: false,
        error: error
      };
      expect(
        accountReducer(initialState, action)
      ).toEqual(expectedState);
    });
  });

  it('should remove all accounts from state when removing deactivated account list', () => {
    const initialState: any = {
      loading: false,
      accounts: [
        { id: 1, name: 'Account 1' },
        { id: 2, name: 'Account 2' },
      ],
      error: null,
    };
    const action: any = {
      type: types.REMOVE_DEACTIVATED_ACCOUNT_LIST
    };
    const expectedState = {
      loading: false,
      accounts: [],
      error: null,
    };
    expect(accountReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_ACCOUNT_DETAIL_FAILURE', () => {
    const initialState: any = { loading: true, error: null, account: { id: 1, name: 'Test Account' } };
    const action: any = { type: types.FETCH_ACCOUNT_DETAIL_FAILURE, error: 'Error fetching account details' };
    const expectedState = { 
      loading: false, 
      error: 'Error fetching account details', 
      account: { 
        id: "",
        maxNoOfUsers: "",
        name: "",
        tenantId: "",
        updatedAt: "",
        users:[] 
      } };

    expect(accountReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_ACCOUNT_DETAIL_SUCCESS', () => {
    const initialState: any = {
      account: null,
      accounts: [],
      total: 0,
      loading: false,
      error: null,
    };
    const account = { id: 1, name: 'John Doe' };
    const action: any = {
      type: types.FETCH_ACCOUNT_DETAIL_SUCCESS,
      payload: account,
    };
    const expectedState = {
      ...initialState,
      account: account,
      loading: false,
    };
    const actualState = accountReducer(initialState, action);
    expect(actualState).toEqual(expectedState);
  });

  it('should handle SEACRH_ACCOUNT_USER_SUCCESS', () => {
    const initialState: any = {
      loading: true,
      account: {
        users: []
      }
    };
    const action: any = {
      type: types.SEACRH_ACCOUNT_USER_SUCCESS,
      payload: [ { id: 1, name: 'John' }, { id: 2, name: 'Jane' } ]
    };

    const expectedState = {
      loading: false,
      account: {
        users: [ { id: 1, name: 'John' }, { id: 2, name: 'Jane' } ]
      }
    };
    expect(accountReducer(initialState, action)).toEqual(expectedState);
  });

  it('should set loading to true when isLoadMore is false', () => {
    const initialState: any = {
      loading: false,
      loadingMore: false,
    };
    const action: any = {
      type: types.FETCH_ACCOUNT_DASHBOARD_LIST_REQUEST,
      payload: {
        isLoadMore: false,
      },
    };
    const expectedState = {
      loading: true,
      loadingMore: false,
    };
    const resultState = accountReducer(initialState, action);
    expect(resultState).toEqual(expectedState);
  });

  it('should handle FETCH_ACCOUNT_DASHBOARD_LIST_SUCCESS when isLoadMore is false', () => {
    const initialState: any = {
      dashboardList: [],
      total: 0,
      loadingMore: false,
      loading: false
    };
    const action: any = {
      type: types.FETCH_ACCOUNT_DASHBOARD_LIST_SUCCESS,
      payload: {
        isLoadMore: false,
        data: [{ id: 1, name: 'Dashboard 1' }, { id: 2, name: 'Dashboard 2' }],
        total: 2
      }
    };
    const expectedState = {
      dashboardList: [{ id: 1, name: 'Dashboard 1' }, { id: 2, name: 'Dashboard 2' }],
      total: 2,
      loadingMore: false,
      loading: false
    };
    expect(accountReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_ACCOUNT_DASHBOARD_LIST_SUCCESS when isLoadMore is true', () => {
    const initialState: any = {
      dashboardList: [{ id: 1, name: 'Dashboard 1' }],
      total: 1,
      loadingMore: false,
      loading: false
    };
    const action: any = {
      type: types.FETCH_ACCOUNT_DASHBOARD_LIST_SUCCESS,
      payload: {
        isLoadMore: true,
        data: [{ id: 2, name: 'Dashboard 2' }, { id: 3, name: 'Dashboard 3' }],
        total: 3
      }
    };
    const expectedState = {
      dashboardList: [{ id: 1, name: 'Dashboard 1' }, { id: 2, name: 'Dashboard 2' }, { id: 3, name: 'Dashboard 3' }],
      total: 3,
      loadingMore: false,
      loading: false
    };
    expect(accountReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_ACCOUNT_DASHBOARD_LIST_SUCCESS when total is not provided', () => {
    const initialState: any = {
      dashboardList: [],
      total: 0,
      loadingMore: false,
      loading: false
    };
    const action: any = {
      type: types.FETCH_ACCOUNT_DASHBOARD_LIST_SUCCESS,
      payload: {
        isLoadMore: false,
        data: [{ id: 1, name: 'Dashboard 1' }, { id: 2, name: 'Dashboard 2' }]
      }
    };
    const expectedState = {
      dashboardList: [{ id: 1, name: 'Dashboard 1' }, { id: 2, name: 'Dashboard 2' }],
      total: 0,
      loadingMore: false,
      loading: false
    };
    expect(accountReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_ACCOUNT_DASHBOARD_LIST_FAIL', () => {
    const initialState: any = {
      loadingMore: true,
      loading: false,
      dashboardList: [{ id: 1, name: 'Dashboard 1' }]
    };
    const action: any = {
      type: types.FETCH_ACCOUNT_DASHBOARD_LIST_FAIL
    };
    const expectedState = {
      loadingMore: false,
      loading: false,
      dashboardList: []
    };
    expect(accountReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_ACCOUNT_DETAIL_SUCCESS', () => {
    const initialState: any = {
      loading: true,
      account: {
        id: 1,
        name: 'Account 1',
        email: 'account1@example.com'
      }
    };
    const action: any= {
      type: types.UPDATE_ACCOUNT_DETAIL_SUCCESS,
      data: {
        name: 'Updated Account 1',
        phone: '1234567890'
      }
    };
    const expectedState = {
      loading: false,
      account: {
        id: 1,
        name: 'Updated Account 1',
        email: 'account1@example.com',
        phone: '1234567890'
      }
    };
    expect(accountReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_ACCOUNT_OPTIONS_REQUEST', () => {
    const initialState: any = {
      accountOptions: null,
      loadingOptions: false
    };
    const action: any = { type: types.FETCH_ACCOUNT_OPTIONS_REQUEST };
    const expectedState = { ...initialState, loadingOptions: true };
    expect(accountReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_ACCOUNT_OPTIONS_SUCCESS', () => {
    const initialState: any = {
      accountOptions: null,
      loadingOptions: false
    };
    const data = {
      option1: 'option1',
      option2: 'option2'
    };
    const action: any = {
      type: types.FETCH_ACCOUNT_OPTIONS_SUCCESS,
      payload: data
    };
    const expectedState = { ...initialState, accountOptions: data, loadingOptions: false };
    expect(accountReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_ACCOUNT_OPTIONS_FAILURE', () => {
    const initialState: any = { loadingOptions: true };
    const action: any = { type: types.FETCH_ACCOUNT_OPTIONS_FAILURE };
    const expectedState = { loadingOptions: false };
    expect(accountReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_ACCOUNT_ADMIN_SUCCESS', () => {
    const initialState: any = { loading: true, admins: [], total: 0, error: null };
    const action: any = {
      type: types.FETCH_ACCOUNT_ADMIN_SUCCESS,
      payload: { admins: [{ id: 1, name: 'John Doe' }], total: 1 }
    };
    const expectedState = {
      loading: false,
      admins: [{ id: 1, name: 'John Doe' }],
      total: 1,
      error: null
    };
    expect(accountReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_ACCOUNT_ADMIN', () => {
    const initialState: any = { admins: [{ id: 1, name: 'John Doe' }], total: 1 };
    const action: any = { type: types.CLEAR_ACCOUNT_ADMIN };
    const expectedState = { admins: [], total: 0 };
    expect(accountReducer(initialState, action)).toEqual(expectedState);
  });

  it('should clear account details', () => {
    const initialState: any = {
      loading: false,
      loadingMore: false,
      loadingOptions: false,
      dashboardList: [],
      accountOptions: {},
      account: {
        id: '',
        name: '',
        maxNoOfUsers: '',
        tenantId: '',
        updatedAt: '',
        users: []
      },
      admins: [],
      total: 0,
      error: null,
      clinicalWorkflows: [],
      clinicalWorkflowsCount: 0
    };
    const action: any = {
      type: types.CLEAR_ACCOUNT_DETAILS
    };

    const state = accountReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      account: initialState.account
    });
  });

  it('should set the account details', () => {
    const initialState: any = {
      account: { name: 'John Doe', email: 'john.doe@example.com' }
    };
    const action: any = { 
      type: types.SET_ACCOUNT_DETAILS,
      data: { name: 'Jane Doe', phone: '123-456-7890' } 
    };
    const expectedState = {
      account: { name: 'Jane Doe', email: 'john.doe@example.com', phone: '123-456-7890' }
    };
    expect(accountReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_CLINICAL_WORKFLOW_SUCCESS', () => {
    const initialState: any = {
      clinicalWorkflows: [],
      clinicalWorkflowsCount: 0,
      loading: false,
    };
    const data = {
      data: [
        { id: 1, name: 'Workflow 1' },
        { id: 2, name: 'Workflow 2' },
      ],
      total: 2,
    };
    const action: any = { type: types.FETCH_CLINICAL_WORKFLOW_SUCCESS, payload: data };
    const state = accountReducer(initialState, action);

    expect(state.clinicalWorkflows).toEqual(data.data);
    expect(state.clinicalWorkflowsCount).toEqual(data.total);
    expect(state.loading).toEqual(false);
  });

  it('should handle RESET_CLINICAL_WORKFLOW_REQUEST', () => {
    const initialState: any = {
      clinicalWorkflows: [],
      clinicalWorkflowsCount: 0,
      loading: false,
    };
    const action: any = { type: types.RESET_CLINICAL_WORKFLOW_REQUEST };
    const state = accountReducer(initialState, action);

    expect(state.clinicalWorkflows).toEqual([]);
    expect(state.clinicalWorkflowsCount).toEqual(0);
  });
});
