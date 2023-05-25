import axios from 'axios';
import { constructUrl } from '../utils/constructURL';
import { ISearch } from '../typings/global';
import { IEditUserDetail, IFetchUserByIdRequest } from '../store/user/types';
import APPCONSTANTS from '../constants/appConstants';

export const login = (username: string, password: string) => {
  const data = new FormData();
  data.append('username', username);
  data.append('password', password);
  return axios({
    method: 'POST',
    url: '/auth-service/session',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const logout = (token: string) =>
  axios({
    method: 'GET',
    url: '/auth-service/logout',
    headers: { Authorization: token }
  });

export const forgotPassword = (reqObj: object) =>
  axios({
    method: 'get',
    url: `/user-service/user/forgot-password/${reqObj}/${APPCONSTANTS.APP_TYPE}`,
    data: reqObj
  });

export const resetPasswordReq = (data: { email: string; password: string }, token: string) =>
  axios({
    method: 'post',
    url: `/user-service/user/reset-password/${token}`,
    data: {
      ...data
    }
  });

export const changePasswordReq = (data: { userId: string; newPassword: string; tenantId: string }) =>
  axios({
    method: 'POST',
    url: `user-service/user/change-password`,
    data: {
      ...data
    }
  });

export const getUsername = (token: string) =>
  axios({
    method: 'get',
    url: `/user-service/user/verify-set-password/${token}`
  });

export const createPassword = (data: { password: string }, id: string) =>
  axios({
    method: 'post',
    url: `user-service/user/set-password/${id}`,
    data: {
      password: data.password
    }
  });

export const fetchTimezoneList = () =>
  axios({
    method: 'GET',
    url: '/spice-service/timezone'
  });

export const fetchCultureList = () =>
  axios({
    method: 'GET',
    url: '/spice-service/culture/list'
  });

export const fetchUser = ({ searchParams, tenant_id, limit = 'all', skip = 0 }: { [key: string]: any }) => {
  let searchArray: ISearch[] = [];
  if (searchParams) {
    searchArray = [
      { field: 'email', value: searchParams },
      { field: 'first_name', value: searchParams },
      { field: 'last_name', value: searchParams }
    ];
  }
  return axios({
    method: 'get',
    url: constructUrl({
      resource: '/forms/users',
      query: {
        search: searchArray,
        limit,
        skip,
        filters: `tenant_id=${tenant_id}`
      }
    })
  });
};

export const fetchLoggedInUser = () =>
  axios({
    method: 'get',
    url: '/user-service/user/profile'
  });

export const getDefaultRoles = () =>
  axios({
    method: 'get',
    url: '/role/default-roles'
  });

export const fetchUserByEmail = (email: string, parentOrgId?: string, ignoreTenantId?: string) =>
  axios({
    method: 'POST',
    url: '/user-service/user/validate-user',
    data: {
      email,
      parentOrganizationId: parentOrgId,
      ignoreTenantId
    }
  });

export const fetchUserById = ({ id }: IFetchUserByIdRequest['payload']) =>
  axios({
    url: `user-service/user/details/${id}`,
    method: 'GET'
  });

export const updateUser = (payload: IEditUserDetail) =>
  axios({
    method: 'POST',
    url: '/user-service/user/update',
    data: payload
  });

export const fetchCountryList = () =>
  axios({
    method: 'GET',
    url: '/admin-service/data/countries?isActive=true'
  });

export const fetchLockedUsers = (tenantId: number, skip: number, limit: number | null, search?: string) =>
  axios({
    method: 'POST',
    url: '/user-service/user/locked-users',
    data: {
      tenantId,
      skip,
      limit,
      ...(search ? { searchTerm: search } : {})
    }
  });

export const unlockUsers = (id: string) =>
  axios({
    method: 'POST',
    url: '/user-service/user/unlock',
    data: { id }
  });
