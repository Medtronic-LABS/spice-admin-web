import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { 
    login,
    logout,
    forgotPassword,
    resetPasswordReq,
    changePasswordReq,
    getUsername,
    createPassword,
    fetchTimezoneList,
    fetchCultureList,
    fetchLoggedInUser,
    getDefaultRoles,
    fetchUserByEmail,
    fetchUserById,
    updateUser,
    fetchCountryList,
    fetchLockedUsers,
    unlockUsers
} from '../userAPI';
import APPCONSTANTS from '../../constants/appConstants';

describe('User Service', () => {
  let mockAxios: any;
  
  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('sends a POST request to /auth-service/session with correct data', async () => {
    const username = 'user';
    const password = 'pass';
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    mockAxios.onPost('/auth-service/session').reply(200, {});

    await login(username, password);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/auth-service/session');
    expect(mockAxios.history.post[0].headers['Content-Type']).toBe('multipart/form-data');
    expect(mockAxios.history.post[0].data).toEqual(formData);
  });

  it('sends a GET request to /auth-service/logout with correct token header', async () => {
    const token = 'token';

    mockAxios.onGet('/auth-service/logout').reply(200, {});

    await logout(token);

    expect(mockAxios.history.get.length).toBe(1);
    expect(mockAxios.history.get[0].url).toBe('/auth-service/logout');
    expect(mockAxios.history.get[0].headers.Authorization).toBe(token);
  });

  it('sends a GET request to /user-service/user/forgot-password/{reqObj}/{APPCONSTANTS.APP_TYPE} with correct data', async () => {
    const reqObj = { email: 'test@example.com' };

    mockAxios.onGet(`/user-service/user/forgot-password/${reqObj}/${APPCONSTANTS.APP_TYPE}`).reply(200, {});

    await forgotPassword(reqObj);

    expect(mockAxios.history.get.length).toBe(1);
    expect(mockAxios.history.get[0].url).toBe(`/user-service/user/forgot-password/${reqObj}/${APPCONSTANTS.APP_TYPE}`);
    expect(JSON.parse(mockAxios.history.get[0].data)).toEqual(reqObj);
  });

  it('sends a POST request to /user-service/user/reset-password/{token} with correct data', async () => {
    const data = { email: 'test@example.com', password: 'newpassword' };
    const token = 'token';

    mockAxios.onPost(`/user-service/user/reset-password/${token}`).reply(200, {});

    await resetPasswordReq(data, token);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe(`/user-service/user/reset-password/${token}`);
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(data);
  });

  it('sends a POST request to the correct URL with the correct data', async () => {
    const data = { userId: '123', newPassword: 'newpass', tenantId: '456' };
    mockAxios.onPost('/user-service/user/change-password').reply(200, {});

    await changePasswordReq(data);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('user-service/user/change-password');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(data);
  });

  it('sends a GET request to the correct URL with the correct headers', async () => {
    const token = 'abcd';
    mockAxios.onGet(`/user-service/user/verify-set-password/${token}`).reply(200, {});

    await getUsername(token);

    expect(mockAxios.history.get.length).toBe(1);
    expect(mockAxios.history.get[0].url).toBe(`/user-service/user/verify-set-password/${token}`);
  });

  it('sends a POST request to the correct URL with the correct data', async () => {
    const data = { password: 'newpass' };
    const id = '123';
    mockAxios.onPost(`/user-service/user/set-password/${id}`).reply(200, {});

    await createPassword(data, id);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe(`user-service/user/set-password/${id}`);
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(data);
  });

  it('sends a GET request to the correct URL', async () => {
    mockAxios.onGet('/spice-service/timezone').reply(200, {});

    await fetchTimezoneList();

    expect(mockAxios.history.get.length).toBe(1);
    expect(mockAxios.history.get[0].url).toBe('/spice-service/timezone');
  });

  it('sends a GET request to the correct URL', async () => {
    mockAxios.onGet('/spice-service/culture/list').reply(200, {});

    await fetchCultureList();

    expect(mockAxios.history.get.length).toBe(1);
    expect(mockAxios.history.get[0].url).toBe('/spice-service/culture/list');
  });

  it('sends a GET request to /user-service/user/profile', async () => {
    mockAxios.onGet('/user-service/user/profile').reply(200, {});

    await fetchLoggedInUser();

    expect(mockAxios.history.get.length).toBe(1);
    expect(mockAxios.history.get[0].url).toBe('/user-service/user/profile');
  });

  it('sends a GET request to /role/default-roles', async () => {
    mockAxios.onGet('/role/default-roles').reply(200, {});

    await getDefaultRoles();

    expect(mockAxios.history.get.length).toBe(1);
    expect(mockAxios.history.get[0].url).toBe('/role/default-roles');
  });

  it('sends a POST request to /user-service/user/validate-user with correct data', async () => {
    const email = 'test@test.com';
    const parentOrgId = '456';
    const ignoreTenantId = '789';

    mockAxios.onPost('/user-service/user/validate-user').reply(200, {});

    await fetchUserByEmail(email, parentOrgId, ignoreTenantId);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/user-service/user/validate-user');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      email,
      parentOrganizationId: parentOrgId,
      ignoreTenantId: ignoreTenantId
    });
  });

  it('sends a GET request to /user-service/user/details/:id with correct data', async () => {
    const id = '123';

    mockAxios.onGet(`/user-service/user/details/${id}`).reply(200, {});

    await fetchUserById({id} as any);

    expect(mockAxios.history.get.length).toBe(1);
    expect(mockAxios.history.get[0].url).toBe(`user-service/user/details/${id}`);
  });

  it('sends a POST request to /user-service/user/update with correct data', async () => {
    const payload = { id: '123', firstName: 'John', lastName: 'Doe' } as any;

    mockAxios.onPost('/user-service/user/update').reply(200, {});

    await updateUser(payload);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/user-service/user/update');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(payload);
  });

  it('sends a GET request to /admin-service/data/countries with correct data', async () => {
    mockAxios.onGet('/admin-service/data/countries?isActive=true').reply(200, {});

    await fetchCountryList();

    expect(mockAxios.history.get.length).toBe(1);
    expect(mockAxios.history.get[0].url).toBe('/admin-service/data/countries?isActive=true');
  });

  it('sends a POST request to /user-service/user/locked-users with correct data', async () => {
    const tenantId = 123;
    const skip = 0;
    const limit = 10;
    const search = 'John';
    const expectedData = { tenantId, skip, limit, searchTerm: search };

    mockAxios.onPost('/user-service/user/locked-users').reply(200, {});

    await fetchLockedUsers(tenantId, skip, limit, search);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/user-service/user/locked-users');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(expectedData);
  });

  it('sends a POST request to /user-service/user/unlock with correct data', async () => {
    const id = '123';
    const expectedData = { id };

    mockAxios.onPost('/user-service/user/unlock').reply(200, {});

    await unlockUsers(id);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/user-service/user/unlock');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(expectedData);
  });
});