import axios from 'axios';
import { IDeleteMedicationRequestPayload, IMedicationPayload } from '../store/medication/types';
import { constructUrl } from '../utils/constructURL';

export const getMedicationList = (
  skip: number,
  limit: number | null,
  tenantId: string,
  countryId: string,
  search?: string
) =>
  axios({
    url: '/admin-service/medication/list',
    method: 'POST',
    data: {
      tenantId: Number(tenantId),
      countryId: Number(countryId),
      limit,
      skip,
      sortField: 'medication_name',
      sortOrder: 1,
      ...(search ? { searchTerm: search } : {})
    }
  });

export const getMedicationClassifications = (countryId: string) =>
  axios({
    method: 'GET',
    url: constructUrl({
      resource: '/spice-service/country-classification/list/',
      query: {
        filters: `countryId=${Number(countryId)}`
      }
    })
  });

export const getMedicationBrands = (countryId: string, classificationId: string) =>
  axios({
    method: 'GET',
    url: constructUrl({
      resource: '/spice-service/classification-brand/list/',
      query: {
        filters: `countryId=${countryId}&classificationId=${classificationId}`
      }
    })
  });

export const getMedicationDosageForm = () =>
  axios({
    method: 'GET',
    url: '/spice-service/dosageform'
  });

export const createMedication = (data: IMedicationPayload) =>
  axios({
    method: 'POST',
    url: '/admin-service/medication/create',
    data
  });

export const updateMedication = (data: IMedicationPayload) =>
  axios({
    method: 'PUT',
    url: '/admin-service/medication/update',
    data
  });

export const validateMedication = (data: IMedicationPayload) =>
  axios({
    method: 'POST',
    url: '/admin-service/medication/validate',
    data
  });

export const deleteMedication = (data: IDeleteMedicationRequestPayload) =>
  axios({
    method: 'DELETE',
    url: 'admin-service/medication/remove',
    data
  });
