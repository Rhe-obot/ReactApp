import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';

interface ClickState {
  clicks: { [key: number]: number };
  titles: { [key: number]: string };
}

interface IncrementClickAction {
  type: 'INCREMENT_CLICK';
  id: number;
  title: string;
}

type Action = IncrementClickAction;

interface ClickContextProps {
  state: ClickState;
  dispatch: Dispatch<Action>;
}

const ClickContext = createContext<ClickContextProps | undefined>(undefined);

const clickReducer = (state: ClickState, action: Action): ClickState => {
  switch (action.type) {
    case 'INCREMENT_CLICK':
      return {
        ...state,
        clicks: {
          ...state.clicks,
          [action.id]: (state.clicks[action.id] || 0) + 1,
        },
        titles: {
          ...state.titles,
          [action.id]: action.title,
        },
      };
    default:
      return state;
  }
};

const ClickProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(clickReducer, { clicks: {}, titles: {} });

  return (
    <ClickContext.Provider value={{ state, dispatch }}>
      {children}
    </ClickContext.Provider>
  );
};

export { ClickContext, ClickProvider };
