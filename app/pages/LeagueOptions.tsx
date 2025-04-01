import { useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const LeagueOptions = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', marginLeft: 45, marginRight: 45, gap: 16 }}>
      <Button mode="contained" onPress={() => {}}>
        JOIN LEAGUE
      </Button>
      <Button mode="contained" onPress={() => router.push('/pages/CreateLeague')}>
        CREATE A LEAGUE
      </Button>
    </View>
  );
};

export default LeagueOptions;
