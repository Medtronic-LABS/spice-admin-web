import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { 
    fetchSuperAdmins,
    createSuperAdmin,
    deleteSuperAdmin,
    updateSuperAdmin,
    fetchSuperAdmin
} from '../superAdminAPI';

describe('Super Admin Service', () => {
  let mockAxios: any;
  
  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('sends a POST request to /user-service/user/super-admin/list with correct data', async () => {
    const pageNo = 1;
    const limit = 10;
    const search = 'test';

    mockAxios.onPost('user-service/user/super-admin/list').reply(200, {});

    await fetchSuperAdmins(pageNo, limit, search);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('user-service/user/super-admin/list');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      searchTerm: search,
      skip: pageNo,
      limit: limit
    });
  });

  it('sends a POST request to /user-service/user/super-admin/list with default limit value', async () => {
    const pageNo = 1;

    mockAxios.onPost('user-service/user/super-admin/list').reply(200, {});

    await fetchSuperAdmins(pageNo);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('user-service/user/super-admin/list');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      searchTerm: '',
      skip: pageNo,
      limit: 10
    });
  });

  it('sends a POST request to /user-service/user/super-admin/list without search term', async () => {
    const pageNo = 1;
    const limit = 10;

    mockAxios.onPost('user-service/user/super-admin/list').reply(200, {});

    await fetchSuperAdmins(pageNo, limit);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('user-service/user/super-admin/list');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      searchTerm: '',
      skip: pageNo,
      limit: limit
    });
  });

  it('should create superadmin on the server', async () => {
    const superAdminData = [
      {
        name: 'Test Admin',
        email: 'testadmin@example.com'
      }
    ] as any;

    mockAxios
      .onPost('/user-service/user/super-admin/create', superAdminData)
      .reply(201);

    const response = await createSuperAdmin(superAdminData);

    expect(response.status).toEqual(201);
    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe(
      'user-service/user/super-admin/create'
    );
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(superAdminData);
  });

  it('should delete superadmin on the server', async () => {
    const superAdminId = '1';

    mockAxios
      .onPut(`/user-service/user/super-admin/remove/${superAdminId}`)
      .reply(204);

    const response = await deleteSuperAdmin({ id: superAdminId } as any);

    expect(response.status).toEqual(204);
    expect(mockAxios.history.put.length).toBe(1);
    expect(mockAxios.history.put[0].url).toBe(
      `user-service/user/super-admin/remove/${superAdminId}`
    );
  });

  it('should update superadmin on the server', async () => {
    const superAdminData = {
      id: '1',
      name: 'Test Admin',
      email: 'testadmin@example.com'
    } as any;

    mockAxios
      .onPost('/user-service/user/super-admin/update', superAdminData)
      .reply(204);

    const response = await updateSuperAdmin(superAdminData);

    expect(response.status).toEqual(204);
    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe(
      'user-service/user/super-admin/update'
    );
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(superAdminData);
  });

  it('should fetch superadmin from the server', async () => {
    const superAdminId = '1';
    const responseData = { id: '1', name: 'Test Admin' };
    mockAxios
    .onGet(`/user-service/user/super-admin/details/${superAdminId}`)
    .reply(200, responseData);

    const response = await fetchSuperAdmin(superAdminId);

    expect(response.data).toEqual(responseData);
    expect(mockAxios.history.get.length).toBe(1);
    expect(mockAxios.history.get[0].url).toBe(`user-service/user/super-admin/details/${superAdminId}`);
  });
});
