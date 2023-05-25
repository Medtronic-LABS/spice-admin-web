import React from "react";
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { shallow, ShallowWrapper } from 'enzyme';
import UserMenu from './UserMenu';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
  }));

  const mockStore = configureMockStore();
  
  describe('UserMenu', () => {
      beforeEach(() => {
        const store = mockStore({
            user: {
                role: 'SU_SA',
              formDataId: '12345',
              tenantId: '1'
            }
            
        });
        shallow(
            <Provider store={store}>
                  <MemoryRouter>
                    <UserMenu role="SU_SA" />
                  </MemoryRouter>
                </Provider>
        )
    });
  it('should render only the permitted menus for a super admin', () => {
      const store = mockStore({
          user: {
              role: 'SU_SA',
        formDataId: '12345',
        tenantId: '1'
    },
});
render(
    <Provider store={store}>
        <MemoryRouter>
          <UserMenu role="SU_SA" />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Legal Terms')).not.toBeInTheDocument();
    expect(screen.queryByText('Region Details')).not.toBeInTheDocument();
    expect(screen.queryByText('Account Details')).not.toBeInTheDocument();
    expect(screen.queryByText('Operating Unit Details')).not.toBeInTheDocument();
  });

  it('should render only the permitted menus for a region admin', () => {
    const store = mockStore({
        user: {
        role: 'REGION_ADMIN',
        formDataId: 'region123',
        tenantId: 'tenant123',
    },
});
render(
    <Provider store={store}>
        <MemoryRouter>
          <UserMenu role="REGION_ADMIN" />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByText('Region Details')).toBeInTheDocument();
    expect(screen.getByText('My Profile')).toBeInTheDocument();
    expect(screen.queryByText('Super Admins')).not.toBeInTheDocument();
    expect(screen.queryByText('Account Details')).not.toBeInTheDocument();
    expect(screen.queryByText('Operating Unit Details')).not.toBeInTheDocument();
});

// Add more test cases for other roles as needed
});