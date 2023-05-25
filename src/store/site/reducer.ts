import * as SITE_ACTION_TYPES from '../site/actionTypes';

import { SiteActions, ISiteState } from './types';

const initialState: ISiteState = {
  total: 0,
  site: {
    name: '',
    siteType: '',
    email: '',
    account: { id: '', name: '', email: '', tenantId: '' },
    operatingUnit: { id: '', name: '', email: '', tenantId: '' },
    address1: '',
    address2: '',
    county: {
      id: '',
      name: ''
    },
    postalCode: '',
    phoneNumber: '',
    location: '',
    culture: {
      id: '',
      name: '',
      deleted: true,
      code: ''
    },
    addressUse: '',
    addressType: '',
    subCounty: {
      id: '',
      name: ''
    },
    city: { label: '', value: { Latitude: 0, Longitude: 0 } },
    country: '',
    siteLevel: {
      label: '',
      value: ''
    },
    id: 0,
    tenantId: 0
  },
  siteList: [
    {
      id: 0,
      name: '',
      siteType: '',
      tenantId: 0,
      cultureName: '',
      siteLevel: '',
      operatingUnitName: ''
    }
  ],
  siteDashboardList: [
    {
      id: 0,
      name: '',
      siteType: '',
      tenantId: 0,
      subCounty: ''
    }
  ],
  siteUserList: [],
  loading: false,
  error: null,
  countyList: [],
  countyDropdownLoading: false,
  subCountyList: [],
  subCountyDropdownLoading: false,
  cultureList: [],
  cultureListLoading: false,
  loadingMore: false,
  siteDropdownLoading: false,
  siteDropdownOptions: {
    list: [],
    regionTenantId: ''
  }
};

