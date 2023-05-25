import APPCONSTANTS from '../../../../../constants/appConstants';
import { IBaseFieldMeta } from '../../../types/BaseFieldMeta';
import { IBaseFields } from '../../../types/BaseFields';
import { IComponentConfig, IFieldViewType } from '../../../types/ComponentConfig';

export interface IInstructionFields extends IBaseFields {
  inputType?: number;
  instructions: string[];
  isNotDefault?: boolean;
}

const getEmptyData = (): IInstructionFields => ({
  id: new Date().getTime().toString() + 'Instruction',
  viewType: 'Instruction',
  title: '',
  fieldName: '',
  family: '',
  isSummary: false,
  isMandatory: false,
  isEnabled: true,
  visibility: APPCONSTANTS.VALIDITY_OPTIONS.visible.key,
  instructions: [],
  isNotDefault: true
});

const customizableFieldMeta: IBaseFieldMeta = {
  instructions: {},
  fieldName: {},
  title: {},
  visibility: {},
  isEditable: {},
  unitMeasurement: {}
};

const getJSON = (json: any): IFieldViewType => {
  json.fieldName = json.fieldName?.label ? json.fieldName.label : json.fieldName;
  if (json.inputType === 0) {
    delete json.inputType;
  }
  return json;
};

const INSTRUCTION_CONFIG: IComponentConfig = {
  getEmptyData,
  customizableFieldMeta,
  getJSON
};

export default INSTRUCTION_CONFIG;
