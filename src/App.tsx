import 'react-native-gesture-handler';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {RootStackNavigator} from './presentation/navigation';
import {useThemeStore} from './presentation/store';
import {AuthProvider, ThemeProvider} from './presentation/providers';

export default function App() {
  const {currentTheme} = useThemeStore();

  return (
    <NavigationContainer
      theme={currentTheme === 'light' ? DefaultTheme : DarkTheme}>
      <AuthProvider>
        <ThemeProvider>
          <RootStackNavigator />
        </ThemeProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
