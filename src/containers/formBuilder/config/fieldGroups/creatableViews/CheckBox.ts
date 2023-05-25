import APPCONSTANTS from '../../../../../constants/appConstants';
import { IBaseFieldMeta } from '../../../types/BaseFieldMeta';
import { IBaseFields } from '../../../types/BaseFields';
import { IComponentConfig, IFieldViewType } from '../../../types/ComponentConfig';

export interface ICheckBoxFields extends IBaseFields {
  selectAll: boolean;
  hint?: string;
  visibility: string;
  isNew?: boolean;
  optionsList?: Array<{ name: string; id: string }>;
  errorMessage?: string;
  isNotDefault?: boolean;
}

const getEmptyData = (): ICheckBoxFields => ({
  id: new Date().getTime().toString() + 'CheckBox',
  viewType: 'CheckBox',
  title: '',
  fieldName: '',
  family: '',
  selectAll: true,
  isSummary: false,
  isMandatory: false,
  isEnabled: true,
  visibility: APPCONSTANTS.VALIDITY_OPTIONS.visible.key,
  condition: [],
  hint: '',
  optionsList: [],
  errorMessage: '',
  isNotDefault: true
});

const customizableFieldMeta: IBaseFieldMeta = {
  visibility: {},
  selectAll: {},
  isEnabled: {},
  isMandatory: {},
  title: {},
  fieldName: {},
  optionsList: {},
  condition: {},
  errorMessage: {},
  isEditable: {},
  unitMeasurement: {}
};

const getJSON = (json: any): IFieldViewType => {
  json.fieldName = json.fieldName?.label ? json.fieldName.label : json.fieldName;
  json.condition = json.condition?.filter((val: any) => !!val);
  return json;
};

const CHECKBOX_CONFIG: IComponentConfig = {
  getEmptyData,
  customizableFieldMeta,
  getJSON
};

export default CHECKBOX_CONFIG;
