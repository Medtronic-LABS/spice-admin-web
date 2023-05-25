import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  fetchSiteList,
  fetchSiteCounty,
  fetchSubCounty,
  fetchSiteCulture,
  createSite,
  fetchSiteSummary,
  fetchSiteUsers,
  updateSiteDetails,
  addSiteUser,
  updateSiteUser,
  fetchSiteUserList,
  deleteAllSiteUser,
  deleteSiteUser,
  listCities,
  getCoordinates,
  getSitesForDropdown
} from '../siteAPI';

describe('Site Functions', () => {
  let mockAxios: any;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('fetchSiteList sends a POST request to admin-service/site/list with correct data', async () => {
    const params = {
      limit: 10,
      skip: 0,
      tenantId: '1',
      search: 'example'
    } as any;

    mockAxios.onPost('admin-service/site/list').reply(200, {});

    await fetchSiteList(params);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('admin-service/site/list');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      limit: params.limit,
      skip: params.skip,
      tenantId: params.tenantId,
      searchTerm: params.search
    });
  });

  
  it('fetchSiteList sends a POST request to admin-service/site/list with correct data without search', async () => {
    const params = {
      limit: 10,
      skip: 0,
      tenantId: '1'
    } as any;

    mockAxios.onPost('admin-service/site/list').reply(200, {});

    await fetchSiteList(params);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('admin-service/site/list');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      limit: params.limit,
      skip: params.skip,
      tenantId: params.tenantId
    });
  });

  it('fetchSiteCounty sends a GET request to admin-service/data/county-list/:countryId with correct data', async () => {
    const countryId = '1';

    mockAxios.onGet(`admin-service/data/county-list/${countryId}`).reply(200, {});

    await fetchSiteCounty(countryId);

    expect(mockAxios.history.get.length).toBe(1);
    expect(mockAxios.history.get[0].url).toBe(`admin-service/data/county-list/${countryId}`);
  });

  it('fetchSubCounty sends a GET request to admin-service/data/subcounty-by-county-id/:countyId with correct data', async () => {
    const countyId = '1';

    mockAxios.onGet(`admin-service/data/subcounty-by-county-id/${countyId}`).reply(200, {});

    await fetchSubCounty(countyId);

    expect(mockAxios.history.get.length).toBe(1);
    expect(mockAxios.history.get[0].url).toBe(`admin-service/data/subcounty-by-county-id/${countyId}`);
  });

  it('fetchSiteCulture sends a GET request to spice-service/culture', async () => {
    mockAxios.onGet('spice-service/culture').reply(200, {});

    await fetchSiteCulture();

    expect(mockAxios.history.get.length).toBe(1);
    expect(mockAxios.history.get[0].url).toBe('spice-service/culture');
  });

  it('createSite sends a POST request to /user-service/organization/create-site with correct data', async () => {
    const data = {
        name: 'Site 1',
        siteType: 'online',
        email: 'email'
    } as any;

    mockAxios.onPost('/user-service/organization/create-site').reply(200, {});

    await createSite(data);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/user-service/organization/create-site');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(data);
  });

  
  it('fetchSiteSummary sends a POST request to /admin-service/site/details with correct data', async () => {
    const tenantId = '1';
    const id = 2;

    mockAxios.onPost('/admin-service/site/details').reply(200, {});

    await fetchSiteSummary(tenantId, id);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/site/details');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({ tenantId, id });
  });

  it('fetchSiteUsers sends a POST request to /user-service/user/admin-users with correct data', async () => {
    const searchParams = 'example';
    const tenantId = '1';
    const limit = 5;
    const skip = 10;

    mockAxios.onPost('/user-service/user/admin-users').reply(200, {});

    await fetchSiteUsers({ searchParams, tenantId, limit, skip });

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/user-service/user/admin-users');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      tenantId,
      limit,
      skip,
      searchTerm: searchParams,
      userType: 'site'
    });
  });

  it('fetchSiteUsers sends a POST request to /user-service/user/admin-users with correct data without limit', async () => {
    const searchParams = 'example';
    const tenantId = '1';
    const limit = 'all';
    const skip = 0;

    mockAxios.onPost('/user-service/user/admin-users').reply(200, {});

    await fetchSiteUsers({ searchParams, tenantId, skip });

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/user-service/user/admin-users');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      tenantId,
      limit,
      skip,
      searchTerm: searchParams,
      userType: 'site'
    });
  });

  it('fetchSiteUsers sends a POST request to /user-service/user/admin-users with correct data without skip', async () => {
    const searchParams = 'example';
    const tenantId = '1';
    const limit = 'all';
    const skip = 0;

    mockAxios.onPost('/user-service/user/admin-users').reply(200, {});

    await fetchSiteUsers({ searchParams, tenantId, limit });

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/user-service/user/admin-users');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      tenantId,
      limit,
      skip,
      searchTerm: searchParams,
      userType: 'site'
    });
  });

  it('updateSiteDetails sends a PUT request to /admin-service/site/update with correct data', async () => {
    const data = {
        id: '1',
        operatingUnit: {},
        accountId: '1',
        users: []
    } as any;

    mockAxios.onPut('/admin-service/site/update').reply(200, {});

    await updateSiteDetails(data);

    expect(mockAxios.history.put.length).toBe(1);
    expect(mockAxios.history.put[0].url).toBe('/admin-service/site/update');
    expect(JSON.parse(mockAxios.history.put[0].data)).toEqual(data);
  });

  it('addSiteUser sends a POST request to admin-service/site/user-add with correct data', async () => {
    const data = {
        user: {
            roleName: 'SUPER_ADMIN'
        },
        roles: ['SUPER_ADMIN'],
        tenantId: '2'
    } as any;

    mockAxios.onPost('admin-service/site/user-add').reply(200, {});

    await addSiteUser(data);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('admin-service/site/user-add');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      ...data.user,
      roles: [{ name: data.user.roleName }],
      tenantId: data.tenantId
    });
  });

  
  it('updateSiteUser sends a PUT request to /admin-service/site/user-update with correct data', async () => {
    const data = {
        user: {
            roleName: 'SUPER_ADMIN'
        },
        roles: ['SUPER_ADMIN'],
        tenantId: '2'
    } as any;

    mockAxios.onPut('/admin-service/site/user-update').reply(200, {});

    await updateSiteUser(data);

    expect(mockAxios.history.put.length).toBe(1);
    expect(mockAxios.history.put[0].url).toBe('/admin-service/site/user-update');
    expect(JSON.parse(mockAxios.history.put[0].data)).toEqual(data);
  });

  it('fetchSiteUserList sends a POST request to /user-service/user/admin-users with correct data', async () => {
    const data = {
        id: '1',
        tenantId: '3'
    } as any;

    mockAxios.onPost('/user-service/user/admin-users').reply(200, {});

    await fetchSiteUserList(data);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/user-service/user/admin-users');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(data);
  });

  it('deleteAllSiteUser sends a PUT request to /user-service/user/delete with correct data', async () => {
    const data = {
        id: 1,
        tenantId: 4
    };

    mockAxios.onPut('/user-service/user/delete').reply(200, {});

    await deleteAllSiteUser(data);

    expect(mockAxios.history.put.length).toBe(1);
    expect(mockAxios.history.put[0].url).toBe('/user-service/user/delete');
    expect(JSON.parse(mockAxios.history.put[0].data)).toEqual(data);
  });

  it('deleteSiteUser sends a DELETE request to /admin-service/site/user-remove with correct data', async () => {
    const data = {
        id: 1,
        tenantId: 2
    };

    mockAxios.onDelete('/admin-service/site/user-remove').reply(200, {});

    await deleteSiteUser(data);

    expect(mockAxios.history.delete.length).toBe(1);
    expect(mockAxios.history.delete[0].url).toBe('/admin-service/site/user-remove');
    expect(JSON.parse(mockAxios.history.delete[0].data)).toEqual(data);
  });

  
  it('listCities sends a POST request to /admin-service/site/list-cities with correct data', async () => {
    const searchStr = 'example';

    mockAxios.onPost('/admin-service/site/list-cities').reply(200, {});

    await listCities(searchStr);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/site/list-cities');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({ searchTerm: searchStr });
  });

  it('getCoordinates sends a POST request to /admin-service/site/get-city-coordinates with correct data', async () => {
    const locationId = 'example';

    mockAxios.onPost('/admin-service/site/get-city-coordinates').reply(200, {});

    await getCoordinates(locationId);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/site/get-city-coordinates');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({ locationId });
  });

  it('getSitesForDropdown sends a POST request to /admin-service/site/list with correct data', async () => {
    const tenantId = 'example';

    mockAxios.onPost('/admin-service/site/list').reply(200, {});

    await getSitesForDropdown({ tenantId });

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('admin-service/site/list');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      tenantId,
      isPaginated: false
    });
  });
});
