import { OperatingUnitActions, IOperatingUnitState } from './types';
import * as ACTION_TYPES from './actionTypes';

const initialState: IOperatingUnitState = {
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

const operatingUnitReducer = (
  state: IOperatingUnitState = initialState,
  action = {} as OperatingUnitActions
): IOperatingUnitState => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_OPERATING_UNIT_DASHBOARD_LIST_REQUEST:
      return {
        ...state,
        [action.isLoadMore ? 'loadingMore' : 'loading']: true
      };
    case ACTION_TYPES.FETCH_OPERATING_UNIT_DASHBOARD_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingMore: false,
        operatingUnitDashboardList: action.payload.isLoadMore
          ? [...state.operatingUnitDashboardList, ...action.payload.operatingUnitDashboardList]
          : action.payload.operatingUnitDashboardList,
        total: action.payload.isLoadMore ? state.total : action.payload.total
      };
    case ACTION_TYPES.FETCH_OPERATING_UNIT_DASHBOARD_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        loadingMore: false
      };
    case ACTION_TYPES.FETCH_OPERATING_UNIT_LIST_REQUEST:
    case ACTION_TYPES.FETCH_OPERATING_UNIT_DETAIL_REQUEST:
    case ACTION_TYPES.CREATE_OPERATING_UNIT_REQUEST:
    case ACTION_TYPES.UPDATE_OPERATING_UNIT_REQUEST:
    case ACTION_TYPES.UPDATE_OPERATING_UNIT_ADMIN_REQUEST:
    case ACTION_TYPES.CREATE_OPERATING_UNIT_ADMIN_REQUEST:
    case ACTION_TYPES.DELETE_OPERATING_UNIT_ADMIN_REQUEST:
    case ACTION_TYPES.FETCH_OPERATING_UNIT_BY_ID_REQUEST:
    case ACTION_TYPES.FETCH_OPERATING_UNIT_ADMIN_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ACTION_TYPES.FETCH_OPERATING_UNIT_DETAIL_SUCCESS:
      return {
        ...state,
        operatingUnitDetail: action.payload.operatingUnitDetail,
        admins: action.payload.operatingUnitAdmins,
        loading: false
      };
    case ACTION_TYPES.FETCH_OPERATING_UNIT_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        operatingUnitDetail: initialState.operatingUnitDetail
      };
    case ACTION_TYPES.SEARCH_OPERATING_UNIT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        admins: action.payload
      };
    case ACTION_TYPES.FETCH_OPERATING_UNIT_LIST_SUCCESS:
      return {
        ...state,
        operatingUnitList: action.payload.operatingUnitList,
        listTotal: action.payload.total,
        loading: false
      };
    case ACTION_TYPES.CLEAR_OPERATING_UNIT_LIST:
      return {
        ...state,
        operatingUnitList: [],
        listTotal: 0
      };
    case ACTION_TYPES.UPDATE_OPERATING_UNIT_SUCCESS:
      return {
        ...state,
        loading: false,
        operatingUnitDetail: action.payload
          ? {
              ...state.operatingUnitDetail,
              ...action.payload
            }
          : state.operatingUnitDetail
      };
    case ACTION_TYPES.UPDATE_OPERATING_UNIT_ADMIN_SUCCESS:
    case ACTION_TYPES.FETCH_OPERATING_UNIT_LIST_FAILURE:
    case ACTION_TYPES.CREATE_OPERATING_UNIT_SUCCESS:
    case ACTION_TYPES.CREATE_OPERATING_UNIT_FAILURE:
    case ACTION_TYPES.UPDATE_OPERATING_UNIT_FAILURE:
    case ACTION_TYPES.UPDATE_OPERATING_UNIT_ADMIN_FAILURE:
    case ACTION_TYPES.CREATE_OPERATING_UNIT_ADMIN_SUCCESS:
    case ACTION_TYPES.CREATE_OPERATING_UNIT_ADMIN_FAILURE:
    case ACTION_TYPES.DELETE_OPERATING_UNIT_ADMIN_SUCCESS:
    case ACTION_TYPES.DELETE_OPERATING_UNIT_ADMIN_FAILURE:
    case ACTION_TYPES.FETCH_OPERATING_UNIT_BY_ID_SUCCESS:
    case ACTION_TYPES.FETCH_OPERATING_UNIT_BY_ID_FAILURE:
      return {
        ...state,
        loading: false
      };
    case ACTION_TYPES.FETCH_OPERATING_UNIT_ADMIN_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        operatingUnitAdmins: action.payload.operatingUnitAdmins,
        total: action.payload.total,
        error: null
      };
    case ACTION_TYPES.CLEAR_OPERATING_UNIT_ADMIN_LIST:
      return {
        ...state,
        operatingUnitAdmins: [],
        total: 0
      };
    case ACTION_TYPES.FETCH_OPERATING_UNIT_ADMIN_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case ACTION_TYPES.CLEAR_OPERATING_UNIT_DETAIL:
      return { ...state, operatingUnitDetail: initialState.operatingUnitDetail, admins: [] };
    case ACTION_TYPES.SET_OPERATING_UNIT_DETAILS:
      return {
        ...state,
        operatingUnitDetail: { ...state.operatingUnitDetail, ...action.data }
      };
    case ACTION_TYPES.FETCH_OPERATING_UNIT_DROPDOWN_REQUEST:
      return {
        ...state,
        dropdownOUList: [],
        dropdownOUListLoading: true
      };
    case ACTION_TYPES.FETCH_OPERATING_UNIT_DROPDOWN_SUCCESS:
      return {
        ...state,
        dropdownOUListLoading: false,
        dropdownOUList: action.payload.operatingUnitList || []
      };
    case ACTION_TYPES.FETCH_OPERATING_UNIT_DROPDOWN_FAIL:
      return {
        ...state,
        dropdownOUListLoading: false,
        error: action.error
      };
    case ACTION_TYPES.CLEAR_DROPDOWN_VALUES:
      return {
        ...state,
        dropdownOUListLoading: false,
        dropdownOUList: []
      };
    default:
      return state;
  }
};

export default operatingUnitReducer;
