import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomButton from './CustomButton';
import {useNavigation} from '@react-navigation/native';

function SignButtons({isSignUp, onSubmit}) {
  const navigation = useNavigation();

  const primaryTitle = isSignUp ? '회원가입' : '로그인';
  const secondaryTitle = isSignUp ? '로그인' : '회원가입';

  const onSecondaryButtonsPress = () => {
    if (isSignUp) {
      navigation.goBack();
    } else {
      navigation.push('SignIn', {isSignUp: true});
    }
  };
  return (
    <View style={styles.buttons}>
      {isSignUp ? (
        <>
          <CustomButton title="회원가입" hasMarginBottom onPress={onSubmit} />
          <CustomButton
            title="로그인"
            theme="secondary"
            onPress={() => navigation.goBack()}
          />
        </>
      ) : (
        <>
          <CustomButton title="로그인" hasMarginBottom onPress={onSubmit} />
          <CustomButton
            title="회원가입"
            theme="secondary"
            onPress={() => navigation.push('SignIn', {isSignUp: true})}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 64,
  },
});

export default SignButtons;
