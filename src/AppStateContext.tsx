import React, { createContext, useContext, useReducer } from 'react';
import { nanoid } from 'nanoid';
import { findItemIndexById } from './utils/findItemIndexById';
import { moveItem } from './moveItem';
import { DragItem } from './DragItem';
interface Task {
  id: string;
  text: string;
}

interface List {
  id: string;
  text: string;
  tasks: Task[];
}

interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

export interface AppState {
  lists: List[];
  draggedItem?: DragItem | undefined;
}

type Action =
  | {
    type: "ADD_LIST";
    payload: string;
  }
  // text is the task text, and listId is the reference to the list it belongs to.
  | {
    type: "ADD_TASK";
    payload: { text: string; listId: string; };
  }
  | {
    type: "MOVE_LIST";
    payload: {
      dragIndex: number;
      hoverIndex: number;
    };
  }
  | {
    type: "MOVE_TASK";
    payload: {
      dragIndex: number;
      hoverIndex: number;
      sourceColumn: string;
      targetColumn: string;
    };
  }
  | {
    type: "SET_DRAGGED_ITEM";
    payload: DragItem | undefined;
  };

const appData: AppState = {
  lists: [
    {
      id: "0",
      text: "TO DO",
      tasks: [{ id: "c0", text: "Generate app scaffold" }]
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c1", text: "Learn Typescript" }]
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c2", text: "Begin to use static typing" }]
    }

  ]
};

// Define data structure for the application
const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

export const useAppState = () => {
  return useContext(AppStateContext);
};

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appData);
  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "ADD_LIST": {
      return {
        ...state,
        lists: [
          ...state.lists,
          { id: nanoid(), text: action.payload, tasks: [] }
        ]
      };
    }
    case "ADD_TASK": {
      const targetLaneIndex = findItemIndexById(state.lists, action.payload.listId);
      state.lists[targetLaneIndex].tasks.push({
        id: nanoid(),
        text: action.payload.text
      });
      return {
        ...state
      };
    }
    case "MOVE_LIST": {
      const { dragIndex, hoverIndex } = action.payload;
      state.lists = moveItem(state.lists, dragIndex, hoverIndex);
      return { ...state };
    }
    case "MOVE_TASK": {
      const { dragIndex, hoverIndex, sourceColumn, targetColumn } = action.payload;
      const sourceLaneIndex = findItemIndexById(state.lists, sourceColumn);
      const targetLaneIndex = findItemIndexById(state.lists, targetColumn);
      
      //  remove the card from the source column and add it to the target column.
      const item = state.lists[sourceLaneIndex].tasks.splice(dragIndex, 1)[0];
      state.lists[targetLaneIndex].tasks.splice(hoverIndex, 0, item);
      return { ...state };
    }
    case "SET_DRAGGED_ITEM": {
      return { ...state, draggedItem: action.payload };
    }
    default: {
      return state;
    }
  }
};