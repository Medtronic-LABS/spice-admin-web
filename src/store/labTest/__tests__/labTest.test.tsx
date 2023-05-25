import { runSaga } from 'redux-saga';
import { AxiosResponse } from 'axios';
import * as labTestService from '../../../services/labtestAPI';
import {
  addLabTest,
  deleteLabtest,
  deleteLabTestRange,
  fetchLabResultUnitList,
  fetchLabTest,
  fetchLabTestById,
  fetchUnitList,
  saveLabTestResultUnit,
  updateLabTest
} from '../sagas';
import * as ACTION_TYPES from '../actionTypes';
import * as labTestActions from '../actions';
import MOCK_DATA_CONSTANTS from '../../../tests/mockData/labTestDataConstants';

const fetchLabTestByIdRequestMockData = MOCK_DATA_CONSTANTS.ID_AND_TENANT_ID_PAYLOAD;
const fetchLabTestByIdResponseMockData = MOCK_DATA_CONSTANTS.FETCH_LABTEST_BY_ID_RESPONSE_PAYLOAD;
const fetchLabTestsRequestMockData = MOCK_DATA_CONSTANTS.FETCH_LABTEST_LIST_REQUEST_PAYLOAD;
const fetchLabTestsResponseMockData = MOCK_DATA_CONSTANTS.FETCH_LABTEST_LIST_RESPONSE_PAYLOAD;
const createLabTestRequestMockData = MOCK_DATA_CONSTANTS.CREATE_LABTEST_REQUEST_PAYLOAD;
const updateLabTestRequestMockData = MOCK_DATA_CONSTANTS.UPDATE_LABTEST_REQUEST_PAYLOAD;
const deleteLabTestRequestMockData = MOCK_DATA_CONSTANTS.DELETE_LABTEST_REQUEST_PAYLOAD;
const fetchUnitListResponseMockData = MOCK_DATA_CONSTANTS.FETCH_UNIT_LIST_RESPONSE_PAYLOAD;
const fetchLabTestResultRangesRequestMockData = MOCK_DATA_CONSTANTS.FETCH_LABTEST_RESULT_RANGES_REQUEST_PAYLOAD;
const fetchLabTestResultRangesResponseMockData = MOCK_DATA_CONSTANTS.FETCH_LABTEST_RESULT_RANGES_RESPONSE_PAYLOAD;
const saveLabTestResultRangeRequestMockData = MOCK_DATA_CONSTANTS.SAVE_LABTEST_RESULT_RANGE_REQUEST_PAYLOAD;
const deleteLabTestRangeRequestMockData = MOCK_DATA_CONSTANTS.ID_AND_TENANT_ID_PAYLOAD;

