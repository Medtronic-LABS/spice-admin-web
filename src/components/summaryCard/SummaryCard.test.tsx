import React from 'react';
import { mount, shallow } from 'enzyme';
import SummaryCard, { ISummaryCardProps } from './SummaryCard';
import styles from './SummaryCard.module.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import SUMMARY_CARD_CONSTANTS from '../../tests/mockData/summaryCardConstants';

jest.mock('../../assets/images/arrow-right-small.svg', () => ({
    ReactComponent: 'ArrowRight'
  }));

describe('SummaryCard component', () => {
  const props: ISummaryCardProps = SUMMARY_CARD_CONSTANTS.SUMMARY_CARD_PROPS;

  it('should render without errors', () => {
    const wrapper = shallow(<SummaryCard {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  it('should render a title and subtitle', () => {
    const wrapper = shallow(<SummaryCard {...props} />);
    expect(wrapper.find('.primary-title')).toHaveLength(3);
    expect(wrapper.find('.fs-0dot75')).toHaveLength(1);
  });

  it('should render data elements', () => {
    const wrapper = shallow(<SummaryCard {...props} />);
    expect(wrapper.find(`.${styles.summaryElement}`)).toHaveLength(8);
  });

  it('should call onClick when data element is clicked', () => {
    const wrapper = shallow(<SummaryCard {...props} />);
    const wrp = wrapper.find(`.${styles.summaryElement}.py-sm-1dot125.py-0dot5.px-sm-1.px-0dot5.d-flex.flex-column.mw-0`).first();
    
    wrp.simulate('click');
    expect(props.data[0].onClick).toHaveBeenCalled();
  });

  it('should call handleNavigation when move forward element is clicked', () => {
    jest.mock('react-router-dom', () => ({
        useHistory: () => ({
          push: jest.fn(),
        })
      }));
    const wrapper = mount(
    <Router>
    <SummaryCard {...props} />
    </Router>
    );
    const wrp = wrapper.find(`.align-self-center.${styles.moveForward}.my-0dot5`);
    wrp.simulate('click');
    expect(props.setBreadcrumbDetails).toHaveBeenCalled();
  });

  it('should call handleNavigation when move forward element is mouse leaved', () => {
    jest.mock('react-router-dom', () => ({
        useHistory: () => ({
          push: jest.fn(),
        })
      }));
    const wrapper = mount(
    <Router>
    <SummaryCard {...props} />
    </Router>
    );
    const wrp = wrapper.find(`.align-self-center.${styles.moveForward}.my-0dot5`);
    wrp.simulate('mouseleave');
  });
});
