import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { CardContainer } from './styles';
import { CardDragItem } from './DragItem';
import { useAppState } from './AppStateContext';
import { useItemDrag } from './useItemDrag';
import { isHidden } from './utils/isHidden';


interface CardProps {
  text: string;
  index: number;
  columnId: string;
  isPreview?: boolean;
  id: string;
}


export const Card = ({ text, index, columnId, id, isPreview }: CardProps) => {
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: "CARD", id, index, text, columnId });

  const [, drop] = useDrop({
    accept: "CARD",
    hover(item: CardDragItem) {
      if (item.id === id) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      const sourceColumn = item.columnId;
      const targetColumn = columnId;

      dispatch({
        type: "MOVE_TASK",
        payload: { dragIndex, hoverIndex, sourceColumn, targetColumn }
      });
      item.index = hoverIndex;
      item.columnId = targetColumn;
    }
  });

  drag(drop(ref));

  return (
    <CardContainer
      ref={ref}
      isHidden={isHidden(isPreview, state.draggedItem, "CARD", id)}
      isPreview={isPreview}
    >
      {text}
    </CardContainer>
  );
};
