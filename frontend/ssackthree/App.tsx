/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Root from './src/navigation/Root';
import SWRConfigContext from './src/context/SWRConfigContext';
import {RecoilRoot} from 'recoil';

function App(): JSX.Element {
  return (
    <SWRConfigContext>
      <RecoilRoot>
        <Root />
      </RecoilRoot>
    </SWRConfigContext>
  );
}

export default App;
