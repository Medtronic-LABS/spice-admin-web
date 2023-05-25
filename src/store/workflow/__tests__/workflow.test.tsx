import { runSaga } from 'redux-saga';
import { customizeForm, deactivateConsentForm, fetchCustomizationForm, fetchFormMeta } from '../sagas';
import * as workflowService from '../../../services/workflowAPI';
import * as workflowActions from '../actions';
import * as ACTION_TYPES from '../actionTypes';
import { AxiosPromise } from 'axios';
import WORKFLOW_MOCK_DATA from '../workflowMockData';
import { FormType } from '../types';
import { FormTypes } from '../../../containers/region/RegionCustomization';

const inputFormRegionReqPayload = WORKFLOW_MOCK_DATA.FETCH_INPUT_FORM_REGION_REQ_PAYLOAD;
const inputFormRegionResPayload = WORKFLOW_MOCK_DATA.FETCH_INPUT_FORM_REGION_RES_PAYLOAD;
const inputFormAccountReqPayload = WORKFLOW_MOCK_DATA.FETCH_INPUT_FORM_ACCOUNT_REQ_PAYLOAD;
const consentFormRegionReqPayload = WORKFLOW_MOCK_DATA.FETCH_CONSENT_FORM_REGION_REQ_PAYLOAD;
const consentFormAccountReqPayload = WORKFLOW_MOCK_DATA.FETCH_CONSENT_FORM_ACCOUNT_REQ_PAYLOAD;
const formMetaResponsePayload = WORKFLOW_MOCK_DATA.FETCH_FORM_META_RESPONSE;
const updateInputFormReqPayload = WORKFLOW_MOCK_DATA.UPDATE_INPUT_FORM_REQ_PAYLOAD;

describe('Fetch customization and consent form in region and account', () => {
  [
    inputFormRegionReqPayload,
    inputFormAccountReqPayload,
    consentFormRegionReqPayload,
    consentFormAccountReqPayload
  ].forEach((requestPayload: any) => {
    it(`Fetch ${requestPayload.category === 'Input_form' ? 'customization' : 'consent'} form for ${
      requestPayload?.accountId || requestPayload?.clinicalWorkflowId ? 'account' : 'region'
    } and dispatches success`, async () => {
      const fetchInputFormRegionSpy = jest.spyOn(workflowService, 'fetchCustomizationForm').mockImplementation(
        () =>
          Promise.resolve({
            data: { entity: inputFormRegionResPayload }
          }) as AxiosPromise
      );
      const payload =
        requestPayload.category === 'Input_form'
          ? { ...inputFormRegionResPayload, form_input: JSON.parse(inputFormRegionResPayload?.formInput) }
          : inputFormRegionResPayload;
      const dispatched: any = [];
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action)
        },
        fetchCustomizationForm,
        { ...requestPayload, type: ACTION_TYPES.FETCH_CUSTOMIZATION_FORM_REQUEST }
      ).toPromise();
      expect(fetchInputFormRegionSpy).toHaveBeenCalledWith(requestPayload);
      expect(dispatched).toEqual([
        requestPayload.category === 'Input_form'
          ? workflowActions.fetchCustomizationFormSuccess({ payload })
          : workflowActions.fetchConsentFormSuccess({ payload: inputFormRegionResPayload })
      ]);
    });
  });

  it('Fails to fetch customization or consent form and dispatches failure', async () => {
    const error = new Error('Failed to fetch customization or consent form');
    const fetchCustomizationSpy = jest
      .spyOn(workflowService, 'fetchCustomizationForm')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchCustomizationForm,
      { ...inputFormRegionReqPayload, type: ACTION_TYPES.FETCH_CUSTOMIZATION_FORM_REQUEST }
    ).toPromise();
    expect(fetchCustomizationSpy).toHaveBeenCalledWith(inputFormRegionReqPayload);
    expect(dispatched).toEqual([workflowActions.fetchCustomizationFormFailure(error)]);
  });
});

