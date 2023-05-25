import CHECKBOX_CONFIG, { ICheckBoxFields } from '../CheckBox';

describe('ICheckBoxFields', () => {
  describe('getEmptyData', () => {
    it('should return an empty ICheckBoxFields object', () => {
      const expected: ICheckBoxFields = {
        id: expect.any(String),
        viewType: 'CheckBox',
        title: '',
        fieldName: '',
        family: '',
        selectAll: true,
        isSummary: false,
        isMandatory: false,
        isEnabled: true,
        visibility: expect.any(String),
        condition: [],
        hint: '',
        optionsList: [],
        errorMessage: '',
        isNotDefault: true
      };
      const result = CHECKBOX_CONFIG.getEmptyData();
      expect(result).toEqual(expected);
    });
  });

  describe('getJSON', () => {
    it('should correctly format the input object', () => {
      const input = {
        fieldName: { label: 'test label' },
        selectAll: true,
        condition: [null, undefined],
      };
      const expected = {
        fieldName: 'test label',
        selectAll: true,
        condition: [],
      };
      if (CHECKBOX_CONFIG.getJSON) {
      const result = CHECKBOX_CONFIG.getJSON(input);
      expect(result).toEqual(expected);
      }
    });

    it('should convert minValue and maxValue to numbers if they exist', () => {
      const input = {
        fieldName: { label: 'test label' },
        selectAll: true,
        minValue: 1,
        maxValue: 2
      };
      const expected = {
        fieldName: 'test label',
        selectAll: true,
        minValue: 1,
        maxValue: 2
      };
      if (CHECKBOX_CONFIG.getJSON) {
      const result = CHECKBOX_CONFIG.getJSON(input);
      expect(result).toEqual(expected);
      }
    });
  });
});