import React from 'react';

import MainTab from './MainTab';
import AuthStack from './AuthStack';

export default function Root(): JSX.Element {
  const userToken = false;
  return <>{userToken ? <MainTab /> : <AuthStack />}</>;
}
