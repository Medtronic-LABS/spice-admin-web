import { mount, shallow } from 'enzyme';
import Questionnaire from '../Questionnaire';
import TagInput from '../TagInput';

describe('Questionnaire component', () => {
  const handleSubQuestionsChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const wrapper = shallow(<Questionnaire />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render with label and asterisk', () => {
    const wrapper = shallow(<Questionnaire label='Label' required={true} />);
    expect(wrapper.find('label').text()).toBe('Label*');
  });

  it('should render with no label and no asterisk', () => {
    const wrapper = shallow(<Questionnaire label={undefined} required={false} />);
    expect(wrapper.find('label').exists()).toBeFalsy();
  });

  it('should render input and tag with default values', () => {
    const defaultValues = [
      {
        id: '1',
        name: 'Question 1',
        optionsList: ['Option 1', 'Option 2']
      }
    ];

    const wrapper = mount(<Questionnaire defaultValue={defaultValues} />);
    const inputWrapper = wrapper.find('li').at(0).find('.flex-grow-1');
    expect(inputWrapper.text()).toBe('Question 1');
  });

  it('should call onChange when options value changes', () => {
    const defaultValue = [{ id: '1', name: 'Question 1', optionsList: ['Option 1'] }];
    const wrapper = shallow(<Questionnaire defaultValue={defaultValue} onChange={handleSubQuestionsChange} />);
    const tagInputWrapper = wrapper.find(TagInput);
    tagInputWrapper.prop('onChange')?.(['Option 1', 'Option 2']);
    expect(handleSubQuestionsChange).toHaveBeenCalledWith([
      { id: '1', name: 'Question 1', optionsList: ['Option 1', 'Option 2'] }
    ]);
  });

  it('should call onChange when deleting an input', () => {
    const defaultValue = [
      { id: '1', name: 'Question 1', optionsList: [] },
      { id: '2', name: 'Question 2', optionsList: [] }
    ];
    const wrapper = shallow(<Questionnaire defaultValue={defaultValue} onChange={handleSubQuestionsChange} />);
    const deleteButtonWrapper = wrapper.find('li').at(1).find('img');
    deleteButtonWrapper.simulate('click');
    expect(handleSubQuestionsChange).toHaveBeenCalledWith([
      { id: '1', name: 'Question 1', optionsList: [] },
      { id: '2', name: 'Question 2', optionsList: [] }
    ]);
  });
});
