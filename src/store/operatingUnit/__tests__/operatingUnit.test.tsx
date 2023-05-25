import { runSaga } from 'redux-saga';
import { AxiosResponse } from 'axios';
import * as operatingUnitService from '../../../services/operatingUnitAPI';
import {
  createOperatingUnit,
  createOperatingUnitAdmin,
  deleteOperatingUnitAdmin,
  fetchOperatingUnitAdminList,
  fetchOperatingUnitById,
  fetchOperatingUnitDashboardList,
  fetchOperatingUnitDetail,
  fetchOperatingUnitList,
  getOUListForDropdown,
  updateOperatingUnit,
  updateOperatingUnitAdmin
} from '../sagas';
import * as ACTION_TYPES from '../actionTypes';
import * as operatingUnitActions from '../actions';
import MOCK_DATA_CONSTANTS from '../../../tests/mockData/operatingUnitDataConstants';

const fetchOperatingUnitDetailWithSearchRequestMockData =
  MOCK_DATA_CONSTANTS.FETCH_OPERATING_UNIT_DETAILS_REQUEST_PAYLOAD_WITH_SEARCH;
const fetchOperatingUnitDetailRequestMockData = MOCK_DATA_CONSTANTS.ID_AND_TENANT_ID_REQUEST_PAYLOAD;
const fetchOperatingUnitDetailResponseMockData = MOCK_DATA_CONSTANTS.FETCH_OPERATING_UNIT_DETAIL_RESPONSE_PAYLOAD;
const fetchOperatingUnitAdminsResponseMockData = MOCK_DATA_CONSTANTS.FETCH_OPERATING_UNIT_ADMINS_RESPONSE_PAYLOAD;
const updateOperatingtRequestMockData = MOCK_DATA_CONSTANTS.UPDATE_OPERATING_UNIT_REQUEST_PAYLOAD;
const fetchDashboardOperatingUnitsRequestMockData = MOCK_DATA_CONSTANTS.FETCH_DASHBOARD_OPERATING_UNITS_REQUEST_PAYLOAD;
const fetchDashboardOperatingUnitsResponseMockData =
  MOCK_DATA_CONSTANTS.FETCH_DASHBOARD_OPERATING_UNITS_RESPONSE_PAYLOAD;
const fetchOperatingUnitsRequestMockData = MOCK_DATA_CONSTANTS.FETCH_OPERATING_UNIT_LIST_REQUEST_PAYLOAD;
const fetchOperatingUnitsResponseMockData = MOCK_DATA_CONSTANTS.FETCH_OPERATING_UNIT_LIST_RESPONSE_PAYLOAD;
const createOperatingUnitRequestMockData = MOCK_DATA_CONSTANTS.CREATE_OPERATING_UNIT_REQUEST_PAYLOAD;
const fetchOperatingUnitByIdRequestMockData = MOCK_DATA_CONSTANTS.ID_AND_TENANT_ID_REQUEST_PAYLOAD;
const fetchOperatingUnitByIdResponseMockData = MOCK_DATA_CONSTANTS.FETCH_OPERATING_UNIT_BY_ID_REQUEST_PAYLOAD;
const fetchDropdownOperatingUnitsRequestMockData =
  MOCK_DATA_CONSTANTS.FETCH_OPERATING_UNIT_DROPDOWN_LIST_REQUEST_PAYLOAD;
const operatingUnitAdminRequestMockData = MOCK_DATA_CONSTANTS.OPERATING_UNIT_ADMIN_REQUEST_PAYLOAD;
const deleteOperatingUnitAdminRequestMockData = MOCK_DATA_CONSTANTS.ID_AND_TENANT_ID_REQUEST_PAYLOAD;

