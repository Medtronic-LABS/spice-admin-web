import { runSaga } from 'redux-saga';
import { AxiosResponse } from 'axios';
import * as superAdminService from '../../../services/superAdminAPI';
import * as ACTION_TYPES from '../actionTypes';
import * as superAdminActions from '../actions';
import MOCK_DATA_CONSTANTS from '../../../tests/mockData/superAdminDataConstants';
import { createSuperAdminInfo, deleteSuperAdmin, fetchSuperAdmin, fetchSuperAdmins, updateSuperAdmin } from '../sagas';

const fetchSuperAdminsRequestMockData = MOCK_DATA_CONSTANTS.FETCH_SUPER_ADMINS_REQUEST_PAYLOAD;
const fetchSuperAdminsResponseMockData = [MOCK_DATA_CONSTANTS.SUPER_ADMINS_RESPONSE_PAYLOAD];
const fetchSuperAdminRequestMockData = { id: '4' };
const fetchSuperAdminResponseMockData = MOCK_DATA_CONSTANTS.SUPER_ADMIN_PAYLOAD;
const createSuperAdminsRequestMockData = [MOCK_DATA_CONSTANTS.SUPER_ADMIN_PAYLOAD];
const updateSuperAdminsRequestMockData = MOCK_DATA_CONSTANTS.SUPER_ADMIN_PAYLOAD;
const deleteSuperAdminRequestMockData = MOCK_DATA_CONSTANTS.DELETE_SUPER_ADMIN_RESPONSE_PAYLOAD;

describe('Fetch Super Admin List', () => {
  it('Fetches a list of super admins and dispatches success', async () => {
    const fetchSuperAdminListSpy = jest.spyOn(superAdminService, 'fetchSuperAdmins').mockImplementation(() =>
      Promise.resolve({
        data: { entityList: fetchSuperAdminsResponseMockData, totalCount: 10 }
      } as AxiosResponse)
    );
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchSuperAdmins,
      {
        ...fetchSuperAdminsRequestMockData,
        type: ACTION_TYPES.FETCH_SUPERADMINS_REQUEST
      }
    ).toPromise();
    const payload = {
      superAdmins: fetchSuperAdminsResponseMockData,
      total: 10
    };
    expect(fetchSuperAdminListSpy).toHaveBeenCalledWith(1, null, 'Sample');
    expect(dispatched).toEqual([superAdminActions.fetchSuperAdminsSuccess(payload)]);
  });

  it('Fails to fetch super admin list and dispatches failure', async () => {
    const error = new Error('Failed to fetch super admin list');
    const fetchSuperAdminListSpy = jest
      .spyOn(superAdminService, 'fetchSuperAdmins')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchSuperAdmins,
      {
        ...fetchSuperAdminsRequestMockData,
        type: ACTION_TYPES.FETCH_SUPERADMINS_REQUEST
      }
    ).toPromise();
    expect(fetchSuperAdminListSpy).toHaveBeenCalledWith(1, null, 'Sample');
    expect(dispatched).toEqual([superAdminActions.fetchSuperAdminsFailure(error)]);
  });
});

describe('Fetch Super Admin', () => {
  it('Fetches a super admin and dispatches success', async () => {
    const fetchSuperAdminSpy = jest.spyOn(superAdminService, 'fetchSuperAdmin').mockImplementation(() =>
      Promise.resolve({
        data: { entity: fetchSuperAdminResponseMockData }
      } as AxiosResponse)
    );
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchSuperAdmin,
      {
        ...fetchSuperAdminRequestMockData,
        type: ACTION_TYPES.FETCH_SUPER_ADMIN_REQUEST
      }
    ).toPromise();
    expect(fetchSuperAdminSpy).toHaveBeenCalledWith('4');
    expect(dispatched).toEqual([superAdminActions.fetchSuperAdminSuccess(fetchSuperAdminResponseMockData)]);
  });

  it('Fails to fetch super admin and dispatches failure', async () => {
    const error = new Error('Failed to fetch Super Admin');
    const fetchSuperAdminSpy = jest
      .spyOn(superAdminService, 'fetchSuperAdmin')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchSuperAdmin,
      {
        ...fetchSuperAdminRequestMockData,
        type: ACTION_TYPES.FETCH_SUPER_ADMIN_REQUEST
      }
    ).toPromise();
    expect(fetchSuperAdminSpy).toHaveBeenCalledWith('4');
    expect(dispatched).toEqual([superAdminActions.fetchSuperAdminFail(error)]);
  });
});

