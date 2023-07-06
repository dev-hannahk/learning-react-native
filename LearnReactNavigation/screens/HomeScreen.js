import React from 'react';
import {View, Button, Text} from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View>
      <Text>Home</Text>
      <Button title="Drawer 열기" onPress={() => navigation.openDrawer()} />
      <Button
        title="Setting 열기"
        onPress={() => navigation.navigate('Settin')}
      />
    </View>
  );
}

export default HomeScreen;
