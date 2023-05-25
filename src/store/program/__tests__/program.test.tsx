import { runSaga } from 'redux-saga';
import {
  fetchProgramList,
  fetchProgramDetailsRequest,
  createProgram,
  updateProgramDetailsRequest,
  deleteProgram
} from '../sagas';
import * as programService from '../../../services/programAPI';
import * as programActions from '../actions';
import * as ACTION_TYPES from '../actionTypes';
import { AxiosPromise } from 'axios';
import PROGRAM_MOCK_DATA from '../programMockDataConstants';

const programListRequestPayload = PROGRAM_MOCK_DATA.PROGRAM_LIST_REQUEST_PAYLOAD;
const programListResponseData = PROGRAM_MOCK_DATA.PROGRAM_LIST;
const programCreateRequestPayload = PROGRAM_MOCK_DATA.PROGRAM_CREATE_REQUEST_PAYLOAD;
const programUpdateRequestPayload = PROGRAM_MOCK_DATA.PROGRAM_UPDATE_REQUEST_PAYLOAD;
const programDeleteRequestPayload = PROGRAM_MOCK_DATA.PROGRAM_TI_ID_PAYLOAD;
const programfetchDetailResponsePayload = PROGRAM_MOCK_DATA.PROGRAM_DETAIL_RESPONSE_PAYLOAD;

describe('Fetch Program List in Region', () => {
  it('Fetch all medication list and dispatches success', async () => {
    const fetchProgramListSpy = jest.spyOn(programService, 'fetchProgramList').mockImplementation(
      () =>
        Promise.resolve({
          data: { entityList: programListResponseData, totalCount: 10, limit: 10 }
        }) as AxiosPromise
    );
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchProgramList,
      { data: programListRequestPayload, type: ACTION_TYPES.FETCH_PROGRAM_LIST_REQUEST }
    ).toPromise();
    expect(fetchProgramListSpy).toHaveBeenCalledWith(programListRequestPayload);
    expect(dispatched).toEqual([
      programActions.fetchProgramListSuccess({ programs: programListResponseData, total: 10, limit: 10 })
    ]);
  });

  it('Fails to fetch all medication and dispatches failure', async () => {
    const error = new Error('Failed to fetch medication');
    const fetchProgramListSpy = jest
      .spyOn(programService, 'fetchProgramList')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchProgramList,
      { data: programListRequestPayload, type: ACTION_TYPES.FETCH_PROGRAM_LIST_REQUEST }
    ).toPromise();
    expect(fetchProgramListSpy).toHaveBeenCalledWith(programListRequestPayload);
    expect(dispatched).toEqual([programActions.fetchProgramListFailure(error)]);
  });
});

describe('Create Program in Region', () => {
  it('Create program and dispatches success', async () => {
    const createProgramSpy = jest
      .spyOn(programService, 'saveProgram')
      .mockImplementation(() => Promise.resolve({}) as AxiosPromise);
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      createProgram,
      {
        data: programCreateRequestPayload,
        type: ACTION_TYPES.CREATE_PROGRAM_REQUEST,
        successCb: () => null,
        failureCb: (e: Error) => null
      }
    ).toPromise();
    expect(createProgramSpy).toHaveBeenCalledWith(programCreateRequestPayload);
    expect(dispatched).toEqual([programActions.createProgramSuccess()]);
  });

  it('Create program and dispatches failure', async () => {
    const error = new Error('Failed to create program');
    const createProgramSpy = jest.spyOn(programService, 'saveProgram').mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      createProgram,
      {
        data: programCreateRequestPayload,
        type: ACTION_TYPES.CREATE_PROGRAM_REQUEST,
        successCb: () => null,
        failureCb: (e: Error) => null
      }
    ).toPromise();
    expect(createProgramSpy).toHaveBeenCalledWith(programCreateRequestPayload);
    expect(dispatched).toEqual([programActions.createProgramFail(error)]);
  });
});