describe('Create Super Admin', () => {
  it('Creates a super admin and dispatches success', async () => {
    const createSuperAdminSpy = jest
      .spyOn(superAdminService, 'createSuperAdmin')
      .mockImplementation(() => Promise.resolve({} as AxiosResponse));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      createSuperAdminInfo,
      {
        data: createSuperAdminsRequestMockData,
        type: ACTION_TYPES.CREATE_SUPER_ADMIN_REQUEST
      }
    ).toPromise();
    expect(createSuperAdminSpy).toHaveBeenCalledWith(createSuperAdminsRequestMockData);
    expect(dispatched).toEqual([superAdminActions.createSuperAdminSuccess()]);
  });

  it('Fails to create super admin and dispatches failure', async () => {
    const error = new Error('Failed to create Super Admin');
    const createSuperAdminSpy = jest
      .spyOn(superAdminService, 'createSuperAdmin')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      createSuperAdminInfo,
      {
        data: createSuperAdminsRequestMockData,
        type: ACTION_TYPES.CREATE_SUPER_ADMIN_REQUEST
      }
    ).toPromise();
    expect(createSuperAdminSpy).toHaveBeenCalledWith(createSuperAdminsRequestMockData);
    expect(dispatched).toEqual([superAdminActions.createSuperAdminFail(error)]);
  });
});

describe('Update Super Admin', () => {
  it('Updates super admin and dispatches success', async () => {
    const updateSuperAdminSpy = jest
      .spyOn(superAdminService, 'updateSuperAdmin')
      .mockImplementation(() => Promise.resolve({} as AxiosResponse));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateSuperAdmin,
      {
        data: updateSuperAdminsRequestMockData,
        type: ACTION_TYPES.UPDATE_SUPER_ADMIN_REQUEST
      }
    ).toPromise();
    expect(updateSuperAdminSpy).toHaveBeenCalledWith(updateSuperAdminsRequestMockData);
    expect(dispatched).toEqual([superAdminActions.updateSuperAdminSuccess()]);
  });

  it('Fails to update super admin and dispatches failure', async () => {
    const error = new Error('Failed to update Super Admin');
    const updateSuperAdminSpy = jest
      .spyOn(superAdminService, 'updateSuperAdmin')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateSuperAdmin,
      {
        data: updateSuperAdminsRequestMockData,
        type: ACTION_TYPES.UPDATE_SUPER_ADMIN_REQUEST
      }
    ).toPromise();
    expect(updateSuperAdminSpy).toHaveBeenCalledWith(updateSuperAdminsRequestMockData);
    expect(dispatched).toEqual([superAdminActions.updateSuperAdminFail(error)]);
  });
});

describe('Remove Super Admin', () => {
  it('Removes super admin and dispatches success', async () => {
    const deleteSuperAdminSpy = jest
      .spyOn(superAdminService, 'deleteSuperAdmin')
      .mockImplementation(() => Promise.resolve({} as AxiosResponse));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      deleteSuperAdmin,
      {
        data: deleteSuperAdminRequestMockData,
        type: ACTION_TYPES.DELETE_SUPER_ADMIN_REQUEST
      }
    ).toPromise();
    expect(deleteSuperAdminSpy).toHaveBeenCalledWith(deleteSuperAdminRequestMockData);
    expect(dispatched).toEqual([superAdminActions.deleteSuperAdminSuccess()]);
  });

  it('Fails to remove super admin and dispatches failure', async () => {
    const error = new Error('Failed to delete Super Admin');
    const deleteSuperAdminSpy = jest
      .spyOn(superAdminService, 'deleteSuperAdmin')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      deleteSuperAdmin,
      {
        data: deleteSuperAdminRequestMockData,
        type: ACTION_TYPES.DELETE_SUPER_ADMIN_REQUEST
      }
    ).toPromise();
    expect(deleteSuperAdminSpy).toHaveBeenCalledWith(deleteSuperAdminRequestMockData);
    expect(dispatched).toEqual([superAdminActions.deleteSuperAdminFail(error)]);
  });
});
