import { useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const LeagueOptions = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => {}} style={styles.button} buttonColor="#4ade80">
        JOIN LEAGUE
      </Button>
      <Button
        mode="contained"
        onPress={() => router.push('/pages/CreateLeague')}
        style={styles.button}
        buttonColor="#4ade80"
      >
        CREATE A LEAGUE
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
    backgroundColor: '#1c1c1e',
    gap: 16,
  },
  button: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 28,
    height: 56,
  },
});

export default LeagueOptions;
