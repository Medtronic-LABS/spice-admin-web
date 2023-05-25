import React from 'react';
import { mount } from 'enzyme';
import RegionFormCustomization from '../../RegionFormCustomization';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
jest.mock('react-router-dom', () => ({
    useParams: jest.fn().mockReturnValue({ tenantId: '3', regionId: '2', form:'Dynamic' }),
    useHistory: () => ({
        push: jest.fn(),
      })
  }));
describe('RegionFormCustomization component', () => {
    const store = mockStore({
        workflow: {
            formMeta: {
                name: "name",
                id: "id"
            },
            loading: false
        },
        user: {
            cultureList:[
                {
                    id: 1,
                    name: 'EN'
                  }
            ]
        }
    })
  it('should render without errors', () => {
    const wrapper = mount(
    <Provider store={store}>
    <RegionFormCustomization />
    </Provider>
    );
    expect(wrapper).toHaveLength(1);
  });

  it('should call the onCancel function when the cancel button is clicked', () => {
    const wrapper = mount(
        <Provider store={store}>
        <RegionFormCustomization />
        </Provider>
        );
    wrapper.find('AccordianView')
    expect(wrapper.find('AccordianView').exists()).toBe(false);
  });
});