describe('Fetch Form Meta', () => {
  (['screening', 'enrollment', 'assessment', ''] as FormType[]).forEach((formType) => {
    it(`Fetch form meta for ${formType} and dispatches success`, async () => {
      const fetchFormMetaSpy = jest.spyOn(workflowService, 'fetchFormMeta').mockImplementation(
        () =>
          Promise.resolve({
            data: {
              entity: { components: formMetaResponsePayload.components }
            }
          }) as AxiosPromise
      );
      const dispatched: any = [];
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action)
        },
        fetchFormMeta,
        {
          formType,
          type: ACTION_TYPES.FETCH_FORM_META_REQUEST
        }
      ).toPromise();
      switch (formType) {
        case FormTypes.Screening:
          expect(fetchFormMetaSpy).toHaveBeenCalledWith('screeninglog');
          break;
        case FormTypes.Enrollment:
          expect(fetchFormMetaSpy).toHaveBeenCalledWith('patient');
          break;
        case FormTypes.Assessment:
          expect(fetchFormMetaSpy).toHaveBeenCalledWith('bplog');
          expect(fetchFormMetaSpy).toHaveBeenCalledWith('glucoselog');
          break;
        default:
          break;
      }
      expect(dispatched).toEqual([
        workflowActions.fetchFormMetaSuccess({
          formType,
          payload: formType ? formMetaResponsePayload.components || [] : []
        })
      ]);
      fetchFormMetaSpy.mockClear();
    });
  });

  it('Fetch form meta for screening and dispatches failure', async () => {
    const error = new Error('Failed to fetch form meta for screening');
    const fetchFormMetaSpy = jest
      .spyOn(workflowService, 'fetchFormMeta')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchFormMeta,
      {
        formType: 'screening',
        type: ACTION_TYPES.FETCH_FORM_META_REQUEST
      }
    ).toPromise();
    expect(fetchFormMetaSpy).toHaveBeenCalledWith('screeninglog');
    expect(dispatched).toEqual([workflowActions.fetchFormMetaFailure()]);
  });
});

describe('Update customization form in Region', () => {
  it('Update customization form and dispatches success', async () => {
    const updateFormDataSpy = jest
      .spyOn(workflowService, 'updateCustomizationForm')
      .mockImplementation(() => Promise.resolve({}) as AxiosPromise);
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      customizeForm,
      {
        ...updateInputFormReqPayload,
        type: ACTION_TYPES.CUSTOMIZE_FORM_REQUEST
      }
    ).toPromise();
    expect(updateFormDataSpy).toHaveBeenCalledWith(updateInputFormReqPayload);
    expect(dispatched).toEqual([workflowActions.customizeFormSuccess()]);
  });

  it('Update customization form and dispatches failure', async () => {
    const updateFormDataSpy = jest
      .spyOn(workflowService, 'updateCustomizationForm')
      .mockImplementation(() => Promise.reject(new Error('Failed to update the form')));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      customizeForm,
      {
        ...updateInputFormReqPayload,
        type: ACTION_TYPES.CUSTOMIZE_FORM_REQUEST
      }
    ).toPromise();
    expect(updateFormDataSpy).toHaveBeenCalledWith(updateInputFormReqPayload);
    expect(dispatched).toEqual([workflowActions.customizeFormFailure()]);
  });
});

describe('Deactivate a consent form in Region', () => {
  it('Deactivate a consent form and dispatches success', async () => {
    const removeConsentFormSpy = jest
      .spyOn(workflowService, 'deactivateConsentForm')
      .mockImplementation(() => Promise.resolve({}) as AxiosPromise);
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      deactivateConsentForm,
      {
        formType: 'Enrollment' as FormType,
        formId: '59',
        category: 'Consent_form',
        tenantId: '4',
        type: ACTION_TYPES.DEACTIVATE_CONSENT_FORM_REQUEST
      }
    ).toPromise();
    expect(removeConsentFormSpy).toHaveBeenCalledWith({
      formType: 'Enrollment' as FormType,
      formId: '59',
      category: 'Consent_form',
      tenantId: '4'
    });
    expect(dispatched).toEqual([workflowActions.deactivateConsentSuccess()]);
  });

  it('Fails to deactivate a consent form and dispatches failure', async () => {
    const removeConsentFormSpy = jest
      .spyOn(workflowService, 'deactivateConsentForm')
      .mockImplementation(() => Promise.reject(new Error('Failed to update the form')));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      deactivateConsentForm,
      {
        formType: 'Enrollment' as FormType,
        formId: '59',
        category: 'Consent_form',
        tenantId: '4',
        type: ACTION_TYPES.DEACTIVATE_CONSENT_FORM_REQUEST
      }
    ).toPromise();
    expect(removeConsentFormSpy).toHaveBeenCalledWith({
      formType: 'Enrollment' as FormType,
      formId: '59',
      category: 'Consent_form',
      tenantId: '4'
    });
    expect(dispatched).toEqual([workflowActions.deactivateConsentFailure()]);
  });
});
