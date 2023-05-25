import { mount } from 'enzyme';
import CustomTable from '../CustomTable';


jest.mock('../../assets/images/edit.svg', () => ({
  ReactComponent: 'EditIcon'
}));

const columnsDef = [
  { id: 1, name: 'id', label: 'ID' },
  { id: 2, name: 'name', label: 'Name' },
  { id: 3, name: 'email', label: 'Email' }
];

const rowData = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' }
];

const page = 1;
const rowsPerPage = 10;
const count = 20

const props = {
    columnsDef,
    rowData
}


describe('CustomTable', () => {
  it('should render without throwing an error', () => {
    const wrapper = mount(<CustomTable {...props} isEdit={true} isDelete={false} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render table header with correct column names', () => {
    const wrapper = mount(<CustomTable {...props} isEdit={true} isDelete={false} />);
    expect(wrapper.find('th')).toHaveLength(4);
    expect(wrapper.find('th').at(0).text()).toEqual('ID');
    expect(wrapper.find('th').at(1).text()).toEqual('Name');
    expect(wrapper.find('th').at(2).text()).toEqual('Email');
  });

  it('should render table rows with correct data', () => {
    const wrapper = mount(<CustomTable {...props} isEdit={true} isDelete={false} />);
    expect(wrapper.find('tbody tr')).toHaveLength(2);
    expect(wrapper.find('tbody tr').at(0).find('td').at(0).text()).toEqual('1');
    expect(wrapper.find('tbody tr').at(0).find('td').at(1).text()).toEqual('John Doe');
    expect(wrapper.find('tbody tr').at(0).find('td').at(2).text()).toEqual('john.doe@example.com');
    expect(wrapper.find('tbody tr').at(1).find('td').at(0).text()).toEqual('2');
    expect(wrapper.find('tbody tr').at(1).find('td').at(1).text()).toEqual('Jane Doe');
    expect(wrapper.find('tbody tr').at(1).find('td').at(2).text()).toEqual('jane.doe@example.com');
  });

  it('should render Pagination component when count prop is provided', () => {
    const wrapper = mount(<CustomTable {...props} isEdit={true} isDelete={false} count={10} />);
    wrapper.setProps({page, rowsPerPage, count})
    expect(wrapper.find('Pagination').length).toBe(1);
  });

  it('should render ConfirmationModalPopup component when openDialog state is true', () => {
    const wrapper = mount(<CustomTable {...props} isEdit={true} isDelete={false} />);
    wrapper.setState({ openDialog: true });
    wrapper.setProps({ confirmationTitle: 'Are you sure?' });
    expect(wrapper.find("ConfirmationModalPopup").length).toBe(1);
  });

  it('should close ConfirmationModalPopup component when openDialog state is false', () => {
    const wrapper = mount(<CustomTable {...props} isEdit={true} isDelete={false} />);
    wrapper.setState({ openDialog: false });
    expect(wrapper.find("ConfirmationModalPopup").length).toBe(0);
  });
});

