import React, { useCallback, useState } from 'react';

interface IReorderContainerProps {
  children: React.ReactNode;
  onReorder: (order: { [k: string]: number }) => void;
}

interface IReorderContext {
  initItem: (itemsId: string, itemOrder: number, heightInPx: number) => void;
  removeItem: (itemId: string) => void;
  swapItems: (itemIdOne: string, itemIdTwo: string) => void;
  order: { [key: string]: number };
  height: { [key: string]: number };
  spaceBetweenItemsInPx: number;
}

export const ReorderContext = React.createContext<IReorderContext>({} as IReorderContext);

const ReorderContainer = ({ children, onReorder }: IReorderContainerProps) => {
  const spaceBetweenItemsInPx = 2;
  const [order, setOrder] = useState<{ [key: string]: number }>({});
  const [height, setHeight] = useState<{ [key: string]: number }>({});
  const initItem = useCallback((itemsId: string, itemOrder: number, heightInPx: number) => {
    setOrder((prevOrder) => ({ ...prevOrder, [itemsId]: itemOrder }));
    setHeight((prevHeight) => ({ ...prevHeight, [itemsId]: heightInPx }));
  }, []);

  const swapItems = (itemIdOne: string, itemIdTwo: string) => {
    const nxtOrder = { ...order, [itemIdOne]: order[itemIdTwo], [itemIdTwo]: order[itemIdOne] };
    setOrder(nxtOrder);
    onReorder(nxtOrder);
  };

  const removeItem = useCallback(
    (itemsId: string) => {
      setOrder((prevOrder) => {
        prevOrder = { ...prevOrder };
        const targetItemOrder = prevOrder[itemsId];
        delete prevOrder[itemsId];
        Object.keys(prevOrder).forEach((currItemId) => {
          if (prevOrder[currItemId] > targetItemOrder) {
            prevOrder[currItemId]--;
          }
        });
        onReorder(prevOrder);
        return prevOrder;
      });
      setHeight((prevHeight) => {
        prevHeight = { ...prevHeight };
        delete prevHeight[itemsId];
        return prevHeight;
      });
    },
    [onReorder]
  );
  const contentHeight = Object.values(height).reduce((acc, itemHeight) => acc + itemHeight, 0);
  const contextValue = {
    order,
    swapItems,
    initItem,
    removeItem,
    height,
    spaceBetweenItemsInPx
  };
  return (
    <ReorderContext.Provider value={contextValue}>
      <div
        className='position-relative'
        style={{
          height: `${contentHeight + (Object.keys(order).length - 1) * spaceBetweenItemsInPx}px`
        }}
      >
        {children}
      </div>
    </ReorderContext.Provider>
  );
};

export default ReorderContainer;
