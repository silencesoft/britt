import { Provider as JotaiProvider } from 'jotai';
import React from 'react';

type StateProviderProps = {
  children: JSX.Element;
};

const StateProvider = ({ children }: StateProviderProps) => {
  return <JotaiProvider>{children}</JotaiProvider>;
};

export default StateProvider;
