import { ICardViewFields } from '../config/fieldGroups/CardView';
import { IAgeFields } from '../config/fieldGroups/creatableViews/Age';
import { IBPInputFields } from '../config/fieldGroups/creatableViews/BPInput';
import { ICheckBoxFields } from '../config/fieldGroups/creatableViews/CheckBox';
import { IEditTextFields } from '../config/fieldGroups/creatableViews/EditText';
import { IHeightFields } from '../config/fieldGroups/creatableViews/Height';
import { IInstructionFields } from '../config/fieldGroups/creatableViews/Instruction';
import { IRadioGroupFields } from '../config/fieldGroups/creatableViews/RadioGroup';
import { ISpinnerFields } from '../config/fieldGroups/creatableViews/Spinner';
import { ITimeViewFields } from '../config/fieldGroups/creatableViews/TimeView';
import { IMentalHealthViewFields } from '../config/fieldGroups/MentalHealthView';
import { ITextLabelFields } from '../config/fieldGroups/TextLabel';

import { IBaseFieldMeta } from './BaseFieldMeta';

export type IFieldViewType =
  | IEditTextFields
  | IRadioGroupFields
  | IBPInputFields
  | ISpinnerFields
  | ICheckBoxFields
  | IAgeFields
  | IHeightFields
  | ITimeViewFields
  | IInstructionFields
  | ICardViewFields
  | IMentalHealthViewFields
  | ITextLabelFields;

export interface IComponentConfig {
  getEmptyData: () => IFieldViewType;
  customizableFieldMeta: IBaseFieldMeta;
  getJSON?: (json: any) => IFieldViewType;
}
