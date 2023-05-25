import APPCONSTANTS from '../../../../../constants/appConstants';
import { IBaseFieldMeta } from '../../../types/BaseFieldMeta';
import { IBaseFields } from '../../../types/BaseFields';
import { IComponentConfig, IFieldViewType } from '../../../types/ComponentConfig';

export interface IHeightFields extends IBaseFields {
  errorMessage?: string;
  isNotDefault?: boolean;
}

const getEmptyData = (): IHeightFields => ({
  id: new Date().getTime().toString() + 'Height',
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
  isNotDefault: true
});

const customizableFieldMeta: IBaseFieldMeta = {
  visibility: {},
  isEnabled: {},
  isMandatory: {},
  errorMessage: {},
  title: {},
  condition: {},
  fieldName: {},
  isEditable: {},
  unitMeasurement: {}
};

const getJSON = (json: any): IFieldViewType => {
  json.fieldName = json.fieldName?.label ? json.fieldName.label : json.fieldName;
  json.condition = json.condition?.filter((val: any) => !!val);
  return json;
};

const HEIGHT_CONFIG: IComponentConfig = {
  getEmptyData,
  customizableFieldMeta,
  getJSON
};

export default HEIGHT_CONFIG;
