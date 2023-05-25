import AGE_CONFIG from '../Age';
import APPCONSTANTS from '../../../../../../constants/appConstants';
import { IBaseFieldMeta } from '../../../../types/BaseFieldMeta';
import { IFieldViewType } from '../../../../types/ComponentConfig';

describe('Age Container Test Cases', () => {
  it('should export an object with the expected properties', () => {
    expect(AGE_CONFIG).toEqual({
      getEmptyData: expect.any(Function),
      customizableFieldMeta: expect.any(Object),
      getJSON: expect.any(Function),
    });
  });

  describe('getEmptyData', () => {
    it('should return an object with the expected properties', () => {
      const emptyData: any = AGE_CONFIG.getEmptyData();

      expect(emptyData).toEqual({
        id: expect.any(String),
        viewType: 'Age',
        title: '',
        fieldName: '',
        family: '',
        isSummary: false,
        isMandatory: false,
        isEnabled: true,
        visibility: APPCONSTANTS.VALIDITY_OPTIONS.visible.key,
        hint: undefined,
        disableFutureDate: true,
        isNotDefault: true
      });
    });
  });

  describe('customizableFieldMeta', () => {
    it('should be an object with the expected properties', () => {
      const customizableFieldMeta: IBaseFieldMeta = AGE_CONFIG.customizableFieldMeta;

      expect(customizableFieldMeta).toEqual({
        title: {},
        fieldName: {},
        isMandatory: {},
        disableFutureDate: {},
        isEnabled: {},
        visibility: {},
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
        fieldName: { label: 'Age' }
      };
      const expectedOutput: any = {
        foo: 'bar',
        baz: 42,
        fieldName: 'Age'
      };
      if (AGE_CONFIG.getJSON) {
        const result: IFieldViewType = AGE_CONFIG.getJSON(inputObject);
        expect(result).toEqual(expectedOutput);
      } else {
        fail('getJSON is not defined');
      }
    });

    it('should return the input object with the fieldName unchanged if it does not have a label property', () => {
      const inputObject: any = {
        foo: 'bar',
        baz: 42,
        fieldName: 'Age'
      };
      if (AGE_CONFIG.getJSON) {
        const result: IFieldViewType = AGE_CONFIG.getJSON(inputObject);
        expect(result).toBe(inputObject);
      } else {
        fail('getJSON is not defined');
      }
    });
  });
});
