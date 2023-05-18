import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { useColorScheme } from 'react-native';
import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { useSettings } from 'src/hooks/useSettings';

const lightTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
  },
};

const darkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
  },
};

export type ThemeType = 'dark' | 'light';

export type Theme = typeof lightTheme;

export interface ThemeContextValue {
  theme: Theme;
  themeType: ThemeType;
  isDarkTheme: boolean;
  toggleThemeType: () => void;
  setThemeType: React.Dispatch<React.SetStateAction<ThemeType>>;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  themeType: 'light',
  isDarkTheme: false,
  setThemeType: () => {},
  toggleThemeType: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeContextProviderProps {
  children: JSX.Element;
}

export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const { settings } = useSettings();
  const isDarkSet = settings?.darkTheme ? 'dark' : 'light';
  const settingsTheme: ThemeType | undefined = settings?.darkTheme !== undefined ? isDarkSet : undefined;
  const colorScheme = useColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>(settingsTheme || colorScheme || 'light');
  const toggleThemeType = useCallback(() => {
    setThemeType((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);
  const isDarkTheme = useMemo(
    () => (settingsTheme !== undefined ? settingsTheme === 'dark' : themeType === 'dark'),
    [themeType, settingsTheme]
  );
  const theme = useMemo(() => (isDarkTheme ? darkTheme : lightTheme), [isDarkTheme, settingsTheme]);
  const values = useMemo(() => {
    return {
      theme,
      themeType,
      isDarkTheme,
      setThemeType,
      toggleThemeType,
    };
  }, [theme, themeType, isDarkTheme, setThemeType, toggleThemeType]);

  return (
    <PaperProvider theme={theme}>
      <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
    </PaperProvider>
  );
};

export default ThemeContextProvider;
