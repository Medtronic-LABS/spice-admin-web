import React from 'react';
import { shallow } from 'enzyme';
import PaginationInput from './PaginationInput';
import styles from './Pagination.module.scss';
import APPCONSTANTS from '../../constants/appConstants';

describe('PaginationInput', () => {
  const props = {
    maxNumber: APPCONSTANTS.ROWS_PER_PAGE_OF_TABLE,
    onPagination: jest.fn(),
  };
  const component = shallow(<PaginationInput {...props} />);
  
  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('calls onPagination when Enter key is pressed and input value is valid', () => {
    component.find('input').simulate('change', { target: { value: '5' } });
    component.find('input').simulate('keyPress', { key: 'Enter' });
    expect(props.onPagination).toHaveBeenCalledWith(5);
  });

  it('displays error class when input value is not valid', () => {
    component.find('input').simulate('change', { target: { value: '200' } });
    expect(component.find('input').hasClass(`${styles.error}`)).toBeTruthy();
  });
});
