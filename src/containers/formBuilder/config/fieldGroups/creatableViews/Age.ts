import APPCONSTANTS from '../../../../../constants/appConstants';
import { IBaseFieldMeta } from '../../../types/BaseFieldMeta';
import { IBaseFields } from '../../../types/BaseFields';
import { IComponentConfig, IFieldViewType } from '../../../types/ComponentConfig';

export interface IAgeFields extends IBaseFields {
  hint?: string;
  disableFutureDate?: boolean;
  isNotDefault?: boolean;
}

const getEmptyData = (): IAgeFields => ({
  id: new Date().getTime().toString() + 'Age',
  viewType: 'Age',
  title: '',
  fieldName: '',
  family: '',
  isSummary: false,
  isMandatory: false,
  isEnabled: true,
  visibility: APPCONSTANTS.VALIDITY_OPTIONS.visible.key,
  disableFutureDate: true,
  isNotDefault: true
});

const customizableFieldMeta: IBaseFieldMeta = {
  title: {},
  fieldName: {},
  isMandatory: {},
  disableFutureDate: {},
  isEnabled: {},
  visibility: {},
  isEditable: {},
  unitMeasurement: {}
};

const getJSON = (json: any): IFieldViewType => {
  json.fieldName = json.fieldName?.label ? json.fieldName.label : json.fieldName;
  return json;
};

const AGE_CONFIG: IComponentConfig = {
  getEmptyData,
  customizableFieldMeta,
  getJSON
};

export default AGE_CONFIG;
