import React from 'react';
import { mount } from 'enzyme';
import ReorderView from '../ReorderView';
import MOCK_DATA_CONSTANTS from '../../../../../components/reorder/ReorderConstants';

describe('ReorderView', () => {
  let wrapper: any;
  const mockFormRef = { current: { getState: jest.fn(() => ({ values: MOCK_DATA_CONSTANTS.INITIAL_VALUES })) } };
  const mockSetFormMeta = jest.fn();
  const mockSetFamilyOrderModelOpen = jest.fn();
  const mockSetEditGroupedFieldsOrder = jest.fn();
  const props = {
        formRef: mockFormRef,
        isFamilyOrderModelOpen:false,
        setFamilyOrderModelOpen: mockSetFamilyOrderModelOpen,
        setFormMeta: mockSetFormMeta,
        editGroupedFieldsOrder:{},
        setEditGroupedFieldsOrder:mockSetEditGroupedFieldsOrder
  }

  it('should render ReorderModel component for family order change', () => {
    props.isFamilyOrderModelOpen = true;
      wrapper = mount(
          <ReorderView {...props}/>
       );
    const reorderModel = wrapper.find('[formName="family_reorder"]');
    expect(reorderModel).toHaveLength(1);
  });

  it('should not render ReorderModel component for family order change', () => {
    props.isFamilyOrderModelOpen = false;
    wrapper = mount(
        <ReorderView {...props}/>
     );
    const reorderModel = wrapper.find('[formName="family_reorder"]');
    expect(reorderModel).toHaveLength(0);
  });

  it('should render ReorderModel component for grouped field order change', () => {
      props.editGroupedFieldsOrder = { isOpen: true, familyName: 'bioData' }
      wrapper = mount(
        <ReorderView {...props}/>
     );
    const ReorderModel = wrapper.find('ReorderModel');
    const onSumbit = ReorderModel.prop('onSubmit');
    onSumbit();
    const reorderModel = wrapper.find('[formName="field_reorder"]');
    expect(reorderModel).toHaveLength(1);
  });

  it('should not render ReorderModel component for grouped field order change', () => {
    props.editGroupedFieldsOrder = {};
    wrapper = mount(
        <ReorderView {...props}/>
     );
    const reorderModel = wrapper.find('[formName="field_reorder"]');
    expect(reorderModel).toHaveLength(0);
  });

    it('should render ReorderModel component for family order change', () => {
        props.isFamilyOrderModelOpen = true;
        wrapper = mount(
            <ReorderView {...props}/>
        );
        const ReorderModel = wrapper.find('ReorderModel');
        const onSumbit = ReorderModel.prop('onSubmit');
        onSumbit();
        const reorderModel = wrapper.find('[formName="family_reorder"]');
        expect(reorderModel).toHaveLength(1);
    });
});