import axios from 'axios';
import { IFetchRegionAdmins, IFetchRegionDetailReqPayload, IRegionInfo, IRegionPayload } from '../store/region/types';

export const fetchRegions = (limit: number | null, skip: number, sort: string, search?: string) =>
  axios({
    method: 'POST',
    url: '/admin-service/data/country/list',
    data: {
      searchTerm: search || '',
      skip: skip || '',
      limit: limit || ''
    }
  });

export const createRegion = (data: IRegionPayload) =>
  axios({
    method: 'POST',
    url: '/user-service/organization/create-country',
    data
  });

export const getRegionDetail = (data: IFetchRegionDetailReqPayload) =>
  axios({
    url: '/admin-service/data/country/details',
    method: 'POST',
    data
  });

export const updateRegion = (data: IRegionInfo) =>
  axios({
    url: `/admin-service/data/country/update`,
    method: 'PUT',
    data
  });

export const fetchRegionAdmins = (data: IFetchRegionAdmins) =>
  axios({
    method: 'POST',
    url: '/user-service/user/admin-users',
    data: {
      ...data,
      userType: 'country'
    }
  });

export const createRegionAdmin = (data: any) =>
  axios({
    url: '/admin-service/data/country/user-add',
    method: 'POST',
    data
  });

export const updateRegionAdmin = (data: any) =>
  axios({
    url: '/admin-service/data/country/user-update',
    method: 'PUT',
    data
  });

export const deleteRegionAdmin = (data: any) =>
  axios({
    url: '/admin-service/data/country/user-remove',
    method: 'DELETE',
    data
  });

export const deactivateRegion = (data: { tenantId: string }) =>
  axios({
    url: `/admin-service/data/country/deactivate/${data.tenantId}`,
    method: 'GET',
    data
  });

export const getRegionTenantId = (countryId: string) =>
  axios({
    url: 'region/tenant',
    method: 'POST',
    data: {
      _id: countryId
    }
  });
