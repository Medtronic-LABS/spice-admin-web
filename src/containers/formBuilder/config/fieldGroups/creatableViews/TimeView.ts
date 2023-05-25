import APPCONSTANTS from '../../../../../constants/appConstants';
import { IBaseFieldMeta } from '../../../types/BaseFieldMeta';
import { IBaseFields } from '../../../types/BaseFields';
import { IComponentConfig, IFieldViewType } from '../../../types/ComponentConfig';

export interface ITimeViewFields extends IBaseFields {
  isNew?: boolean;
  isNotDefault?: boolean;
}

const getEmptyData = (): ITimeViewFields => ({
  id: new Date().getTime().toString() + 'TimeView',
  viewType: 'TimeView',
  title: '',
  fieldName: '',
  family: '',
  isSummary: false,
  isMandatory: false,
  isEnabled: true,
  visibility: APPCONSTANTS.VALIDITY_OPTIONS.visible.key,
  isNotDefault: true
});

const customizableFieldMeta: IBaseFieldMeta = {
  title: {},
  fieldName: {},
  isMandatory: {},
  visibility: {},
  isEnabled: {},
  isEditable: {},
  unitMeasurement: {}
};

const getJSON = (json: any): IFieldViewType => {
  json.fieldName = json.fieldName?.label ? json.fieldName.label : json.fieldName;
  return json;
};

const TIME_VIEW_CONFIG: IComponentConfig = {
  getEmptyData,
  customizableFieldMeta,
  getJSON
};

export default TIME_VIEW_CONFIG;
