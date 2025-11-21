import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, Text } from 'react-native-paper';

const Matchup = () => {
  const theme = useTheme();
  return (
    <SafeAreaView>
      <Text style={{ color: theme.colors.onSurface }}>Matchup</Text>
    </SafeAreaView>
  );
};

export default Matchup;
