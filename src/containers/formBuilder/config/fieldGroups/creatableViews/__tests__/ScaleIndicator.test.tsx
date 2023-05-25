import APPCONSTANTS from '../../../../../../constants/appConstants';
import SCALE_INDICATOR_CONFIG from '../ScaleIndicator';

describe('ScaleIndicator Config Component', () => {
  describe('getEmptyData', () => {
    it('should return an object with default values', () => {
      const emptyData: any = SCALE_INDICATOR_CONFIG.getEmptyData();
      expect(emptyData.id).toBeDefined();
      expect(emptyData.viewType).toEqual('ScaleIndicator');
      expect(emptyData.title).toEqual('');
      expect(emptyData.fieldName).toEqual('');
      expect(emptyData.family).toEqual('');
      expect(emptyData.isSummary).toBeFalsy();
      expect(emptyData.isMandatory).toBeFalsy();
      expect(emptyData.isEnabled).toBeTruthy();
      expect(emptyData.isAboveUpperLimit).toBeFalsy();
      expect(emptyData.visibility).toEqual(APPCONSTANTS.VALIDITY_OPTIONS.visible.key);
      expect(emptyData.errorMessage).toBeUndefined();
      expect(emptyData.startValue).toBeUndefined();
      expect(emptyData.endValue).toBeUndefined();
      expect(emptyData.interval).toBeUndefined();
      expect(emptyData.isNotDefault).toBeTruthy();
    });
  });

  describe('customizableFieldMeta', () => {
    it('should contain all required fields', () => {
      const expectedFields = {
        visibility: expect.any(Object),
        isEnabled: expect.any(Object),
        isMandatory: expect.any(Object),
        isAboveUpperLimit: expect.any(Object),
        startValue: expect.any(Object),
        endValue: expect.any(Object),
        interval: expect.any(Object),
        errorMessage: expect.any(Object),
        title: expect.any(Object),
        fieldName: expect.any(Object),
        isEditable: expect.any(Object)
      };
      expect(SCALE_INDICATOR_CONFIG.customizableFieldMeta).toEqual(expectedFields);
    });
  });

  describe('getJSON', () => {
    it('should return the correct JSON', () => {
      const inputJson: any = {
        viewType: 'ScaleIndicator',
        title: 'Scale Indicator',
        fieldName: 'scaleIndicator',
        family: 'scaleIndicatorFamily',
        isSummary: true,
        inputType: 0,
        isMandatory: true,
        isEnabled: false,
        visibility: APPCONSTANTS.VALIDITY_OPTIONS.visible.key,
        startValue: '10',
        endValue: '20',
        interval: '5'
      };
      const expectedJson = {
        viewType: 'ScaleIndicator',
        title: 'Scale Indicator',
        fieldName: 'scaleIndicator',
        family: 'scaleIndicatorFamily',
        isSummary: true,
        isMandatory: true,
        isEnabled: false,
        visibility: APPCONSTANTS.VALIDITY_OPTIONS.visible.key,
        startValue: 10,
        endValue: 20,
        interval: 5
      };

      if (SCALE_INDICATOR_CONFIG.getJSON) {
        expect(SCALE_INDICATOR_CONFIG.getJSON(inputJson)).toEqual(expectedJson);
      }
    });
    it('should remove the inputType property if it is set to 0', () => {
      const json = { id: '123', fieldType: 'text', inputType: 0 };
      const expectedJson = { id: '123', fieldType: 'text' };
      if (SCALE_INDICATOR_CONFIG.getJSON) {
        expect(SCALE_INDICATOR_CONFIG.getJSON(json)).toEqual(expectedJson);
      }
    });

    it('should convert startValue, endValue and interval to numbers if they are present', () => {
      const json = { id: '123', fieldType: 'scale', startValue: '10', endValue: '20', interval: '5' };
      const expectedJson = { id: '123', fieldType: 'scale', startValue: 10, endValue: 20, interval: 5 };
      if (SCALE_INDICATOR_CONFIG.getJSON) {
        expect(SCALE_INDICATOR_CONFIG.getJSON(json)).toEqual(expectedJson);
      }
    });

    it('should set fieldName to label property if it exists in the fieldName object', () => {
      const json = { id: '123', fieldType: 'text', fieldName: { label: 'Name' } };
      const expectedJson = { id: '123', fieldType: 'text', fieldName: 'Name' };
      if (SCALE_INDICATOR_CONFIG.getJSON) {
        expect(SCALE_INDICATOR_CONFIG.getJSON(json)).toEqual(expectedJson);
      }
    });

    it('should not modify the original json object', () => {
      const json = { id: '123', fieldType: 'text', fieldName: { label: 'Name' } };
      if (SCALE_INDICATOR_CONFIG.getJSON) {
        SCALE_INDICATOR_CONFIG.getJSON(json);
        expect(json).toEqual({ id: '123', fieldType: 'text', fieldName: 'Name' });
      }
    });
  });
});
