import { mount } from 'enzyme';
import RegionDetail, { IDispatchProps, IMatchProps, IStateProps } from '../RegionDetail';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';

jest.mock('../../../components/modal/ModalForm', () => () => null);

const mockStore = configureMockStore();
let store: any;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/region/4/6/Adfgsrgf/accountCustomize/105/malaria'
  })
}));

store = mockStore({
  site: {
    loading: false,
    users: {
      data: [],
      total: 0,
      loading: true
    }
  },
  user: {
    user: {
      countryId: '1'
    }
  },
  region: {
    loading: false,
    detail: {
      id: '1',
      users: [],
      name: 'name',
      countryCode: '91',
      unitMeasurement: 'Metric',
      tenantId: '4'
    }
  }
});

const stateProps: IStateProps = {
  loading: false,
  detail: {
    id: '1',
    users: [],
    name: 'name',
    countryCode: '91',
    unitMeasurement: 'Metric',
    tenantId: '4'
  },
  timezoneList: [],
  role: 'SUPER_ADMIN'
};

const dispatchProps: IDispatchProps = {
  fetchRegionDetailReq: jest.fn(),
  updateRegionDetail: jest.fn(),
  updateRegionAdmin: jest.fn(),
  createRegionAdmin: jest.fn(),
  deleteRegionAdmin: jest.fn(),
  decactivateRegionReq: jest.fn()
};

const matchProps: IMatchProps = {
  match: {
    params: {
      regionId: '1',
      tenantId: '4'
    },
    isExact: false,
    path: '',
    url: ''
  },
  history: {},
  location: {}
};

// Combine the props
const props: IStateProps & IDispatchProps & IMatchProps = {
  ...stateProps,
  ...dispatchProps,
  ...matchProps
};

describe('OperatingUnitForm', () => {
  let wrapper: any;
  
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegionDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

  });

  it('renders Region Details without errors', () => {
    expect(wrapper).toHaveLength(1);
  });
});
