import APPCONSTANTS from '../../../../../constants/appConstants';
import { IBaseFieldMeta } from '../../../types/BaseFieldMeta';
import { IBaseFields } from '../../../types/BaseFields';
import { IComponentConfig, IFieldViewType } from '../../../types/ComponentConfig';

export interface IScaleIndicatorFields extends IBaseFields {
  errorMessage?: string;
  startValue?: number;
  endValue?: number;
  interval?: number;
  isAboveUpperLimit?: boolean;
  isNotDefault?: boolean;
}

const getEmptyData = (): IScaleIndicatorFields => ({
  id: new Date().getTime().toString() + 'ScaleIndicator',
  viewType: 'ScaleIndicator',
  title: '',
  fieldName: '',
  family: '',
  isSummary: false,
  isMandatory: false,
  isEnabled: true,
  isAboveUpperLimit: false,
  visibility: APPCONSTANTS.VALIDITY_OPTIONS.visible.key,
  isNotDefault: true,
  errorMessage: undefined,
  startValue: undefined,
  endValue: undefined,
  interval: undefined
});

const customizableFieldMeta: IBaseFieldMeta = {
  visibility: {},
  isEnabled: {},
  isMandatory: {},
  isAboveUpperLimit: {},
  startValue: {},
  endValue: {},
  interval: {},
  errorMessage: {},
  title: {},
  fieldName: {},
  isEditable: {}
};

const getJSON = (json: any): IFieldViewType => {
  json.fieldName = json.fieldName?.label ? json.fieldName.label : json.fieldName;
  if (json.inputType === 0) {
    delete json.inputType;
  }
  if (json.startValue) {
    json.startValue = Number(json.startValue);
  }
  if (json.endValue) {
    json.endValue = Number(json.endValue);
  }
  if (json.interval) {
    json.interval = Number(json.interval);
  }
  return json;
};

const SCALE_INDICATOR_CONFIG: IComponentConfig = {
  getEmptyData,
  customizableFieldMeta,
  getJSON
};

export default SCALE_INDICATOR_CONFIG;
