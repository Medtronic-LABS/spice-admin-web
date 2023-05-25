import { runSaga } from 'redux-saga';
import {
  createMedication,
  deleteMedication,
  fetchMedicationBrands,
  fetchMedicationClassifications,
  fetchMedicationDosageForms,
  fetchMedicationList,
  updateMedication,
  validateMedication
} from '../sagas';
import * as medicationService from '../../../services/medicationAPI';
import * as medicationActions from '../actions';
import MEDICATION_MOCK_DATA from '../../../tests/mockData/medicationDataConstants';
import * as ACTION_TYPES from '../actionTypes';
import { AxiosPromise } from 'axios';

const medicationListRequestPayload = MEDICATION_MOCK_DATA.MEDICATION_LIST_FETCH_PAYLOAD;
const medicationListDataPayload = MEDICATION_MOCK_DATA.MEDICATION_LIST_DATA;
const medicationTiIdRequestPayload = MEDICATION_MOCK_DATA.MEDICATION_TI_ID;
const medicationIList = MEDICATION_MOCK_DATA.MEDICATION_DROPDOWN_ILIST;

describe('Fetch Medication List in Region', () => {
  it('Fetch all medication list and dispatches success', async () => {
    const fetchMedicationListSpy = jest.spyOn(medicationService, 'getMedicationList').mockImplementation(
      () =>
        Promise.resolve({
          data: { entityList: medicationListDataPayload, totalCount: 10 }
        }) as AxiosPromise
    );
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchMedicationList,
      { ...medicationListRequestPayload, type: ACTION_TYPES.FETCH_MEDICATIONS_LIST_REQUEST }
    ).toPromise();
    expect(fetchMedicationListSpy).toHaveBeenCalledWith(0, 10, '207', '2', undefined);
    expect(dispatched).toEqual([
      medicationActions.fetchMedicationListSuccess({ list: medicationListDataPayload, total: 10 })
    ]);
  });

  it('Fails to fetch all medication and dispatches failure', async () => {
    const error = new Error('Failed to fetch medication');
    const fetchMedicationListSpy = jest
      .spyOn(medicationService, 'getMedicationList')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchMedicationList,
      { ...medicationListRequestPayload, type: ACTION_TYPES.FETCH_MEDICATIONS_LIST_REQUEST }
    ).toPromise();
    expect(fetchMedicationListSpy).toHaveBeenCalledWith(0, 10, '207', '2', undefined);
    expect(dispatched).toEqual([medicationActions.fetchMedicationlistFail(error)]);
  });
});

describe('Create Medication in Region', () => {
  it('Create medication and dispatches success', async () => {
    const createMedicationSpy = jest.spyOn(medicationService, 'createMedication').mockImplementation(
      () =>
        Promise.resolve({
          data: { entity: medicationListDataPayload, totalCount: 10 }
        }) as AxiosPromise
    );
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      createMedication,
      { data: medicationListDataPayload, type: ACTION_TYPES.CREATE_MEDICATION_REQUEST }
    ).toPromise();
    expect(createMedicationSpy).toHaveBeenCalledWith(medicationListDataPayload);
    expect(dispatched).toEqual([medicationActions.createMedicationSuccess()]);
  });

  it('Create medication and dispatches failure', async () => {
    const error = new Error('Failed to create medication');
    const createMedicationSpy = jest
      .spyOn(medicationService, 'createMedication')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      createMedication,
      { data: medicationListDataPayload, type: ACTION_TYPES.CREATE_MEDICATION_REQUEST }
    ).toPromise();
    expect(createMedicationSpy).toHaveBeenCalledWith(medicationListDataPayload);
    expect(dispatched).toEqual([medicationActions.createMedicationFailure(error)]);
  });
});

describe('Update Medication in Region', () => {
  it('Update medication and dispatches success', async () => {
    const validateMedicationSpy = jest
      .spyOn(medicationService, 'validateMedication')
      .mockImplementation(() => Promise.resolve({}) as AxiosPromise);
    const updateMedicationSpy = jest
      .spyOn(medicationService, 'updateMedication')
      .mockImplementation(() => Promise.resolve({}) as AxiosPromise);
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateMedication,
      { data: medicationListDataPayload[0], type: ACTION_TYPES.UPDATE_MEDICATION_REQUEST }
    ).toPromise();
    expect(validateMedicationSpy).toHaveBeenCalledWith(medicationListDataPayload[0]);
    expect(updateMedicationSpy).toHaveBeenCalledWith(medicationListDataPayload[0]);
    expect(dispatched).toEqual([medicationActions.updateMedicationSuccess()]);
  });

  it('Update medication and dispatches failure', async () => {
    const error = new Error('Failed to update medication');
    const updateMedicationSpy = jest
      .spyOn(medicationService, 'updateMedication')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateMedication,
      { data: medicationListDataPayload[0], type: ACTION_TYPES.UPDATE_MEDICATION_REQUEST }
    ).toPromise();
    expect(updateMedicationSpy).toHaveBeenCalledWith(medicationListDataPayload[0]);
    expect(dispatched).toEqual([medicationActions.updateMedicationFail(error)]);
  });
});

