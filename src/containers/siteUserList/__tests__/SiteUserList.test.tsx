import React from 'react';
import { mount } from 'enzyme';
import { useSelector, useDispatch } from 'react-redux';
import SiteUserList from '../SiteUserList';
import { fetchSiteUserListRequest, clearSiteUserList } from '../../../store/site/actions';

jest.mock('../../../components/modal/ModalForm', () => () => null);

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

describe('SiteUserList component', () => {
  let wrapper: any;
  let dispatchMock: any;

  beforeEach(() => {
    dispatchMock = jest.fn();
    (useSelector as any).mockImplementation((selectorFn: any) =>
      selectorFn({
        site: {
          total: 1,
          siteUserList: []
        }
      })
    );
    (useDispatch as any).mockReturnValue(dispatchMock);

    const matchProps = {
      params: {
        regionId: '1',
        tenantId: '12345'
      },
      history: {},
      location: {},
      match: {
        isExact: false,
        path: '',
        url: '',
        params: {
          regionId: '1',
          tenantId: '12345'
        }
      }
    };

    wrapper = mount(<SiteUserList {...matchProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch site user list on mount', () => {
    expect(dispatchMock).toHaveBeenCalledWith(
      fetchSiteUserListRequest({
        tenantId: expect.any(String),
        skip: expect.any(Number),
        limit: expect.any(Number),
        search: expect.any(String),
        failureCb: expect.any(Function)
      })
    );
  });

  it('should clear site user list on unmount', () => {
    wrapper.unmount();
    expect(dispatchMock).toHaveBeenCalledWith(clearSiteUserList());
  });
});
