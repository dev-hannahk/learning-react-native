import React, {useRef} from 'react';
import BorderedInput from './BorderedInput';

function SignForm({isSignUp, onSubmit, form, createChangeTextHandler}) {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <>
      <BorderedInput
        hasMarginBottom
        placeholder="이메일"
        value={form.email}
        onChangeText={createChangeTextHandler('email')}
        autoCapitalize="none"
        autoCorrect={false}
        autoCompleteType="email"
        keyboardType="email-address"
        returnkeyType="next"
        onSubmitEditing={() => passwordRef.current.focus()}
      />
      <BorderedInput
        placeholder="비밀번호"
        hasMarginBottom={isSignUp}
        value={form.password}
        ref={passwordRef}
        onChangeText={createChangeTextHandler('password')}
        secureTextEntry
        returnkeyType={isSignUp ? 'next' : 'done'}
        onSubmitEditing={() => {
          if (isSignUp) {
            confirmPasswordRef.current.focus();
          } else {
            onSubmit();
          }
        }}
      />
      {isSignUp && (
        <BorderedInput
          placeholder="비밀번호 확인"
          value={form.confirmPassword}
          ref={confirmPasswordRef}
          onChangeText={createChangeTextHandler('confirmPassword')}
          secureTextEntry
          returnkeyType="done"
          onSubmitEditing={onSubmit}
        />
      )}
    </>
  );
}

export default SignForm;
