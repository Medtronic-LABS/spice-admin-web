import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
    createOperatingUnit,
    createOperatingUnitAdmin,
    deleteOperatingUnitAdmin,
    fetchOperatingUnitAdmins,
    fetchOperatingUnitById,
    fetchOperatingUnitDashboardList, fetchOperatingUnitForDropdown, fetchOperatingUnitList, getOperatingUnitDetails, updateOperatingUnit, updateOperatingUnitAdmin
} from '../operatingUnitAPI';

describe('Operating Unit APIs', () => {
    let mockAxios: any;
  
    beforeEach(() => {
      mockAxios = new MockAdapter(axios);
    });
  
    afterEach(() => {
      mockAxios.restore();
    });

it('fetchOperatingUnitDashboardList sends a POST request to /admin-service/operating-unit/list with correct data', async () => {
    const tenantId = '1';
    const limit = 10;
    const skip = 0;
    const sort = 'name';
    const searchTerm = 'example';

    mockAxios.onPost('/admin-service/operating-unit/list').reply(200, {});

    await fetchOperatingUnitDashboardList(tenantId, limit, skip, sort, searchTerm);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/operating-unit/list');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      limit,
      skip,
      sort,
      tenantId,
      searchTerm
    });
  });

  it('fetchOperatingUnitDashboardList sends a POST request to /admin-service/operating-unit/list with correct data without searchterm', async () => {
    const tenantId = '1';
    const limit = 10;
    const skip = 0;
    const sort = 'name';
    const searchTerm = '';

    mockAxios.onPost('/admin-service/operating-unit/list').reply(200, {});

    await fetchOperatingUnitDashboardList(tenantId, limit, skip, sort, searchTerm);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/operating-unit/list');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      limit,
      skip,
      sort,
      tenantId,
      searchTerm
    });
  });

  it('getOperatingUnitDetails sends a POST request to /admin-service/operating-unit/details with correct data', async () => {
    const tenantId = '1';
    const id = '2';

    mockAxios.onPost('/admin-service/operating-unit/details').reply(200, {});

    await getOperatingUnitDetails({ tenantId, id });

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/operating-unit/details');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({ tenantId, id });
  });

  it('fetchOperatingUnitList sends a POST request to /admin-service/operating-unit/all with correct data', async () => {
    const tenantId = '1';
    const limit = 10;
    const skip = 0;
    const searchName = 'example';

    mockAxios.onPost('/admin-service/operating-unit/all').reply(200, {});

    await fetchOperatingUnitList(tenantId, limit, skip, searchName);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/operating-unit/all');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      tenantId,
      limit,
      skip,
      searchTerm: searchName
    });
  })

  it('fetchOperatingUnitList sends a POST request to /admin-service/operating-unit/all with correct data without search term', async () => {
    const tenantId = '1';
    const limit = 10;
    const skip = 0;
    const searchName = '';

    mockAxios.onPost('/admin-service/operating-unit/all').reply(200, {});

    await fetchOperatingUnitList(tenantId, limit, skip, searchName);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/operating-unit/all');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      tenantId,
      limit,
      skip,
      searchTerm: searchName
    });
  })

  it('createOperatingUnit sends a POST request to /user-service/organization/create-operating-unit with correct data', async () => {
    const data = {
        id: '1',
        name: "OU 1",
        account: {id: 1},
        countryId: 1,
        parentOrganizationId: 1,
        tenantId: '4',
        users: []
    };

    mockAxios.onPost('/user-service/organization/create-operating-unit').reply(200, {});

    await createOperatingUnit(data);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/user-service/organization/create-operating-unit');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(data);
  });

  it('updateOperatingUnit sends a PUT request to /admin-service/operating-unit/update with correct data', async () => {
    const data = {
        id: '1',
        name: "OU 1",
        account: {id: 1},
        countryId: 1,
        parentOrganizationId: 1,
        tenantId: '4',
        users: []
    };

    mockAxios.onPut('/admin-service/operating-unit/update').reply(200, {});

    await updateOperatingUnit(data);

    expect(mockAxios.history.put.length).toBe(1);
    expect(mockAxios.history.put[0].url).toBe('/admin-service/operating-unit/update');
    expect(JSON.parse(mockAxios.history.put[0].data)).toEqual({
      id: data.id,
      tenantId: data.tenantId,
      name: data.name
    });
  });

  it('createOperatingUnitAdmin sends a POST request to /admin-service/operating-unit/user-add with correct data', async () => {
    const data = {
        id: '1',
        email: 'email',
        username: 'email',
        firstName: 'firstName',
        lastName: 'lastName'
    } as any;

    mockAxios.onPost('/admin-service/operating-unit/user-add').reply(200, {});

    await createOperatingUnitAdmin(data);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/operating-unit/user-add');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(data);
  });

  it('updateOperatingUnitAdmin sends a PUT request to /admin-service/operating-unit/user-update with correct data', async () => {
    const data = {
        id: '1',
        email: 'email',
        username: 'email',
        firstName: 'firstName',
        lastName: 'lastName'
    } as any;
    mockAxios.onPut('/admin-service/operating-unit/user-update').reply(200, {});

    await updateOperatingUnitAdmin(data);

    expect(mockAxios.history.put.length).toBe(1);
    expect(mockAxios.history.put[0].url).toBe('/admin-service/operating-unit/user-update');
    expect(JSON.parse(mockAxios.history.put[0].data)).toEqual(data);
  });  

  it('deleteOperatingUnitAdmin sends a DELETE request to /admin-service/operating-unit/user-remove with correct data', async () => {
    const data = {
        id: '2',
        tenantId: '4'
    };

    mockAxios.onDelete('/admin-service/operating-unit/user-remove').reply(200, {});

    await deleteOperatingUnitAdmin(data);

    expect(mockAxios.history.delete.length).toBe(1);
    expect(mockAxios.history.delete[0].url).toBe('/admin-service/operating-unit/user-remove');
    expect(JSON.parse(mockAxios.history.delete[0].data)).toEqual(data);
  });

  it('fetchOperatingUnitById sends a POST request to /admin-service/operating-unit/details with correct data', async () => {
    const data = {
        id: '2',
        tenantId: '4'
    };

    mockAxios.onPost('/admin-service/operating-unit/details').reply(200, {});

    await fetchOperatingUnitById(data);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/operating-unit/details');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({ ...data, is_user_not_required: true });
  });

  it('fetchOperatingUnitAdmins sends a POST request to /user-service/user/admin-users with correct data', async () => {
    const data = {
        id: '1',
        tenantId: '3'
    };

    mockAxios.onPost('/user-service/user/admin-users').reply(200, {});

    await fetchOperatingUnitAdmins(data);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/user-service/user/admin-users');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(data);
  });

  it('fetchOperatingUnitForDropdown sends a POST request to /admin-service/operating-unit/all with correct data', async () => {
    const params = {
      tenantId: '1'
    };

    mockAxios.onPost('/admin-service/operating-unit/all').reply(200, {});

    await fetchOperatingUnitForDropdown(params);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/operating-unit/all');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      tenantId: params.tenantId,
      isPaginated: false
    });
  });
});
