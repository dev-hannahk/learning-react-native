import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import FeedListItem from './FeedListItem';

function FeedList({logs, onScrolledToBottom}) {
  const onScroll = e => {
    /**
     * onScrolledToBottom props가 설정되지 않았을 때 예외처리
     */
    if (!onScrolledToBottom) {
      return;
    }

    const {contentSize, layoutMeasurement, contentOffset} = e.nativeEvent;
    // console.log({contentSize, layoutMeasurement, contentOffset});

    const distanceFromBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y;

    if (distanceFromBottom < 72) {
      // console.log('바닥과 가까워요.');
      onScrolledToBottom(true);
    } else {
      // console.log('바닥과 멀어졌어요.');
      onScrolledToBottom(false);
    }
  };

  return (
    <FlatList
      data={logs}
      style={styles.block}
      renderItem={({item}) => <FeedListItem log={item} />}
      keyExtractor={log => log.id}
      ItemSeparatorComponent={() => <View style={styles.seperator} />}
      onScroll={onScroll}
    />
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  seperator: {
    backgroundColor: '#e0e0e0',
    height: 1,
    width: '100%',
  },
});

export default FeedList;