describe('Fetch a single lab test', () => {
  it('Fetches a lab test and dispatches success', async () => {
    const fetchLabTestByIdSpy = jest.spyOn(labTestService, 'fetchLabTestbyId').mockImplementation(() => {
      return Promise.resolve({ data: { entity: fetchLabTestByIdResponseMockData } } as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchLabTestById,
      { payload: fetchLabTestByIdRequestMockData, type: ACTION_TYPES.FETCH_LABTEST_BY_ID_REQUEST }
    ).toPromise();
    expect(fetchLabTestByIdSpy).toHaveBeenCalledWith(fetchLabTestByIdRequestMockData);
    expect(dispatched).toEqual([labTestActions.fetchLabtestByIdSuccess(fetchLabTestByIdResponseMockData)]);
  });

  it('Fails to fetch a lab test and dispatches failure', async () => {
    const error = new Error('Failed to fetch lab test');
    const fetchLabTestByIdSpy = jest.spyOn(labTestService, 'fetchLabTestbyId').mockImplementation(() => {
      return Promise.reject(error);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchLabTestById,
      { payload: fetchLabTestByIdRequestMockData, type: ACTION_TYPES.FETCH_LABTEST_BY_ID_REQUEST }
    ).toPromise();
    expect(fetchLabTestByIdSpy).toHaveBeenCalledWith(fetchLabTestByIdRequestMockData);
    expect(dispatched).toEqual([labTestActions.fetchLabtestByIdFailure()]);
  });
});

describe('Fetch a list of lab tests', () => {
  it('Fetches a list of lab tests and dispatches success', async () => {
    const fetchLabTestsSpy = jest.spyOn(labTestService, 'fetchLabTest').mockImplementation(() => {
      return Promise.resolve({ data: { entityList: fetchLabTestsResponseMockData, totalCount: 10 } } as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchLabTest,
      { data: fetchLabTestsRequestMockData, type: ACTION_TYPES.FETCH_LABTEST_REQUEST }
    ).toPromise();
    expect(fetchLabTestsSpy).toHaveBeenCalledWith(fetchLabTestsRequestMockData);
    expect(dispatched).toEqual([
      labTestActions.fetchLabtestsSuccess({ labtests: fetchLabTestsResponseMockData, total: 10 })
    ]);
  });

  it('Fails to fetch lab test list and dispatches failure', async () => {
    const error = new Error('Failed to fetch lab test list');
    const fetchLabTestsSpy = jest.spyOn(labTestService, 'fetchLabTest').mockImplementation(() => {
      return Promise.reject(error);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchLabTest,
      { data: fetchLabTestsRequestMockData, type: ACTION_TYPES.FETCH_LABTEST_REQUEST }
    ).toPromise();
    expect(fetchLabTestsSpy).toHaveBeenCalledWith(fetchLabTestsRequestMockData);
    expect(dispatched).toEqual([labTestActions.fetchLabtestsFailure(error)]);
  });
});

describe('Add a lab test', () => {
  it('Adds a new lab test and dispatches success', async () => {
    const createLabTestSpy = jest
      .spyOn(labTestService, 'addLabTest')
      .mockImplementation(() => Promise.resolve({} as AxiosResponse));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      addLabTest,
      { data: createLabTestRequestMockData, type: ACTION_TYPES.CREATE_LABTEST_REQUEST }
    ).toPromise();
    expect(createLabTestSpy).toHaveBeenCalledWith(createLabTestRequestMockData);
    expect(dispatched).toEqual([labTestActions.createLabtestSuccess()]);
  });

  it('Fails to add lab test and dispatches failure', async () => {
    const error = new Error('Failed to create lab test');
    const createLabTestSpy = jest.spyOn(labTestService, 'addLabTest').mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      addLabTest,
      { data: createLabTestRequestMockData, type: ACTION_TYPES.CREATE_LABTEST_REQUEST }
    ).toPromise();
    expect(createLabTestSpy).toHaveBeenCalledWith(createLabTestRequestMockData);
    expect(dispatched).toEqual([labTestActions.createLabtestFailure()]);
  });
});

describe('Update a lab test', () => {
  it('Updates a lab test and dispatches success', async () => {
    const updateLabTestSpy = jest
      .spyOn(labTestService, 'updateLabTest')
      .mockImplementation(() => Promise.resolve({} as AxiosResponse));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateLabTest,
      { data: updateLabTestRequestMockData, type: ACTION_TYPES.UPDATE_LABTEST_REQUEST }
    ).toPromise();
    expect(updateLabTestSpy).toHaveBeenCalledWith(updateLabTestRequestMockData);
    expect(dispatched).toEqual([labTestActions.updateLabtestSuccess()]);
  });

  it('Fails to add lab test and dispatches failure', async () => {
    const error = new Error('Failed to update lab test');
    const updateLabTestSpy = jest
      .spyOn(labTestService, 'updateLabTest')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateLabTest,
      { data: updateLabTestRequestMockData, type: ACTION_TYPES.UPDATE_LABTEST_REQUEST }
    ).toPromise();
    expect(updateLabTestSpy).toHaveBeenCalledWith(updateLabTestRequestMockData);
    expect(dispatched).toEqual([labTestActions.updateLabtestFailure(error)]);
  });
});

describe('Delete a lab test', () => {
  it('Removes a lab test and dispatches success', async () => {
    const deleteLabTestSpy = jest
      .spyOn(labTestService, 'deleteLabtest')
      .mockImplementation(() => Promise.resolve({} as AxiosResponse));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      deleteLabtest,
      { data: deleteLabTestRequestMockData, type: ACTION_TYPES.DELETE_LABTEST_REQUEST }
    ).toPromise();
    expect(deleteLabTestSpy).toHaveBeenCalledWith(deleteLabTestRequestMockData);
    expect(dispatched).toEqual([labTestActions.deleteLabtestSuccess()]);
  });

  it('Fails to remove lab test and dispatches failure', async () => {
    const error = new Error('Failed to remove lab test');
    const deleteLabTestSpy = jest
      .spyOn(labTestService, 'deleteLabtest')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      deleteLabtest,
      { data: deleteLabTestRequestMockData, type: ACTION_TYPES.DELETE_LABTEST_REQUEST }
    ).toPromise();
    expect(deleteLabTestSpy).toHaveBeenCalledWith(deleteLabTestRequestMockData);
    expect(dispatched).toEqual([labTestActions.deleteLabtestFail(error)]);
  });
});

describe('Fetches a list of units', () => {
  it('Fetches unit list and dispatches success', async () => {
    const dispatchedResponse = fetchUnitListResponseMockData.map(({ name, id }: any) => ({
      unit: name,
      id
    }));
    jest
      .spyOn(labTestService, 'fetchUnitList')
      .mockImplementation(() => Promise.resolve({ data: fetchUnitListResponseMockData } as AxiosResponse));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchUnitList,
      { unitType: "labtest", type: ACTION_TYPES.FETCH_UNIT_LIST_REQUEST }
    ).toPromise();
    expect(dispatched).toEqual([labTestActions.fetchUnitListSuccess(dispatchedResponse, 'labtest')]);
  });

  it('Fails to fetch unit list and dispatches failure', async () => {
    const error = new Error('Failed to fetch unit list');
    jest.spyOn(labTestService, 'fetchUnitList').mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchUnitList,
      { unitType: "labtest", type: ACTION_TYPES.FETCH_UNIT_LIST_REQUEST }
    ).toPromise();
    expect(dispatched).toEqual([labTestActions.fetchUnitListFail(error)]);
  });
});

