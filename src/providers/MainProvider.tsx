import React from 'react';

import RouteProvider from './RouteProvider';
import ThemeProvider from './ThemeProvider';

type Props = {
  children: JSX.Element;
};

const MainProvider = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <RouteProvider>{children}</RouteProvider>
    </ThemeProvider>
  );
};

export default MainProvider;
