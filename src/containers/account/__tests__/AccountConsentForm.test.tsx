import { shallow } from 'enzyme';
import { useDispatch, useSelector } from 'react-redux';

import AccountConsentForm from '../AccountConsentForm';
import ConsentForm from '../../ConsentForm/ConsentForm';
import ConfirmationModalPopup from '../../../components/customtable/ConfirmationModalPopup';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

describe('AccountConsentForm', () => {
  let wrapper: any;
  const dispatch = jest.fn();
  const mockSelector = jest.fn();

  beforeEach(() => {
    (useDispatch as any).mockReturnValue(dispatch);
    (useSelector as any).mockImplementation(mockSelector);
    wrapper = shallow(<AccountConsentForm isOpen={true} consentFormConfig={{}} handleConsentFormClose={jest.fn()} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders ConsentForm and ConfirmationModalPopup components', () => {
    expect(wrapper.find(ConsentForm)).toHaveLength(1);
    expect(wrapper.find(ConfirmationModalPopup)).toHaveLength(1);
  });

  it('closes ConsentForm', () => {
    wrapper.find(ConsentForm).props().submitConsentForm();
  });

  it('calls customizeFormRequest on submitConsentForm', () => {
    const data = {};
    wrapper.find(ConsentForm).props().submitConsentForm(data);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'CUSTOMIZE_FORM_REQUEST' }));
  });
});
