/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import SettingScreen from './screens/SettingScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Text} from 'react-native';

const Drawer = createDrawerNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          drawerPosition: 'left',
          drawerActiveBackgroundColor: '#fb8c00',
          drawerActiveTintColor: 'white',
        }}
        backBehavior="history"
        drawerContent={({navigation}) => (
          <SafeAreaView>
            <Text>A Custom Drawer</Text>
            <Button
              onPress={() => navigation.closeDrawer()}
              title="Drawer 닫기"
            />
          </SafeAreaView>
        )}>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{title: '홈', headerLeft: () => <Text>Left</Text>}}
        />
        <Drawer.Screen
          name="Setting"
          component={SettingScreen}
          options={{title: '설정'}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
