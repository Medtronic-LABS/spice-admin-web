import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  fetchAccounts,
  fetchDeactivatedAccounts,
  createAccount,
  fetchAccountDetails,
  fetchDashboardAccounts,
  updateAccount,
  createAccountAdmin,
  updateAccountAdmin,
  deleteAccountAdmin,
  activateAccount,
  deactivateAccount,
  fetchAccountOptions,
  fetchAccountAdmins,
  fetchClinicalWorkflows,
  createAccountWorkflowModule,
  updateAccountWorkflowModule,
  deleteAccountWorkflowModule
} from '../accountAPI';

describe('fetchAccounts', () => {
  let mockAxios: any;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('sends a POST request to /admin-service/account/account-list with correct data', async () => {
    const tenantId = 1;
    const isActive = true;
    const skip = 0;
    const limit = 10;
    const search = 'example';
    const expectedData = {
      tenantId: 1,
      skip,
      limit,
      is_active: isActive,
      searchTerm: search
    };

    mockAxios.onPost('/admin-service/account/account-list').reply(200, {});

    await fetchAccounts(tenantId, isActive, skip, limit, search);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/account/account-list');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(expectedData);
  });

  it('sends a POST request to /admin-service/account/account-list with correct data and no search term', async () => {
    const tenantId = 1;
    const isActive = true;
    const skip = 0;
    const limit = 10;
    const expectedData = {
      tenantId: 1,
      skip,
      limit,
      is_active: isActive,
      searchTerm: ''
    };

    mockAxios.onPost('/admin-service/account/account-list').reply(200, {});

    await fetchAccounts(tenantId, isActive, skip, limit, '');

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/account/account-list');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(expectedData);
  });

  it('sends a POST request to /admin-service/account/deactivate-list with correct data', async () => {
    const skip = 0;
    const limit = 10;
    const sort = 'name';
    const search = 'example';
    const tenantId = 'tenant1';
    const expectedData = {
      skip,
      limit,
      sort,
      searchTerm: search,
      tenantId,
      isPaginated: true
    };

    mockAxios.onPost('/admin-service/account/deactivate-list').reply(200, {});

    await fetchDeactivatedAccounts(skip, limit, sort, search, tenantId);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/account/deactivate-list');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(expectedData);
  });

  it('sends a POST request to /admin-service/account/deactivate-list without search term and tenant ID', async () => {
    const skip = 0;
    const limit = 10;
    const sort = 'name';
    const expectedData = {
      skip,
      limit,
      sort,
      isPaginated: true
    };

    mockAxios.onPost('/admin-service/account/deactivate-list').reply(200, {});

    await fetchDeactivatedAccounts(skip, limit, sort);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/account/deactivate-list');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(expectedData);
  });

  it('sends a POST request to /user-service/organization/create-account with correct data', async () => {
    const accountData = {
      username: 'john.doe',
      email: 'john.doe@example.com',
      password: 'password123'
    } as any;

    mockAxios.onPost('/user-service/organization/create-account').reply(200, {});

    await createAccount(accountData);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/user-service/organization/create-account');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(accountData);
  });

  it('fetchAccountDetails sends a POST request to /admin-service/account/details with correct data', async () => {
    const requestData = { tenantId: 1, id: 123 };

    mockAxios.onPost('/admin-service/account/details').reply(200, {});

    await fetchAccountDetails(requestData);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/account/details');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(requestData);
  });

  it('fetchDashboardAccounts sends a POST request to /admin-service/account/list with correct data', async () => {
    const requestData = { skip: 0, limit: 10, tenantId: 'tenant1', searchTerm: 'example' };

    mockAxios.onPost('/admin-service/account/list').reply(200, {});

    await fetchDashboardAccounts(requestData);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/account/list');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(requestData);
  });

  it('updateAccount sends a PUT request to /admin-service/account/update with correct data', async () => {
    const accountData = { id: 123, name: 'John Doe' } as any;

    mockAxios.onPut('/admin-service/account/update').reply(200, {});

    await updateAccount(accountData);

    expect(mockAxios.history.put.length).toBe(1);
    expect(mockAxios.history.put[0].url).toBe('/admin-service/account/update');
    expect(JSON.parse(mockAxios.history.put[0].data)).toEqual(accountData);
  });

  it('createAccountAdmin sends a POST request to /admin-service/account/user-add with correct data', async () => {
    const adminData = { id: 123, username: 'admin', email: 'admin@example.com' } as any;

    mockAxios.onPost('/admin-service/account/user-add').reply(200, {});

    await createAccountAdmin(adminData);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/account/user-add');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(adminData);
  });

  it('updateAccountAdmin sends a PUT request to /admin-service/account/user-update with correct data', async () => {
    const adminData = { id: 123, username: 'admin', email: 'admin@example.com' } as any;

    mockAxios.onPut('/admin-service/account/user-update').reply(200, {});

    await updateAccountAdmin(adminData);

    expect(mockAxios.history.put.length).toBe(1);
    expect(mockAxios.history.put[0].url).toBe('/admin-service/account/user-update');
    expect(JSON.parse(mockAxios.history.put[0].data)).toEqual(adminData);
  });

  it('deleteAccountAdmin sends a DELETE request to /admin-service/account/user-remove with correct data', async () => {
    const accountData = { tenantId: 'tenant1', id: '123' };

    mockAxios.onDelete('/admin-service/account/user-remove').reply(200, {});

    await deleteAccountAdmin(accountData);

    expect(mockAxios.history.delete.length).toBe(1);
    expect(mockAxios.history.delete[0].url).toBe('/admin-service/account/user-remove');
    expect(JSON.parse(mockAxios.history.delete[0].data)).toEqual(accountData);
  });

  it('activateAccount sends a PUT request to /admin-service/account/activate with correct data', async () => {
    const requestData = { tenantId: 1 } as any;

    mockAxios.onPut('/admin-service/account/activate').reply(200, {});

    await activateAccount(requestData);

    expect(mockAxios.history.put.length).toBe(1);
    expect(mockAxios.history.put[0].url).toBe('/admin-service/account/activate');
    expect(JSON.parse(mockAxios.history.put[0].data)).toEqual(requestData);
  });

  it('deactivateAccount sends a PUT request to /admin-service/account/deactivate with correct data', async () => {
    const requestData = { tenantId: 1, id: 123 } as any;

    mockAxios.onPut('/admin-service/account/deactivate').reply(200, {});

    await deactivateAccount(requestData);

    expect(mockAxios.history.put.length).toBe(1);
    expect(mockAxios.history.put[0].url).toBe('/admin-service/account/deactivate');
    expect(JSON.parse(mockAxios.history.put[0].data)).toEqual(requestData);
  });

  
  it('fetchAccountOptions sends a POST request to /admin-service/account/account-list with correct data', async () => {
    const requestData = { tenantId: 1, skip: 0, limit: 10, isActive: true } as any;

    mockAxios.onPost('/admin-service/account/account-list').reply(200, {});

    await fetchAccountOptions(requestData);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/account/account-list');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(requestData);
  });

  it('fetchAccountAdmins sends a POST request to /user-service/user/admin-users with correct data', async () => {
    const requestData = { skip: 0, limit: 10 } as any;

    mockAxios.onPost('/user-service/user/admin-users').reply(200, {});

    await fetchAccountAdmins(requestData);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/user-service/user/admin-users');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(requestData);
  });

  it('fetchClinicalWorkflows sends a POST request to /admin-service/clinical-workflow/list with correct data', async () => {
    const requestData = { tenantId: 1, skip: 0, limit: 10 } as any;

    mockAxios.onPost('/admin-service/clinical-workflow/list').reply(200, {});

    await fetchClinicalWorkflows(requestData);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/clinical-workflow/list');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(requestData);
  });

  it('createAccountWorkflowModule sends a POST request to /admin-service/clinical-workflow/create with correct data', async () => {
    const requestData = { moduleId: 1, workflowId: 123 } as any;

    mockAxios.onPost('/admin-service/clinical-workflow/create').reply(200, {});

    await createAccountWorkflowModule(requestData);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/clinical-workflow/create');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(requestData);
  });

  
  it('updateAccountWorkflowModule sends a PUT request to /admin-service/clinical-workflow/update with correct data', async () => {
    const requestData = { moduleId: 1, workflowId: 123 } as any;

    mockAxios.onPut('/admin-service/clinical-workflow/update').reply(200, {});

    await updateAccountWorkflowModule(requestData);

    expect(mockAxios.history.put.length).toBe(1);
    expect(mockAxios.history.put[0].url).toBe('/admin-service/clinical-workflow/update');
    expect(JSON.parse(mockAxios.history.put[0].data)).toEqual(requestData);
  });

  it('deleteAccountWorkflowModule sends a PUT request to /admin-service/clinical-workflow/remove with correct data', async () => {
    const requestData = { moduleId: 1, workflowId: 123 } as any;

    mockAxios.onPut('/admin-service/clinical-workflow/remove').reply(200, {});

    await deleteAccountWorkflowModule(requestData);

    expect(mockAxios.history.put.length).toBe(1);
    expect(mockAxios.history.put[0].url).toBe('/admin-service/clinical-workflow/remove');
    expect(JSON.parse(mockAxios.history.put[0].data)).toEqual(requestData);
  });
});
