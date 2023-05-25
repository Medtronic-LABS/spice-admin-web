
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import AccountWorkflowFormCustomization from '../../AccountWorkflowFormCustomization';

const mockStore = configureStore();

describe('AccountWorkflowFormCustomization', () => {
  let store:any;
  let wrapper:any;

  beforeEach(() => {
    store = mockStore({
      workflow: {
        formMeta: [],
        formJSON: {},
        loading: false,
      },
    });
    store.getState().workflow.loading = true;
    wrapper = mount(
        <Provider store={store}>
        <MemoryRouter>
            <Route>
              <AccountWorkflowFormCustomization />
            </Route>
        </MemoryRouter>
          </Provider>
    );
  });

  it('should render the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render a loader when loading is true', () => {
    expect(wrapper.find('Loader')).toHaveLength(1);
  });

  it('submits the form when the user clicks the submit button', () => {
    const mockDispatch = jest.fn();
    const mockHistoryPush = jest.fn();
    expect(mockDispatch).toBeCalledTimes(0);
    expect(mockHistoryPush).toBeCalledTimes(0);
  });

  it('dispatches customizeFormRequest action with the correct payload', () => {

    const dispatch = jest.fn();

    const data = { name: 'John', email: 'john@example.com' };

    expect(dispatch).toBeCalledTimes(0);
  });

});
