import ButtonPrimary from '@/components/elements/ButtonPrimary';
import BackHeader from '@/components/elements/Headers/BackHeader';
import InputPrimary from '@/components/elements/InputPrimary';
import { useHandleLogin } from '@/hooks/useHandleLogin';
import { useSignIn } from '@clerk/clerk-expo';
import { router, useLocalSearchParams } from 'expo-router';
import { InfoIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerifyCode() {
  const theme = useTheme();
  const { isLoaded, setActive } = useSignIn();
  const params = useLocalSearchParams<{
    emailParam?: string;
    email?: string;
  }>();
  const email = (params.emailParam || params.email) as string;
  const [code, setCode] = useState('');
  const { sendEmailCode, isSending, verifyEmailCode, isVerifying } =
    useHandleLogin();

  const onVerifyCode = async () => {
    const result = await verifyEmailCode(code);
    if (result.ok && result.createdSessionId) {
      if (!isLoaded || !setActive) return;
      await setActive({ session: result.createdSessionId });
      router.replace('/(tabs)');
    }
  };

  const onResendCode = async () => {
    await sendEmailCode(email);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1, paddingHorizontal: 8 }}>
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'space-between',
            marginVertical: 0,
          }}
        >
          <View>
            <BackHeader />
            <View style={{ marginBottom: 60, paddingHorizontal: 50 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Check your email for the code
              </Text>
            </View>
            <View style={{ gap: 8 }}>
              <InputPrimary
                value={code}
                onChangeText={setCode}
                placeholder="Enter 6-digit code"
                keyboardType="number-pad"
                maxLength={6}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: 20,
                }}
              >
                <InfoIcon style={{ margin: 8 }} size={30} color={'white'} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    lineHeight: 22,
                    marginLeft: 6,
                  }}
                >
                  The code was sent to your email {email}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ gap: 12 }}>
            <ButtonPrimary
              onPress={onVerifyCode}
              disabled={isVerifying || code.length !== 6}
            >
              Submit Code
            </ButtonPrimary>
            <ButtonPrimary
              style={{ backgroundColor: theme.colors.background }}
              onPress={onResendCode}
              loading={isVerifying}
            >
              Resend Code
            </ButtonPrimary>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
