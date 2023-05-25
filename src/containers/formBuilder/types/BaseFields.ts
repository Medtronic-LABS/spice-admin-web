import { ICondition } from './ConditionTypes';

export interface IBaseFields {
  id: string;
  viewType: string;
  title: string;
  fieldName: string;
  family: string;
  isSummary?: boolean;
  isEnabled?: boolean;
  visibility: string;
  isMandatory?: boolean;
  condition?: ICondition[];
  dependentID?: string;
  isNeededDefault?: string;
  localDataCache?: string;
  totalCount?: number;
  unitMeasurement?: string;
  isEditable?: boolean;
}
