import ButtonPrimary from '@/components/elements/Buttons/ButtonPrimary';
import BackHeader from '@/components/elements/Headers/BackHeader';
import InputPrimary from '@/components/elements/Input/InputPrimary';
import { useHandleLogin } from '@/hooks/useHandleLogin';
import { useSignIn } from '@clerk/clerk-expo';
import { router, useLocalSearchParams } from 'expo-router';
import { CheckIcon, InfoIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerifyCode() {
  const theme = useTheme();
  const { isLoaded, setActive } = useSignIn();
  const params = useLocalSearchParams<{
    emailParam?: string;
    email?: string;
    isNewUser?: string;
  }>();
  const email = (params.emailParam || params.email) as string;
  const isNewUser = params.isNewUser === 'true';
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);
  const { sendEmailCode, verifyEmailCode } = useHandleLogin();

  console.log(
    'VerifyCode component - isLoaded:',
    isLoaded,
    'setActive:',
    !!setActive,
    'email:',
    email,
    'isNewUser:',
    isNewUser,
  );

  const onVerifyCode = async () => {
    console.log('Starting verification with code:', code);

    setIsSubmitting(true);
    setVerifyError(null);
    try {
      const result = await verifyEmailCode(code, isNewUser);
      console.log('Verification result:', result);

      // Handle successful verification
      if (result.ok && result.createdSessionId) {
        console.log('Activating session with ID:', result.createdSessionId);
        if (!isLoaded || !setActive) {
          console.log('Clerk not loaded or setActive not available');
          return;
        }
        await setActive({ session: result.createdSessionId });
        console.log('Session activated successfully');

        // Redirect based on user type
        if (isNewUser) {
          console.log(
            'New user signup complete, redirecting to add-user-profile-details',
          );
          router.replace('/add-user-profile-details');
        } else {
          console.log('Existing user signin complete, redirecting to home');
          router.replace('/');
        }
      } else if (result.error) {
        console.log('Verification failed with error:', result.error);
        setVerifyError(result.error);
      }
    } catch (error: any) {
      console.error('Exception during verification:', error);
      setVerifyError(error?.message || 'Failed to verify code');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onResendCode = async () => {
    setIsResending(true);
    setResendError(null);
    try {
      const result = await sendEmailCode(email, isNewUser);
      if (!result.ok && result.error) {
        setResendError(result.error);
      }
    } catch (error: any) {
      setResendError(error?.message || 'Failed to resend code');
    } finally {
      setIsResending(false);
    }
  };

  // Check if code is valid: exactly 6 digits, all numbers
  const isValidCode = code.length === 6 && /^\d{6}$/.test(code);
  const validateCode = isValidCode ? 'check' : undefined;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
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
                  onChangeText={(text) => {
                    // Only allow numeric characters
                    const numericOnly = text.replace(/[^0-9]/g, '');
                    setCode(numericOnly);
                  }}
                  placeholder="Enter 6-digit code"
                  keyboardType="number-pad"
                  maxLength={6}
                  rightIcon={validateCode}
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
                      flex: 1,
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
                disabled={isSubmitting || !isValidCode}
                loading={isSubmitting}
                replaceTextWithSpinner={true}
              >
                Submit Code
              </ButtonPrimary>
              <ButtonPrimary
                style={{ backgroundColor: theme.colors.background }}
                onPress={onResendCode}
                loading={isResending}
                disabled={isResending}
                replaceTextWithSpinner={true}
              >
                Resend Code
              </ButtonPrimary>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
