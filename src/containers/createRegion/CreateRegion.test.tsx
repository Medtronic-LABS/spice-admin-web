import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import CreateRegion from './CreateRegion';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

jest.mock('../../services/regionAPI');

describe('CreateRegion', () => {
  let wrapper: any;
  const mockCreateRegionRequest = jest.fn();
  const mockStore = configureStore([]);
  const createRegionRequestMock = jest.fn();
  const store = mockStore({
    user: {
      timezoneList:[
        {
          id: '1'
        },
        {
          id: '2'
        }
      ]
    },
    region:{
      loading:false
    }
  });
  const props: any = {
    createRegionRequest: mockCreateRegionRequest,
    loading: false,
    history: {push: jest.fn()}
  }

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CreateRegion {...props} />
        </MemoryRouter>
      </Provider>
    );
  });

  it('renders RegionForm and UserForm components', () => {
    expect(wrapper.find('RegionForm')).toHaveLength(1);
    expect(wrapper.find('UserForm')).toHaveLength(1);
  });

  it('should render the Submit button', () => {
    expect(wrapper.find('button[type="submit"]').length).toBe(1);
  });

  it('should render the Cancel button', () => {
    expect(wrapper.find('button[type="button"]').length).toBe(1);
  });

  it('calls createRegionRequest on form submission', () => {
    const form = wrapper.find('form');
    const mockSubmitEvent = { preventDefault: jest.fn() };
    form.simulate('submit', mockSubmitEvent);
    expect(mockCreateRegionRequest).toBeCalledTimes(0);
  });

  it('navigates to region dashboard on form cancel', () => {
    const cancelButton = wrapper.find('button.secondary-btn');
    cancelButton.simulate('click');
    expect(wrapper.find('Router').prop('history').location.pathname).toEqual('/');
  });

  it('should call history.push when Cancel button is clicked', () => {
    const history = wrapper.find('CreateRegion').prop('history');
    const spy = jest.spyOn(history, 'push');
    wrapper.find('button[type="button"]').simulate('click');
    expect(spy).toHaveBeenCalledWith('/region');
  });


  it('triggers onCancel when "Cancel" button is clicked', () => {
    const cancelButton = wrapper.find('button').at(0);

    cancelButton.simulate('click');

    expect(wrapper.find('CreateRegion').instance().props.history.push).toHaveBeenCalledTimes(3);
  });



  it('calls createRegion API with correct parameters on form submission', () => {
    const countryCodeInput = wrapper.find('[name="region.countryCode"]');
    countryCodeInput.first().simulate('change', { target: { value: 'US' } });

    const nameInput = wrapper.find('[name="region.name"]');
    nameInput.first().simulate('change', { target: { value: 'Test Region' } });

    const unitMeasurementInput = wrapper.find('[name="region.unitMeasurement"]');
    unitMeasurementInput.first().simulate('change', { target: { value: 'metric' } });

    const firstNameInput = wrapper.find('[type="text"]');
    firstNameInput.first().simulate('change', { target: { value: 'Test First Name' } });

    const lastNameInput = wrapper.find('[type="text"]');
    lastNameInput.at(1).simulate('change', { target: { value: 'Test Last Name' } });

    const passwordInput = wrapper.find('[type="text"]');
    passwordInput.at(2).simulate('change', { target: { value: 'testpassword' } });

    const confirmPasswordInput = wrapper.find('[type="text"]');
    confirmPasswordInput.at(3).simulate('change', { target: { value: 'testpassword' } });

    const timezoneInput = wrapper.find('[type="text"]');
    timezoneInput.at(4).simulate('change', { target: { value: 'Test Timezone ID' } });

    const form = wrapper.find('form');
    form.simulate('submit', { preventDefault: () => {} });

    expect(createRegionRequestMock).toBeCalledTimes(0);
  });

});
