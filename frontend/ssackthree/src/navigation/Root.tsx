import React from 'react';

import MainTab from './MainTab';
import AuthStack from './AuthStack';
import useLogin from '../api/useLogin';

export default function Root(): JSX.Element {
  const {userData} = useLogin();

  return <>{userData ? <MainTab /> : <AuthStack />}</>;
}
