import APPCONSTANTS from '../../../../../../constants/appConstants';
import { IBaseFieldMeta } from '../../../../types/BaseFieldMeta';
import { IFieldViewType } from '../../../../types/ComponentConfig';
import RADIO_GROUP_CONFIG from '../RadioGroup';

describe('RadioGroup Container Test Cases', () => {
  it('should export an object with the expected properties', () => {
    expect(RADIO_GROUP_CONFIG).toEqual({
      getEmptyData: expect.any(Function),
      customizableFieldMeta: expect.any(Object),
      getJSON: expect.any(Function),
    });
  });

  describe('getEmptyData', () => {
    it('should return an object with the expected properties', () => {
      const emptyData: any = RADIO_GROUP_CONFIG.getEmptyData();

      expect(emptyData).toEqual({
        id: expect.any(String),
        viewType: 'RadioGroup',
        title: '',
        fieldName: '',
        family: '',
        isSummary: false,
        isMandatory: false,
        isEnabled: true,
        visibility: APPCONSTANTS.VALIDITY_OPTIONS.visible.key,
        condition: [],
        optionsList: [],
        orientation: 0,
        errorMessage: '',
        isNotDefault: true
      });
    });
  });

  describe('customizableFieldMeta', () => {
    it('should be an object with the expected properties', () => {
      const customizableFieldMeta: IBaseFieldMeta = RADIO_GROUP_CONFIG.customizableFieldMeta;

      expect(customizableFieldMeta).toEqual({
        orientation: {},
        visibility: {},
        title: {},
        fieldName: {},
        isMandatory: {},
        optionsList: {},
        condition: {},
        errorMessage: {},
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
        fieldName: { label: 'RadioGroup' },
        condition: ['new']
      };
      const expectedOutput: any = {
        foo: 'bar',
        baz: 42,
        fieldName: 'RadioGroup',
        condition: ['new']
      };
      if (RADIO_GROUP_CONFIG.getJSON) {
        const result: IFieldViewType = RADIO_GROUP_CONFIG.getJSON(inputObject);
        expect(result).toEqual(expectedOutput);
      } else {
        fail('getJSON is not defined');
      }
    });

    it('should return the input object with the fieldName unchanged if it does not have a label property', () => {
      const inputObject: any = {
        foo: 'bar',
        baz: 42,
        fieldName: 'RadioGroup',
        condition: ['new']
      };
      if (RADIO_GROUP_CONFIG.getJSON) {
        const result: IFieldViewType = RADIO_GROUP_CONFIG.getJSON(inputObject);
        expect(result).toBe(inputObject);
      } else {
        fail('getJSON is not defined');
      }
    });
  });
});
