import React from 'react';
import { shallow } from 'enzyme';
import Pagination from './index';
import styles from './Pagination.module.scss';
import APPCONSTANTS from '../../constants/appConstants';


describe('Pagination component', () => {
    let props = {
        length: APPCONSTANTS.ROWS_PER_PAGE_OF_TABLE,
        total: 100,
        onChangePage: jest.fn(),
        initialPage: 1,
        currentPage: 1,
        onChangeRowsPerPage: jest.fn()
    };
  beforeEach(() => {
    props.length = APPCONSTANTS.ROWS_PER_PAGE_OF_TABLE;
    props.total = 100;
    props.currentPage = 1;
  });

  it('renders without crashing', () => {
    shallow(<Pagination {...props} />);
  });

  it('renders the correct number of pages', () => {
    const wrapper = shallow(<Pagination {...props} />);
    const pageLinks = wrapper.find('li');
    expect(pageLinks).toHaveLength(4);
  });

  it('calls onChangePage when a page link is clicked', () => {
    props.currentPage = 2;
    const wrapper = shallow(<Pagination {...props} />);
    const secondPageLink = wrapper.find(`.${styles.paginationButton}`).at(2);
    
    secondPageLink.simulate('click');
    expect(props.onChangePage).toHaveBeenCalledWith(1, 10);
  });

  it('calls onChangePage when a page link is clicked 2', () => {
    props.currentPage = 2;
    const wrapper = shallow(<Pagination {...props} />);
    const secondPageLink = wrapper.find(`.${styles.paginationButton}`).at(1);
    
    secondPageLink.simulate('click');
    expect(props.onChangePage).toHaveBeenCalledWith(1, 10);
  });

it('calls onChangePage when a page link is clickedd', () => {
    props.currentPage = 10;
    const wrapper = shallow(<Pagination {...props} />);
    const secondPageLink = wrapper.find(`.${styles.paginationButton}`).last();
    
    secondPageLink.simulate('click');
    expect(props.onChangePage).toHaveBeenCalledWith(1, 10);
  });
});
