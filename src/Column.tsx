import React from 'react';
import { AddNewItem } from './AddNewItem';
import { useAppState } from './AppStateContext';
import { Card } from './Card';
import { ColumnContainer, ColumnTitle } from './styles';

interface ColumnsProps {
  text: string;
  index: number;
  id: string;
}

// React.PropsWithChildren can enhance props interface and add a definition for children there.
export const Column = ({ text, index, id }: ColumnsProps) => {
  const {state, dispatch} = useAppState()
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map(task => (
        <Card text={task.text} key={task.id} />
      ))}
      <AddNewItem
        dark
        toggleButtonText="+ Add another task"
        onAdd={text => dispatch({type : "ADD_TASK", payload : {text, listId: id }})} />
    </ColumnContainer>
  );
};

