import superAdminReducer from '../reducer';
import * as SUPERADMIN_TYPES from '../actionTypes';

describe('superAdminReducer', () => {
  it('should handle FETCH_SUPERADMINS_REQUEST', () => {
    const initialState = {
      superAdmins: [],
      total: 0,
      loading: false,
      error: null
    };
    const action:any = {
      type: SUPERADMIN_TYPES.FETCH_SUPERADMINS_REQUEST
    };
    const expectedState = {
      superAdmins: [],
      total: 0,
      loading: true,
      error: null
    };
    expect(superAdminReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle DELETE_SUPER_ADMIN_REQUEST', () => {
    const initialState = {
      superAdmins: [],
      total: 0,
      loading: false,
      error: null
    };
    const action:any = {
      type: SUPERADMIN_TYPES.DELETE_SUPER_ADMIN_REQUEST
    };
    const expectedState = {
      superAdmins: [],
      total: 0,
      loading: true,
      error: null
    };
    expect(superAdminReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_SUPER_ADMIN_REQUEST', () => {
    const initialState = {
      superAdmins: [],
      total: 0,
      loading: false,
      error: null
    };
    const action:any = {
      type: SUPERADMIN_TYPES.UPDATE_SUPER_ADMIN_REQUEST
    };
    const expectedState = {
      superAdmins: [],
      total: 0,
      loading: true,
      error: null
    };
    expect(superAdminReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_SUPER_ADMIN_REQUEST', () => {
    const initialState = {
      superAdmins: [],
      total: 0,
      loading: false,
      error: null
    };
    const action:any = {
      type: SUPERADMIN_TYPES.FETCH_SUPER_ADMIN_REQUEST
    };
    const expectedState = {
      superAdmins: [],
      total: 0,
      loading: true,
      error: null
    };
    expect(superAdminReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CREATE_SUPER_ADMIN_REQUEST', () => {
    const initialState = {
      superAdmins: [],
      total: 0,
      loading: false,
      error: null
    };
    const action:any = {
      type: SUPERADMIN_TYPES.CREATE_SUPER_ADMIN_REQUEST
    };
    const expectedState = {
      superAdmins: [],
      total: 0,
      loading: true,
      error: null
    };
    expect(superAdminReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_SUPERADMINS_SUCCESS', () => {
    const initialState = {
      superAdmins: [],
      total: 0,
      loading: true,
      error: null
    };
    const action:any = {
      type: SUPERADMIN_TYPES.FETCH_SUPERADMINS_SUCCESS,
      payload: {
        superAdmins: ['SuperAdmin 1', 'SuperAdmin 2'],
        total: 2
      }
    };
    const expectedState = {
      superAdmins: ['SuperAdmin 1', 'SuperAdmin 2'],
      total: 2,
      loading: false,
      error: null
    };
    expect(superAdminReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_SUPERADMINS_FAILURE', () => {
    const initialState = {
      superAdmins: [],
      total: 0,
      loading: true,
      error: null
    };
    const action:any = {
      type: SUPERADMIN_TYPES.FETCH_SUPERADMINS_FAILURE,
      error: 'Failed to fetch super admins'
    };
    const expectedState = {
      superAdmins: [],
      total: 0,
      loading: false,
      error: 'Failed to fetch super admins'
    };
    expect(superAdminReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_SUPER_ADMIN_FAIL', () => {
    const initialState = {
      superAdmins: [],
      total: 0,
      loading: true,
      error: null
    };
    const action:any = {
      type: SUPERADMIN_TYPES.FETCH_SUPER_ADMIN_FAIL,
      error: 'Failed to fetch super admin'
    };
    const expectedState = {
      superAdmins: [],
      total: 0,
      loading: false,
      error: 'Failed to fetch super admin'
    };
    expect(superAdminReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CREATE_SUPER_ADMIN_FAILURE', () => {
    const initialState = {
      superAdmins: [],
      total: 0,
      loading: true,
      error: null
    };
    const action:any = {
      type: SUPERADMIN_TYPES.CREATE_SUPER_ADMIN_FAILURE,
      error: 'Failed to create super admin'
    };
    const expectedState = {
      superAdmins: [],
      total: 0,
      loading: false,
      error: 'Failed to create super admin'
    };
    expect(superAdminReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle DELETE_SUPER_ADMIN_FAIL', () => {
    const initialState = {
      superAdmins: [],
      total: 0,
      loading: true,
      error: null
    };
    const action:any = {
      type: SUPERADMIN_TYPES.DELETE_SUPER_ADMIN_FAIL,
      error: 'Failed to delete super admin'
    };
    const expectedState = {
      superAdmins: [],
      total: 0,
      loading: false,
      error: 'Failed to delete super admin'
    };
    expect(superAdminReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_SUPER_ADMIN_FAIL', () => {
    const initialState = {
      superAdmins: [],
      total: 0,
      loading: true,
      error: null
    };
    const action:any = {
      type: SUPERADMIN_TYPES.UPDATE_SUPER_ADMIN_FAIL,
      error: 'Failed to delete super admin'
    };
    const expectedState = {
      superAdmins: [],
      total: 0,
      loading: false,
      error: 'Failed to delete super admin'
    };
    expect(superAdminReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle DELETE_SUPER_ADMIN_SUCCESS', () => {
    const initialState = {
      superAdmins: [],
      total: 0,
      loading: true,
      error: null
    };
    const action:any = {
      type: SUPERADMIN_TYPES.DELETE_SUPER_ADMIN_SUCCESS
    };
    const expectedState = {
      superAdmins: [],
      total: 0,
      loading: false,
      error: null
    };
    expect(superAdminReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CREATE_SUPER_ADMIN_SUCCESS', () => {
    const initialState = {
      superAdmins: [],
      total: 0,
      loading: true,
      error: null
    };
    const action:any = {
      type: SUPERADMIN_TYPES.CREATE_SUPER_ADMIN_SUCCESS
    };
    const expectedState = {
      superAdmins: [],
      total: 0,
      loading: false,
      error: null
    };
    expect(superAdminReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_SUPER_ADMIN_SUCCESS', () => {
    const initialState = {
      superAdmins: [],
      total: 0,
      loading: true,
      error: null
    };
    const action:any = {
      type: SUPERADMIN_TYPES.UPDATE_SUPER_ADMIN_SUCCESS
    };
    const expectedState = {
      superAdmins: [],
      total: 0,
      loading: false,
      error: null
    };
    expect(superAdminReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_SUPER_ADMIN_SUCCESS', () => {
    const initialState = {
      superAdmins: [],
      total: 0,
      loading: true,
      error: null
    };
    const action:any = {
      type: SUPERADMIN_TYPES.FETCH_SUPER_ADMIN_SUCCESS
    };
    const expectedState = {
      superAdmins: [],
      total: 0,
      loading: false,
      error: null
    };
    expect(superAdminReducer(initialState, action)).toEqual(expectedState);
  });

});
