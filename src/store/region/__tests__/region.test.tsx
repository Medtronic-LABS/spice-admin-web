import { runSaga } from 'redux-saga';
import { AxiosResponse } from 'axios';
import * as regionService from '../../../services/regionAPI';
import {
  createRegion,
  createRegionAdminInfo,
  deactivateRegion,
  fetchRegionDetail,
  fetchRegions,
  removeRegionAdmin,
  updateRegionAdminInfo,
  updateRegionDetail
} from '../sagas';
import * as ACTION_TYPES from '../actionTypes';
import * as regionActions from '../actions';
import MOCK_DATA_CONSTANTS from '../../../tests/mockData/regionDataConstants';

const fetchRegionDetailWithSearchRequestMockData = MOCK_DATA_CONSTANTS.FETCH_REGION_DETAIL_REQUEST_WITH_SEARCH_PAYLOAD;
const fetchRegionDetailRequestMockData = MOCK_DATA_CONSTANTS.ID_AND_TENANT_ID_REQUEST_PAYLOAD;
const fetchRegionAdminsResponsePayload = MOCK_DATA_CONSTANTS.FETCH_REGION_ADMINS_RESPONSE_PAYLOAD;
const fetchRegionDetailResponsePayload = MOCK_DATA_CONSTANTS.FETCH_REGION_DETAIL_RESPONSE_PAYLOAD;
const deactivateRegionRequestMockData = MOCK_DATA_CONSTANTS.DEACTIVATE_REGION_REQUEST_PAYLOAD;
const fetchRegionListRequestMockData = MOCK_DATA_CONSTANTS.FETCH_REGION_LIST_REQUEST_PAYLOAD;
const fetchRegionListResponseMockData = [MOCK_DATA_CONSTANTS.REGION_PAYLOAD];
const createRegionRequestMockData = MOCK_DATA_CONSTANTS.CREATE_REGION_REQUEST_PAYLOAD;
const updateRegionRequestMockData = MOCK_DATA_CONSTANTS.UPDATE_REGION_REQUEST_PAYLOAD;
const createRegionAdminRequestMockData = MOCK_DATA_CONSTANTS.CREATE_REGION_ADMIN_REQUEST_PAYLOAD;
const updateRegionAdminRequestMockData = MOCK_DATA_CONSTANTS.CREATE_REGION_ADMIN_REQUEST_PAYLOAD;
const deleteRegionAdminRequestMockData = MOCK_DATA_CONSTANTS.ID_AND_TENANT_ID_REQUEST_PAYLOAD;

describe('Fetch Operating Unit Detail', () => {
  it('Fetches a list of Region Admins and dispatches success', async () => {
    const fetchRegionDetailSpy = jest.spyOn(regionService, 'fetchRegionAdmins').mockImplementation(() => {
      return Promise.resolve({ data: { entityList: fetchRegionAdminsResponsePayload } } as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchRegionDetail,
      {
        payload: fetchRegionDetailWithSearchRequestMockData as any,
        type: ACTION_TYPES.FETCH_REGION_DETAIL_REQUEST
      }
    ).toPromise();
    expect(fetchRegionDetailSpy).toHaveBeenCalledWith(fetchRegionDetailWithSearchRequestMockData);
    expect(dispatched).toEqual([regionActions.searchUserSuccess(fetchRegionAdminsResponsePayload)]);
  });

  it('Fetches region details and dispatches success', async () => {
    const fetchRegionDetailSpy = jest.spyOn(regionService, 'getRegionDetail').mockImplementation(() => {
      return Promise.resolve({ data: { entity: fetchRegionDetailResponsePayload } } as AxiosResponse);
    });
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchRegionDetail,
      {
        payload: fetchRegionDetailRequestMockData,
        type: ACTION_TYPES.FETCH_REGION_DETAIL_REQUEST
      }
    ).toPromise();
    expect(fetchRegionDetailSpy).toHaveBeenCalledWith(fetchRegionDetailRequestMockData);
    expect(dispatched).toEqual([regionActions.fetchRegionDetailSuccess(fetchRegionDetailResponsePayload)]);
  });

  it('Fails to fetch region details and dispatches failure', async () => {
    const error = new Error('Failed to fetch region details');
    const fetchRegionDetailSpy = jest
      .spyOn(regionService, 'getRegionDetail')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchRegionDetail,
      {
        payload: fetchRegionDetailRequestMockData,
        type: ACTION_TYPES.FETCH_REGION_DETAIL_REQUEST
      }
    ).toPromise();
    expect(fetchRegionDetailSpy).toHaveBeenCalledWith(fetchRegionDetailRequestMockData);
    expect(dispatched).toEqual([regionActions.fetchRegionDetailFail(error)]);
  });
});

