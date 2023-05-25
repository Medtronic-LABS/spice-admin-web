import * as SUPERADMIN_TYPES from './actionTypes';

import { SuperAdminActions, ISuperAdminState } from './types';

const initialState: ISuperAdminState = {
  superAdmins: [],
  total: 0,
  loading: false,
  error: null
};

const superAdminReducer = (state = initialState, action = {} as SuperAdminActions): ISuperAdminState => {
  switch (action.type) {
    case SUPERADMIN_TYPES.FETCH_SUPERADMINS_REQUEST:
    case SUPERADMIN_TYPES.DELETE_SUPER_ADMIN_REQUEST:
    case SUPERADMIN_TYPES.UPDATE_SUPER_ADMIN_REQUEST:
    case SUPERADMIN_TYPES.FETCH_SUPER_ADMIN_REQUEST:
    case SUPERADMIN_TYPES.CREATE_SUPER_ADMIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case SUPERADMIN_TYPES.FETCH_SUPERADMINS_SUCCESS:
      return {
        ...state,
        loading: false,
        superAdmins: action.payload.superAdmins,
        total: action.payload.total ? action.payload.total : state.total,
        error: null
      };
    case SUPERADMIN_TYPES.FETCH_SUPERADMINS_FAILURE:
    case SUPERADMIN_TYPES.FETCH_SUPER_ADMIN_FAIL:
    case SUPERADMIN_TYPES.CREATE_SUPER_ADMIN_FAILURE:
    case SUPERADMIN_TYPES.DELETE_SUPER_ADMIN_FAIL:
    case SUPERADMIN_TYPES.UPDATE_SUPER_ADMIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case SUPERADMIN_TYPES.DELETE_SUPER_ADMIN_SUCCESS:
    case SUPERADMIN_TYPES.CREATE_SUPER_ADMIN_SUCCESS:
    case SUPERADMIN_TYPES.UPDATE_SUPER_ADMIN_SUCCESS:
    case SUPERADMIN_TYPES.FETCH_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    default:
      return {
        ...state
      };
  }
};

export default superAdminReducer;
