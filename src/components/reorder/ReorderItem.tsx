import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';

import { ReorderContext } from './ReorderContainer';

import styles from './Reorder.module.scss';

interface IReorderItemProps {
  itemId: string;
  children: React.ReactNode;
  initOrder: number;
  removeBorderClass?: string;
  isRemoveItem?: boolean;
}

const ReorderItem = ({ itemId, initOrder, children, removeBorderClass, isRemoveItem = false }: IReorderItemProps) => {
  const { initItem, removeItem, order, height, swapItems, spaceBetweenItemsInPx } = useContext(ReorderContext);
  const dragStartPageY = useRef<number>(); // pageY when the dragStart event triggered
  const dragCheckPoint = useRef<number>(); // pageY during the last order swap
  const itemRef = useRef<HTMLDivElement>(null); // ref of dragable element
  const [dragging, setDragging] = useState(false); // is true when the item is being dragged
  const [pageY, setPageY] = useState<number>(0); // draggingOffset
  const topWhenDragStart = useRef<number>(); // top style property value of item when dragStart event triggered

  useEffect(() => {
    const { offsetHeight = 0 } = itemRef.current || {};
    initItem(itemId, initOrder, offsetHeight);
    return () => (isRemoveItem ? removeItem(itemId) : undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initItem, itemId, removeItem]);

  const top = useMemo(
    () =>
      Object.keys(order)
        .filter((currItemId) => order[currItemId] < order[itemId])
        .reduce((acc, currItemId) => acc + height[currItemId] + spaceBetweenItemsInPx, 0),
    [order, itemId, height, spaceBetweenItemsInPx]
  );

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    topWhenDragStart.current = top;
    e.dataTransfer.setDragImage(new Image(), 0, 0); // to remove the default ghost image when an element is dragged
    dragStartPageY.current = e.pageY;
    dragCheckPoint.current = e.pageY;
    // this is to prevent the browser issue that trigger dragEnd when style of drag element is changed
    setTimeout(() => setDragging(true), 100);
  };

  const onDragEnd = () => {
    setDragging(false);
  };

  const onDrag = (e: React.DragEvent<HTMLDivElement>) => {
    const { pageY: nxtPageY } = e;
    const dragOffset = nxtPageY - (dragCheckPoint.current as number);
    if (!nxtPageY) {
      return;
    }
    setPageY(nxtPageY);
    const sorted = Object.keys(order).sort((a, b) => order[a] - order[b]);
    const filtered =
      dragOffset > 0 ? sorted.slice(sorted.indexOf(itemId) + 1) : sorted.slice(0, sorted.indexOf(itemId)).reverse();
    if (
      filtered.length &&
      Math.abs(dragOffset) > height[itemId] / 2 + height[filtered[0]] / 4 + spaceBetweenItemsInPx
    ) {
      dragCheckPoint.current = nxtPageY;
      swapItems(itemId, filtered[0]);
    }
  };

  const reorderItemStyle = {
    left: dragging ? '-3px' : 0,
    top: dragging
      ? `${Math.min(
          (itemRef.current?.parentElement?.offsetHeight || 0) - height[itemId],
          Math.max(0, (topWhenDragStart.current as number) + (pageY - (dragStartPageY.current as number)))
        )}px`
      : `${top}px`
  };

  return (
    <div
      ref={itemRef}
      className={`position-absolute d-flex w-100 ${styles.reorderItem} ${dragging ? styles.dragging : ''} ${
        styles[removeBorderClass as string]
      }`}
      style={reorderItemStyle}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      draggable={true}
    >
      <div className={styles.dragHandle} data-isdraghandle={true}>
        {(order[itemId] || 0) + 1}
      </div>
      <div className='flex align-self-center justify-content-center'>{children}</div>
    </div>
  );
};

export default ReorderItem;
