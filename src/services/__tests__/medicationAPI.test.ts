import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  getMedicationList,
  getMedicationClassifications,
  getMedicationBrands,
  getMedicationDosageForm,
  createMedication,
  updateMedication,
  validateMedication,
  deleteMedication
  } from '../medicationAPI';

describe('Medication Service', () => {
    let mockAxios: any;
  
    beforeEach(() => {
      mockAxios = new MockAdapter(axios);
    });
  
    afterEach(() => {
      mockAxios.restore();
    });

    it('fetchMedication sends a POST request to admin-service/medication/list with correct data', async () => {
      const skip = 0;
      const limit = 10;
      const countryId = 1;
      const tenantId = 1;
      const sortField = 'medication_name';
      const sortOrder = 1;
      const search = 'test'
    
        mockAxios.onPost('/admin-service/medication/list').reply(200, {});
    
        await getMedicationList(skip, limit, countryId.toString(), tenantId.toString(), search);
    
        expect(mockAxios.history.post.length).toBe(1);
        expect(mockAxios.history.post[0].url).toBe('/admin-service/medication/list');
        expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({skip, limit, countryId, tenantId,sortField, sortOrder, searchTerm: 'test'});
      });

      it('sends a GET request to /spice-service/country-classification/list with correct data', async () => {
        const countryId = '1';
        mockAxios.onGet(`/spice-service/country-classification/list/?countryId=${Number(countryId)}`).reply(200, {});
        await getMedicationClassifications(countryId);
  
        expect(mockAxios.history.get.length).toBe(1);
        expect(mockAxios.history.get[0].url).toBe(`/spice-service/country-classification/list/?countryId=${Number(countryId)}`);
      });

      it('sends a GET request to /spice-service/classification-brand/list/ with correct data', async () => {
        const countryId = '1';
        const classificationId = '1';
        mockAxios.onGet(`/spice-service/classification-brand/list/?countryId=${countryId}&classificationId=${classificationId}`).reply(200, {});
        await getMedicationBrands(countryId,classificationId);
  
        expect(mockAxios.history.get.length).toBe(1);
        expect(mockAxios.history.get[0].url).toBe(`/spice-service/classification-brand/list/?countryId=${countryId}&classificationId=${classificationId}`);
      });

      it('sends a GET request to /spice-service/dosageform/ with correct data', async () => {
        mockAxios.onGet(`/spice-service/dosageform`).reply(200, {});
        await getMedicationDosageForm();
  
        expect(mockAxios.history.get.length).toBe(1);
        expect(mockAxios.history.get[0].url).toBe(`/spice-service/dosageform`);
      });

      it('createMedication sends a POST request to /admin-service/medication/create with correct data', async () => {
        const requestData = {"countryId":"1","classificationId":1,"classificationName":"ACE inhibitor","brandId":2,"brandName":"Biomet","medicationName":"Testt","dosageFormId":1,"dosageFormName":"Tablet","tenantId":"1"} as any;
    
        mockAxios.onPost('/admin-service/medication/create').reply(200, {});
    
        await createMedication(requestData);
    
        expect(mockAxios.history.post.length).toBe(1);
        expect(mockAxios.history.post[0].url).toBe('/admin-service/medication/create');
        expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(requestData);
      });

      it('should send a PUT request to /admin-service/medication/update with correct data', async () => {
        const data = { "id": '123', "name": 'medication', "dosage": '20mg' } as any;
  
        mockAxios.onPut('/admin-service/medication/update').reply(200, {});
  
        await updateMedication(data);
  
        expect(mockAxios.history.put.length).toBe(1);
        expect(mockAxios.history.put[0].url).toBe('/admin-service/medication/update');
        expect(JSON.parse(mockAxios.history.put[0].data)).toEqual(data);
      });

      it('should send a POST request to /admin-service/medication/validate with correct data', async () => {
        const data = { name: 'medication', dosage: '10mg' } as any;
  
        mockAxios.onPost('/admin-service/medication/validate').reply(200, {});
  
        await validateMedication(data);
  
        expect(mockAxios.history.post.length).toBe(1);
        expect(mockAxios.history.post[0].url).toBe('/admin-service/medication/validate');
        expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(data);
      });

      it('should send a DELETE request to /admin-service/medication/remove with correct data', async () => {
        const data = { id: '123' } as any;
  
        mockAxios.onDelete('admin-service/medication/remove').reply(200, {});
  
        await deleteMedication(data);
  
        expect(mockAxios.history.delete.length).toBe(1);
        expect(mockAxios.history.delete[0].url).toBe('admin-service/medication/remove');
        expect(JSON.parse(mockAxios.history.delete[0].data)).toEqual(data);
      });
});