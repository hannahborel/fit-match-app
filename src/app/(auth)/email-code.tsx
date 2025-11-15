import ButtonPrimary from '@/components/elements/ButtonPrimary';
import BackHeader from '@/components/elements/Headers/BackHeader';
import { useHandleLogin } from '@/hooks/useHandleLogin';
import { router, useLocalSearchParams } from 'expo-router';
import { CheckIcon, Mail } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmailCode() {
  const theme = useTheme();
  const params = useLocalSearchParams<{
    emailParam?: string;
    email?: string;
    isNewUser?: string;
  }>();
  const email = (params.emailParam || params.email) as string;
  const isNewUser = params.isNewUser === 'true';

  const { sendEmailCode, isSending, sendError } = useHandleLogin();

  const onPressSendCode = async () => {
    const res = await sendEmailCode(email, isNewUser);
    if (res.ok) {
      router.push({
        pathname: '/verify-code',
        params: { emailParam: email, isNewUser: String(isNewUser) },
      });
    }
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
                {isNewUser ? 'Create a Hustle account' : 'Finish signing in with a single-use code'}
              </Text>
            </View>
            <View style={{ gap: 8, paddingHorizontal: 8 }}>
              <Text style={{ fontSize: 14, fontWeight: 600 }}>
                {isNewUser
                  ? "We'll create your account with the email above"
                  : 'We will send a single-use code to your email'}
              </Text>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
              >
                <Mail size={20} color={'white'} />
                <Text style={{ fontSize: 14, fontWeight: 700 }}>{email}</Text>
                <CheckIcon size={18} color={theme.colors.secondary} />
              </View>
            </View>
          </View>

          <View style={{ gap: 12 }}>
            <ButtonPrimary onPress={onPressSendCode} loading={isSending}>
              Send Code
            </ButtonPrimary>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
