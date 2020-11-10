import React, { useRef } from 'react';
import { AddNewItem } from './AddNewItem';
import { useAppState } from './AppStateContext';
import { Card } from './Card';
import { ColumnContainer, ColumnTitle } from './styles';
import { useItemDrag } from './useItemDrag';
import {useDrop} from 'react-dnd'
import { DragItem } from './DragItem';
import { isHidden } from './utils/isHidden';
 
interface ColumnsProps {
  text: string;
  index: number;
  id: string;
}

// React.PropsWithChildren can enhance props interface and add a definition for children there.
export const Column = ({ text, index, id }: ColumnsProps) => {
  const [, drop] = useDrop({
    accept:"COLUMN",
    // The hover callback is triggered whenever you move the dragged item above the drop target.
    hover(item: DragItem) {
      const dragIndex= item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex){
        return
      }
      dispatch({type :"MOVE_LIST", payload :{ dragIndex, hoverIndex}})
      item.index = hoverIndex
    }
  })
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: "COLUMN", id, index, text });
  drag(drop(ref));

  return (
    <ColumnContainer ref={ref} isHidden={isHidden(state.draggedItem, "COLUMN", id)}>
      <ColumnTitle>
        {text}
      </ColumnTitle>
      {state.lists[index].tasks.map(task => (
        <Card text={task.text} key={task.id} />
      ))}
      <AddNewItem
        dark
        toggleButtonText="+ Add another task"
        onAdd={text => dispatch({
          type: "ADD_TASK",
          payload: { text, listId: id }
        })} />
    </ColumnContainer>
  );
};

