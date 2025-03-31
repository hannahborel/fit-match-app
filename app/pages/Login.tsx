import { useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useState } from 'react';

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ margin: 45, gap: 16 }}>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        placeholder="Email"
        multiline={false}
      />
      <TextInput
        value={password}
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        multiline={false}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />

      <Button mode="contained" onPress={() => router.push('/pages/LeagueOptions')}>
        Sign In
      </Button>
    </View>
  );
};

export default Login;
