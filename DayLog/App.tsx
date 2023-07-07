/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RootStack from './screens/RootStack';
import LogContext, {LogContextProvider} from './contexts/LogContext';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      {/* <LogContext.Provider value="안녕하세요">
        <RootStack />
      </LogContext.Provider> */}
      <LogContextProvider>
        <RootStack />
      </LogContextProvider>
    </NavigationContainer>
  );
}

export default App;
