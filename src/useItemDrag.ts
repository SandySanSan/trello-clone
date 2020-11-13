import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useAppState } from './AppStateContext';
import { DragItem } from './DragItem';

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();
  const [, drag, preview] = useDrag({
    // contains the data about the dragged item
    item,
    // called when we start dragging an item
    begin: () =>
      dispatch({
        type: 'SET_DRAGGED_ITEM',
        payload: item,
      }),
    // called when we release the item
    end: () =>
      dispatch({
        type: 'SET_DRAGGED_ITEM',
        payload: undefined,
      }),
  });

  // customize drag peview, disable default preview
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);
  return { drag };
};
