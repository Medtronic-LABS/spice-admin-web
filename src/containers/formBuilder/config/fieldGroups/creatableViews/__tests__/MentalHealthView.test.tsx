import APPCONSTANTS from '../../../../../../constants/appConstants';
import { IBaseFieldMeta } from '../../../../types/BaseFieldMeta';
import { IFieldViewType } from '../../../../types/ComponentConfig';
import MENTAL_HEALTH_CONFIG from '../../MentalHealthView';

describe('MentalHealthView Container Test Cases', () => {
  it('should export an object with the expected properties', () => {
    expect(MENTAL_HEALTH_CONFIG).toEqual({
      getEmptyData: expect.any(Function),
      customizableFieldMeta: expect.any(Object),
      getJSON: expect.any(Function),
    });
  });

  describe('getEmptyData', () => {
    it('should return an object with the expected properties', () => {
      const emptyData: any = MENTAL_HEALTH_CONFIG.getEmptyData();

      expect(emptyData).toEqual({
        id: expect.any(String),
        viewType: 'MentalHealthView',
        title: 'Title',
        fieldName: 'Field name',
        family: 'phq4',
        visibility: APPCONSTANTS.VALIDITY_OPTIONS.visible.key,
        isMandatory: undefined,
        isEnabled: undefined,
        localDataCache: 'PHQ4',
        isNotDefault: false
      });
    });
  });

  describe('customizableFieldMeta', () => {
    it('should be an object with the expected properties', () => {
      const customizableFieldMeta: IBaseFieldMeta = MENTAL_HEALTH_CONFIG.customizableFieldMeta;

      expect(customizableFieldMeta).toEqual({
        isMandatory: {},
        title: {},
        fieldName: {},
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
        fieldName: { label: 'MentalHealthView' }
      };
      const expectedOutput: any = {
        foo: 'bar',
        baz: 42,
        fieldName: 'MentalHealthView'
      };
      if (MENTAL_HEALTH_CONFIG.getJSON) {
        const result: IFieldViewType = MENTAL_HEALTH_CONFIG.getJSON(inputObject);
        expect(result).toEqual(expectedOutput);
      } else {
        fail('getJSON is not defined');
      }
    });

    it('should return the input object with the fieldName unchanged if it does not have a label property', () => {
      const inputObject: any = {
        foo: 'bar',
        baz: 42,
        fieldName: 'MentalHealthView'
      };
      if (MENTAL_HEALTH_CONFIG.getJSON) {
        const result: IFieldViewType = MENTAL_HEALTH_CONFIG.getJSON(inputObject);
        expect(result).toBe(inputObject);
      } else {
        fail('getJSON is not defined');
      }
    });
  });
});
