import { mount } from 'enzyme';
import React from 'react';
import { ReorderModel } from '../ReorderModel';
import MOCK_DATA_CONSTANTS from '../../../../../components/reorder/ReorderConstants'

describe('ReorderModel component', () => {
  const onSubmit = jest.fn();
  const onCancel = jest.fn();
  const orderRef = { current: {} };
  const formName = 'fields';
  const initialValue = {
    values: MOCK_DATA_CONSTANTS.INITIAL_VALUES
  };

  it('should render correctly', () => {
    const wrapper = mount(
      <ReorderModel
        initialValue={initialValue}
        orderRef={orderRef}
        formName={formName}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    );
    wrapper.setProps({formattedValue: [{id: 1}, {id: 2}]})
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onSubmit when Confirm button is clicked', () => {
    const wrapper = mount(
      <ReorderModel
        initialValue={initialValue}
        orderRef={orderRef}
        formName={formName}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    );

    wrapper.find('.primary-btn').simulate('click');

    expect(onSubmit).toHaveBeenCalled();
  });

  it('should call onCancel when Cancel button is clicked', () => {
    const wrapper = mount(
      <ReorderModel
        initialValue={initialValue}
        orderRef={orderRef}
        formName={formName}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    );

    wrapper.find('.secondary-btn').simulate('click');

    expect(onCancel).toHaveBeenCalled();
  });
  
  it('should render when family name is given', () => {
    const wrapper = mount(
      <ReorderModel
        initialValue={initialValue}
        orderRef={orderRef}
        formName={formName}
        onSubmit={onSubmit}
        onCancel={onCancel}
        familyName='bioData'
      />
    );
    wrapper.setProps({formattedValue: [{id: 1}, {id: 2}]})
    expect(wrapper).toMatchSnapshot();

    const ReorderContainer = wrapper.find('ReorderContainer');
    const onReorder:any = ReorderContainer.prop('onReorder');
    onReorder({bioData: 2, bioMetrics: 0, bpLog: 1, glucoseLog: 3, phq4: 4});
  });
});
