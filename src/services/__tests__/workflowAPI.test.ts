import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { 
    fetchCustomizationForm,
    fetchFormMeta,
    updateCustomizationForm,
    deactivateConsentForm
} from '../workflowAPI';

describe('Workflow Service', () => {
  let mockAxios: any;
  
  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('sends a POST request to /admin-service/region-customization/details with correct data', async () => {
    const request = {
      tenantId: '1',
      formType: 'formType',
      category: 'category',
      cultureId: 'cultureId',
      countryId: 'countryId',
      accountId: undefined,
      clinicalWorkflowId: undefined
    } as any;

    mockAxios
      .onPost('/admin-service/region-customization/details')
      .reply(200, {});

    await fetchCustomizationForm(request);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/region-customization/details');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      tenantId: '1',
      type: 'formType',
      category: 'category',
      cultureId: 'cultureId',
      countryId: 'countryId',
      accountId: undefined,
      clinicalWorkflowId: undefined
    });
  });

  it('sends a POST request to /admin-service/account-customization/details with correct data', async () => {
    const request = {
      tenantId: '1',
      formType: 'formType',
      category: 'category',
      cultureId: 'cultureId',
      countryId: 'countryId',
      accountId: '1',
      clinicalWorkflowId: undefined
    } as any;

    mockAxios
      .onPost('/admin-service/account-customization/details')
      .reply(200, {});

    await fetchCustomizationForm(request);

    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('/admin-service/account-customization/details');
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
      tenantId: '1',
      type: 'formType',
      category: 'category',
      cultureId: 'cultureId',
      countryId: 'countryId',
      accountId: '1',
      clinicalWorkflowId: undefined
    });
  });

  it('sends a GET request to /spice-service/static-data/get-meta-form with correct formType', async () => {
    const formType = 'myFormType' as any;

    mockAxios.onGet(`spice-service/static-data/get-meta-form?form=${formType}`).reply(200, {});

    await fetchFormMeta(formType);

    expect(mockAxios.history.get.length).toBe(1);
    expect(mockAxios.history.get[0].url).toBe(`spice-service/static-data/get-meta-form?form=${formType}`);
  });

  it('updateCustomizationForm sends a PUT request to /admin-service/account-customization/update if formId is present', async () => {
    const formType = 'consent';
    const formId = '1';
    const category = 'category';
    const tenantId = '2';
    const payload = {field: 'value'};
    const countryId = '3';
    const accountId = '4';
    const workflowId = '5';
    const clinicalWorkflowId = '6';
    const cultureId = 7;
  
    mockAxios.onPut('/admin-service/account-customization/update').reply(200, {});
  
    await updateCustomizationForm({
      formType,
      formId,
      category,
      tenantId,
      payload,
      countryId,
      accountId,
      workflowId,
      clinicalWorkflowId,
      cultureId,
    }as any);
  
    expect(mockAxios.history.put.length).toBe(1);
    expect(mockAxios.history.put[0].url).toBe('/admin-service/account-customization/update');
    expect(JSON.parse(mockAxios.history.put[0].data)).toEqual({
      type: formType,
      countryId,
      tenantId,
      accountId,
      category,
      formInput: payload,
      id: formId,
      workflow: workflowId,
      clinicalWorkflowId,
      cultureId,
    });
  });

  it('deactivateConsentForm sends a PUT request to /admin-service/account-customization/remove with correct data', async () => {
    const formType = 'someFormType';
    const formId = 'someFormId';
    const category = 'someCategory';
    const tenantId = 'someTenantId';
  
    mockAxios.onPut('/admin-service/account-customization/remove').reply(200, {});
  
    await deactivateConsentForm({ formType, formId, category, tenantId } as any);
  
    expect(mockAxios.history.put.length).toBe(1);
    expect(mockAxios.history.put[0].url).toBe('/admin-service/account-customization/remove');
    expect(JSON.parse(mockAxios.history.put[0].data)).toEqual({
      type: formType,
      tenantId,
      category,
      id: formId
    });
  });
  
});