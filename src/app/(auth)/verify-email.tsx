import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import ButtonPrimary from '@/components/library/ButtonPrimary';
import { useLeagueStatus } from '@/context/LeagueStatus';
import InputPrimary from '@/components/library/InputPrimary';
import { useSignUp } from '@clerk/clerk-expo';
import { router } from 'expo-router';

export default function VerifyEmail() {
  const theme = useTheme();
  const { leagueStatus } = useLeagueStatus();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { isLoaded, signUp, setActive } = useSignUp();
  const onPressVerify = async () => {
    console.log('onPressVerify', code);
    if (!isLoaded) return;
    setLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
      await setActive({ session: completeSignUp.createdSessionId });
      if (leagueStatus) {
        router.replace('/(protected)/home');
      } else {
        router.replace('/leagueEntry');
      }
    } catch (err: any) {
      console.log(err);
      console.log(err.errors[0].message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
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

        <InputPrimary value={code} onChangeText={text => setCode(text)} maxLength={6} />
        <View style={{ marginTop: 24 }}>
          <ButtonPrimary onPress={onPressVerify}>Verify Email</ButtonPrimary>
        </View>
      </View>
    </View>
  );
}
