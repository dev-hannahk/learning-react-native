import React, {useState, useContext} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import FeedList from '../components/FeedList';
import FloatingWriteButton from './FloatingWriteButton';
import LogContext from '../contexts/LogContext';

function FeedScreen() {
  const {logs} = useContext(LogContext);
  // console.log(JSON.stringify(logs, null, 2));
  const [hidden, setHidden] = useState(false);

  const onScrolledToBottom = isBottom => {
    if (hidden !== isBottom) {
      setHidden(isBottom);
    }
  };

  return (
    <View style={styles.block}>
      <FeedList logs={logs} onScrolledToBottom={onScrolledToBottom} />
      <FloatingWriteButton hidden={hidden} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1},
});

export default FeedScreen;
