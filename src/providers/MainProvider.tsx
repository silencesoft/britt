import React from 'react';

import RouteProvider from './RouteProvider';
import StateProvider from './StateProvider';
import ThemeContextProvider from './ThemeProvider';

type Props = {
  children: JSX.Element;
};

const MainProvider = ({ children }: Props) => {
  return (
    <StateProvider>
      <ThemeContextProvider>
        <RouteProvider>{children}</RouteProvider>
      </ThemeContextProvider>
    </StateProvider>
  );
};

export default MainProvider;
