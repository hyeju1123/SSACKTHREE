/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Root from './src/navigation/Root';
import SWRConfigContext from './src/context/SWRConfigContext';

function App(): JSX.Element {
  return (
    <SWRConfigContext>
      <Root />
    </SWRConfigContext>
  );
}

export default App;
