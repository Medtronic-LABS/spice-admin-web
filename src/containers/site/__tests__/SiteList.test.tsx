import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter, Route } from 'react-router-dom';
import SiteList from '../SiteList';
import CustomTable from '../../../components/customtable/CustomTable';
import {SITE_MOCK_DATA} from '../../../store/site/siteMockDataConstants'

const mockStore = configureMockStore();
jest.mock('../../assets/images/edit.svg', () => ({
  ReactComponent: 'EditIcon'
}));

describe('SiteList', () => {
  let store: any;
  let wrapper : any;

  beforeEach(() => {
    store = mockStore({
      site: {
        siteList: [{ id: 9, name: 'Site1' }, { id: 8, name: 'Site2' }],
        loading: false,
        total: 0,
      },
      user: {
        user: {
            countryId: '11'
        },
        country: {
          id: 88,
        },
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/region/10']}>
          <Route path="/region/:regionId">
            <SiteList />
          </Route>
        </MemoryRouter>
      </Provider>
    );
  });

  it('should render CustomTable component', () => {
    expect(wrapper.find(CustomTable)).toHaveLength(1);
  });

  it('should open site edit modal', () => {
    const wrapper = mount(<Provider store={store}>
        <MemoryRouter initialEntries={['/region/11/22/site']}>
          <Route path="/region/:regionId/:tenantId/site">
            <SiteList />
          </Route>
        </MemoryRouter>
      </Provider>);
  
    const customTable = wrapper.find(CustomTable);
    const DetailCard = wrapper.find('DetailCard');
    const ModalForm = wrapper.find('Memo()');

    const handleRowClick: any = customTable.prop('handleRowClick');
    const onRowEdit: any = customTable.prop('onRowEdit');
    const onButtonClick: any = DetailCard.prop('onButtonClick');
    const handleCancel: any = ModalForm.prop('handleCancel');
    const handleFormSubmit: any = ModalForm.prop('handleFormSubmit');
    const handleRender: any = ModalForm.prop('render');

    handleRowClick({ id: 1, name: 'Site1' });
    onButtonClick();
    onRowEdit({
      id: '9',
      name: 'Site New',
      siteType: 'Postal',
      tenantId: '1',
      siteLevel: 'level 1',
      operatingUnitName: 'OU one'
    });
    handleCancel();
    handleFormSubmit({site: {...SITE_MOCK_DATA.SITE_DETAIL_RESPONSE_PAYLOAD, addressType: ['Postal', 'Physical']}});
    handleRender(jest.fn());
    expect(wrapper.find(CustomTable)).toHaveLength(1);
  });
});
