import { SafeAreaView, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

export default function PreLeagueMatchup() {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        style={{
          backgroundColor: theme.colors.surface,
          width: '85%',
        }}
      >
        <Card.Title titleStyle={{ fontWeight: 700 }} title="Matchup Preview" />
        <Card.Content style={{ gap: 20 }}>
          <Text style={{ color: theme.colors.onSurface }}>
            Each week you'll compete in 2v2 team battles where you compete for
            the highest combined points.
          </Text>
          <Text style={{ color: theme.colors.onSurface }}>
            You will be able to view this section when your league starts
          </Text>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
}
