import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {useAuthStore, useThemeStore} from '../../store';

export const HomeScreen = () => {
  const {checkStatus, logout} = useAuthStore();
  const {setTheme, setIsSystemTheme, colors} = useThemeStore();

  return (
    <View>
      <Pressable
        onPress={() => {
          setIsSystemTheme(false);
          setTheme('light');
        }}>
        <Text style={{color: colors.text}}>Light</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          setIsSystemTheme(false);
          setTheme('dark');
        }}>
        <Text style={{color: colors.text}}>Dark</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          setIsSystemTheme(true);
        }}>
        <Text style={{color: colors.text}}>System</Text>
      </Pressable>

      <Pressable onPress={checkStatus}>
        <Text>Check status</Text>
      </Pressable>

      <Pressable onPress={logout}>
        <Text>Salir</Text>
      </Pressable>
    </View>
  );
};