describe('Fetch Operating Unit Detail', () => {
  it('Fetches a list of Operating Unit Admins and dispatches success', async () => {
    const fetchOperatingUnitDetailSpy = jest
      .spyOn(operatingUnitService, 'fetchOperatingUnitAdmins')
      .mockImplementation(() => {
        return Promise.resolve({ data: { entityList: fetchOperatingUnitAdminsResponseMockData } } as AxiosResponse);
      });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchOperatingUnitDetail,
      {
        payload: fetchOperatingUnitDetailWithSearchRequestMockData as any,
        type: ACTION_TYPES.FETCH_OPERATING_UNIT_DETAIL_REQUEST
      }
    ).toPromise();
    expect(fetchOperatingUnitDetailSpy).toHaveBeenCalledWith(fetchOperatingUnitDetailWithSearchRequestMockData);
    expect(dispatched).toEqual([operatingUnitActions.searchUserSuccess(fetchOperatingUnitAdminsResponseMockData)]);
  });

  it('Fetches operating unit details and dispatches success', async () => {
    const fetchOperatingUnitDetailSpy = jest
      .spyOn(operatingUnitService, 'getOperatingUnitDetails')
      .mockImplementation(() => {
        return Promise.resolve({
          data: {
            entity: {
              ...fetchOperatingUnitDetailResponseMockData,
              users: fetchOperatingUnitDetailResponseMockData.users
            }
          }
        } as AxiosResponse);
      });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchOperatingUnitDetail,
      {
        payload: fetchOperatingUnitDetailRequestMockData,
        type: ACTION_TYPES.FETCH_OPERATING_UNIT_DETAIL_REQUEST
      }
    ).toPromise();
    expect(fetchOperatingUnitDetailSpy).toHaveBeenCalledWith(fetchOperatingUnitDetailRequestMockData);
    const { users: operatingUnitAdmins, ...operatingUnitDetail } = fetchOperatingUnitDetailResponseMockData;
    expect(dispatched).toEqual([
      operatingUnitActions.fetchOperatingUnitDetailSuccess({ operatingUnitAdmins, operatingUnitDetail })
    ]);
  });
  it('Fails to fetch operating unit and dispatches failure', async () => {
    const error = new Error('Failed to operating unit');
    const fetchOperatingUnitDetailSpy = jest
      .spyOn(operatingUnitService, 'getOperatingUnitDetails')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchOperatingUnitDetail,
      { payload: fetchOperatingUnitDetailRequestMockData, type: ACTION_TYPES.FETCH_OPERATING_UNIT_DETAIL_REQUEST }
    ).toPromise();
    expect(fetchOperatingUnitDetailSpy).toHaveBeenCalledWith(fetchOperatingUnitDetailRequestMockData);
    expect(dispatched).toEqual([operatingUnitActions.fetchOperatingUnitDetailFail(error)]);
  });
});

describe('Fetch Operating Unit Admin List', () => {
  it('Fetches a list of Operating Unit Admins and dispatches success', async () => {
    const fetchOperatingUnitAdminListSpy = jest
      .spyOn(operatingUnitService, 'fetchOperatingUnitAdmins')
      .mockImplementation(() => {
        return Promise.resolve({
          data: { entityList: fetchOperatingUnitAdminsResponseMockData, totalCount: 10 }
        } as AxiosResponse);
      });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchOperatingUnitAdminList,
      {
        payload: fetchOperatingUnitDetailWithSearchRequestMockData as any,
        type: ACTION_TYPES.FETCH_OPERATING_UNIT_ADMIN_LIST_REQUEST
      }
    ).toPromise();
    expect(fetchOperatingUnitAdminListSpy).toHaveBeenCalledWith(fetchOperatingUnitDetailWithSearchRequestMockData);
    expect(dispatched).toEqual([
      operatingUnitActions.fetchOperatingUnitAdminsSuccess({
        operatingUnitAdmins: fetchOperatingUnitAdminsResponseMockData,
        total: 10
      })
    ]);
  });

  it('Fails to fetch Operating Admin list and dispatches failure', async () => {
    const error = new Error('Failed to fetch Operating Admin list');
    const fetchOperatingUnitAdminListSpy = jest
      .spyOn(operatingUnitService, 'fetchOperatingUnitAdmins')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchOperatingUnitAdminList,
      {
        payload: fetchOperatingUnitDetailWithSearchRequestMockData,
        type: ACTION_TYPES.FETCH_OPERATING_UNIT_ADMIN_LIST_REQUEST
      }
    ).toPromise();
    expect(fetchOperatingUnitAdminListSpy).toHaveBeenCalledWith(fetchOperatingUnitDetailWithSearchRequestMockData);
    expect(dispatched).toEqual([operatingUnitActions.fetchOperatingUnitAdminsFailure(error)]);
  });
});

