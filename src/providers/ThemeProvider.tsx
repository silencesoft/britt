import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

type Props = {
  children: JSX.Element;
};

const ThemeProvider = ({ children }: Props) => {
  return <PaperProvider>{children}</PaperProvider>;
};

export default ThemeProvider;
