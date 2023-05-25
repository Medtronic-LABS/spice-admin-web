import React from 'react';
import { render, screen} from '@testing-library/react';
import { useSelector } from 'react-redux';
import LockedUsers from '../LockedUsers';
import { lockedUsers, lockedUsersCount, roleSelector, tenantIdSelector } from '../../../store/user/selectors';
import APPCONSTANTS  from '../../../constants/appConstants';
import { mount } from 'enzyme';
import CustomTable from '../../../components/customtable/CustomTable';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
  useSelector: jest.fn().mockReturnValue(jest.fn())
}));

jest.mock('../../../store/user/selectors', () => ({
  lockedUsers: jest.fn(),
  lockedUsersCount: jest.fn(),
  roleSelector: jest.fn(),
  tenantIdSelector: jest.fn()
}));

jest.mock('../../../store/user/actions', () => ({
  fetchLockedUsersRequest: jest.fn(),
  unlockUsersRequest: jest.fn()
}));

describe('LockedUsers', () => {
    let wrapper;
  const mockLockedUsersList = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe@example.com'
    }
  ];
  const mockLockedUsersTotal = 1;
  const mockRole = APPCONSTANTS.ROLES.SUPER_USER;
  const mockTenantId = 'abc123';

  beforeEach(() => {
    useSelector((selector) => {
      switch (selector) {
        case lockedUsers:
          return mockLockedUsersList;
        case lockedUsersCount:
          return mockLockedUsersTotal;
        case roleSelector:
          return mockRole;
        case tenantIdSelector:
          return mockTenantId;
        default:
          return undefined;
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Locked Users header', () => {
    render(<LockedUsers />);
    expect(screen.getByText('Locked Users')).toBeInTheDocument();
  });

  it('should render CustomTable with customTitle prop', () => {
    wrapper = mount(<LockedUsers />);
    expect(wrapper.find(CustomTable).prop('customTitle')).toEqual('Unlock User');
  });

});
