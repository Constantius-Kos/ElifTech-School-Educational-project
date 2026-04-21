import React, { createContext, useContext, useReducer } from 'react';
import { type IContext } from '../types/types.tsx';
import reducer from './Reducer.tsx';
import initialState from './initialState.ts';

const Context = createContext<IContext | null>(null);

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ dispatch, ...state }}>
      {children}
    </Context.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext(): IContext {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useAppContext must be used within ContextProvider');
  }
  return context;
}
export default ContextProvider;
