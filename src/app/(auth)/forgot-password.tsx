import { useState } from 'react';
import { View, Pressable, Text as RNText } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import InputPrimary from '@/components/library/InputPrimary';
import ButtonPrimary from '@/components/library/ButtonPrimary';
import Logo from '@/components/Logo';
import { formatPhoneNumberInput } from '@/utils/formatPhoneNumberInput';

export default function ForgotPassword() {
  const { isLoaded, signIn } = useSignIn();
  const router = useRouter();
  const theme = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ width: 300, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Forgot Password</Text>
      </View>
    </View>
  );
}