describe('Updates an Operating Unit', () => {
  it('Updates Operating Unit and dispatches success', async () => {
    const updateOperatingUnitSpy = jest.spyOn(operatingUnitService, 'updateOperatingUnit').mockImplementation(() => {
      return Promise.resolve({} as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateOperatingUnit,
      {
        payload: updateOperatingtRequestMockData,
        type: ACTION_TYPES.UPDATE_OPERATING_UNIT_REQUEST
      }
    ).toPromise();
    expect(updateOperatingUnitSpy).toHaveBeenCalledWith(updateOperatingtRequestMockData);
    expect(dispatched).toEqual([operatingUnitActions.updateOperatingUnitSuccess()]);
  });

  it('Updates Operating Unit with successPayload flag and dispatches success', async () => {
    const updateOperatingUnitSpy = jest.spyOn(operatingUnitService, 'updateOperatingUnit').mockImplementation(() => {
      return Promise.resolve({} as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateOperatingUnit,
      {
        payload: updateOperatingtRequestMockData,
        isSuccessPayloadNeeded: true,
        type: ACTION_TYPES.UPDATE_OPERATING_UNIT_REQUEST
      }
    ).toPromise();
    expect(updateOperatingUnitSpy).toHaveBeenCalledWith(updateOperatingtRequestMockData);
    expect(dispatched).toEqual([operatingUnitActions.updateOperatingUnitSuccess({ name: 'Operating Unit Two' })]);
  });

  it('Fails to update Operating unit and dispatches failure', async () => {
    const error = new Error('Failed to update Operating Unit');
    const updateOperatingUnitSpy = jest
      .spyOn(operatingUnitService, 'updateOperatingUnit')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateOperatingUnit,
      {
        payload: updateOperatingtRequestMockData,
        type: ACTION_TYPES.UPDATE_OPERATING_UNIT_REQUEST
      }
    ).toPromise();
    expect(updateOperatingUnitSpy).toHaveBeenCalledWith(updateOperatingtRequestMockData);
    expect(dispatched).toEqual([operatingUnitActions.updateOperatingUnitFailure()]);
  });
});

describe('Fetch Operating Unit List in Dashboard', () => {
  it('Fetches a list of Operating Units for Dashboard and dispatches success', async () => {
    const fetchOperatingUnitDashboardListSpy = jest
      .spyOn(operatingUnitService, 'fetchOperatingUnitDashboardList')
      .mockImplementation(() => {
        return Promise.resolve({
          data: { entityList: fetchDashboardOperatingUnitsResponseMockData, totalCount: 10 }
        } as AxiosResponse);
      });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ user: { user: { tenantId: '4' } } })
      },
      fetchOperatingUnitDashboardList,
      {
        ...fetchDashboardOperatingUnitsRequestMockData,
        type: ACTION_TYPES.FETCH_OPERATING_UNIT_DASHBOARD_LIST_REQUEST
      }
    ).toPromise();
    expect(fetchOperatingUnitDashboardListSpy).toHaveBeenCalledWith('4', null, 0, undefined, 'Sample');
    const payload = {
      operatingUnitDashboardList: fetchDashboardOperatingUnitsResponseMockData,
      total: 10,
      isLoadMore: false
    };
    expect(dispatched).toEqual([operatingUnitActions.fetchOUDashboardListSuccess(payload)]);
  });

  it('Fails to fetch list of Operating Units for Dashboard and dispatches failure', async () => {
    const error = new Error('Failed to fetch Operating unit dashboard list');
    const fetchOperatingUnitDashboardListSpy = jest
      .spyOn(operatingUnitService, 'fetchOperatingUnitDashboardList')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ user: { user: { tenantId: '4' } } })
      },
      fetchOperatingUnitDashboardList,
      {
        ...fetchDashboardOperatingUnitsRequestMockData,
        type: ACTION_TYPES.FETCH_OPERATING_UNIT_DASHBOARD_LIST_REQUEST
      }
    ).toPromise();
    expect(fetchOperatingUnitDashboardListSpy).toHaveBeenCalledWith('4', null, 0, undefined, 'Sample');
    expect(dispatched).toEqual([operatingUnitActions.fetchOUDashboardListFailure(error)]);
  });
});

