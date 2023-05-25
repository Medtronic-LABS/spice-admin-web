import { mount } from 'enzyme';
import ModalViewer from '../ModalViewer';
import styles from '../ModalForm.module.scss';

describe('ModalViewer', () => {
  let wrapper: any;
  const mockHandleCancel = jest.fn();
  const mockChildren = <div>Mock children</div>;

  beforeEach(() => {
    wrapper = mount(
      <ModalViewer title="Test Modal" show={true} handleCancel={mockHandleCancel}>
        <div>Test Content</div>
      </ModalViewer>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders without crashing', () => {
    wrapper = mount(
      <ModalViewer title="Test title" show={true} handleCancel={mockHandleCancel}>
        {mockChildren}
      </ModalViewer>
    );
    expect(wrapper).toBeDefined();
  });

  it('renders with size md prop', () => {
    wrapper = mount(
      <ModalViewer title="Test title" show={true} size='modal-md' handleCancel={mockHandleCancel}>
        {mockChildren}
      </ModalViewer>
    );
    expect(wrapper).toBeDefined();
  });

  it('renders with size lg prop', () => {
    wrapper = mount(
      <ModalViewer title="Test title" show={true} size='modal-lg' handleCancel={mockHandleCancel}>
        {mockChildren}
      </ModalViewer>
    );
    expect(wrapper).toBeDefined();
  });

  it('renders the correct title', () => {
    const title = 'Test title';
    wrapper = mount(
      <ModalViewer title={title} show={true} handleCancel={mockHandleCancel}>
        {mockChildren}
      </ModalViewer>
    );
    const titleElement = wrapper.find('.modal-title');
    expect(titleElement.text()).toEqual(title);
  });

  it('renders the children', () => {
    wrapper = mount(
      <ModalViewer title="Test title" show={true} handleCancel={mockHandleCancel}>
        {mockChildren}
      </ModalViewer>
    );
    expect(wrapper.contains(mockChildren)).toEqual(true);
  });

  it('calls handleCancel when close button is clicked', () => {
    wrapper = mount(
      <ModalViewer title="Test title" show={true} handleCancel={mockHandleCancel}>
        {mockChildren}
      </ModalViewer>
    );
    const closeButton = wrapper.find(`.d-flex.justify-content-center.align-items-center.${styles.closeIcon}`);
    closeButton.simulate('click');
    expect(mockHandleCancel).toHaveBeenCalled();
  });

  it('does not render when show is false', () => {
    const wrapper = mount(
      <ModalViewer show={false} handleCancel={() => {}} title="Test Modal" />
    );
    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
