import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import ButtonPrimary from '@/components/elements/ButtonPrimary';

import InputPrimary from '@/components/elements/InputPrimary';
import { useSignUp } from '@clerk/clerk-expo';

export default function VerifyEmail() {
  const theme = useTheme();

  const [code, setCode] = useState('');
  const [, setLoading] = useState(false);
  const { isLoaded, signUp, setActive } = useSignUp();
  const onPressVerify = async () => {
    console.log('onPressVerify', code);
    if (!isLoaded) return;
    setLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      await setActive({ session: completeSignUp.createdSessionId });
      // if (leagueStatus) {
      //   router.replace('/(protected)/home');
      // } else {
      //   router.replace('/leagueEntry');
      // }
    } catch (err) {
      if (err instanceof ReferenceError) {
        console.log('ERROR: ', err);
      }
      // console.log(err);
      // console.log(err.errors[0].message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      }}
    >
      <View style={{ width: 300 }}>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            marginBottom: 24,
            color: theme.colors.onBackground,
          }}
        >
          Enter the 6-digit code sent to your email
        </Text>

        <InputPrimary
          value={code}
          onChangeText={(text) => setCode(text)}
          maxLength={6}
        />
        <View style={{ marginTop: 24 }}>
          <ButtonPrimary onPress={onPressVerify}>
            <Text>Verify Email</Text>
          </ButtonPrimary>
        </View>
      </View>
    </View>
  );
}
