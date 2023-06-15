import React, {useState} from 'react';
import {
  View,
  Button,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';

import useLogin from '../api/useLogin';

export default function LoginPage(): JSX.Element {
  const {handleLogin, handleLogout, isLoading} = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onUsername = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setUsername(e.nativeEvent.text);
  };
  const onPassword = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setPassword(e.nativeEvent.text);
  };

  return (
    <View>
      {isLoading ? (
        <View>
          <Text>loading</Text>
        </View>
      ) : (
        <>
          <TextInput
            placeholder="username"
            style={{borderWidth: 1, borderColor: 'blue', padding: 5}}
            value={username}
            onChange={onUsername}
          />
          <TextInput
            placeholder="password"
            style={{borderWidth: 1, borderColor: 'blue', padding: 5}}
            value={password}
            onChange={onPassword}
          />
          <Button
            onPress={() => handleLogin(username, password)}
            title="click me to login"
          />
          <Button onPress={handleLogout} title="click me to logout" />
        </>
      )}
    </View>
  );
}
