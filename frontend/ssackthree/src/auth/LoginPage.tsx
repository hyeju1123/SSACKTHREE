import React from 'react';
import {View, Button, Text} from 'react-native';

import useLogin from '../api/useLogin';

export default function LoginPage(): JSX.Element {
  const {handleLogin, handleLogout, isLoading} = useLogin();

  return (
    <View>
      {isLoading ? (
        <View>
          <Text>loading</Text>
        </View>
      ) : (
        <>
          <Button onPress={handleLogin} title="click me to login" />
          <Button onPress={handleLogout} title="click me to logout" />
        </>
      )}
    </View>
  );
}
