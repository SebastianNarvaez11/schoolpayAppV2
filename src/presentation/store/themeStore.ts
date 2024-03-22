import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {ThemeColors, darkColors, lightColors} from '../../config';

export type ThemeType = 'light' | 'dark';

interface IThemeStore {
  currentTheme: ThemeType;
  isSystemTheme: boolean;
  colors: ThemeColors;

  setTheme: (theme: ThemeType) => void;
  setIsSystemTheme: (status: boolean) => void;
}

export const useThemeStore = create<IThemeStore>()(
  persist(
    set => ({
      currentTheme: 'light',
      isSystemTheme: false,
      colors: lightColors,

      setTheme: (theme: ThemeType) => {
        set({
          currentTheme: theme,
          colors: theme === 'light' ? lightColors : darkColors,
        });
      },

      setIsSystemTheme: (status: boolean) => {
        set({isSystemTheme: status});
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
