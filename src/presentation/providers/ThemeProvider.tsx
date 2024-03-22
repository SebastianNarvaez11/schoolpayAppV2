import React, {PropsWithChildren, useEffect} from 'react';
import {useThemeStore} from '../store';
import {useColorScheme} from 'react-native';

export const ThemeProvider = ({children}: PropsWithChildren) => {
  const {setTheme, isSystemTheme} = useThemeStore();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (isSystemTheme) {
      if (colorScheme === 'light') {
        setTheme('light');
      } else {
        setTheme('dark');
      }
    }
  }, [isSystemTheme, colorScheme, setTheme]);

  return <>{children}</>;
};