describe('Update Program in Region', () => {
  it('Update program and dispatches success', async () => {
    const updateProgramSpy = jest
      .spyOn(programService, 'updateProgramDetails')
      .mockImplementation(() => Promise.resolve({}) as AxiosPromise);
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateProgramDetailsRequest,
      {
        data: programUpdateRequestPayload,
        type: ACTION_TYPES.UPDATE_PROGRAM_REQUEST,
        successCb: () => null,
        failureCb: (e) => null
      }
    ).toPromise();
    expect(updateProgramSpy).toHaveBeenCalledWith(programUpdateRequestPayload);
    expect(dispatched).toEqual([programActions.updateProgramSuccess()]);
  });

  it('Update program and dispatches failure', async () => {
    const updateProgramSpy = jest
      .spyOn(programService, 'updateProgramDetails')
      .mockImplementation(() => Promise.reject());
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateProgramDetailsRequest,
      {
        data: programUpdateRequestPayload,
        type: ACTION_TYPES.UPDATE_PROGRAM_REQUEST,
        successCb: () => null,
        failureCb: (e) => null
      }
    ).toPromise();
    expect(updateProgramSpy).toHaveBeenCalledWith(programUpdateRequestPayload);
    expect(dispatched).toEqual([programActions.updateProgramFail()]);
  });
});

describe('Delete a Program in Region', () => {
  it('Delete a medication and dispatches success', async () => {
    const deleteProgramSpy = jest
      .spyOn(programService, 'deleteProgram')
      .mockImplementation(() => Promise.resolve({}) as AxiosPromise);
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      deleteProgram,
      { ...programDeleteRequestPayload, type: ACTION_TYPES.DELETE_PROGRAM_REQUEST }
    ).toPromise();
    expect(deleteProgramSpy).toHaveBeenCalledWith('1', '1');
    expect(dispatched).toEqual([programActions.deleteProgramSuccess()]);
  });

  it('Fails to delete a medication and dispatches failure', async () => {
    const deleteProgramSpy = jest.spyOn(programService, 'deleteProgram').mockImplementation(() => Promise.reject());
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      deleteProgram,
      { ...programDeleteRequestPayload, type: ACTION_TYPES.DELETE_PROGRAM_REQUEST }
    ).toPromise();
    expect(deleteProgramSpy).toHaveBeenCalledWith('1', '1');
    expect(dispatched).toEqual([programActions.deleteProgramFailure()]);
  });
});

describe('Fetch a Program Detail', () => {
  it('Fetch a program detail and dispatches success', async () => {
    const fetchProgramDetailSpy = jest.spyOn(programService, 'fetchProgramDetails').mockImplementation(
      () =>
        Promise.resolve({
          data: { entity: programfetchDetailResponsePayload }
        }) as AxiosPromise
    );
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchProgramDetailsRequest,
      { ...programDeleteRequestPayload, type: ACTION_TYPES.FETCH_PROGRAM_DETAILS_REQUEST }
    ).toPromise();
    expect(fetchProgramDetailSpy).toHaveBeenCalledWith(programDeleteRequestPayload);
    expect(dispatched).toEqual([programActions.fetchProgramDetailsSuccess(programfetchDetailResponsePayload)]);
  });

  it('Fails to fetch aprogram detail and dispatches failure', async () => {
    const fetchProgramDetailSpy = jest
      .spyOn(programService, 'fetchProgramDetails')
      .mockImplementation(() => Promise.reject());
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchProgramDetailsRequest,
      { ...programDeleteRequestPayload, type: ACTION_TYPES.FETCH_PROGRAM_DETAILS_REQUEST }
    ).toPromise();
    expect(fetchProgramDetailSpy).toHaveBeenCalledWith(programDeleteRequestPayload);
    expect(dispatched).toEqual([programActions.fetchProgramDetailsFailure()]);
  });
});
