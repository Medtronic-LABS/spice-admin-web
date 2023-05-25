import CARD_VIEW_CONFIG, { ICardViewFields } from '../CardView';
import { IBaseFieldMeta } from '../../../types/BaseFieldMeta';
import { IFieldViewType } from '../../../types/ComponentConfig';

describe('CARD_VIEW_CONFIG', () => {
  it('should export an object with the expected properties', () => {
    expect(CARD_VIEW_CONFIG).toEqual({
      getEmptyData: expect.any(Function),
      customizableFieldMeta: expect.any(Object),
      getJSON: expect.any(Function),
    });
  });

  describe('getEmptyData', () => {
    it('should return an object with the expected properties', () => {
      const emptyData: ICardViewFields = CARD_VIEW_CONFIG.getEmptyData();

      expect(emptyData).toEqual({
        id: expect.any(String),
        viewType: 'CardView',
        title: '',
        familyOrder: -1,
      });
    });
  });

  describe('customizableFieldMeta', () => {
    it('should be an object with the expected properties', () => {
      const customizableFieldMeta: IBaseFieldMeta = CARD_VIEW_CONFIG.customizableFieldMeta;

      expect(customizableFieldMeta).toEqual({
        title: {},
      });
    });
  });

  describe('getJSON', () => {
    it('should return the input object if getJSON is defined', () => {
      const inputObject: any = {
        foo: 'bar',
        baz: 42,
      };

      if (CARD_VIEW_CONFIG.getJSON) {
        const result: IFieldViewType = CARD_VIEW_CONFIG.getJSON(inputObject);

        expect(result).toBe(inputObject);
      } else {
        fail('getJSON is not defined');
      }
    });
  });
});
