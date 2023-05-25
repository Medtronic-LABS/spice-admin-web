import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import SiteSummary from '../SiteSummary';
import Loader from '../../../components/loader/Loader';
import ModalForm from '../../../components/modal/ModalForm';
import { SITE_MOCK_DATA } from '../../../store/site/siteMockDataConstants';

const mockStore = configureMockStore();
jest.mock('../../../constants/appConstants', () => ({
    ...jest.requireActual("../../../constants/appConstants"),
    ROLES: {
        SUPER_USER: 'SUPER_USER',
        SUPER_ADMIN: 'SUPER_ADMIN',
        REGION_ADMIN: 'REGION_ADMIN',
        ACCOUNT_ADMIN: 'ACCOUNT_ADMIN',
        OPERATING_UNIT_ADMIN: 'OPERATING_UNIT_ADMIN'
      },
      ACTIVATE_ACCOUNT_CONFIRMATION: undefined
  }));
describe('SiteSummary', () => {
  let store;
  let wrapper:any;

  beforeEach(() => {
    store = mockStore({
      site: {
        loading: false,
        data:SITE_MOCK_DATA.SITE_DATA_REQUEST_PAYLOAD,
        users: { 
            data: [],
            total: 0,
            loading: true ,
            },
        },
        user:{
            user:{
                countryId:'1'
            }
        }
    });

    wrapper = mount(
        <Provider store={store}>
      <MemoryRouter>
          <Route>
            <SiteSummary />
          </Route>
      </MemoryRouter>
        </Provider>
    );
  });

  it('should render the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render loader',()=>{
    expect(wrapper.find(Loader)).toHaveLength(1)
  })

  it('should render site details correctly', () => {
    const summaryDetails = {
      name: 'Site 1',
      email: 'site1@example.com',
      siteType: 'Site Type 1',
      account: {
        name: 'Account 1'
      },
      operatingUnit: {
        name: 'Operating Unit 1'
      },
      phoneNumber: '1234567890',
      addressType: 'Address Type 1|Address Type 2',
      addressUse: 'Address Use 1',
      address1: 'Address 1',
      address2: 'Address 2',
      culture: {
        name: 'Culture 1'
      },
      siteLevel: {
        label: 'Site Level 1'
      },
      county: {
        name: 'County 1'
      },
      subCounty: {
        name: 'Sub County 1'
      },
      city: {
        label: 'City 1'
      },
      postalCode: '12345'
    };
    wrapper.setProps({ summaryDetails });
    expect(wrapper.find('DetailCard')).toHaveLength(2);
    expect(wrapper.find('.card-header').first().text()).toEqual('Site SummaryEdit Site');
    expect(wrapper.find('.card-header').last().text()).toEqual('Site UsersAdd User');
  });

  it('should render custom table',()=>{
    expect(wrapper.find('CustomTable')).toHaveLength(1);
    
  })

  it('should render modal form',()=>{
    expect(wrapper.find(ModalForm)).toHaveLength(2);
  })

  it('should handle render methods in ModalForm', () => {
    const ModalForm = wrapper.find('Memo()').at(1);
    const handleCancel = ModalForm.prop('handleCancel');
    handleCancel();    
    expect(wrapper.find('Memo()')).toHaveLength(2);
  });

  it('should handle render methods in ModalForm', () => {
    const ModalForm = wrapper.find('Memo()').at(0);
    const handleCancel = ModalForm.prop('handleCancel');
    handleCancel();    
    expect(wrapper.find('Memo()')).toHaveLength(2);
  });

  it('should render custom table',()=>{
    const customtable=wrapper.find('CustomTable')
    const actionFormattor=customtable.prop('actionFormattor')
    expect(wrapper.find('CustomTable')).toHaveLength(1);
  })

  it('should render siteUserFormRender',()=>{
      const ModalForm = wrapper.find('Memo()').at(0);
      const render = ModalForm.prop('render');
      render()
   })
  it('should render siteUserFormRender',()=>{
        const ModalForm = wrapper.find('Memo()').at(1);
        const render = ModalForm.prop('render');
        render()
   })
   it('should render onFormSubmit',()=>{
    const ModalForm = wrapper.find('Memo()').at(1);
    const handleFormSubmit = ModalForm.prop('handleFormSubmit');
    handleFormSubmit({users:SITE_MOCK_DATA.SITE_DATA_REQUEST_PAYLOAD.users})
})

it('should render custom table',()=>{
  const customtable=wrapper.find('CustomTable')
  const onDeleteClick=customtable.prop('onDeleteClick')
  onDeleteClick({data: {id:'1'}})
})
})

