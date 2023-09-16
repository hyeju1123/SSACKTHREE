import React from 'react';

import MainTab from './MainTab';
import AuthStack from './AuthStack';
import useLogin from '../api/useLogin';
import NotificationModal from '../components/NotificationModal';
import {NotificationProvider} from '../context/NotificationContext';

export default function Root(): JSX.Element {
  const {userData} = useLogin();

  return (
    <>
      <NotificationProvider>
        {userData ? (
          <>
            <NotificationModal />
            <MainTab />
          </>
        ) : (
          <AuthStack />
        )}
      </NotificationProvider>
    </>
  );
}
