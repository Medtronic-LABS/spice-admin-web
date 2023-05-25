import BP_CONFIG, { getJSON } from '../BPInput';

describe('BP_CONFIG', () => {
  describe('getEmptyData', () => {
    it('returns an object with default values', () => {
      const data: any = BP_CONFIG.getEmptyData();
      expect(data).toEqual({
        id: expect.any(String),
        viewType: 'BP',
        title: '',
        fieldName: '',
        family: '',
        isSummary: false,
        isMandatory: false,
        isEnabled: true,
        visibility: 'visible',
        maxLength: 3,
        totalCount: 2,
        mandatoryCount: 2,
        errorMessage: '',
        minValue: undefined,
        maxValue: undefined,
        pulseMinValue: undefined,
        pulseMaxValue: undefined,
        instructions: [],
        isNotDefault: true,
      });
    });
  });
});

describe('getJSON', () => {
  it('should return input object with modified `fieldName` if `label` property exists', () => {
    const input = {
      fieldName: { label: 'Field name' },
      minValue: 10,
      maxValue: 20
    };
    const expectedOutput = {
      fieldName: 'Field name',
      minValue: 10,
      maxValue: 20
    };
    expect(getJSON(input)).toEqual(expectedOutput);
  });

  it('should return input object with modified `minValue` and `maxValue` properties as numbers', () => {
    const input = {
      fieldName: 'Field name',
      minValue: '10',
      maxValue: '20'
    };
    const expectedOutput = {
      fieldName: 'Field name',
      minValue: 10,
      maxValue: 20
    };
    expect(getJSON(input)).toEqual(expectedOutput);
  });

  it('should return input object as is if no modification needed', () => {
    const input = {
      fieldName: 'Field name',
      someOtherProp: 'value'
    };
    expect(getJSON(input)).toEqual(input);
  });
});

