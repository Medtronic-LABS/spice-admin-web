import APPCONSTANTS from '../../../../constants/appConstants';
import { IBaseFieldMeta } from '../../types/BaseFieldMeta';
import { IBaseFields } from '../../types/BaseFields';
import { IComponentConfig, IFieldViewType } from '../../types/ComponentConfig';

export interface ITextLabelFields extends IBaseFields {
  viewType: string;
  id: string;
  title: string;
  family: string;
  fieldName: string;
  isNew?: boolean;
  isMandatory?: boolean;
  isEnabled?: boolean;
  isNotDefault?: boolean;
}

const getEmptyData = (): ITextLabelFields => ({
  id: new Date().getTime().toString() + 'TextLabel',
  viewType: 'TextLabel',
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
  isMandatory: {},
  isEnabled: {},
  visibility: {},
  fieldName: {},
  isEditable: {},
  unitMeasurement: {}
};

const getJSON = (json: any): IFieldViewType => {
  json.fieldName = json.fieldName?.label ? json.fieldName.label : json.fieldName;
  return json;
};

const TEXT_LABEL_CONFIG: IComponentConfig = {
  getEmptyData,
  customizableFieldMeta,
  getJSON
};

export default TEXT_LABEL_CONFIG;
