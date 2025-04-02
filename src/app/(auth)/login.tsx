import { useState } from 'react';
import { View, Pressable, Text as RNText } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import InputPrimary from '@/components/library/InputPrimary';
import ButtonPrimary from '@/components/library/ButtonPrimary';
import Logo from '@/components/Logo';
export default function Login() {
  const { signIn, setActive } = useSignIn();
  const router = useRouter();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignIn = async () => {
    if (!signIn) return;

    try {
      setLoading(true);
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.replace('/');
      }
    } catch (err) {
      console.error('Error signing in:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{width: 300, alignSelf: 'center', }}>
      <View style={{alignItems: 'center', marginBottom: 24}}>
    <Logo  />
    </View>
    <View style={{gap: 8}}>
      <InputPrimary
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

    
        <InputPrimary
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
      
     
      </View>
      <Pressable onPress={() => router.push('/forgot-password')} style={{ alignSelf: 'flex-end', marginTop: 8 }}>
           <RNText style={{ color: theme.colors.primary /* Or another suitable color */, textDecorationLine: 'underline' }}>Forgot Password?</RNText>
        </Pressable>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24}}>
      <ButtonPrimary onPress={onSignIn} loading={loading} disabled={loading}>
        SIGN IN
      </ButtonPrimary>
      
      </View>
      <Pressable onPress={() => router.push('/sign-up')} style={{ marginTop: 8, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text>Don't have an account? </Text>
          <RNText style={{ color: theme.colors.primary, textDecorationLine: 'underline' }}>Sign Up</RNText>
        </View>
      </Pressable>
      </View>
    </View>
  );
}
