import * as ACCOUNT_TYPES from './actionTypes';

import { AccountActions, IAccountState } from './types';

const initialState: IAccountState = {
  account: {
    name: '',
    id: '',
    tenantId: '',
    maxNoOfUsers: '',
    users: [],
    updatedAt: ''
  },
  accounts: [],
  accountOptions: [],
  admins: [],
  total: 0,
  loading: false,
  dashboardList: [],
  clinicalWorkflows: [],
  clinicalWorkflowsCount: 0,
  loadingMore: false,
  loadingOptions: false,
  error: null
};

const accountReducer = (state = initialState, action = {} as AccountActions): IAccountState => {
  switch (action.type) {
    case ACCOUNT_TYPES.FETCH_ACCOUNTS_REQUEST:
    case ACCOUNT_TYPES.FETCH_ACCOUNT_ADMIN_REQUEST:
    case ACCOUNT_TYPES.FETCH_ACCOUNT_DETAIL_REQUEST:
    case ACCOUNT_TYPES.FETCH_CLINICAL_WORKFLOW_REQUEST:
    case ACCOUNT_TYPES.CREATE_ACCOUNT_REQUEST:
    case ACCOUNT_TYPES.UPDATE_ACCOUNT_DETAIL_REQUEST:
    case ACCOUNT_TYPES.DELETE_ACCOUNT_ADMIN_REQUEST:
    case ACCOUNT_TYPES.ACTIVATE_ACCOUNT_REQUEST:
    case ACCOUNT_TYPES.DEACTIVATE_ACCOUNT_REQUEST:
    case ACCOUNT_TYPES.CREATE_ACCOUNT_ADMIN_REQUEST:
    case ACCOUNT_TYPES.UPDATE_ACCOUNT_ADMIN_REQUEST:
    case ACCOUNT_TYPES.CREATE_ACCOUNT_WORKFLOW_MODULE_REQUEST:
    case ACCOUNT_TYPES.UPDATE_ACCOUNT_WORKFLOW_MODULE_REQUEST:
    case ACCOUNT_TYPES.DELETE_ACCOUNT_WORKFLOW_MODULE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ACCOUNT_TYPES.FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: action.payload.accounts,
        total: action.payload.total,
        error: null
      };
    case ACCOUNT_TYPES.CLEAR_ACCOUNTS:
      return {
        ...state,
        accounts: [],
        total: 0
      };
    case ACCOUNT_TYPES.FETCH_ACCOUNTS_FAILURE:
    case ACCOUNT_TYPES.FETCH_ACCOUNT_ADMIN_FAILURE:
    case ACCOUNT_TYPES.CREATE_ACCOUNT_FAILURE:
    case ACCOUNT_TYPES.UPDATE_ACCOUNT_DETAIL_FAIL:
    case ACCOUNT_TYPES.CREATE_ACCOUNT_WORKFLOW_MODULE_FAILURE:
    case ACCOUNT_TYPES.UPDATE_ACCOUNT_WORKFLOW_MODULE_FAILURE:
    case ACCOUNT_TYPES.DELETE_ACCOUNT_WORKFLOW_MODULE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case ACCOUNT_TYPES.REMOVE_DEACTIVATED_ACCOUNT_LIST:
      return {
        ...state,
        accounts: []
      };
    case ACCOUNT_TYPES.CREATE_ACCOUNT_SUCCESS:
    case ACCOUNT_TYPES.CREATE_ACCOUNT_ADMIN_SUCCESS:
    case ACCOUNT_TYPES.UPDATE_ACCOUNT_ADMIN_SUCCESS:
    case ACCOUNT_TYPES.CREATE_ACCOUNT_ADMIN_FAIL:
    case ACCOUNT_TYPES.UPDATE_ACCOUNT_ADMIN_FAIL:
    case ACCOUNT_TYPES.DELETE_ACCOUNT_ADMIN_SUCCESS:
    case ACCOUNT_TYPES.DELETE_ACCOUNT_ADMIN_FAIL:
    case ACCOUNT_TYPES.ACTIVATE_ACCOUNT_SUCCESS:
    case ACCOUNT_TYPES.ACTIVATE_ACCOUNT_FAIL:
    case ACCOUNT_TYPES.DEACTIVATE_ACCOUNT_SUCCESS:
    case ACCOUNT_TYPES.DEACTIVATE_ACCOUNT_FAIL:
    case ACCOUNT_TYPES.FETCH_CLINICAL_WORKFLOW_FAILURE:
    case ACCOUNT_TYPES.CREATE_ACCOUNT_WORKFLOW_MODULE_SUCCESS:
    case ACCOUNT_TYPES.UPDATE_ACCOUNT_WORKFLOW_MODULE_SUCCESS:
    case ACCOUNT_TYPES.DELETE_ACCOUNT_WORKFLOW_MODULE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case ACCOUNT_TYPES.FETCH_ACCOUNT_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        account: initialState.account
      };
    case ACCOUNT_TYPES.FETCH_ACCOUNT_DETAIL_SUCCESS:
      return {
        ...state,
        account: action.payload,
        loading: false
      };
    case ACCOUNT_TYPES.SEACRH_ACCOUNT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        account: { ...state.account, users: action.payload }
      };
    case ACCOUNT_TYPES.FETCH_ACCOUNT_DASHBOARD_LIST_REQUEST:
      return {
        ...state,
        [action.payload.isLoadMore ? 'loadingMore' : 'loading']: true
      };
    case ACCOUNT_TYPES.FETCH_ACCOUNT_DASHBOARD_LIST_SUCCESS:
      return {
        ...state,
        dashboardList: action.payload.isLoadMore
          ? [...state.dashboardList, ...action.payload.data]
          : action.payload.data,
        total: action.payload.total ? action.payload.total : state.total,
        loadingMore: false,
        loading: false
      };
    case ACCOUNT_TYPES.FETCH_ACCOUNT_DASHBOARD_LIST_FAIL:
      return {
        ...state,
        loadingMore: false,
        loading: false,
        dashboardList: []
      };
    case ACCOUNT_TYPES.UPDATE_ACCOUNT_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        account: { ...state.account, ...action.data }
      };
    case ACCOUNT_TYPES.FETCH_ACCOUNT_OPTIONS_REQUEST:
      return {
        ...state,
        loadingOptions: true
      };
    case ACCOUNT_TYPES.FETCH_ACCOUNT_OPTIONS_SUCCESS:
      return {
        ...state,
        accountOptions: action.payload,
        loadingOptions: false
      };
    case ACCOUNT_TYPES.FETCH_ACCOUNT_OPTIONS_FAILURE:
      return {
        ...state,
        loadingOptions: false
      };
    case ACCOUNT_TYPES.FETCH_ACCOUNT_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        admins: action.payload.admins,
        total: action.payload.total,
        error: null
      };
    case ACCOUNT_TYPES.CLEAR_ACCOUNT_ADMIN:
      return {
        ...state,
        admins: [],
        total: 0
      };
    case ACCOUNT_TYPES.CLEAR_ACCOUNT_DETAILS:
      return {
        ...state,
        account: initialState.account
      };
    case ACCOUNT_TYPES.SET_ACCOUNT_DETAILS:
      return {
        ...state,
        account: { ...state.account, ...action.data }
      };
    case ACCOUNT_TYPES.FETCH_CLINICAL_WORKFLOW_SUCCESS:
      return {
        ...state,
        clinicalWorkflows: action.payload?.data || [],
        clinicalWorkflowsCount: action.payload?.total,
        loading: false
      };
    case ACCOUNT_TYPES.RESET_CLINICAL_WORKFLOW_REQUEST:
      return {
        ...state,
        clinicalWorkflows: [],
        clinicalWorkflowsCount: 0
      };

    default:
      return {
        ...state
      };
  }
};

export default accountReducer;
