import siteReducer from '../reducer';
import * as SITE_ACTION_TYPES from '../actionTypes';

describe('siteReducer', () => {
  let initialState:any;
  beforeEach(() => {
    initialState = {
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
  });
  it('should return the initial state', () => {
    const action:any = {};
    const newState = siteReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
  it('should handle FETCH_SITE_DASHBOARD_LIST_REQUEST', () => {
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_SITE_DASHBOARD_LIST_REQUEST,
      isLoadMore: true,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.loadingMore).toBe(true);
  });
  it('should handle FETCH_SITE_DASHBOARD_LIST_SUCCESS', () => {
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_SITE_DASHBOARD_LIST_SUCCESS,
      payload: {
        isLoadMore: false,
        siteDashboardList: [{ id: 1, name: 'Site 1' }],
        total: 1,
      },
    };
    const newState = siteReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.loadingMore).toBe(false);
    expect(newState.siteDashboardList).toEqual([{ id: 1, name: 'Site 1' }]);
    expect(newState.total).toBe(1);
  });
  it('should handle FETCH_SITE_DASHBOARD_LIST_FAILURE', () => {
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_SITE_DASHBOARD_LIST_FAILURE,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.loadingMore).toBe(false);
  });
  it('should handle FETCH_SITE_LIST_SUCCESS', () => {
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_SITE_LIST_SUCCESS,
      payload: {
        total: 2,
        sites: [{ id: 1, name: 'Site 1' }, { id: 2, name: 'Site 2' }],
      },
    };
    const newState = siteReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.total).toBe(2);
    expect(newState.siteList).toEqual([{ id: 1, name: 'Site 1' }, { id: 2, name: 'Site 2' }]);
  });

  it('should handle CLEAR_SITE_LIST', () => {
    const action:any = {
      type: SITE_ACTION_TYPES.CLEAR_SITE_LIST,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.total).toBe(0);
    expect(newState.siteList).toEqual([]);
  });
  it('should handle FETCH_SITE_USER_LIST_SUCCESS', () => {
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_SITE_USER_LIST_SUCCESS,
      payload: {
        total: 3,
        siteUsers: [
          { id: 1, name: 'User 1' },
          { id: 2, name: 'User 2' },
          { id: 3, name: 'User 3' },
        ],
      },
    };
    const newState = siteReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.total).toBe(3);
    expect(newState.siteUserList).toEqual([
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
      { id: 3, name: 'User 3' },
    ]);
  });
  it('should handle CLEAR_SITE_USER_LIST', () => {
    const action:any = {
      type: SITE_ACTION_TYPES.CLEAR_SITE_USER_LIST,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.total).toBe(0);
    expect(newState.siteUserList).toEqual([]);
  });
  it('should handle FETCH_COUNTY_DROPDOWN_SUCCESS', () => {
    const countyList = [{ id: 1, name: 'County 1' }, { id: 2, name: 'County 2' }];
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_COUNTY_DROPDOWN_SUCCESS,
      payload: {
        countyList,
      },
    };
    const newState = siteReducer(initialState, action);
    expect(newState.countyDropdownLoading).toBe(false);
    expect(newState.countyList).toEqual(countyList);
  });
  it('should handle FETCH_SUB_COUNTY_DROPDOWN_SUCCESS', () => {
    const subCountyList = [{ id: 1, name: 'SubCounty 1' }, { id: 2, name: 'SubCounty 2' }];
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_SUB_COUNTY_DROPDOWN_SUCCESS,
      payload: {
        subCountyList,
      },
    };
    const newState = siteReducer(initialState, action);
    expect(newState.subCountyDropdownLoading).toBe(false);
    expect(newState.subCountyList).toEqual(subCountyList);
  });
  it('should handle FETCH_CULTURE_DROPDOWN_SUCCESS', () => {
    const cultureList = [{ id: 1, name: 'Culture 1' }, { id: 2, name: 'Culture 2' }];
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_CULTURE_DROPDOWN_SUCCESS,
      payload: {
        cultureList,
      },
    };
    const newState = siteReducer(initialState, action);
    expect(newState.cultureListLoading).toBe(false);
    expect(newState.cultureList).toEqual(cultureList);
  });
  it('should handle CREATE_SITE_SUCCESS', () => {
    const action:any = {
      type: SITE_ACTION_TYPES.CREATE_SITE_SUCCESS,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.loading).toBe(false);
  });
  it('should handle  UPDATE_SITE_DETAILS_SUCCESS', () => {
    const action:any = {
      type: SITE_ACTION_TYPES.UPDATE_SITE_DETAILS_SUCCESS,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.loading).toBe(false);
  });
  it('should handle CREATE_SITE_USER_SUCCESS', () => {
    const action:any = {
      type: SITE_ACTION_TYPES.CREATE_SITE_USER_SUCCESS,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.loading).toBe(false);
  });
  it('should handle  UPDATE_SITE_USER_SUCCESS', () => {
    const action:any = {
      type: SITE_ACTION_TYPES.UPDATE_SITE_USER_SUCCESS,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.loading).toBe(false);
  });
  it('should handle DELETE_SITE_USER_SUCCESS', () => {
    const action:any = {
      type: SITE_ACTION_TYPES.DELETE_SITE_USER_SUCCESS,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.loading).toBe(false);
  });
  it('should handle FETCH_SITE_SUMMARY_SUCCESS', () => {
    const siteData = { id: 1, name: 'Site 1' };
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_SITE_SUMMARY_SUCCESS,
      payload: siteData,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.site).toEqual(siteData);
    expect(newState.loading).toBe(false);
  });
  it('should handle FETCH_CULTURE_DROPDOWN_SUCCESS', () => {
    const cultureList = [{ id: 1, name: 'Culture 1' }, { id: 2, name: 'Culture 2' }];
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_CULTURE_DROPDOWN_SUCCESS,
      payload: {
        cultureList,
      },
    };
    const newState = siteReducer(initialState, action);
    expect(newState.cultureListLoading).toBe(false);
    expect(newState.cultureList).toEqual(cultureList);
  });
  it('should handle CREATE_SITE_SUCCESS', () => {
    const action:any = {
      type: SITE_ACTION_TYPES.CREATE_SITE_SUCCESS,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.loading).toBe(false);
  });
  it('should handle  UPDATE_SITE_DETAILS_SUCCESS', () => {
    const action:any = {
      type: SITE_ACTION_TYPES.UPDATE_SITE_DETAILS_SUCCESS,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.loading).toBe(false);
  });
  it('should handle CREATE_SITE_USER_SUCCESS', () => {
    const action:any = {
      type: SITE_ACTION_TYPES.CREATE_SITE_USER_SUCCESS,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.loading).toBe(false);
  });
  it('should handle  UPDATE_SITE_USER_SUCCESS', () => {
    const action:any = {
      type: SITE_ACTION_TYPES.UPDATE_SITE_USER_SUCCESS,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.loading).toBe(false);
  });
  it('should handle DELETE_SITE_USER_SUCCESS', () => {
    const action:any = {
      type: SITE_ACTION_TYPES.DELETE_SITE_USER_SUCCESS,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.loading).toBe(false);
  });
  it('should handle FETCH_SITE_SUMMARY_SUCCESS', () => {
    const siteData = { id: 1, name: 'Site 1' };
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_SITE_SUMMARY_SUCCESS,
      payload: siteData,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.site).toEqual(siteData);
    expect(newState.loading).toBe(false);
  });
  it('should handle FETCH_COUNTY_DROPDOWN_REQUEST', () => {
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_COUNTY_DROPDOWN_REQUEST,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.countyList).toEqual([]);
    expect(newState.countyDropdownLoading).toBe(true);
  });
  it('should handle FETCH_SUB_COUNTY_DROPDOWN_REQUEST', () => {
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_SUB_COUNTY_DROPDOWN_REQUEST,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.subCountyList).toEqual([]);
    expect(newState.subCountyDropdownLoading).toBe(true);
  });
  it('should handle FETCH_CULTURE_DROPDOWN_REQUEST', () => {
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_CULTURE_DROPDOWN_REQUEST,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.cultureList).toEqual([]);
    expect(newState.cultureListLoading).toBe(true);
  });
  it('should handle FETCH_SITE_LIST_FAILURE', () => {
    const error = 'An error occurred';
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_SITE_LIST_FAILURE,
      error,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });
  it('should handle CREATE_SITE_FAILURE', () => {
    const error = 'An error occurred';
    const action:any = {
      type: SITE_ACTION_TYPES.CREATE_SITE_FAILURE,
      error,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });
  it('should handle FETCH_SITE_SUMMARY_FAILURE', () => {
    const error = 'An error occurred';
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_SITE_SUMMARY_FAILURE,
      error,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });
  it('should handle UPDATE_SITE_DETAILS_FAILURE', () => {
    const error = 'An error occurred';
    const action:any = {
      type: SITE_ACTION_TYPES.UPDATE_SITE_DETAILS_FAILURE,
      error,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });
  it('should handle CREATE_SITE_USER_FAILURE', () => {
    const error = 'An error occurred';
    const action:any = {
      type: SITE_ACTION_TYPES.CREATE_SITE_USER_FAILURE,
      error,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });
  it('should handle UPDATE_SITE_USER_FAILURE', () => {
    const error = 'An error occurred';
    const action:any = {
      type: SITE_ACTION_TYPES.UPDATE_SITE_USER_FAILURE,
      error,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });
  it('should handle DELETE_SITE_USER_FAILURE', () => {
    const error = 'An error occurred';
    const action:any = {
      type: SITE_ACTION_TYPES.DELETE_SITE_USER_FAILURE,
      error,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });
  it('should handle FETCH_SITE_USER_LIST_FAILURE', () => {
    const error = 'An error occurred';
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_SITE_USER_LIST_FAILURE,
      error,
    };
    const newState = siteReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });
  it('should handle FETCH_SITE_USERS_FAILURE', () => {
    const initialState:any = {
      error: null
    };
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_SITE_USERS_FAILURE,
      error: 'Failed to fetch site users'
    };
    const expectedState = {
      error: 'Failed to fetch site users'
    };
    expect(siteReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_COUNTY_DROPDOWN_FAILURE', () => {
    const initialState:any = {
      countyDropdownLoading: true,
      error: null
    };
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_COUNTY_DROPDOWN_FAILURE,
      error: 'Failed to fetch county dropdown'
    };
    const expectedState = {
      countyDropdownLoading: false,
      error: 'Failed to fetch county dropdown'
    };
    expect(siteReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_SUB_COUNTY_DROPDOWN_FAILURE', () => {
    const initialState:any = {
      subCountyDropdownLoading: true,
      error: null
    };
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_SUB_COUNTY_DROPDOWN_FAILURE,
      error: 'Failed to fetch sub county dropdown'
    };
    const expectedState = {
      subCountyDropdownLoading: false,
      error: 'Failed to fetch sub county dropdown'
    };
    expect(siteReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_CULTURE_DROPDOWN_FAILURE', () => {
    const initialState:any = {
      cultureListLoading: true,
      error: null
    };
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_CULTURE_DROPDOWN_FAILURE,
      error: 'Failed to fetch culture dropdown'
    };
    const expectedState = {
      cultureListLoading: false,
      error: 'Failed to fetch culture dropdown'
    };
    expect(siteReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle CLEAR_DROPDOWN_VALUES', () => {
    const initialState:any = {
      countyList: ['County 1', 'County 2'],
      subCountyList: ['Sub County 1', 'Sub County 2'],
      cultureList: ['Culture 1', 'Culture 2']
    };
    const action:any = {
      type: SITE_ACTION_TYPES.CLEAR_DROPDOWN_VALUES
    };
    const expectedState = {
      countyList: [],
      subCountyList: [],
      cultureList: []
    };
    expect(siteReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_SITE_DROPDOWN_SUCCESS', () => {
    const initialState:any = {
      siteDropdownLoading: true,
      siteDropdownOptions: {
        list: [],
        regionTenantId: ''
      }
    };
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_SITE_DROPDOWN_SUCCESS,
      payload: {
        siteList: ['Site 1', 'Site 2'],
        regionTenantId: '123'
      }
    };
    const expectedState = {
      siteDropdownLoading: false,
      siteDropdownOptions: {
        list: ['Site 1', 'Site 2'],
        regionTenantId: '123'
      }
    };
    expect(siteReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_SITE_DROPDOWN_REQUEST', () => {
    const initialState:any = {
      siteDropdownLoading: false,
      siteDropdownOptions: {
        list: ['Site 1', 'Site 2'],
        regionTenantId: '123'
      }
    };
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_SITE_DROPDOWN_REQUEST
    };
    const expectedState = {
      siteDropdownLoading: true,
      siteDropdownOptions: {
        list: [],
        regionTenantId: ''
      }
    };
    expect(siteReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle FETCH_SITE_DROPDOWN_FAILURE', () => {
    const initialState:any = {
      siteDropdownLoading: true,
      error: null
    };
    const action:any = {
      type: SITE_ACTION_TYPES.FETCH_SITE_DROPDOWN_FAILURE,
      error: 'Failed to fetch site dropdown'
    };
    const expectedState = {
      siteDropdownLoading: false,
      error: 'Failed to fetch site dropdown'
    };
    expect(siteReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle CLEAR_SITE_DROPDOWN_OPTIONS', () => {
    const initialState:any = {
      siteDropdownLoading: true,
      siteDropdownOptions: {
        list: ['Site 1', 'Site 2'],
        regionTenantId: '123'
      }
    };
    const action:any = {
      type: SITE_ACTION_TYPES.CLEAR_SITE_DROPDOWN_OPTIONS
    };
    const expectedState = {
      siteDropdownLoading: false,
      siteDropdownOptions: {
        list: [],
        regionTenantId: ''
      }
    };
    expect(siteReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle SITE_ACTION_TYPES.CLEAR_SITE_SUMMARY', () => {
    const previousState = {
      ...initialState,
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
        }
    }
  }
    const action:any = {
      type: SITE_ACTION_TYPES.CLEAR_SITE_SUMMARY
    };
    const newState = siteReducer(previousState, action);
    expect(newState.site).toEqual(initialState.site);
  });
  it('should handle SITE_ACTION_TYPES.SET_SITE_SUMMARY', () => {
    const previousState = {
      ...initialState,
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
        }
    },
      loading: true
    };
    const action:any = {
      type: SITE_ACTION_TYPES.SET_SITE_SUMMARY,
      data: {
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
          }
      },
      }
    };
    const newState = siteReducer(previousState, action);
    expect(newState.site).toEqual({
      ...previousState.site,
      ...action.data
    });
    expect(newState.loading).toBe(false);
  });
});
