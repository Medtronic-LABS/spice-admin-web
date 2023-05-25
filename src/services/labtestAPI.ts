import axios from 'axios';
import {
  IFetchLabtest,
  ILabTest,
  ILabTestCreateReqPayload,
  ISaveUpdateLabResultRangesRequestPayload
} from '../store/labTest/types';

export const fetchLabTest = (data: IFetchLabtest) =>
  axios({
    method: 'POST',
    url: '/admin-service/labtest/list',
    data
  });

export const fetchLabTestbyId = (data: { tenantId: string; id: string }) =>
  axios({
    method: 'POST',
    url: '/admin-service/labtest/details',
    data
  });

export const addLabTest = (data: ILabTestCreateReqPayload) =>
  axios({
    method: 'POST',
    url: '/admin-service/labtest/create',
    data
  });

export const updateLabTest = (data: ILabTest) =>
  axios({
    method: 'PATCH',
    url: '/admin-service/labtest/update',
    data
  });

export const deleteLabtest = (data: { id: number; tenantId: number }) =>
  axios({
    method: 'DELETE',
    url: '/admin-service/labtest/remove',
    data
  });

export const fetchLabTestRange = (data: { tenantId: string; labtestResultId: string }) =>
  axios({
    method: 'GET',
    url: `/admin-service/labtest-result-ranges/details/${data.labtestResultId}`,
    data
  });

export const deleteLabTestRange = (data: { tenantId: string; id: string }) =>
  axios({
    method: 'PUT',
    url: '/admin-service/labtest-result-ranges/remove',
    data
  });

export const validateLabTest = (data: { name: string; tenant_id: string; country: string }) =>
  axios({
    method: 'POST',
    url: 'labtest/validation',
    data
  });

  export const fetchUnitList = (unitType: string) =>
  axios({
    method: 'GET',
    url: `/spice-service/unit/list/${unitType}`
  });

export const saveUpdateLabTestResultRanges = (data: ISaveUpdateLabResultRangesRequestPayload, isUpdate: boolean) =>
  axios({
    method: isUpdate ? 'PUT' : 'POST',
    url: `admin-service/labtest-result-ranges/${isUpdate ? 'update' : 'create'}`,
    data
  });
