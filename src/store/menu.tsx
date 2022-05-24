import React, { createContext, useReducer } from 'react';

type State = {
  menu: string;
  subMenu: string;
  dispatch: (action: Action) => void;
};

type Action = {
  type: string;
  value: string;
};

/**
 * 菜单状态
 */
const initState: State = {
  menu: '/',
  subMenu: '/',
  dispatch: (action: Action) => {},
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setMenu':
      return { ...state, menu: action.value };
    case 'setSubMenu':
      return { ...state, subMenu: action.value };
    default:
      return state;
  }
};

export const menuContext = createContext(initState);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return <menuContext.Provider value={{ ...state, dispatch }}>{children}</menuContext.Provider>;
};

export default ContextProvider;
