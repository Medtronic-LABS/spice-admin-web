import APPCONSTANTS from '../../../../../constants/appConstants';
import { IBaseFieldMeta } from '../../../types/BaseFieldMeta';
import { IBaseFields } from '../../../types/BaseFields';
import { IComponentConfig, IFieldViewType } from '../../../types/ComponentConfig';

export interface IBPInputFields extends IBaseFields {
  maxLength?: number;
  maxValue?: number;
  minValue?: number;
  pulseMaxValue?: number;
  pulseMinValue?: number;
  instructions?: string[];
  totalCount?: number;
  mandatoryCount?: number;
  errorMessage?: string;
  isNotDefault?: boolean;
}

const getEmptyData = (): IBPInputFields => ({
  id: new Date().getTime().toString() + 'BPInput',
  viewType: 'BP',
  title: '',
  fieldName: '',
  family: '',
  isSummary: false,
  isMandatory: false,
  isEnabled: true,
  visibility: APPCONSTANTS.VALIDITY_OPTIONS.visible.key,
  maxLength: 3,
  totalCount: 2,
  mandatoryCount: 2,
  errorMessage: '',
  minValue: undefined,
  maxValue: undefined,
  pulseMinValue: undefined,
  pulseMaxValue: undefined,
  instructions: [],
  isNotDefault: true
});

const customizableFieldMeta: IBaseFieldMeta = {
  title: {},
  fieldName: {},
  isMandatory: {},
  instructions: {},
  totalCount: {},
  mandatoryCount: {},
  errorMessage: {},
  minValue: {},
  maxValue: {},
  pulseMinValue: {},
  pulseMaxValue: {},
  isEnabled: {},
  visibility: {},
  isEditable: {},
  unitMeasurement: {}
};

export const getJSON = (json: any): IFieldViewType => {
  json.fieldName = json.fieldName?.label ? json.fieldName.label : json.fieldName;
  if (json.minValue) {
    json.minValue = Number(json.minValue);
  }
  if (json.maxValue) {
    json.maxValue = Number(json.maxValue);
  }
  return json;
};

const BP_CONFIG: IComponentConfig = {
  getEmptyData,
  customizableFieldMeta,
  getJSON
};

export default BP_CONFIG;
