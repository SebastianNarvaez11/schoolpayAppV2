import {StyleSheet} from 'react-native';

export interface ThemeColors {
  primary: string;
  secondary: string;
  text: string;
  background: string;
  cardBackground: string;
  buttonTextColor: string;
}

// export const colors: ThemeColors = {
//   primary: '#5856D6',
//   secondary: '#5856D6',
//   text: 'black',
//   background: '#F3F2F7',
//   cardBackground: 'white',
//   buttonTextColor: 'white',
// };

export const lightColors: ThemeColors = {
  primary: '#5856D6',
  secondary: '#5856D6',
  text: 'black',
  background: '#F3F2F7',
  cardBackground: 'white',
  buttonTextColor: 'white',
};

export const darkColors: ThemeColors = {
  primary: '#5856D6',
  secondary: '#5856D6',
  text: 'white',
  background: '#090909',
  cardBackground: '#2d2d2d',
  buttonTextColor: 'white',
};

export const globalStyles = StyleSheet.create({});
