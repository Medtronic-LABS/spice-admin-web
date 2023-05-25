import APPCONSTANTS from '../../../../../../constants/appConstants';
import { IBaseFieldMeta } from '../../../../types/BaseFieldMeta';
import { IFieldViewType } from '../../../../types/ComponentConfig';
import TIME_VIEW_CONFIG from '../TimeView';

describe('TimeView Container Test Cases', () => {
  it('should export an object with the expected properties', () => {
    expect(TIME_VIEW_CONFIG).toEqual({
      getEmptyData: expect.any(Function),
      customizableFieldMeta: expect.any(Object),
      getJSON: expect.any(Function),
    });
  });

  describe('getEmptyData', () => {
    it('should return an object with the expected properties', () => {
      const emptyData: any = TIME_VIEW_CONFIG.getEmptyData();

      expect(emptyData).toEqual({
        id: expect.any(String),
        viewType: 'TimeView',
        title: '',
        fieldName: '',
        family: '',
        isSummary: false,
        isMandatory: false,
        isEnabled: true,
        visibility: APPCONSTANTS.VALIDITY_OPTIONS.visible.key,
        isNotDefault: true
      });
    });
  });

  describe('customizableFieldMeta', () => {
    it('should be an object with the expected properties', () => {
      const customizableFieldMeta: IBaseFieldMeta = TIME_VIEW_CONFIG.customizableFieldMeta;

      expect(customizableFieldMeta).toEqual({
        title: {},
        fieldName: {},
        isMandatory: {},
        visibility: {},
        isEnabled: {},
        isEditable: {},
        unitMeasurement: {}
      });
    });
  });

  describe('getJSON', () => {
    it('should return the input object with the fieldName transformed if it has a label property', () => {
      const inputObject: any = {
        foo: 'bar',
        baz: 42,
        fieldName: { label: 'TimeView' }
      };
      const expectedOutput: any = {
        foo: 'bar',
        baz: 42,
        fieldName: 'TimeView'
      };
      if (TIME_VIEW_CONFIG.getJSON) {
        const result: IFieldViewType = TIME_VIEW_CONFIG.getJSON(inputObject);
        expect(result).toEqual(expectedOutput);
      } else {
        fail('getJSON is not defined');
      }
    });

    it('should return the input object with the fieldName unchanged if it does not have a label property', () => {
      const inputObject: any = {
        foo: 'bar',
        baz: 42,
        fieldName: 'TimeView'
      };
      if (TIME_VIEW_CONFIG.getJSON) {
        const result: IFieldViewType = TIME_VIEW_CONFIG.getJSON(inputObject);
        expect(result).toBe(inputObject);
      } else {
        fail('getJSON is not defined');
      }
    });
  });
});
