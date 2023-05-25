import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  fetchRegions,
  createRegion,
  getRegionDetail,
  updateRegion,
  fetchRegionAdmins,
  createRegionAdmin,
  updateRegionAdmin,
  deleteRegionAdmin,
  deactivateRegion,
  getRegionTenantId
} from '../regionAPI';

describe('Region Functions', () => {
  let mockAxios: any;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('fetchRegions sends a POST request to /admin-service/data/country/list with correct data', async () => {
    const limit = 10;
    const skip = 1;
    const sort = 'name';
    const search = 'example';

    mockAxios.onPost('/admin-service/data/country/list').reply(200, {});

    await fetchRegions(limit, skip, sort, search);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/data/country/list');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      searchTerm: search,
      skip,
      limit
    });
  });

  it('fetchRegions sends a POST request to /admin-service/data/country/list with correct data without search', async () => {
    const limit = 10;
    const skip = 1;
    const sort = 'name';

    mockAxios.onPost('/admin-service/data/country/list').reply(200, {});

    await fetchRegions(limit, skip, sort);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/data/country/list');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      searchTerm: '',
      skip,
      limit
    });
  });

  it('fetchRegions sends a POST request to /admin-service/data/country/list with correct data without skip', async () => {
    const limit = 10;
    const skip = 0;
    const sort = 'name';
    const search = 'example';

    mockAxios.onPost('/admin-service/data/country/list').reply(200, {});

    await fetchRegions(limit, skip, sort, search);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/data/country/list');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      searchTerm: search,
      skip: '',
      limit
    });
  });

  it('fetchRegions sends a POST request to /admin-service/data/country/list with correct data without limit', async () => {
    const limit = '';
    const skip = 1;
    const sort = 'name';
    const search = 'example';

    mockAxios.onPost('/admin-service/data/country/list').reply(200, {});

    await fetchRegions(null, skip, sort, search);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/data/country/list');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      searchTerm: search,
      skip,
      limit
    });
  });

  it('fetchRegions sends a POST request to /admin-service/data/country/list with correct data without limit without skip', async () => {
    const limit = '';
    const skip = 0;
    const sort = 'name';
    const search = 'example';

    mockAxios.onPost('/admin-service/data/country/list').reply(200, {});

    await fetchRegions(null, skip, sort, search);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/data/country/list');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      searchTerm: search,
      skip: '',
      limit
    });
  });

  it('createRegion sends a POST request to /user-service/organization/create-country with correct data', async () => {
    const data = {
      name: 'Region',
      countryCode: '91',
      unitMeasurement: 'metric',
      users: []
    };

    mockAxios.onPost('/user-service/organization/create-country').reply(200, {});

    await createRegion(data);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/user-service/organization/create-country');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(data);
  });

  it('getRegionDetail sends a POST request to /admin-service/data/country/details with correct data', async () => {
    const data = {
      id: '1',
      tenantId: '4'
    };

    mockAxios.onPost('/admin-service/data/country/details').reply(200, {});

    await getRegionDetail(data);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/data/country/details');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(data);
  });

  it('updateRegion sends a PUT request to /admin-service/data/country/update with correct data', async () => {
    const data = {
      id: '1',
      name: 'Region',
      countryCode: '91',
      unitMeasurement: 'metric'
    };

    mockAxios.onPut('/admin-service/data/country/update').reply(200, {});

    await updateRegion(data);

    expect(mockAxios.history.put.length).toBe(1);
    expect(mockAxios.history.put[0].url).toBe('/admin-service/data/country/update');
    expect(JSON.parse(mockAxios.history.put[0].data)).toEqual(data);
  });

  it('fetchRegionAdmins sends a POST request to /user-service/user/admin-users with correct data', async () => {
    const data = {
      id: '1',
      tenantId: '2'
    };

    mockAxios.onPost('/user-service/user/admin-users').reply(200, {});

    await fetchRegionAdmins(data);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/user-service/user/admin-users');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      ...data,
      userType: 'country'
    });
  });

  it('createRegionAdmin sends a POST request to /admin-service/data/country/user-add with correct data', async () => {
    const data = {};

    mockAxios.onPost('/admin-service/data/country/user-add').reply(200, {});

    await createRegionAdmin(data);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/data/country/user-add');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(data);
  });

  it('updateRegionAdmin sends a PUT request to /admin-service/data/country/user-update with correct data', async () => {
    const data = {};

    mockAxios.onPut('/admin-service/data/country/user-update').reply(200, {});

    await updateRegionAdmin(data);

    expect(mockAxios.history.put.length).toBe(1);
    expect(mockAxios.history.put[0].url).toBe('/admin-service/data/country/user-update');
    expect(JSON.parse(mockAxios.history.put[0].data)).toEqual(data);
  });

  it('deleteRegionAdmin sends a DELETE request to /admin-service/data/country/user-remove with correct data', async () => {
    const data = {};

    mockAxios.onDelete('/admin-service/data/country/user-remove').reply(200, {});

    await deleteRegionAdmin(data);

    expect(mockAxios.history.delete.length).toBe(1);
    expect(mockAxios.history.delete[0].url).toBe('/admin-service/data/country/user-remove');
    expect(JSON.parse(mockAxios.history.delete[0].data)).toEqual(data);
  });

  it('deactivateRegion sends a GET request to /admin-service/data/country/deactivate/:tenantId with correct data', async () => {
    const data = {
      tenantId: '1'
    };

    mockAxios.onGet(`/admin-service/data/country/deactivate/${data.tenantId}`).reply(200, {});

    await deactivateRegion(data);

    expect(mockAxios.history.get.length).toBe(1);
    expect(mockAxios.history.get[0].url).toBe(`/admin-service/data/country/deactivate/${data.tenantId}`);
    expect(JSON.parse(mockAxios.history.get[0].data)).toEqual(data);
  });

  it('getRegionTenantId sends a POST request to region/tenant with correct data', async () => {
    const countryId = '1';

    mockAxios.onPost('region/tenant').reply(200, {});

    await getRegionTenantId(countryId);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('region/tenant');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      _id: countryId
    });
  });
});
