import { mount } from 'enzyme';
import AccordianView from '../AccordianView';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/region/4/6/Adfgsrgf/accountCustomize/105/malaria'
  })
}));

const props = {
  formRef: {},
  formMeta: {
    malaria: {
      malaria: {
        id: 'malaria',
        viewType: 'CardView',
        title: 'Malaria',
        familyOrder: 0,
        isCustomWorkflow: true
      }
    }
  },
  setFormMeta: () => {},
  targetIds: {},
  onSubmit: {},
  onCancel: {},
  setEditGroupedFieldsOrder: {},
  presentableJson: {},
  collapsedGroup: {},
  setCollapsedGroup: {},
  addedFields: [],
  allowedFields: [],
  hashFieldIdsWithTitle: {},
  hashFieldIdsWithFieldName: {},
  culture: {}
};

describe('OperatingUnitForm', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = mount(<AccordianView {...props} />);
  });

  it('renders Accordian View without errors', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders Accordian View with isAccountCustomization', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('Handles add new Field', () => {
    const accordianHeader = wrapper.find('AccordianHeader');
    const handleAddNewFieldElement = accordianHeader.prop('handleAddNewField');
    handleAddNewFieldElement('malaria', 'Instruction');
  });

  it('Handles Update Field', () => {
    const accordianBody = wrapper.find('AccordianBody');
    const handleUpdateFieldElement = accordianBody.prop('handleUpdateFieldName');
    handleUpdateFieldElement('pressure', 'Test', 'WF', 'Test', 'WFS', true);
  });

  it('Handles Update Field with callback', () => {
    const accordianBody = wrapper.find('AccordianBody');
    const handleUpdateFieldElement = accordianBody.prop('handleUpdateFieldName');
    const callBack = jest.fn();
    handleUpdateFieldElement('pressure', 'Test', 'WF', 'Test', 'WFS', true, callBack);
  });

  it('Handles Update Field onlyCallback as false', () => {
    const accordianBody = wrapper.find('AccordianBody');
    const handleUpdateFieldElement = accordianBody.prop('handleUpdateFieldName');
    const callBack = jest.fn();
    handleUpdateFieldElement('malaria', 'malaria', 'malaria', 'malaria', 'malaria', false, callBack);
  });

  it('Handles Delete Field', () => {
    const accordianBody = wrapper.find('AccordianBody');
    const handleDeleteFieldElement = accordianBody.prop('handleDeleteField');
    handleDeleteFieldElement('malaria', 'Fname');
  });

  it('Handles Form Submit', () => {
    const submitButton = wrapper.find('button[type="submit"]')
    submitButton.simulate('click');
  });
});
