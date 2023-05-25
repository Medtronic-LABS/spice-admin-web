import HEIGHT_CONFIG from '../Height';
import APPCONSTANTS from '../../../../../../constants/appConstants';
import { IBaseFieldMeta } from '../../../../types/BaseFieldMeta';
import { IFieldViewType } from '../../../../types/ComponentConfig';

describe('HEIGHT_CONFIG', () => {
  describe('getEmptyData', () => {
    it('returns an object with correct initial values', () => {
      const emptyData: any = HEIGHT_CONFIG.getEmptyData();
      expect(emptyData).toEqual({
        id: expect.any(String),
        viewType: 'Height',
        title: '',
        fieldName: '',
        family: '',
        isSummary: false,
        isMandatory: false,
        isEnabled: true,
        visibility: APPCONSTANTS.VALIDITY_OPTIONS.visible.key,
        condition: [],
        errorMessage: '',
        isNotDefault: true,
      });
    });
  });

  describe('customizableFieldMeta', () => {
    it('returns an object with correct properties', () => {
      const meta: IBaseFieldMeta = HEIGHT_CONFIG.customizableFieldMeta;
      expect(meta).toEqual({
        visibility: {},
        isEnabled: {},
        isMandatory: {},
        errorMessage: {},
        title: {},
        condition: {},
        fieldName: {},
        isEditable: {},
        unitMeasurement: {},
      });
    });
  });

  describe('getJSON', () => {
    it('returns the correct JSON object', () => {
      const input = {
        id: '123',
        viewType: 'Height',
        title: 'Height in cm',
        fieldName: { label: 'Height' },
        family: '',
        isSummary: false,
        isMandatory: true,
        isEnabled: true,
        visibility: APPCONSTANTS.VALIDITY_OPTIONS.visible.key,
        condition: ['1', '2', '3'],
        errorMessage: 'Please enter a valid height',
        isNotDefault: false,
      };
      const expected: IFieldViewType = {
        id: '123',
        viewType: 'Height',
        title: 'Height in cm',
        fieldName: 'Height',
        family: '',
        isSummary: false,
        isMandatory: true,
        isEnabled: true,
        visibility: APPCONSTANTS.VALIDITY_OPTIONS.visible.key,
        condition: ['1', '2', '3'] as any,
        errorMessage: 'Please enter a valid height',
        isNotDefault: false,
      };
      if (HEIGHT_CONFIG.getJSON) {
        const result = HEIGHT_CONFIG.getJSON(input);
        expect(result).toEqual(expected);
      }
    });
  });
});