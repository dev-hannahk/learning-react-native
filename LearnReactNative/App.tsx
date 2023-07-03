/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {Button, SafeAreaView} from 'react-native';
import Box from './components/Greeting';

function App(): JSX.Element {
  const [visible, setVisible] = useState(true);

  const onPress = () => {
    setVisible(!visible);
  };

  return (
    <SafeAreaView>
      <Button title="토글" onPress={onPress} />
      {visible ? <Box rounded size="large" color="blue" /> : null}
    </SafeAreaView>
  );
}

export default App;