describe('Fetch Operating Unit List', () => {
  it('Fetches a list of Operating Units and dispatches success', async () => {
    const fetchOperatingUnitListSpy = jest
      .spyOn(operatingUnitService, 'fetchOperatingUnitList')
      .mockImplementation(() => {
        return Promise.resolve({
          data: { entityList: fetchOperatingUnitsResponseMockData, totalCount: 10 }
        } as AxiosResponse);
      });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchOperatingUnitList,
      {
        ...fetchOperatingUnitsRequestMockData,
        type: ACTION_TYPES.FETCH_OPERATING_UNIT_LIST_REQUEST
      }
    ).toPromise();
    expect(fetchOperatingUnitListSpy).toHaveBeenCalledWith('1', null, 0, 'Sample');
    const payload = {
      operatingUnitList: fetchOperatingUnitsResponseMockData,
      total: 10
    };
    expect(dispatched).toEqual([operatingUnitActions.fetchOperatingUnitListSuccess(payload)]);
  });

  it('Fails to fetch list of Operating Units and dispatches failure', async () => {
    const error = new Error('Failed to fetch operating unit list');
    const fetchOperatingUnitListSpy = jest
      .spyOn(operatingUnitService, 'fetchOperatingUnitList')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchOperatingUnitList,
      {
        ...fetchOperatingUnitsRequestMockData,
        type: ACTION_TYPES.FETCH_OPERATING_UNIT_LIST_REQUEST
      }
    ).toPromise();
    expect(fetchOperatingUnitListSpy).toHaveBeenCalledWith('1', null, 0, 'Sample');
    expect(dispatched).toEqual([operatingUnitActions.fetchOperatingUnitListFailure(error)]);
  });
});

