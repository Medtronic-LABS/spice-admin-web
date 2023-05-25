import axios from 'axios';
import { IUpdateProgramDetails, ICreateProgramReqPayload, IFetchPayload } from '../store/program/types';

export const fetchProgramList = (params: IFetchPayload) => {
  const { limit, skip, search, ...data } = params;
  return axios({
    method: 'POST',
    url: '/admin-service/program/list',
    data: {
      ...data,
      limit: params.limit,
      skip: params.skip,
      searchTerm: params.search
    }
  });
};

export const saveProgram = (data: ICreateProgramReqPayload) =>
  axios({
    method: 'POST',
    url: '/admin-service/program/create',
    data
  });

export const fetchProgramDetails = (data: { tenantId: string; id: string }) =>
  axios({
    method: 'POST',
    url: '/admin-service/program/details',
    data
  });

export const updateProgramDetails = (data: IUpdateProgramDetails) =>
  axios({
    method: 'PATCH',
    url: '/admin-service/program/update',
    data
  });

export const deleteProgram = (id: string, tenantId: string, regionTenantId: string) =>
  axios({
    method: 'DELETE',
    url: '/admin-service/program/remove',
    data: { id, tenantId }
  });
