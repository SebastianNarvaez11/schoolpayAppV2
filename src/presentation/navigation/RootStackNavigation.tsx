import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, SplashScreen} from '../screens';
import {LoginScreen} from '../../modules/auth/presentation/screens';

export type RootStackParams = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  HomeScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const RootStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};