describe('Fetches a list of lab test result ranges', () => {
  it('Fetches lab test result range list and dispatches success', async () => {
    const dispatchedResponse = fetchLabTestResultRangesResponseMockData;
    dispatchedResponse.forEach(
      (labResultRange: any) =>
        (labResultRange.unitId = {
          id: labResultRange.unitId,
          unit: labResultRange.unit
        })
    );
    const fetchLabTestResultRangeListSpy = jest
      .spyOn(labTestService, 'fetchLabTestRange')
      .mockImplementation(() =>
        Promise.resolve({ data: { entityList: fetchLabTestResultRangesResponseMockData } } as AxiosResponse)
      );
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchLabResultUnitList,
      { data: fetchLabTestResultRangesRequestMockData, type: ACTION_TYPES.FETCH_LABTEST_RESULT_RANGE_LIST_REQUEST }
    ).toPromise();
    expect(fetchLabTestResultRangeListSpy).toHaveBeenCalledWith(fetchLabTestResultRangesRequestMockData);
    expect(dispatched).toEqual([labTestActions.fetchLabResultRangeListSuccess(dispatchedResponse)]);
  });

  it('Fails to fetch lab test result range list and dispatches failure', async () => {
    const error = new Error('Failed to fetch lab test result range list');
    const fetchLabTestResultRangeListSpy = jest
      .spyOn(labTestService, 'fetchLabTestRange')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchLabResultUnitList,
      { data: fetchLabTestResultRangesRequestMockData, type: ACTION_TYPES.FETCH_LABTEST_RESULT_RANGE_LIST_REQUEST }
    ).toPromise();
    expect(fetchLabTestResultRangeListSpy).toHaveBeenCalledWith(fetchLabTestResultRangesRequestMockData);
    expect(dispatched).toEqual([labTestActions.fetchLabResultRangeListFail(error)]);
  });
});

describe('Save a lab test result range', () => {
  it('Adds or updates a lab test result range and dispatches success', async () => {
    const saveLabTestResultRangeSpy = jest
      .spyOn(labTestService, 'saveUpdateLabTestResultRanges')
      .mockImplementation(() => Promise.resolve({} as AxiosResponse));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      saveLabTestResultUnit,
      {
        data: saveLabTestResultRangeRequestMockData,
        type: ACTION_TYPES.SAVE_LABTEST_RESULT_RANGES_REQUEST,
        isUpdate: false
      }
    ).toPromise();
    expect(saveLabTestResultRangeSpy).toHaveBeenCalledWith(saveLabTestResultRangeRequestMockData, false);
    expect(dispatched).toEqual([labTestActions.saveUpdateLabResultRangesSuccess()]);
  });

  it('Fails to add lab test and dispatches failure', async () => {
    const error = new Error('Failed to create lab test');
    const saveLabTestResultRangeSpy = jest
      .spyOn(labTestService, 'saveUpdateLabTestResultRanges')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      saveLabTestResultUnit,
      {
        data: saveLabTestResultRangeRequestMockData,
        type: ACTION_TYPES.SAVE_LABTEST_RESULT_RANGES_REQUEST,
        isUpdate: false
      }
    ).toPromise();
    expect(saveLabTestResultRangeSpy).toHaveBeenCalledWith(saveLabTestResultRangeRequestMockData, false);
    expect(dispatched).toEqual([labTestActions.saveUpdateLabResultRangesFail(error)]);
  });
});

describe('Delete a lab test range', () => {
  it('Removes lab test range and dispatches success', async () => {
    const deleteLabTestRangeSpy = jest
      .spyOn(labTestService, 'deleteLabTestRange')
      .mockImplementation(() => Promise.resolve({} as AxiosResponse));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      deleteLabTestRange,
      { data: deleteLabTestRangeRequestMockData, type: ACTION_TYPES.LABTEST_RESULT_RANGE_DELETE_REQUEST }
    ).toPromise();
    expect(deleteLabTestRangeSpy).toHaveBeenCalledWith(deleteLabTestRangeRequestMockData);
    expect(dispatched).toEqual([labTestActions.deleteLabTestRangeSuccess()]);
  });

  it('Fails to remove lab test range and dispatches failure', async () => {
    const error = new Error('Failed to remove lab test range');
    const deleteLabTestRangeSpy = jest
      .spyOn(labTestService, 'deleteLabTestRange')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      deleteLabTestRange,
      { data: deleteLabTestRangeRequestMockData, type: ACTION_TYPES.LABTEST_RESULT_RANGE_DELETE_REQUEST }
    ).toPromise();
    expect(deleteLabTestRangeSpy).toHaveBeenCalledWith(deleteLabTestRangeRequestMockData);
    expect(dispatched).toEqual([labTestActions.deleteLabTestRangeFaliure(error)]);
  });
});
