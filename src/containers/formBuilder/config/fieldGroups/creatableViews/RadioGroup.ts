import APPCONSTANTS from '../../../../../constants/appConstants';
import { IBaseFieldMeta } from '../../../types/BaseFieldMeta';
import { IBaseFields } from '../../../types/BaseFields';
import { IComponentConfig, IFieldViewType } from '../../../types/ComponentConfig';

export interface IRadioGroupFields extends IBaseFields {
  orientation: number;
  visibility: string;
  defaultValue?: string;
  optionsList: Array<{ name: string; id: string }>;
  errorMessage?: string;
  isNotDefault?: boolean;
}

const getEmptyData = (): IRadioGroupFields => ({
  id: new Date().getTime().toString() + 'RadioGroup',
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

const customizableFieldMeta: IBaseFieldMeta = {
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
};

const getJSON = (json: any): IFieldViewType => {
  json.fieldName = json.fieldName?.label ? json.fieldName.label : json.fieldName;
  json.condition = json.condition?.filter((val: any) => !!val);
  return json;
};

const RADIO_GROUP_CONFIG: IComponentConfig = {
  getEmptyData,
  customizableFieldMeta,
  getJSON
};

export default RADIO_GROUP_CONFIG;
