import { useRouter } from 'expo-router';
import { View, StyleSheet, Pressable } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useState } from 'react';

const CreateAccount = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
          placeholder="First Name"
        />
        <TextInput
          mode="outlined"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
          placeholder="Last Name"
        />
        <TextInput
          mode="outlined"
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          mode="outlined"
          placeholder="Password (case sensitive)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          style={styles.input}
        />
      </View>
      <Button mode="contained" onPress={() => {}} style={styles.button} buttonColor="#4ade80">
        CREATE ACCOUNT
      </Button>
      <Pressable onPress={() => router.push('/')} style={styles.loginContainer}>
        <Text variant="bodyMedium">
          Already have an account?{' '}
          <Text variant="bodyMedium" style={styles.loginLink}>
            Log In
          </Text>
        </Text>
      </Pressable>
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
    width: 275,
    gap: 16,
  },
  input: {
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 24,
    width: 275,
    borderRadius: 28,
  },
  loginContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  loginLink: {
    textDecorationLine: 'underline',
  },
});

export default CreateAccount;
