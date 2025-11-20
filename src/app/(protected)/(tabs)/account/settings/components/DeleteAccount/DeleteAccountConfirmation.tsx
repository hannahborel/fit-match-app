import { router } from 'expo-router';
import { CircleCheck } from 'lucide-react-native';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import ButtonPrimary from '@/components/elements/ButtonPrimary';

function DeleteAccountConfirmation() {
  const theme = useTheme();
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
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Your account has been deleted successfully.
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginTop: 20,
            }}
          >
            <CircleCheck
              style={{ margin: 8 }}
              size={30}
              color={theme.colors.onPrimaryContainer}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: 600,
                lineHeight: 22,
                marginLeft: 6,
              }}
            >
              You can now close this app and login with a new account or create
              a new one.
            </Text>
          </View>

          <View style={{ gap: 12 }}>
            <ButtonPrimary
              onPress={() => router.replace('/(auth)/login-email')}
            >
              Login with a new account
            </ButtonPrimary>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default DeleteAccountConfirmation;
