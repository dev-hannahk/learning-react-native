import {useNavigation} from '@react-navigation/native';
import React, {useReducer, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import TransparentCircleButton from './TransparentCircleButton';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const initialState = {mode: 'date', visible: false};

function reducer(state, action) {
  switch (action.type) {
    case 'open':
      return {
        mode: action.mode,
        visible: true,
      };
    case 'close':
      return {
        ...state,
        visible: fasle,
      };
    default:
      throw new Error('Unhandled action type');
  }
}

function WriteHeader({onSave, onAskRemove, isEditing, date, onChangeDate}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const open = mode => dispatch({type: 'open', mode});

  const close = () => dispatch({type: 'close'});

  const navigation = useNavigation();

  const onGoBack = () => {
    navigation.pop();
  };

  const onConfirm = selectedDate => {
    close();
    onChangeDate(selectedDate);
  };

  return (
    <View style={styles.block}>
      <View style={styles.iconButtonWrapper}>
        <TransparentCircleButton
          onPress={onGoBack}
          name="arrow-back"
          color="#424242"
          android_ripple={{color: '#ededed'}}
        />
      </View>
      <View style={styles.buttons}>
        {isEditing && (
          <TransparentCircleButton
            name="delete-forever"
            color="#ef5350"
            android_ripple={{color: '#ededed'}}
            onPress={onAskRemove}
          />
        )}
        <TransparentCircleButton
          name="check"
          color="#009688"
          onPress={onSave}
        />
      </View>

      <View style={styles.center}>
        <Pressable onPress={() => open('date')}>
          <Text>{format(new Date(date), 'PPP', {locale: ko})}</Text>
        </Pressable>
        <View style={styles.seperator} />
        <Pressable onPress={() => open('time')}>
          <Text>{format(new Date(date), 'p', {locale: ko})}</Text>
        </Pressable>
      </View>
      <DateTimePickerModal
        isVisible={state.visible}
        mode={state.mode}
        onConfirm={onConfirm}
        onCancel={close}
        date={date}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 48,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: 8,
  },
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
    flexDirection: 'row',
  },
  seperator: {
    width: 8,
  },
});

export default WriteHeader;
