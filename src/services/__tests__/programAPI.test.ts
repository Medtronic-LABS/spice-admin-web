import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchProgramList, saveProgram, fetchProgramDetails, updateProgramDetails, deleteProgram } from '../programAPI'; // Replace 'your-module' with the actual path to the module

describe('Program Functions', () => {
  let mockAxios: any;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('fetchProgramList sends a POST request to /admin-service/program/list with correct data', async () => {
    const params = {
      limit: 10,
      skip: 0,
      search: 'search'
    };

    mockAxios.onPost('/admin-service/program/list').reply(200, {});

    await fetchProgramList(params);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/program/list');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      limit: params.limit,
      skip: params.skip,
      searchTerm: params.search
    });
  });

  it('saveProgram sends a POST request to /admin-service/program/create with correct data', async () => {
    const data = {
      name: 'name',
      country: '2',
      sites: [],
      tenantId: '3'
    };

    mockAxios.onPost('/admin-service/program/create').reply(200, {});

    await saveProgram(data);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/program/create');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(data);
  });

  it('fetchProgramDetails sends a POST request to /admin-service/program/details with correct data', async () => {
    const data = {
      tenantId: '1',
      id: '2'
    };

    mockAxios.onPost('/admin-service/program/details').reply(200, {});

    await fetchProgramDetails(data);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/program/details');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(data);
  });

  it('updateProgramDetails sends a PATCH request to /admin-service/program/update with correct data', async () => {
    const data = {
      name: 'name',
      country: '2',
      sites: [],
      tenantId: '3'
    } as any;

    mockAxios.onPatch('/admin-service/program/update').reply(200, {});

    await updateProgramDetails(data);

    expect(mockAxios.history.patch.length).toBe(1);
    expect(mockAxios.history.patch[0].url).toBe('/admin-service/program/update');
    expect(JSON.parse(mockAxios.history.patch[0].data)).toEqual(data);
  });

  it('deleteProgram sends a DELETE request to /admin-service/program/remove with correct data', async () => {
    const id = '1';
    const tenantId = '2';
    const regionTenantId = '3';

    mockAxios.onDelete('/admin-service/program/remove').reply(200, {});

    await deleteProgram(id, tenantId, regionTenantId);

    expect(mockAxios.history.delete.length).toBe(1);
    expect(mockAxios.history.delete[0].url).toBe('/admin-service/program/remove');
    expect(JSON.parse(mockAxios.history.delete[0].data)).toEqual({ id, tenantId });
  });
});
