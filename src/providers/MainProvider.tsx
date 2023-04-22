import React from 'react';

import ThemeProvider from './ThemeProvider';

type Props = {
  children: JSX.Element;
};

const MainProvider = ({ children }: Props) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default MainProvider;
