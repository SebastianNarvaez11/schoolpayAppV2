import React, {useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useAuthStore} from '../../../../../presentation/store';

export const LoginScreen = () => {
  const [form, setForm] = useState({email: '', password: ''});
  const {login, checkStatus} = useAuthStore();

  const onLogin = async () => {
    const isSuccess = await login(form.email, form.password);

    if (!isSuccess) {
      return Alert.alert('Credenciales Incorrectas');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="email"
        value={form.email}
        onChangeText={email => setForm({...form, email})}
      />
      <TextInput
        placeholder="contraseña"
        value={form.password}
        onChangeText={password => setForm({...form, password})}
      />

      <Pressable onPress={onLogin}>
        <Text>Ingresar</Text>
      </Pressable>

      <Pressable onPress={checkStatus}>
        <Text>Check status</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
