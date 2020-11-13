import React from 'react';
import { Column } from './Column';
import { AddNewItem } from './AddNewItem';
import { useAppState } from './AppStateContext';
import { CustomDragLayer } from './CustomDragLayer';
import { AppContainer } from "./styles";

const App = () => {
  const { state, dispatch } = useAppState();
  return (
    <AppContainer>
      <CustomDragLayer />
      {state.lists.map((list, i) => (
        <Column
          id={list.id}
          text={list.text}
          key={list.id}
          index={i} />
      ))}
      <AddNewItem
        dark
        toggleButtonText="+ Add another list"
        onAdd={text => dispatch({ type: "ADD_LIST", payload: text })} />
    </AppContainer>
  );
};

export default App;
