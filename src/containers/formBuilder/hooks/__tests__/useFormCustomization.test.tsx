import { renderHook } from '@testing-library/react-hooks';
import { useParams } from 'react-router-dom';
import useFormCustomization from '../useFormCustomization';
import APPCONSTANTS from '../../../../constants/appConstants';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn()
}));

describe('useFormCustomization', () => {
  beforeEach(() => {
    (useParams as any).mockReturnValue({ form: 'test' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return initial values and functions', () => {
    const { result } = renderHook(() => useFormCustomization());
    const {
      formRef,
      formData,
      setFormData,
      groupViewsByFamily,
      addedFields,
      targetIds,
      collapsedGroup,
      setCollapsedGroup,
      resetCollapsedCalculation,
      getSortedData,
      presentableJson,
      hashFieldIdsWithTitle,
      hashFieldIdsWithFieldName,
      isFamilyOrderModelOpen,
      setFamilyOrderModelOpen,
      editGroupedFieldsOrder,
      setEditGroupedFieldsOrder
    } = result.current;

    expect(formRef.current).toBe(undefined);
    expect(formData).toEqual({});
    expect(typeof setFormData).toBe('function');
    expect(typeof groupViewsByFamily).toBe('function');
    expect(addedFields).toEqual([]);
    expect(targetIds).toEqual([]);
    expect(collapsedGroup).toEqual({});
    expect(typeof setCollapsedGroup).toBe('function');
    expect(typeof resetCollapsedCalculation).toBe('function');
    expect(typeof getSortedData).toBe('function');
    expect(typeof presentableJson).toBe('function');
    expect(hashFieldIdsWithTitle).toEqual({});
    expect(hashFieldIdsWithFieldName).toEqual({});
    expect(isFamilyOrderModelOpen).toBe(false);
    expect(setFamilyOrderModelOpen).toBeInstanceOf(Function);
    expect(editGroupedFieldsOrder).toEqual({ isOpen: false, familyName: '' });
    expect(setEditGroupedFieldsOrder).toBeInstanceOf(Function);
  });

  test('should group views by family', () => {
    const { result } = renderHook(() => useFormCustomization());
    const { groupViewsByFamily } = result.current;

    const views = {
      view1: { id: 'view1', family: 'Family1' },
      view2: { id: 'view2', family: 'Family1' },
      view3: { id: 'view3', family: 'Family2' },
      view4: { id: 'view4' }
    };

    const expectedResult = {
      Family1: {
        view1: { id: 'view1', family: 'Family1' },
        view2: { id: 'view2', family: 'Family1' }
      },
      Family2: {
        view3: { id: 'view3', family: 'Family2' }
      },
      [APPCONSTANTS.NO_FAMILY]: {
        view4: { id: 'view4' }
      }
    };

    const groupedViews = groupViewsByFamily(views);
    expect(groupedViews).toEqual(expectedResult);
  });

  
  test('should add target ids based on condition', () => {
    const { result } = renderHook(() => useFormCustomization());
    const { getTargetIds, targetIds } = result.current;

    const view1 = { id: 'view1', family: 'Family1', isNeededDefault: true, visibility: 'gone' };
    const view2 = { id: 'view2', family: 'Family2', isNeededDefault: false, isEnabled: false };
    const view3 = { id: 'view3', family: 'Family3', isNeededDefault: true, visibility: 'visible' };
    const view4 = { id: 'view4', family: 'Family4', isNeededDefault: true };

    getTargetIds(view1);
    getTargetIds(view2);
    getTargetIds(view3);
    getTargetIds(view4);

    const expectedTargetIds = [
      { key: 'view1', label: 'View1' },
      { key: 'view2', label: 'View2' }
    ];

    expect(targetIds).toEqual(expectedTargetIds);
  });

  test('should format values into presentable JSON', () => {
    const { result } = renderHook(() => useFormCustomization());
    const { presentableJson } = result.current;

    const values = {
      Family1: {
        field1: { id: 'field1', viewType: 'ViewType1', orderId: 2 },
        field2: { id: 'field2', viewType: 'ViewType2', orderId: 1 }
      },
      Family2: {
        field3: { id: 'field3', viewType: 'ViewType3', orderId: 3 }
      }
    };

    const sortedFamily = ['Family2', 'Family1'];

    const expectedResult = [
      { id: 'field3', viewType: 'ViewType3', orderId: 3 },
      { id: 'field2', viewType: 'ViewType2', orderId: 1 },
      { id: 'field1', viewType: 'ViewType1', orderId: 2 }
    ];

    const formattedData = presentableJson(values, sortedFamily);
    expect(formattedData).toEqual(expectedResult);
  });
  
  test('should sort data based on familyOrder property', () => {
    const { result } = renderHook(() => useFormCustomization());
    const { getSortedData } = result.current;

    const data = {
      Family1: { id: 'Family1', familyOrder: 2 },
      Family2: { id: 'Family2', familyOrder: 1 },
      Family3: { id: 'Family3' }
    };

    const expectedResult = ['Family1', 'Family2', 'Family3'];

    const sortedData = getSortedData(data);
    expect(sortedData).toEqual(expectedResult);
  });
});