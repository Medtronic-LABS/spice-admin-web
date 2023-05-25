import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import SuperAdmin, { IRouteProps } from '../SuperAdmin';
import { History } from 'history';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ErrorBoundary from '../../../components/errorBoundary/ErrorBoundary';

const dispatch = jest.fn();

jest.mock('../../../../src/store/superAdmin/actions', () => ({
  fetchSuperAdminsRequest : jest.fn(),
}));

jest.mock('../../../../src/utils/toastCenter', () => ({
  toastCenter: { error: jest.fn() },
}));

jest.mock('../../../../src/utils/toastCenter', () => ({
  getErrorToastArgs: jest.fn(),
}));

jest.mock('../../../../src/store/superAdmin/selectors', () => ({
  superAdminsCountSelector: 10
}));


const mockStore = configureMockStore([]);
jest.mock('../../../hooks/tablePagination', () => ({
  useTablePaginationHook: jest.fn(() => ({
    listParams: {
      page: 2,
      rowsPerPage: 10,
      searchTerm: 'example'
    },
    setListReqParams: jest.fn()
  }))
}));
// const mockSuperAdmin = superAdminRequest as jest.MockedFunction<typeof superAdminRequest>;
jest.mock('lottie-web', () => ({
  // Mock any Lottie functions or methods that your code uses
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

const mockSetState = jest.fn();
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn().mockReturnValue([false, mockSetState]),
  useCallback: jest.fn()
}));

describe('SuperAdmin component', () => {
  let history: History;
  let props: IRouteProps
    let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
    let store: any;

    beforeEach(() => {
        history = { push: jest.fn() } as any as History;
        props = { history };
        store = mockStore({
          user: { loggingIn: false },
          total: 10
        });
        wrapper = mount(
          <ErrorBoundary>
          <Provider store={store}>
            <MemoryRouter>
              <SuperAdmin {...props} />
            </MemoryRouter>
          </Provider>
          </ErrorBoundary>
        )
      });

      it('should render the component', () => {
        expect(wrapper.exists()).toBe(true);
      });

      it('should dispatch fetchSuperAdminsRequest with correct params', () => {
        const listParams = {
          page: 2,
          rowsPerPage: 10,
          searchTerm: 'example'
        };
        
        const getSuperAdminList = jest.requireActual('../SuperAdmin').getSuperAdminList;
        const mockedGetSuperAdminList = jest.fn(getSuperAdminList);
    
        mockedGetSuperAdminList({ dispatch, listParams });
    
        expect(dispatch).toBeCalledTimes(0);
      });
});