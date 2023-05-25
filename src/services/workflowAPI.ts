import axios from 'axios';
import {
  FormLogType,
  ICustomizeFormRequest,
  IDeactivateConsentRequest,
  IFetchCustomizationFormRequest
} from '../store/workflow/types';

export const fetchCustomizationForm = ({
  tenantId,
  formType,
  category,
  cultureId,
  countryId,
  accountId,
  clinicalWorkflowId
}: IFetchCustomizationFormRequest) =>
  axios({
    method: 'POST',
    url: `/admin-service/${accountId || clinicalWorkflowId ? 'account' : 'region'}-customization/details`,
    data: {
      tenantId,
      type: formType,
      category,
      cultureId,
      countryId,
      accountId,
      clinicalWorkflowId
    }
  });

export const fetchFormMeta = (formType: FormLogType) =>
  axios({
    method: 'GET',
    url: `spice-service/static-data/get-meta-form?form=${formType}`
  });

export const updateCustomizationForm = ({
  formType,
  formId,
  category,
  tenantId,
  payload,
  countryId,
  accountId,
  workflowId,
  clinicalWorkflowId,
  cultureId
}: ICustomizeFormRequest) =>
  axios({
    method: formId ? 'PUT' : 'POST',
    url: `/admin-service/${accountId || clinicalWorkflowId ? 'account' : 'region'}-customization/${
      formId ? 'update' : 'create'
    }`,
    data: {
      type: formType,
      countryId,
      tenantId,
      accountId,
      category,
      formInput: payload,
      id: formId,
      workflow: workflowId,
      clinicalWorkflowId,
      cultureId
    }
  });

export const deactivateConsentForm = ({ formType, formId, category, tenantId }: IDeactivateConsentRequest) =>
  axios({
    method: 'PUT',
    url: `/admin-service/account-customization/remove`,
    data: {
      type: formType,
      tenantId,
      category,
      id: formId
    }
  });
