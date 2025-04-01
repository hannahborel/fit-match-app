import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useState } from 'react';
import StyledInput from '../../src/components/StyledInput';

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ marginLeft: 45, marginRight: 45, gap: 16 }}>
      <StyledInput
        value={email}
        label="Email"
        onChangeText={setEmail}
        autoCapitalize="none"
        multiline={false}
      />
      <StyledInput
        value={password}
        label="Password"
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
