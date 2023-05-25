import axios from 'axios';

import {
  IFetchSiteListRequest,
  ISiteUserPayLoad,
  IFetchSiteUserListRequest,
  IDeleteUserSuccessPayload,
  ICreateSiteRequestPayload,
  ISiteUpdateReqPayload,
  ISiteUser
} from '../store/site/types';

export const fetchSiteList = (parms: IFetchSiteListRequest) =>
  axios({
    method: 'POST',
    url: 'admin-service/site/list',
    data: {
      limit: parms.limit,
      skip: parms.skip,
      tenantId: parms.tenantId,
      ...(parms.search ? { searchTerm: parms.search } : {})
    }
  });

export const fetchSiteCounty = (countryId: string) =>
  axios({
    method: 'GET',
    url: `admin-service/data/county-list/${countryId}`
  });

export const fetchSubCounty = (countyId: string) =>
  axios({
    method: 'GET',
    url: `admin-service/data/subcounty-by-county-id/${countyId}`
  });

export const fetchSiteCulture = () =>
  axios({
    method: 'GET',
    url: 'spice-service/culture'
  });

export const createSite = (data: ICreateSiteRequestPayload) =>
  axios({
    method: 'POST',
    url: '/user-service/organization/create-site',
    data
  });

export const fetchSiteSummary = (tenantId: string, id: number) =>
  axios({
    method: 'POST',
    url: '/admin-service/site/details',
    data: {
      tenantId,
      id
    }
  });

export const fetchSiteUsers = ({ searchParams, tenantId, limit = 'all', skip = 0 }: { [key: string]: any }) => {
  return axios({
    method: 'POST',
    url: '/user-service/user/admin-users',
    data: {
      tenantId,
      limit,
      skip,
      searchTerm: searchParams,
      userType: 'site'
    }
  });
};
export const updateSiteDetails = (data: ISiteUpdateReqPayload) =>
  axios({
    method: 'PUT',
    url: '/admin-service/site/update',
    data
  });

export const addSiteUser = (data: ISiteUserPayLoad) =>
  axios({
    method: 'POST',
    url: 'admin-service/site/user-add',
    data: {
      ...data.user,
      roles: [{ name: data.user.roleName }],
      tenantId: data.tenantId
    }
  });

export const updateSiteUser = (data: ISiteUser) =>
  axios({
    method: 'PUT',
    url: '/admin-service/site/user-update',
    data
  });

export const fetchSiteUserList = (data: IFetchSiteUserListRequest) =>
  axios({
    method: 'POST',
    url: '/user-service/user/admin-users',
    data
  });

export const deleteAllSiteUser = (data: IDeleteUserSuccessPayload) =>
  axios({
    url: '/user-service/user/delete',
    method: 'PUT',
    data
  });

export const deleteSiteUser = (data: IDeleteUserSuccessPayload) =>
  axios({
    url: '/admin-service/site/user-remove',
    method: 'DELETE',
    data
  });

export const listCities = (searchStr: string) =>
  axios({
    method: 'post',
    url: '/admin-service/site/list-cities',
    data: {
      searchTerm: searchStr
    }
  });

export const getCoordinates = (locationId: string) =>
  axios({
    url: '/admin-service/site/get-city-coordinates',
    method: 'post',
    data: {
      locationId
    }
  });

export const getSitesForDropdown = (parms: { tenantId: string }) =>
  axios({
    method: 'POST',
    url: 'admin-service/site/list',
    data: {
      tenantId: parms.tenantId,
      isPaginated: false
    }
  });
