import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { useTheme } from 'src/providers/ThemeProvider';

type Props = {
  children: JSX.Element;
};

const RouteProvider = ({ children }: Props) => {
  const { theme } = useTheme();

  return <NavigationContainer theme={theme}>{children}</NavigationContainer>;
};

export default RouteProvider;
