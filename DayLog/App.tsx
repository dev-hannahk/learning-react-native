/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';
import {LogContextProvider} from './contexts/LogContext';
import {SearchContextProvider} from './contexts/SearchContext';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <SearchContextProvider>
        <LogContextProvider>
          <RootStack />
        </LogContextProvider>
      </SearchContextProvider>
    </NavigationContainer>
  );
}

export default App;
