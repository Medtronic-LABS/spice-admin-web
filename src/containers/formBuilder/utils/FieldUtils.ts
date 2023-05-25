import { InputTypes } from '../config/BaseFieldConfig';
import CARD_VIEW_CONFIG from '../config/fieldGroups/CardView';
import AGE_CONFIG from '../config/fieldGroups/creatableViews/Age';
import BP_CONFIG from '../config/fieldGroups/creatableViews/BPInput';
import EDIT_TEXT_CONFIG from '../config/fieldGroups/creatableViews/EditText';
import HEIGHT_CONFIG from '../config/fieldGroups/creatableViews/Height';
import SCALE_INDICATOR_CONFIG from '../config/fieldGroups/creatableViews/ScaleIndicator';
import INSTRUCTION_CONFIG from '../config/fieldGroups/creatableViews/Instruction';
import RADIO_GROUP_CONFIG from '../config/fieldGroups/creatableViews/RadioGroup';
import SPINNER_CONFIG from '../config/fieldGroups/creatableViews/Spinner';
import CHECKBOX_CONFIG from '../config/fieldGroups/creatableViews/CheckBox';
import TIME_VIEW_CONFIG from '../config/fieldGroups/creatableViews/TimeView';
import MENTAL_HEALTH_CONFIG from '../config/fieldGroups/MentalHealthView';
import TEXT_LABEL_CONFIG from '../config/fieldGroups/TextLabel';
import { IComponentConfig } from '../types/ComponentConfig';

export const creatableViews = [
  { label: 'BP Input', value: 'BP', isAccountCustomizable: false },
  { label: 'Radio Input', value: 'RadioGroup', isAccountCustomizable: true },
  { label: 'Age Input', value: 'Age', isAccountCustomizable: false },
  { label: 'Height Input', value: 'Height', isAccountCustomizable: false },
  { label: 'Time View', value: 'TimeView', isAccountCustomizable: false },
  { label: 'Text Input', value: 'EditText', isAccountCustomizable: true },
  { label: 'Select Input', value: 'Spinner', isAccountCustomizable: true },
  { label: 'Slider', value: 'ScaleIndicator', isAccountCustomizable: true },
  { label: 'Multi Select Input', value: 'CheckBox', isAccountCustomizable: true },
  { label: 'Instructions', value: 'Instruction', isAccountCustomizable: true }
];

export const unitMeasurementFields = ['glucose', 'hba1c'];

export const isEditableFields = [
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

export const getConfigByViewType = (viewType: string): IComponentConfig => {
  switch (viewType) {
    case 'BP':
      return BP_CONFIG;
    case 'RadioGroup':
      return RADIO_GROUP_CONFIG;
    case 'Age':
      return AGE_CONFIG;
    case 'Height':
      return HEIGHT_CONFIG;
    case 'TimeView':
      return TIME_VIEW_CONFIG;
    case 'EditText':
      return EDIT_TEXT_CONFIG;
    case 'Spinner':
      return SPINNER_CONFIG;
    case 'CheckBox':
      return CHECKBOX_CONFIG;
    case 'ScaleIndicator':
      return SCALE_INDICATOR_CONFIG;
    case 'Instruction':
      return INSTRUCTION_CONFIG;
    case 'MentalHealthView':
      return MENTAL_HEALTH_CONFIG;
    case 'TextLabel':
      return TEXT_LABEL_CONFIG;
    case 'CardView':
      return CARD_VIEW_CONFIG;
    default:
      return EDIT_TEXT_CONFIG;
  }
};

export const inputTypesSwitch = (fieldValue: number, obj: any) => {
  const inputTypeRelatedFields: any = {
    minValue: false,
    maxValue: false,
    maxLength: false,
    minLength: false,
    contentLength: false
  };
  switch (fieldValue) {
    case InputTypes.NUMBER:
    case InputTypes.DECIMAL:
      inputTypeRelatedFields.minValue = true;
      inputTypeRelatedFields.maxValue = true;
      break;
    case InputTypes.PHONE_NUMBER:
      inputTypeRelatedFields.contentLength = true;
      break;
    case InputTypes.DEFAULT:
    default:
      inputTypeRelatedFields.minLength = true;
      inputTypeRelatedFields.maxLength = true;
  }

  Object.keys(inputTypeRelatedFields).forEach((key: any) => {
    if (inputTypeRelatedFields[key]) {
      obj[key] = null;
    } else {
      if (key in obj) {
        delete obj[key];
      }
    }
  });
};