describe('Creates an Operating Unit', () => {
  it('Creates Operating Unit and dispatches success', async () => {
    const createOperatingUnitSpy = jest.spyOn(operatingUnitService, 'createOperatingUnit').mockImplementation(() => {
      return Promise.resolve({} as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      createOperatingUnit,
      {
        payload: createOperatingUnitRequestMockData,
        type: ACTION_TYPES.CREATE_OPERATING_UNIT_REQUEST
      }
    ).toPromise();
    expect(createOperatingUnitSpy).toHaveBeenCalledWith(createOperatingUnitRequestMockData);
    expect(dispatched).toEqual([operatingUnitActions.createOperatingUnitSuccess()]);
  });

  it('Fails to create Operating Unit and dispatches failure', async () => {
    const error = new Error('Failed to create operating unit');
    const createOperatingUnitSpy = jest.spyOn(operatingUnitService, 'createOperatingUnit').mockImplementation(() => {
      return Promise.reject(error);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      createOperatingUnit,
      {
        payload: createOperatingUnitRequestMockData,
        type: ACTION_TYPES.CREATE_OPERATING_UNIT_REQUEST
      }
    ).toPromise();
    expect(createOperatingUnitSpy).toHaveBeenCalledWith(createOperatingUnitRequestMockData);
    expect(dispatched).toEqual([operatingUnitActions.createOperatingUnitFailure()]);
  });
});

describe('Fetches an Operating Unit', () => {
  it('Fetches Operating Unit and dispatches success', async () => {
    const fetchOperatingUnitSpy = jest.spyOn(operatingUnitService, 'fetchOperatingUnitById').mockImplementation(() => {
      return Promise.resolve({
        data: { entity: fetchOperatingUnitByIdResponseMockData }
      } as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchOperatingUnitById,
      {
        payload: fetchOperatingUnitByIdRequestMockData,
        type: ACTION_TYPES.FETCH_OPERATING_UNIT_BY_ID_REQUEST
      }
    ).toPromise();
    expect(fetchOperatingUnitSpy).toHaveBeenCalledWith(fetchOperatingUnitByIdRequestMockData);
    expect(dispatched).toEqual([operatingUnitActions.fetchOperatingUnitByIdSuccess()]);
  });

  it('Fails to fetch Operating Unit and dispatches failure', async () => {
    const error = new Error('Failed to fetch operating unit');
    const fetchOperatingUnitSpy = jest.spyOn(operatingUnitService, 'fetchOperatingUnitById').mockImplementation(() => {
      return Promise.reject(error);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchOperatingUnitById,
      {
        payload: fetchOperatingUnitByIdRequestMockData,
        type: ACTION_TYPES.FETCH_OPERATING_UNIT_BY_ID_REQUEST
      }
    ).toPromise();
    expect(fetchOperatingUnitSpy).toHaveBeenCalledWith(fetchOperatingUnitByIdRequestMockData);
    expect(dispatched).toEqual([operatingUnitActions.fetchOperatingUnitByIdFailure()]);
  });
});

describe('Fetch Operating Unit Drpodown List', () => {
  it('Fetches Operating Unit Dropdown list and dispatches success', async () => {
    const fetchOperatingUnitDropdownListSpy = jest
      .spyOn(operatingUnitService, 'fetchOperatingUnitForDropdown')
      .mockImplementation(() => {
        return Promise.resolve({
          data: { entityList: fetchOperatingUnitsResponseMockData, total: 10, limit: null }
        } as AxiosResponse);
      });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      getOUListForDropdown,
      {
        tenantId: '4',
        type: ACTION_TYPES.FETCH_OPERATING_UNIT_DROPDOWN_REQUEST
      }
    ).toPromise();
    expect(fetchOperatingUnitDropdownListSpy).toHaveBeenCalledWith(fetchDropdownOperatingUnitsRequestMockData);
    const payload = {
      operatingUnitList: fetchOperatingUnitsResponseMockData,
      total: 10,
      limit: null
    };
    expect(dispatched).toEqual([operatingUnitActions.fetchOperatingUnitDropdownSuccess(payload)]);
  });

  it('Fails to fetch Operating Unit Dropdown list and dispatches failure', async () => {
    const error = new Error('Failed to fetch Operating Unit Dropdown list');
    const fetchOperatingUnitDropdownListSpy = jest
      .spyOn(operatingUnitService, 'fetchOperatingUnitForDropdown')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      getOUListForDropdown,
      {
        tenantId: '4',
        type: ACTION_TYPES.FETCH_OPERATING_UNIT_DROPDOWN_REQUEST
      }
    ).toPromise();
    expect(fetchOperatingUnitDropdownListSpy).toHaveBeenCalledWith(fetchDropdownOperatingUnitsRequestMockData);
    expect(dispatched).toEqual([operatingUnitActions.fetchOperatingUnitDropdownFailure(error)]);
  });
});

describe('Creates an Operating Unit Admin', () => {
  it('Creates Operating Unit admin and dispatches success', async () => {
    const createOperatingUnitAdminSpy = jest
      .spyOn(operatingUnitService, 'createOperatingUnitAdmin')
      .mockImplementation(() => {
        return Promise.resolve({} as AxiosResponse);
      });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      createOperatingUnitAdmin,
      {
        payload: operatingUnitAdminRequestMockData,
        type: ACTION_TYPES.CREATE_OPERATING_UNIT_ADMIN_REQUEST
      }
    ).toPromise();
    expect(createOperatingUnitAdminSpy).toHaveBeenCalledWith(operatingUnitAdminRequestMockData);
    expect(dispatched).toEqual([operatingUnitActions.createOperatingUnitAdminSuccess()]);
  });

  it('Fails to create Operating Unit admin and dispatches failure', async () => {
    const error = 'Failed to create Operating Unit admin';
    const createOperatingUnitAdminSpy = jest
      .spyOn(operatingUnitService, 'createOperatingUnitAdmin')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      createOperatingUnitAdmin,
      {
        payload: operatingUnitAdminRequestMockData,
        type: ACTION_TYPES.CREATE_OPERATING_UNIT_ADMIN_REQUEST
      }
    ).toPromise();
    expect(createOperatingUnitAdminSpy).toHaveBeenCalledWith(operatingUnitAdminRequestMockData);
    expect(dispatched).toEqual([operatingUnitActions.createOperatingUnitAdminFailure()]);
  });
});

describe('Updates an Operating Unit Admin', () => {
  it('Updates Operating Unit admin and dispatches success', async () => {
    const updateOperatingUnitAdminSpy = jest
      .spyOn(operatingUnitService, 'updateOperatingUnitAdmin')
      .mockImplementation(() => {
        return Promise.resolve({} as AxiosResponse);
      });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateOperatingUnitAdmin,
      {
        payload: operatingUnitAdminRequestMockData,
        type: ACTION_TYPES.UPDATE_OPERATING_UNIT_ADMIN_REQUEST
      }
    ).toPromise();
    expect(updateOperatingUnitAdminSpy).toHaveBeenCalledWith(operatingUnitAdminRequestMockData);
    expect(dispatched).toEqual([operatingUnitActions.updateOperatingUnitAdminSuccess()]);
  });

  it('Fails to update Operating Unit admin and dispatches failure', async () => {
    const error = 'Failed to update Operating Unit admin';
    const updateOperatingUnitAdminSpy = jest
      .spyOn(operatingUnitService, 'updateOperatingUnitAdmin')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateOperatingUnitAdmin,
      {
        payload: operatingUnitAdminRequestMockData,
        type: ACTION_TYPES.UPDATE_OPERATING_UNIT_ADMIN_REQUEST
      }
    ).toPromise();
    expect(updateOperatingUnitAdminSpy).toHaveBeenCalledWith(operatingUnitAdminRequestMockData);
    expect(dispatched).toEqual([operatingUnitActions.updateOperatingUnitAdminFailure()]);
  });
});

