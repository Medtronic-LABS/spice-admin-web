import { mount, shallow } from 'enzyme';
import { Field, Form } from 'react-final-form';
import EditSuperAdminForm from '../EditSuperAdminForm';
import TextInput from '../../../components/formFields/TextInput';
import Radio from '../../../components/formFields/Radio';
import APPCONSTANTS from '../../../constants/appConstants';
import { ITimezone } from '../../../store/user/types';

describe('EditSuperAdminForm component', () => {
  const timezoneList: ITimezone[] = [
    { id: '1', description: 'Timezone 1' },
    { id: '2', description: 'Timezone 2' },
    { id: '3', description: 'Timezone 3' }
  ];

  it('renders without crashing', () => {
    shallow(<EditSuperAdminForm timezoneList={timezoneList} />);
  });

  it('renders the email field correctly', () => {
    const wrapper = shallow(<EditSuperAdminForm timezoneList={timezoneList} />);
    const field = wrapper.find(Field).at(0);
    const textInput: any = field.prop('render')?.({ input: {} as any, meta: {} });

    expect(field.prop('name')).toEqual('email');
    expect(field.prop('type')).toEqual('text');
    expect(field.prop('validate')).toBeInstanceOf(Function);

    expect(textInput.type).toEqual(TextInput);
    expect(textInput.props.label).toEqual('Email ID');
    expect(textInput.props.disabled).toEqual(true);
    expect(textInput.props.errorLabel).toEqual('email ID');
  });

  it('renders the first name field correctly', () => {
    const wrapper = shallow(<EditSuperAdminForm timezoneList={timezoneList} />);
    const field = wrapper.find(Field).at(1);
    const textInput: any = field.prop('render')?.({ input: {} as any, meta: {} });

    expect(field.prop('name')).toEqual('firstName');
    expect(field.prop('type')).toEqual('text');
    expect(field.prop('validate')).toBeInstanceOf(Function);

    expect(textInput.type).toEqual(TextInput);
    expect(textInput.props.label).toEqual('First Name');
    expect(textInput.props.errorLabel).toEqual('first name');
    expect(textInput.props.maxLength).toEqual(APPCONSTANTS.FIRST_NAME_LENGTH);
    expect(textInput.props.capitalize).toEqual(true);
  });

  it('renders the last name field correctly', () => {
    const wrapper = shallow(<EditSuperAdminForm timezoneList={timezoneList} />);
    const field = wrapper.find(Field).at(2);
    const textInput: any = field.prop('render')?.({ input: {} as any, meta: {} });

    expect(field.prop('name')).toEqual('lastName');
    expect(field.prop('type')).toEqual('text');
    expect(field.prop('validate')).toBeInstanceOf(Function);

    expect(textInput.type).toEqual(TextInput);
    expect(textInput.props.label).toEqual('Last Name');
    expect(textInput.props.errorLabel).toEqual('last name');
    expect(textInput.props.maxLength).toEqual(APPCONSTANTS.LAST_NAME_LENGTH);
    expect(textInput.props.capitalize).toEqual(true);
  });

  it('renders the gender field correctly', () => {
    const wrapper = shallow(<EditSuperAdminForm timezoneList={timezoneList} />);
    const field = wrapper.find(Field).at(3);
    const radio: any = field.prop('render')?.({ input: {} as any, meta: {} });

    expect(field.prop('name')).toEqual('gender');

    expect(radio.type).toEqual(Radio);
    expect(radio.props.errorLabel).toEqual('gender');
  });

  it('renders the country code field correctly', () => {
    const mockTimezoneList = [
      { id: '1', description: 'Timezone 1' },
      { id: '2', description: 'Timezone 2' }
    ];
    const wrapper = mount(
      <Form
        onSubmit={() => {}}
        initialValues={{}}
        render={() => <EditSuperAdminForm timezoneList={mockTimezoneList} />}
      ></Form>
    );
    const countryCodeField = wrapper.find('[name="countryCode"]');
    expect(countryCodeField).toHaveLength(3);
    const countryCodeInput = countryCodeField.find('input');
    expect(countryCodeInput.prop('type')).toBe('text');
    expect(countryCodeInput.prop('onChange')).toBeDefined();
  });
});
