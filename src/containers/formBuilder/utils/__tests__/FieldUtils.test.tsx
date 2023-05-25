import { InputTypes } from '../../config/BaseFieldConfig';
import CARD_VIEW_CONFIG from '../../config/fieldGroups/CardView';
import MENTAL_HEALTH_CONFIG from '../../config/fieldGroups/MentalHealthView';
import TEXT_LABEL_CONFIG from '../../config/fieldGroups/TextLabel';
import AGE_CONFIG from '../../config/fieldGroups/creatableViews/Age';
import BP_CONFIG from '../../config/fieldGroups/creatableViews/BPInput';
import CHECKBOX_CONFIG from '../../config/fieldGroups/creatableViews/CheckBox';
import EDIT_TEXT_CONFIG from '../../config/fieldGroups/creatableViews/EditText';
import HEIGHT_CONFIG from '../../config/fieldGroups/creatableViews/Height';
import INSTRUCTION_CONFIG from '../../config/fieldGroups/creatableViews/Instruction';
import RADIO_GROUP_CONFIG from '../../config/fieldGroups/creatableViews/RadioGroup';
import SCALE_INDICATOR_CONFIG from '../../config/fieldGroups/creatableViews/ScaleIndicator';
import SPINNER_CONFIG from '../../config/fieldGroups/creatableViews/Spinner';
import TIME_VIEW_CONFIG from '../../config/fieldGroups/creatableViews/TimeView';
import {
  creatableViews,
  unitMeasurementFields,
  isEditableFields,
  getConfigByViewType,
  inputTypesSwitch
} from '../FieldUtils';

describe('Your Module', () => {
  describe('creatableViews', () => {
    it('should have the correct labels', () => {
      const expectedLabels = [
        'BP Input',
        'Radio Input',
        'Age Input',
        'Height Input',
        'Time View',
        'Text Input',
        'Select Input',
        'Slider',
        'Multi Select Input',
        'Instructions'
      ];
      expect(creatableViews.map((view: any) => view.label)).toEqual(expectedLabels);
    });

    it('should have the correct values', () => {
      const expectedValues = [
        'BP',
        'RadioGroup',
        'Age',
        'Height',
        'TimeView',
        'EditText',
        'Spinner',
        'ScaleIndicator',
        'CheckBox',
        'Instruction'
      ];
      expect(creatableViews.map((view: any) => view.value)).toEqual(expectedValues);
    });

    it('should have the correct account customization flags', () => {
      const expectedFlags = [false, true, false, false, false, true, true, true, true, true];
      expect(creatableViews.map((view: any) => view.isAccountCustomizable)).toEqual(expectedFlags);
    });
  });

  describe('unitMeasurementFields', () => {
    it('should have the correct fields', () => {
      const expectedFields = ['glucose', 'hba1c'];
      expect(unitMeasurementFields).toEqual(expectedFields);
    });
  });

  describe('isEditableFields', () => {
    it('should have the correct fields', () => {
      const expectedFields = [
        'firstName',
        'middleName',
        'lastName',
        'phoneNumber',
        'phoneNumberCategory',
        'landmark',
        'occupation',
        'insuranceStatus',
        'insuranceType',
        'insuranceId',
        'otherInsurance'
      ];
      expect(isEditableFields).toEqual(expectedFields);
    });
  });

  describe('getConfigByViewType', () => {
    it('should return the correct config for BP', () => {
      expect(getConfigByViewType('BP')).toEqual(BP_CONFIG);
    });

    it('should return the correct config for RadioGroup', () => {
      expect(getConfigByViewType('RadioGroup')).toEqual(RADIO_GROUP_CONFIG);
    });

    it('should return the correct config for Age', () => {
      expect(getConfigByViewType('Age')).toEqual(AGE_CONFIG);
    });
    it('should return the correct config for Height', () => {
      expect(getConfigByViewType('Height')).toEqual(HEIGHT_CONFIG);
    });

    it('should return the correct config for TimeView', () => {
      expect(getConfigByViewType('TimeView')).toEqual(TIME_VIEW_CONFIG);
    });

    it('should return the correct config for EditText', () => {
      expect(getConfigByViewType('EditText')).toEqual(EDIT_TEXT_CONFIG);
    });

    it('should return the correct config for Spinner', () => {
      expect(getConfigByViewType('Spinner')).toEqual(SPINNER_CONFIG);
    });

    it('should return the correct config for CheckBox', () => {
      expect(getConfigByViewType('CheckBox')).toEqual(CHECKBOX_CONFIG);
    });

    it('should return the correct config for ScaleIndicator', () => {
      expect(getConfigByViewType('ScaleIndicator')).toEqual(SCALE_INDICATOR_CONFIG);
    });

    it('should return the correct config for Instruction', () => {
      expect(getConfigByViewType('Instruction')).toEqual(INSTRUCTION_CONFIG);
    });

    it('should return the correct config for MentalHealthView', () => {
      expect(getConfigByViewType('MentalHealthView')).toEqual(MENTAL_HEALTH_CONFIG);
    });

    it('should return the correct config for TextLabel', () => {
      expect(getConfigByViewType('TextLabel')).toEqual(TEXT_LABEL_CONFIG);
    });

    it('should return the correct config for CardView', () => {
      expect(getConfigByViewType('CardView')).toEqual(CARD_VIEW_CONFIG);
    });

    it('should return the default config for an unknown view type', () => {
      expect(getConfigByViewType('UnknownType')).toEqual(EDIT_TEXT_CONFIG);
    });
  });
});

describe('inputTypesSwitch', () => {
  it('should correctly set inputTypeRelatedFields for InputTypes.DEFAULT', () => {
    const obj = { minLength: 10, maxLength: 20, contentLength: 30, minValue: 1, maxValue: 2 };
    inputTypesSwitch(InputTypes.DEFAULT, obj);
    expect(obj).toEqual({ minLength: null, maxLength: null });
  });

  it('should correctly set inputTypeRelatedFields for InputTypes.NUMBER', () => {
    const obj = { minLength: 10, maxLength: 20, contentLength: 30, minValue: 1, maxValue: 2 };
    inputTypesSwitch(InputTypes.NUMBER, obj);
    expect(obj).toEqual({ minValue: null, maxValue: null });
  });

  it('should correctly set inputTypeRelatedFields for InputTypes.DECIMAL', () => {
    const obj = { minLength: 10, maxLength: 20, contentLength: 30, minValue: 1, maxValue: 2 };
    inputTypesSwitch(InputTypes.DECIMAL, obj);
    expect(obj).toEqual({ minValue: null, maxValue: null });
  });

  it('should correctly set inputTypeRelatedFields for InputTypes.PHONE_NUMBER', () => {
    const obj = { minLength: 10, maxLength: 20, contentLength: 30, minValue: 1, maxValue: 2 };
    inputTypesSwitch(InputTypes.PHONE_NUMBER, obj);
    expect(obj).toEqual({ contentLength: null });
  });
});
