import axios from 'axios';
import APPCONSTANTS from '../constants/appConstants';
import { IDeleteSuperAdminPayload, ISuperAdminFormValues } from '../store/superAdmin/types';

export const fetchSuperAdmins = (
  pageNo: number,
  limit: number = APPCONSTANTS.ROWS_PER_PAGE_OF_TABLE,
  search?: string
) =>
  axios({
    method: 'POST',
    url: 'user-service/user/super-admin/list',
    data: {
      searchTerm: search || '',
      skip: pageNo || 0,
      limit: limit || ''
    }
  });

export const createSuperAdmin = (data: ISuperAdminFormValues[]) =>
  axios({
    method: 'POST',
    url: 'user-service/user/super-admin/create',
    data
  });

export const deleteSuperAdmin = (data: IDeleteSuperAdminPayload) =>
  axios({
    url: `user-service/user/super-admin/remove/${data.id}`,
    method: 'PUT'
  });

export const updateSuperAdmin = (data: ISuperAdminFormValues) =>
  axios({
    url: 'user-service/user/super-admin/update',
    method: 'POST',
    data
  });

export const fetchSuperAdmin = (id: string) =>
  axios({
    url: `user-service/user/super-admin/details/${id}`,
    method: 'GET'
  });
