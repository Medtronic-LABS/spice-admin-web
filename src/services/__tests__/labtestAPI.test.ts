import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  addLabTest,
  deleteLabTestRange,
  deleteLabtest,
  fetchLabTest,
  fetchLabTestRange,
  fetchLabTestbyId,
  fetchUnitList,
  saveUpdateLabTestResultRanges,
  updateLabTest,
  validateLabTest
} from '../labtestAPI';

describe('fetchLabTests', () => {
  let mockAxios: any;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('fetchLabTest sends a POST request to /admin-service/labtest/list with correct data', async () => {
    const requestData = { tenantId: '1', skip: 0, limit: 10 };

    mockAxios.onPost('/admin-service/labtest/list').reply(200, {});

    await fetchLabTest(requestData);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/labtest/list');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(requestData);
  });

  it('fetchLabTestbyId sends a POST request to /admin-service/labtest/details with correct data', async () => {
    const requestData = { tenantId: '1', id: '123' };

    mockAxios.onPost('/admin-service/labtest/details').reply(200, {});

    await fetchLabTestbyId(requestData);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/labtest/details');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(requestData);
  });

  it('addLabTest sends a POST request to /admin-service/labtest/create with correct data', async () => {
    const requestData = { name: 'Test', code: '123' } as any;

    mockAxios.onPost('/admin-service/labtest/create').reply(200, {});

    await addLabTest(requestData);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/labtest/create');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(requestData);
  });

  it('updateLabTest sends a PATCH request to /admin-service/labtest/update with correct data', async () => {
    const requestData = { id: '123', name: 'Updated Test' } as any;

    mockAxios.onPatch('/admin-service/labtest/update').reply(200, {});

    await updateLabTest(requestData);

    expect(mockAxios.history.patch.length).toBe(1);
    expect(mockAxios.history.patch[0].url).toBe('/admin-service/labtest/update');
    expect(JSON.parse(mockAxios.history.patch[0].data)).toEqual(requestData);
  });

  it('deleteLabtest sends a DELETE request to /admin-service/labtest/remove with correct data', async () => {
    const requestData = { id: 123, tenantId: 1 };

    mockAxios.onDelete('/admin-service/labtest/remove').reply(200, {});

    await deleteLabtest(requestData);

    expect(mockAxios.history.delete.length).toBe(1);
    expect(mockAxios.history.delete[0].url).toBe('/admin-service/labtest/remove');
    expect(JSON.parse(mockAxios.history.delete[0].data)).toEqual(requestData);
  });

  it('fetchLabTestRange sends a GET request to /admin-service/labtest-result-ranges/details/{labtestResultId} with correct data', async () => {
    const requestData = { tenantId: '1', labtestResultId: '123' };

    mockAxios.onGet(`/admin-service/labtest-result-ranges/details/${requestData.labtestResultId}`).reply(200, {});

    await fetchLabTestRange(requestData);

    expect(mockAxios.history.get.length).toBe(1);
    expect(mockAxios.history.get[0].url).toBe(
      `/admin-service/labtest-result-ranges/details/${requestData.labtestResultId}`
    );
    expect(JSON.parse(mockAxios.history.get[0].data)).toEqual(requestData);
  });

  it('deleteLabTestRange sends a PUT request to /admin-service/labtest-result-ranges/remove with correct data', async () => {
    const requestData = { tenantId: '1', id: '123' };

    mockAxios.onPut('/admin-service/labtest-result-ranges/remove').reply(200, {});

    await deleteLabTestRange(requestData);

    expect(mockAxios.history.put.length).toBe(1);
    expect(mockAxios.history.put[0].url).toBe('/admin-service/labtest-result-ranges/remove');
    expect(JSON.parse(mockAxios.history.put[0].data)).toEqual(requestData);
  });

  it('validateLabTest sends a POST request to labtest/validation with correct data', async () => {
    const requestData = { name: 'Test', tenant_id: '1', country: 'US' };

    mockAxios.onPost('labtest/validation').reply(200, {});

    await validateLabTest(requestData);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('labtest/validation');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(requestData);
  });

  it('fetchUnitList sends a GET request to /spice-service/unit/list/{unitType}', async () => {
    const unitType = 'length';

    mockAxios.onGet(`/spice-service/unit/list/${unitType}`).reply(200, {});

    await fetchUnitList(unitType);

    expect(mockAxios.history.get.length).toBe(1);
    expect(mockAxios.history.get[0].url).toBe(`/spice-service/unit/list/${unitType}`);
  });

  it('saveUpdateLabTestResultRanges sends a POST or PUT request to /admin-service/labtest-result-ranges/{create or update} based on isUpdate flag as false', async () => {
    const requestData = { name: 'Test', unit: 'mg', min: 0, max: 100 } as any;
    const isUpdate = false;

    mockAxios.onPost('/admin-service/labtest-result-ranges/create').reply(200, {});

    await saveUpdateLabTestResultRanges(requestData, isUpdate);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('admin-service/labtest-result-ranges/create');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(requestData);
  });

  it('saveUpdateLabTestResultRanges sends a POST or PUT request to /admin-service/labtest-result-ranges/{create or update} based on isUpdate flag as true', async () => {
    const updatedData = { id: 123, name: 'Updated Test', unit: 'mg', min: 0, max: 200 } as any;
    const isUpdate = true;

    mockAxios.onPut('/admin-service/labtest-result-ranges/update').reply(200, {});

    await saveUpdateLabTestResultRanges(updatedData, isUpdate);

    expect(mockAxios.history.put.length).toBe(1);
    expect(mockAxios.history.put[0].url).toBe('admin-service/labtest-result-ranges/update');
    expect(JSON.parse(mockAxios.history.put[0].data)).toEqual(updatedData);
  });
});
