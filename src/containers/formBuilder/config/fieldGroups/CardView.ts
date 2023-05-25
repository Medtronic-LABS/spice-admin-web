import { IBaseFieldMeta } from '../../types/BaseFieldMeta';
import { IComponentConfig, IFieldViewType } from '../../types/ComponentConfig';

export interface ICardViewFields {
  viewType: string;
  id: string;
  title: string;
  familyOrder?: number;
}

const getEmptyData = (): ICardViewFields => ({
  id: new Date().getTime().toString() + 'CardView',
  viewType: 'CardView',
  title: '',
  familyOrder: -1
});

const customizableFieldMeta: IBaseFieldMeta = {
  title: {}
};

const getJSON = (json: any): IFieldViewType => {
  return json;
};

const CARD_VIEW_CONFIG: IComponentConfig = {
  getEmptyData,
  customizableFieldMeta,
  getJSON
};

export default CARD_VIEW_CONFIG;
