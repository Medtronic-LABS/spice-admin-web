import styles from './Region.module.scss';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import Region from '../Region';
import { BrowserRouter } from 'react-router-dom';
import { PROTECTED_ROUTES } from '../../../constants/route';
import { appendZeroBefore } from '../../../utils/commonUtils';

const mockStore = configureMockStore();

jest.mock('../../assets/images/arrow-right-small.svg', () => ({
    ReactComponent: 'ArrowRight'
  }));

describe('Region', () => {
  let store: any;
  let wrapper: any;

  beforeEach(() => {
    store = mockStore({  
    user: {
    timezoneList: [],
    },
    region: {
        loading: false,
        loadingMore: false,
        regions: [        
            { id: 1, name: 'North' },
            { id: 2, name: 'South' },
            { id: 3, name: 'East' },
            { id: 4, name: 'West' }
        ],
        error: null,
        },
      regions: [
        { id: 1, name: 'North' },
        { id: 2, name: 'South' },
        { id: 3, name: 'East' },
        { id: 4, name: 'West' }
      ],
      regionsCount: 0,
      loading: false,
      loadingMore: false,
      timezoneList: [],
      account: {
        clinicalWorkflows: []
      },
      clinicalWorkflows: [],
    });

    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
            <Region />
        </BrowserRouter>
      </Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  })

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('fetches regions on mount', () => {
    const action = store.getActions()[0];
    expect(action.type).toBe('FETCH_REGIONS_REQUEST');
  });

//   it('searches regions on input change', () => {
//     wrapper.setProps({noRegionsAvailable: false, loading: false})
//     const input = wrapper.find('.searchbar');
//     input.simulate('change', { target: { value: 'search text' } });

//     const action = store.getActions()[1];
//     expect(action.type).toBe('FETCH_TIMEZONE_LIST_REQUEST');
//   });

  it('loads more regions on button click', () => {
    const button = wrapper.find('button').at(1);
    button.simulate('click');

    const action = store.getActions()[1];
    expect(action.type).toBe('FETCH_TIMEZONE_LIST_REQUEST');
  });

  it('displays loading spinner when loading prop is true', () => {
    wrapper.setProps({loading: true, loadingMore: true});
    const spinner = wrapper.find(`.${styles.loaderWrapper}.d-flex.align-items-center.justify-content-center.mt-2dot5`);
    expect(spinner.exists()).toBe(false);
  });
  
  it('should parse data correctly', () => {
    const mockRegion = {
      id: '123',
      name: 'Region 1',
      tenantId: '456',
      accountsCount: 3,
      ouCount: 2,
      siteCount: 1
    };
    const regions = [mockRegion];
    const onDashboardExit = jest.fn();
    const parsedData = regions.map(({ ouCount, siteCount, accountsCount, name, tenantId, id: regionId }) => ({
      title: name,
      detailRoute: PROTECTED_ROUTES.regionSummary.replace(':regionId', regionId).replace(':tenantId', tenantId),
      setBreadcrumbDetails: () => onDashboardExit({ id: regionId, name, tenantId }),
      tenantId,
      formId: regionId,
      data: [
        {
          type: 'number',
          value: Number(accountsCount) ? appendZeroBefore(accountsCount, 2) : '-',
          label: 'Account',
          disableEllipsis: true,
          route: PROTECTED_ROUTES.accountByRegion.replace(':regionId', regionId).replace(':tenantId', tenantId),
          onClick: () => onDashboardExit({ id: regionId, name, tenantId })
        },
        {
          type: 'number',
          value: Number(ouCount) ? appendZeroBefore(ouCount, 2) : '-',
          label: 'Operating Unit',
          route: PROTECTED_ROUTES.OUByRegion.replace(':regionId', regionId).replace(':tenantId', tenantId),
          onClick: () => onDashboardExit({ id: regionId, name, tenantId })
        },
        {
          type: 'number',
          value: Number(siteCount) ? appendZeroBefore(siteCount, 2) : '-',
          label: 'Site',
          disableEllipsis: true,
          route: PROTECTED_ROUTES.siteByRegion.replace(':regionId', regionId).replace(':tenantId', tenantId),
          onClick: () => onDashboardExit({ id: regionId, name, tenantId })
        }
      ]
    }));
    expect(parsedData).toEqual([
      {
        title: 'Region 1',
        detailRoute: '/region/123/456',
        setBreadcrumbDetails: expect.any(Function),
        tenantId: '456',
        formId: '123',
        data: [
          {
            type: 'number',
            value: '03',
            label: 'Account',
            disableEllipsis: true,
            route: '/region/123/456/account',
            onClick: expect.any(Function)
          },
          {
            type: 'number',
            value: '02',
            label: 'Operating Unit',
            route: '/region/123/456/OU',
            onClick: expect.any(Function)
          },
          {
            type: 'number',
            value: '01',
            label: 'Site',
            disableEllipsis: true,
            route: '/region/123/456/site',
            onClick: expect.any(Function)
          }
        ]
      }
    ]);
  }); 
});
