import React from 'react';

import RouteProvider from './RouteProvider';
import ThemeContextProvider from './ThemeProvider';

type Props = {
  children: JSX.Element;
};

const MainProvider = ({ children }: Props) => {
  return (
    <ThemeContextProvider>
      <RouteProvider>{children}</RouteProvider>
    </ThemeContextProvider>
  );
};

export default MainProvider;