describe('Delete a Medication in Region', () => {
  it('Delete a medication and dispatches success', async () => {
    const deleteMedicationSpy = jest
      .spyOn(medicationService, 'deleteMedication')
      .mockImplementation(() => Promise.resolve() as any);
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      deleteMedication,
      { data: medicationTiIdRequestPayload, type: ACTION_TYPES.DELETE_MEDICATION_REQUEST }
    ).toPromise();
    expect(deleteMedicationSpy).toHaveBeenCalledWith(medicationTiIdRequestPayload);
    expect(dispatched).toEqual([medicationActions.deleteMedicationSuccess()]);
  });

  it('Fails to delete a medication and dispatches failure', async () => {
    const error = new Error('Failed to delete medication');
    const deleteMedicationSpy = jest
      .spyOn(medicationService, 'deleteMedication')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      deleteMedication,
      { data: medicationTiIdRequestPayload, type: ACTION_TYPES.DELETE_MEDICATION_REQUEST }
    ).toPromise();
    expect(deleteMedicationSpy).toHaveBeenCalledWith(medicationTiIdRequestPayload);
    expect(dispatched).toEqual([medicationActions.deleteMedicationFail(error)]);
  });
});

describe('Validate Medication in Region', () => {
  it('Validate medication and dispatches success', async () => {
    const validateMedicationSpy = jest
      .spyOn(medicationService, 'validateMedication')
      .mockImplementation(() => Promise.resolve({}) as AxiosPromise<any>);
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      validateMedication,
      { data: medicationListDataPayload[0], type: ACTION_TYPES.VALIDATE_MEDICATION }
    ).toPromise();
    expect(validateMedicationSpy).toHaveBeenCalledWith(medicationListDataPayload[0]);
    expect(dispatched).toEqual([]);
  });

  it('Validate medication and dispatches failure', async () => {
    const error = new Error('Validate medication failed');
    const validateMedicationSpy = jest
      .spyOn(medicationService, 'validateMedication')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      validateMedication,
      { data: medicationListDataPayload[0], type: ACTION_TYPES.VALIDATE_MEDICATION }
    ).toPromise();
    expect(validateMedicationSpy).toHaveBeenCalledWith(medicationListDataPayload[0]);
    expect(dispatched).toEqual([]);
  });
});

describe('Fetch the medication classification list', () => {
  it('Fetch the medication classification list and dispatches success', async () => {
    const fetchMedicationClassificationSpy = jest
      .spyOn(medicationService, 'getMedicationClassifications')
      .mockImplementation(() => {
        return Promise.resolve({ data: medicationIList }) as AxiosPromise<any>;
      });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchMedicationClassifications,
      { countryId: '2', type: ACTION_TYPES.FETCH_MEDICATION_CLASSIFICATIONS_REQUEST }
    ).toPromise();
    expect(fetchMedicationClassificationSpy).toHaveBeenCalledWith('2');
    expect(dispatched).toEqual([medicationActions.fetchClassificationsSuccess({ classifications: medicationIList })]);
  });

  it('Fails to fetch the medication classification and dispatches failure', async () => {
    const error = new Error('Failed to fetch the medication classification');
    const fetchMedicationClassificationSpy = jest
      .spyOn(medicationService, 'getMedicationClassifications')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchMedicationClassifications,
      { countryId: '2', type: ACTION_TYPES.FETCH_MEDICATION_CLASSIFICATIONS_REQUEST }
    ).toPromise();
    expect(fetchMedicationClassificationSpy).toHaveBeenCalledWith('2');
    expect(dispatched).toEqual([medicationActions.fetchClassificationsFailure()]);
  });
});

describe('Fetch the medication brands list', () => {
  it('Fetch the medication brands list and dispatches success', async () => {
    const fetchMedicationBrandSpy = jest.spyOn(medicationService, 'getMedicationBrands').mockImplementation(() => {
      return Promise.resolve({ data: medicationIList }) as AxiosPromise<any>;
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchMedicationBrands,
      { countryId: '2', classificationId: '1', type: ACTION_TYPES.FETCH_MEDICATION_BRANDS }
    ).toPromise();
    expect(fetchMedicationBrandSpy).toHaveBeenCalledWith('2', '1');
    expect(dispatched).toEqual([medicationActions.fetchMedicationBrandsSuccess({ brands: medicationIList })]);
  });

  it('Fails to fetch the medication brands and dispatches failure', async () => {
    const error = new Error('Failed to fetch the medication brands');
    const fetchMedicationBrandSpy = jest
      .spyOn(medicationService, 'getMedicationBrands')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchMedicationBrands,
      { countryId: '2', classificationId: '1', type: ACTION_TYPES.FETCH_MEDICATION_BRANDS }
    ).toPromise();
    expect(fetchMedicationBrandSpy).toHaveBeenCalledWith('2', '1');
    expect(dispatched).toEqual([medicationActions.fetchMedicationBrandsFailure()]);
  });
});

describe('Fetch the medication dosage list', () => {
  it('Fetch the medication dosage list and dispatches success', async () => {
    jest.spyOn(medicationService, 'getMedicationDosageForm').mockImplementation(() => {
      return Promise.resolve({ data: medicationIList }) as AxiosPromise<any>;
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchMedicationDosageForms
    ).toPromise();
    expect(dispatched).toEqual([medicationActions.fetchDosageFormsSuccess({ dosageForms: medicationIList })]);
  });

  it('Fails to fetch the medication dosage and dispatches failure', async () => {
    const error = new Error('Failed to fetch the medication dosage');
    jest.spyOn(medicationService, 'getMedicationDosageForm').mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchMedicationDosageForms
    ).toPromise();
    expect(dispatched).toEqual([medicationActions.fetchDosageFormsFailure()]);
  });
});
