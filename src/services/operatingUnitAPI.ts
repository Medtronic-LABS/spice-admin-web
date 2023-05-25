import axios from 'axios';
import {
  IDeleteOperatingUnitAdminRequest,
  IFetchOperatingUnitAdminsRequest,
  IFetchOperatingUnitByIdRequest,
  IOperatingUnitFormData,
  IOuAdminApiData
} from '../store/operatingUnit/types';

export const fetchOperatingUnitDashboardList = (
  tenantId: string,
  limit: number | null,
  skip: number,
  sort: string,
  searchTerm?: string
) =>
  axios({
    method: 'POST',
    url: '/admin-service/operating-unit/list',
    data: {
      limit,
      skip,
      sort,
      tenantId,
      searchTerm: searchTerm || ''
    }
  });

export const getOperatingUnitDetails = (data: { tenantId: string; id: string }) =>
  axios({
    url: '/admin-service/operating-unit/details',
    method: 'POST',
    data
  });

export const fetchOperatingUnitList = (tenantId: string, limit?: number | null, skip?: number, searchName?: string) =>
  axios({
    method: 'POST',
    url: '/admin-service/operating-unit/all',
    data: {
      tenantId,
      limit,
      skip,
      searchTerm: searchName || ''
    }
  });

export const createOperatingUnit = (data: IOperatingUnitFormData) => {
  return axios({
    method: 'POST',
    url: '/user-service/organization/create-operating-unit',
    data
  });
};

export const updateOperatingUnit = (data: Omit<IOperatingUnitFormData, 'users' | 'parentOrganizationId'>) => {
  return axios({
    method: 'PUT',
    url: '/admin-service/operating-unit/update',
    data: {
      id: data.id,
      tenantId: data.tenantId,
      name: data.name
    }
  });
};

export const createOperatingUnitAdmin = (data: IOuAdminApiData) =>
  axios({
    method: 'POST',
    url: '/admin-service/operating-unit/user-add',
    data
  });

export const updateOperatingUnitAdmin = (data: IOuAdminApiData) =>
  axios({
    method: 'PUT',
    url: '/admin-service/operating-unit/user-update',
    data
  });

export const deleteOperatingUnitAdmin = (data: IDeleteOperatingUnitAdminRequest['payload']) =>
  axios({
    method: 'DELETE',
    url: '/admin-service/operating-unit/user-remove',
    data
  });

export const fetchOperatingUnitById = (data: IFetchOperatingUnitByIdRequest['payload']) =>
  axios({
    method: 'POST',
    url: '/admin-service/operating-unit/details',
    data: { ...data, is_user_not_required: true }
  });

export const fetchOperatingUnitAdmins = (data: IFetchOperatingUnitAdminsRequest['payload']) =>
  axios({
    method: 'POST',
    url: '/user-service/user/admin-users',
    data
  });

export const fetchOperatingUnitForDropdown = (params: { tenantId: string }) =>
  axios({
    method: 'POST',
    url: '/admin-service/operating-unit/all',
    data: {
      tenantId: params.tenantId,
      isPaginated: false
    }
  });
