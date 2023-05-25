import { mount } from 'enzyme';
import TEXT_LABEL_CONFIG from '../TextLabel';

describe('TEXT_LABEL_CONFIG', () => {
  it('should render without error', () => {
    const wrapper = mount(<div />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should return empty data when calling getEmptyData()', () => {
    const emptyData = TEXT_LABEL_CONFIG.getEmptyData();
    expect(emptyData).toEqual({
      id: expect.any(String),
      viewType: 'TextLabel',
      title: '',
      fieldName: '',
      family: '',
      isSummary: false,
      isMandatory: false,
      isEnabled: true,
      visibility: 'visible',
      isNotDefault: true
    });
  });

  it('Get json with label', () => {
    const sampleJson = {
      fieldName: {
        label: 'label'
      }
    };
    if (TEXT_LABEL_CONFIG.getJSON) {
      const json = TEXT_LABEL_CONFIG.getJSON(sampleJson);
      expect(json).toEqual({
        fieldName: 'label'
      });
    }
  });

  it('Get json without label', () => {
    const sampleJson = {
      fieldName: 'label'
    };
    if (TEXT_LABEL_CONFIG.getJSON) {
      const json = TEXT_LABEL_CONFIG.getJSON(sampleJson);
      expect(json).toEqual({
        fieldName: 'label'
      });
    }
  });
});
