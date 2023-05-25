import APPCONSTANTS from '../../../../../../constants/appConstants';
import { IBaseFieldMeta } from '../../../../types/BaseFieldMeta';
import { IFieldViewType } from '../../../../types/ComponentConfig';
import SPINNER_CONFIG from '../Spinner';

describe('Spinner Container Test Cases', () => {
  it('should export an object with the expected properties', () => {
    expect(SPINNER_CONFIG).toEqual({
      getEmptyData: expect.any(Function),
      customizableFieldMeta: expect.any(Object),
      getJSON: expect.any(Function),
    });
  });

  describe('getEmptyData', () => {
    it('should return an object with the expected properties', () => {
      const emptyData: any = SPINNER_CONFIG.getEmptyData();

      expect(emptyData).toEqual({
        id: expect.any(String),
        viewType: 'Spinner',
        title: '',
        fieldName: '',
        family: '',
        isSummary: false,
        isMandatory: false,
        isEnabled: true,
        visibility: APPCONSTANTS.VALIDITY_OPTIONS.visible.key,
        condition: [],
        hint: '',
        optionsList: [],
        errorMessage: '',
        defaultValue: '',
        isNotDefault: true
      });
    });
  });

  describe('customizableFieldMeta', () => {
    it('should be an object with the expected properties', () => {
      const customizableFieldMeta: IBaseFieldMeta = SPINNER_CONFIG.customizableFieldMeta;

      expect(customizableFieldMeta).toEqual({
        visibility: {},
        isEnabled: {},
        isMandatory: {},
        defaultValue: {},
        title: {},
        fieldName: {},
        optionsList: {},
        condition: {},
        errorMessage: {},
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
        fieldName: { label: 'Spinner' },
        condition: ['new']
      };
      const expectedOutput: any = {
        foo: 'bar',
        baz: 42,
        fieldName: 'Spinner',
        condition: ['new']
      };
      if (SPINNER_CONFIG.getJSON) {
        const result: IFieldViewType = SPINNER_CONFIG.getJSON(inputObject);
        expect(result).toEqual(expectedOutput);
      } else {
        fail('getJSON is not defined');
      }
    });

    it('should return the input object with the fieldName unchanged if it does not have a label property', () => {
      const inputObject: any = {
        foo: 'bar',
        baz: 42,
        fieldName: 'Spinner',
        condition: ['new']
      };
      if (SPINNER_CONFIG.getJSON) {
        const result: IFieldViewType = SPINNER_CONFIG.getJSON(inputObject);
        expect(result).toBe(inputObject);
      } else {
        fail('getJSON is not defined');
      }
    });
  });
});