const siteReducer = (state: ISiteState = initialState, action = {} as SiteActions) => {
  switch (action.type) {
    case SITE_ACTION_TYPES.FETCH_SITE_DASHBOARD_LIST_REQUEST:
      return {
        ...state,
        [action.isLoadMore ? 'loadingMore' : 'loading']: true
      };
    case SITE_ACTION_TYPES.FETCH_SITE_DASHBOARD_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingMore: false,
        siteDashboardList: action.payload.isLoadMore
          ? [...state.siteDashboardList, ...action.payload.siteDashboardList]
          : action.payload.siteDashboardList,
        total: action.payload.isLoadMore ? state.total : action.payload.total
      };
    case SITE_ACTION_TYPES.FETCH_SITE_DASHBOARD_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        loadingMore: false
      };
    case SITE_ACTION_TYPES.FETCH_SITE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        total: action.payload.total || 0,
        siteList: action.payload.sites || []
      };
    case SITE_ACTION_TYPES.CLEAR_SITE_LIST:
      return {
        ...state,
        total: 0,
        siteList: []
      };
    case SITE_ACTION_TYPES.FETCH_SITE_USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        total: action.payload.total || 0,
        siteUserList: action.payload.siteUsers || []
      };
    case SITE_ACTION_TYPES.CLEAR_SITE_USER_LIST:
      return {
        ...state,
        total: 0,
        siteUserList: []
      };
    case SITE_ACTION_TYPES.FETCH_COUNTY_DROPDOWN_SUCCESS:
      return {
        ...state,
        countyDropdownLoading: false,
        countyList: action.payload.countyList || []
      };
    case SITE_ACTION_TYPES.FETCH_SUB_COUNTY_DROPDOWN_SUCCESS:
      return {
        ...state,
        subCountyDropdownLoading: false,
        subCountyList: action.payload.subCountyList || []
      };
    case SITE_ACTION_TYPES.FETCH_CULTURE_DROPDOWN_SUCCESS:
      return {
        ...state,
        cultureListLoading: false,
        cultureList: action.payload.cultureList || []
      };
    case SITE_ACTION_TYPES.CREATE_SITE_SUCCESS:
    case SITE_ACTION_TYPES.UPDATE_SITE_DETAILS_SUCCESS:
    case SITE_ACTION_TYPES.CREATE_SITE_USER_SUCCESS:
    case SITE_ACTION_TYPES.UPDATE_SITE_USER_SUCCESS:
    case SITE_ACTION_TYPES.DELETE_SITE_USER_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case SITE_ACTION_TYPES.FETCH_SITE_SUMMARY_SUCCESS:
      return {
        ...state,
        site: action.payload,
        loading: false
      };
    case SITE_ACTION_TYPES.CLEAR_SITE_SUMMARY:
      return {
        ...state,
        site: initialState.site
      };
    case SITE_ACTION_TYPES.SET_SITE_SUMMARY:
      return {
        ...state,
        site: { ...state.site, ...action.data },
        loading: false
      };
    case SITE_ACTION_TYPES.FETCH_SITE_LIST_REQUEST:
    case SITE_ACTION_TYPES.CREATE_SITE_REQUEST:
    case SITE_ACTION_TYPES.FETCH_SITE_SUMMARY_REQUEST:
    case SITE_ACTION_TYPES.UPDATE_SITE_DETAILS_REQUEST:
    case SITE_ACTION_TYPES.CREATE_SITE_USER_REQUEST:
    case SITE_ACTION_TYPES.UPDATE_SITE_USER_REQUEST:
    case SITE_ACTION_TYPES.FETCH_SITE_USER_LIST_REQUEST:
    case SITE_ACTION_TYPES.DELETE_SITE_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case SITE_ACTION_TYPES.FETCH_COUNTY_DROPDOWN_REQUEST:
      return {
        ...state,
        countyList: [],
        countyDropdownLoading: true
      };
    case SITE_ACTION_TYPES.FETCH_SUB_COUNTY_DROPDOWN_REQUEST:
      return {
        ...state,
        subCountyList: [],
        subCountyDropdownLoading: true
      };
    case SITE_ACTION_TYPES.FETCH_CULTURE_DROPDOWN_REQUEST:
      return {
        ...state,
        cultureList: [],
        cultureListLoading: true
      };
    case SITE_ACTION_TYPES.FETCH_SITE_LIST_FAILURE:
    case SITE_ACTION_TYPES.CREATE_SITE_FAILURE:
    case SITE_ACTION_TYPES.FETCH_SITE_SUMMARY_FAILURE:
    case SITE_ACTION_TYPES.UPDATE_SITE_DETAILS_FAILURE:
    case SITE_ACTION_TYPES.CREATE_SITE_USER_FAILURE:
    case SITE_ACTION_TYPES.UPDATE_SITE_USER_FAILURE:
    case SITE_ACTION_TYPES.FETCH_SITE_USER_LIST_FAILURE:
    case SITE_ACTION_TYPES.DELETE_SITE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case SITE_ACTION_TYPES.FETCH_SITE_USERS_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case SITE_ACTION_TYPES.FETCH_COUNTY_DROPDOWN_FAILURE:
      return {
        ...state,
        countyDropdownLoading: false,
        error: action.error
      };
    case SITE_ACTION_TYPES.FETCH_SUB_COUNTY_DROPDOWN_FAILURE:
      return {
        ...state,
        subCountyDropdownLoading: false,
        error: action.error
      };
    case SITE_ACTION_TYPES.FETCH_CULTURE_DROPDOWN_FAILURE:
      return {
        ...state,
        cultureListLoading: false,
        error: action.error
      };
    case SITE_ACTION_TYPES.CLEAR_DROPDOWN_VALUES:
      return {
        ...state,
        countyList: [],
        subCountyList: [],
        cultureList: []
      };
    case SITE_ACTION_TYPES.FETCH_SITE_DROPDOWN_SUCCESS:
      return {
        ...state,
        siteDropdownLoading: false,
        siteDropdownOptions: { list: action.payload.siteList || [], regionTenantId: action.payload.regionTenantId }
      };
    case SITE_ACTION_TYPES.FETCH_SITE_DROPDOWN_REQUEST:
      return {
        ...state,
        siteDropdownLoading: true,
        siteDropdownOptions: { list: [], regionTenantId: '' }
      };
    case SITE_ACTION_TYPES.FETCH_SITE_DROPDOWN_FAILURE:
      return {
        ...state,
        siteDropdownLoading: false,
        error: action.error
      };
    case SITE_ACTION_TYPES.CLEAR_SITE_DROPDOWN_OPTIONS:
      return {
        ...state,
        siteDropdownLoading: false,
        siteDropdownOptions: { list: [], regionTenantId: '' }
      };
    default:
      return state;
  }
};

export default siteReducer;