describe('Deactivate Region', () => {
  it('Deactivates a Region and dispatches success', async () => {
    const deactivateRegionSpy = jest
      .spyOn(regionService, 'deactivateRegion')
      .mockImplementation(() => Promise.resolve({} as AxiosResponse));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      deactivateRegion,
      {
        payload: deactivateRegionRequestMockData,
        type: ACTION_TYPES.DEACTIVATE_REGION_REQUEST
      }
    ).toPromise();
    expect(deactivateRegionSpy).toHaveBeenCalledWith(deactivateRegionRequestMockData);
    expect(dispatched).toEqual([regionActions.deactivateRegionSuccess()]);
  });

  it('Fails to deactivate a Region and dispatches failure', async () => {
    const error = new Error('Failed to deactivate region');
    const deactivateRegionSpy = jest
      .spyOn(regionService, 'deactivateRegion')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      deactivateRegion,
      {
        payload: deactivateRegionRequestMockData,
        type: ACTION_TYPES.DEACTIVATE_REGION_REQUEST
      }
    ).toPromise();
    expect(deactivateRegionSpy).toHaveBeenCalledWith(deactivateRegionRequestMockData);
    expect(dispatched).toEqual([regionActions.deactivateRegionFail(error)]);
  });
});

describe('Fetch Region List', () => {
  it('Fetches a list of regions and dispatches success', async () => {
    const fetchRegionListSpy = jest.spyOn(regionService, 'fetchRegions').mockImplementation(() =>
      Promise.resolve({
        data: { entityList: fetchRegionListResponseMockData, totalCount: 10, isLoadMore: false }
      } as AxiosResponse)
    );
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchRegions,
      {
        ...fetchRegionListRequestMockData,
        type: ACTION_TYPES.FETCH_REGIONS_REQUEST
      }
    ).toPromise();
    const payload = {
      regions: fetchRegionListResponseMockData,
      total: 10,
      isLoadMore: false
    };
    expect(fetchRegionListSpy).toHaveBeenCalledWith(null, 0, undefined, 'Sample');
    expect(dispatched).toEqual([regionActions.fetchRegionsSuccess(payload)]);
  });

  it('Fails to fetch a list of regions and dispatches failure', async () => {
    const error = new Error('Failed to fetch Region List');
    const fetchRegionListSpy = jest
      .spyOn(regionService, 'fetchRegions')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchRegions,
      {
        ...fetchRegionListRequestMockData,
        type: ACTION_TYPES.FETCH_REGIONS_REQUEST
      }
    ).toPromise();
    expect(fetchRegionListSpy).toHaveBeenCalledWith(null, 0, undefined, 'Sample');
    expect(dispatched).toEqual([regionActions.fetchRegionsFailure(error)]);
  });
});

describe('Create a Region', () => {
  it('Creates a Region and dispatches success', async () => {
    const createRegionSpy = jest
      .spyOn(regionService, 'createRegion')
      .mockImplementation(() => Promise.resolve({} as AxiosResponse));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      createRegion,
      {
        data: createRegionRequestMockData,
        type: ACTION_TYPES.CREATE_REGION_REQUEST
      }
    ).toPromise();
    expect(createRegionSpy).toHaveBeenCalledWith(createRegionRequestMockData);
    expect(dispatched).toEqual([regionActions.createRegionSuccess()]);
  });

  it('Fails to create a Region and dispatches failure', async () => {
    const error = new Error('Failed to create Region');
    const createRegionSpy = jest.spyOn(regionService, 'createRegion').mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      createRegion,
      {
        data: createRegionRequestMockData,
        type: ACTION_TYPES.CREATE_REGION_REQUEST
      }
    ).toPromise();
    expect(createRegionSpy).toHaveBeenCalledWith(createRegionRequestMockData);
    expect(dispatched).toEqual([regionActions.createRegionFailure(error)]);
  });
});

describe('Update a Region', () => {
  it('Updates a Region and dispatches success', async () => {
    const updateRegionSpy = jest
      .spyOn(regionService, 'updateRegion')
      .mockImplementation(() => Promise.resolve({} as AxiosResponse));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateRegionDetail,
      {
        data: updateRegionRequestMockData,
        type: ACTION_TYPES.UPDATE_REGION_DETAIL_REQUEST
      }
    ).toPromise();
    expect(updateRegionSpy).toHaveBeenCalledWith(updateRegionRequestMockData);
    expect(dispatched).toEqual([regionActions.updateRegionDetailSuccess(updateRegionRequestMockData)]);
  });

  it('Fails to update Region and dispatches failure', async () => {
    const error = new Error('Failed to update Region');
    const updateRegionSpy = jest.spyOn(regionService, 'updateRegion').mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateRegionDetail,
      {
        data: updateRegionRequestMockData,
        type: ACTION_TYPES.UPDATE_REGION_DETAIL_REQUEST
      }
    ).toPromise();
    expect(updateRegionSpy).toHaveBeenCalledWith(updateRegionRequestMockData);
    expect(dispatched).toEqual([regionActions.updateRegionDetailFail(error)]);
  });
});