describe('Deletes an Operating Unit Admin', () => {
  it('Deletes Operating Unit admin and dispatches success', async () => {
    const deleteOperatingUnitAdminSpy = jest
      .spyOn(operatingUnitService, 'deleteOperatingUnitAdmin')
      .mockImplementation(() => {
        return Promise.resolve({} as AxiosResponse);
      });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      deleteOperatingUnitAdmin,
      {
        payload: operatingUnitAdminRequestMockData,
        type: ACTION_TYPES.DELETE_OPERATING_UNIT_ADMIN_REQUEST
      }
    ).toPromise();
    expect(deleteOperatingUnitAdminSpy).toHaveBeenCalledWith(operatingUnitAdminRequestMockData);
    expect(dispatched).toEqual([operatingUnitActions.deleteOperatingUnitAdminSuccess()]);
  });

  it('Fails to delete Operating Unit admin and dispatches failure', async () => {
    const error = 'Failed to delete Operating Unit admin';
    const deleteOperatingUnitAdminSpy = jest
      .spyOn(operatingUnitService, 'deleteOperatingUnitAdmin')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      deleteOperatingUnitAdmin,
      {
        payload: deleteOperatingUnitAdminRequestMockData,
        type: ACTION_TYPES.DELETE_OPERATING_UNIT_ADMIN_REQUEST
      }
    ).toPromise();
    expect(deleteOperatingUnitAdminSpy).toHaveBeenCalledWith(deleteOperatingUnitAdminRequestMockData);
    expect(dispatched).toEqual([operatingUnitActions.deleteOperatingUnitAdminFailure()]);
  });
});
