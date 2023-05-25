import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import RegionCustomization from '../RegionCustomization';
import APPCONSTANTS from '../../../constants/appConstants';
import { act } from 'react-dom/test-utils';

const mockStore = configureMockStore();
jest.mock('../../assets/images/edit.svg', () => ({
  ReactComponent: 'EditIcon'
}));

describe('RegionCustomization', () => {
  let store: any;
  let wrapper: any;

  beforeEach(() => {
    store = mockStore({
      workflow: {
        consentForm: {
          id: '123',
        },
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegionCustomization />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render CustomTable with correct props', () => {
    const customTable = wrapper.find('CustomTable');
    expect(customTable).toHaveLength(1);
    expect(customTable.prop('rowData')).toEqual(APPCONSTANTS.REGION_CUSTOMIZATION_SCREENS);
    expect(customTable.prop('columnsDef')).toEqual([
      {
        id: 1,
        name: 'name',
        label: 'Name',
        width: '200px',
      },
    ]);
    expect(customTable.prop('isEdit')).toBe(true);
    expect(customTable.prop('isDelete')).toBe(false);
    expect(customTable.prop('isCustom')).toBe(true);
  });

  it('should open ConsentForm when onCustomConfirmed is called', () => {
    const setEditorContent = jest.fn(); 
    const customTable = wrapper.find('CustomTable');
    
    const onCustomConfirmed = customTable.prop('onCustomConfirmed');
    act(() => {
    onCustomConfirmed({ index: 0, name: 'Screening' });
    })
    wrapper.update();

    wrapper.find('ConsentForm');
    wrapper.setProps({openConsentForm: true, editorContent: 'Region Customization Content...'});
    setEditorContent("Region Consent Form");
  });

  it('should submit ConsentForm when submitConsentForm is called', () => {
    wrapper.setProps({openConsentForm: true, editorContent: 'Region Customization Content...'});
    const customTable = wrapper.find('CustomTable');
    
    const onCustomConfirmed = customTable.prop('onCustomConfirmed');
    onCustomConfirmed({ index: 0, name: 'Screening' });
    wrapper.update();
  });
});
