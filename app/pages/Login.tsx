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
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          placeholder="Email"
          style={[styles.input, { height: 56 }]}
          multiline={false}
        />
        <TextInput
          mode="outlined"
          value={password}
          placeholder="Password"
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={[styles.input, { height: 56 }]}
          multiline={false}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
      </View>
      <Button
        mode="contained"
        onPress={() => router.push('/pages/LeagueOptions')}
        style={styles.button}
      >
        Sign In
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  inputContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
  },
  input: {
    width: 275,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 24,
    width: '100%',
    maxWidth: 400,
  },
});

export default Login;