describe('Create a Region Admin', () => {
  it('Creates a Region Admin and dispatches success', async () => {
    const createRegionAdminSpy = jest
      .spyOn(regionService, 'createRegionAdmin')
      .mockImplementation(() => Promise.resolve({} as AxiosResponse));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      createRegionAdminInfo,
      {
        data: createRegionAdminRequestMockData,
        type: ACTION_TYPES.CREATE_REGION_ADMIN_REQUEST
      }
    ).toPromise();
    expect(createRegionAdminSpy).toHaveBeenCalledWith(createRegionAdminRequestMockData);
    expect(dispatched).toEqual([regionActions.createRegionAdminSuccess()]);
  });

  it('Fails to create Region admin and dispatches failure', async () => {
    const error = new Error('Failed to create Region admin');
    const createRegionAdminSpy = jest
      .spyOn(regionService, 'createRegionAdmin')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      createRegionAdminInfo,
      {
        data: createRegionAdminRequestMockData,
        type: ACTION_TYPES.CREATE_REGION_ADMIN_REQUEST
      }
    ).toPromise();
    expect(createRegionAdminSpy).toHaveBeenCalledWith(createRegionAdminRequestMockData);
    expect(dispatched).toEqual([regionActions.createRegionAdminFail(error)]);
  });
});

describe('Update a Region Admin', () => {
  it('Updates a Region Admin and dispatches success', async () => {
    const updateRegionAdminSpy = jest
      .spyOn(regionService, 'updateRegionAdmin')
      .mockImplementation(() => Promise.resolve({} as AxiosResponse));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateRegionAdminInfo,
      {
        data: updateRegionAdminRequestMockData,
        type: ACTION_TYPES.UPDATE_REGION_ADMIN_REQUEST
      }
    ).toPromise();
    expect(updateRegionAdminSpy).toHaveBeenCalledWith(updateRegionAdminRequestMockData);
    expect(dispatched).toEqual([regionActions.updateRegionAdminSuccess()]);
  });

  it('Fails to update Region admin and dispatches failure', async () => {
    const error = new Error('Failed to update Region admin');
    const updateRegionAdminSpy = jest
      .spyOn(regionService, 'updateRegionAdmin')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      updateRegionAdminInfo,
      {
        data: updateRegionAdminRequestMockData,
        type: ACTION_TYPES.UPDATE_REGION_ADMIN_REQUEST
      }
    ).toPromise();
    expect(updateRegionAdminSpy).toHaveBeenCalledWith(updateRegionAdminRequestMockData);
    expect(dispatched).toEqual([regionActions.updateRegionAdminFail(error)]);
  });
});

describe('Remove a Region Admin', () => {
  it('Removes a Region Admin and dispatches success', async () => {
    const removeRegionAdminSpy = jest
      .spyOn(regionService, 'deleteRegionAdmin')
      .mockImplementation(() => Promise.resolve({} as AxiosResponse));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      removeRegionAdmin,
      {
        data: deleteRegionAdminRequestMockData,
        type: ACTION_TYPES.DELETE_REGION_ADMIN_REQUEST
      }
    ).toPromise();
    expect(removeRegionAdminSpy).toHaveBeenCalledWith(deleteRegionAdminRequestMockData);
    expect(dispatched).toEqual([regionActions.deleteRegionAdminSuccess()]);
  });

  it('Fails to remove Region admin and dispatches failure', async () => {
    const error = new Error('Failed to remove Region admin');
    const removeRegionAdminSpy = jest
      .spyOn(regionService, 'deleteRegionAdmin')
      .mockImplementation(() => Promise.reject(error));
    const dispatched: any = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      removeRegionAdmin,
      {
        data: deleteRegionAdminRequestMockData,
        type: ACTION_TYPES.DELETE_REGION_ADMIN_REQUEST
      }
    ).toPromise();
    expect(removeRegionAdminSpy).toHaveBeenCalledWith(deleteRegionAdminRequestMockData);
    expect(dispatched).toEqual([regionActions.deleteRegionAdminFail(error)]);
  });
});
