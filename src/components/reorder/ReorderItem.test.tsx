import React from 'react';
import { mount } from 'enzyme';
import ReorderItem from './ReorderItem';
import styles from './Reorder.module.scss';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: jest.fn().mockReturnValue({
        initItem: jest.fn(),
        order: {
            bioData:0,
            bioMetrics:1,
            bpLog:2,
            glucoseLog:3,
            phq4:4
        },
        height: {
            bioData:29,
            bioMetrics:29,
            bpLog:29,
            glucoseLog:29,
            phq4:29
    },
        spaceBetweenItemsInPx:2
    })
  }));
describe('ReorderItem', () => {
  const mockProps = {
    itemId: '123',
    initOrder: 1,
    children: <div>Child Component</div>,
    removeBorderClass: 'removeBorder',
    isRemoveItem: false
  };

  it('renders correctly', () => {
    const wrapper = mount(<ReorderItem {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should set dragging state to true when dragStart event is triggered', () => {
    const wrapper = mount(<ReorderItem {...mockProps} />);
    expect(wrapper.find('.dragging').exists()).toBe(false);
    const dragEventMock = {
        dataTransfer: {
            setDragImage: jest.fn(),
        },
        pageY: 100,
        preventDefault: jest.fn(),
    } as unknown as React.DragEvent<HTMLDivElement>;
    wrapper.find(`.${styles.reorderItem}`).simulate('dragStart', dragEventMock);
    expect(wrapper.find('.dragging').exists()).toBe(false);
  });

  it('should set dragging state to false when dragEnd event is triggered', () => {
    const wrapper = mount(<ReorderItem {...mockProps} />);
    const dragEventMock = {
        dataTransfer: {
            setDragImage: jest.fn(),
        },
        pageY: 100,
        preventDefault: jest.fn(),
    } as unknown as React.DragEvent<HTMLDivElement>;
    wrapper.find(`.${styles.reorderItem}`).simulate('dragStart', dragEventMock);
    expect(wrapper.find('.dragging').exists()).toBe(false);
    wrapper.find(`.${styles.reorderItem}`).simulate('dragEnd', dragEventMock);
    expect(wrapper.find('.dragging').exists()).toBe(false);
  });

  it('should call swapItems function when drag event is triggered', () => {
    const mockContext = {
      initItem: jest.fn(),
      removeItem: jest.fn(),
      order: {},
      height: {},
      swapItems: jest.fn(),
      spaceBetweenItemsInPx: 5
    };
    const wrapper = mount(<ReorderItem {...mockProps} />, { context: { ReorderContext: mockContext } });
    const dragEventMock = {
        dataTransfer: {
            setDragImage: jest.fn(),
        },
        pageY: 20,
        preventDefault: jest.fn(),
    } as unknown as React.DragEvent<HTMLDivElement>;
    wrapper.find(`.${styles.reorderItem}`).simulate('drag', dragEventMock);
    expect(mockContext.swapItems).not.toHaveBeenCalled();
    wrapper.find(`.${styles.reorderItem}`).simulate('drag', dragEventMock);
    expect(mockContext.swapItems).not.toHaveBeenCalled();
  });
});
