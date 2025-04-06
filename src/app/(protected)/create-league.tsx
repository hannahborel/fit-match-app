import { View } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputPrimary from '@/components/library/InputPrimary';
import ButtonPrimary from '@/components/library/ButtonPrimary';
import NumberAvatar from '@/components/NumberAvatar';
import { useState } from 'react';

export default function CreateLeague() {
  const router = useRouter();
  const theme = useTheme();
  const [leagueName, setLeagueName] = useState('');
  const [leagueSize, setLeagueSize] = useState(4);
  const [numberOfWeeks, setNumberOfWeeks] = useState(4);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateLeague = async () => {
    // TODO: Implement league creation logic
    setLoading(true);
    try {
      // Add your league creation logic here
      router.replace('/(protected)/home');
    } catch (err: any) {
      setError(err.message || 'Failed to create league');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1, padding: 24 }}>
        <View style={{ gap: 24 }}>
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: theme.colors.onBackground }}>
              LEAGUE NAME
            </Text>
            <InputPrimary
              value={leagueName}
              onChangeText={setLeagueName}
              placeholder="Enter league name"
              error={!!error}
            />
          </View>
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: theme.colors.onBackground }}>
              LEAGUE SIZE
            </Text>
            <NumberAvatar start={4} end={48} step={2} onSelect={setLeagueSize} />
          </View>
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: theme.colors.onBackground }}>
              NUMBER OF WEEKS
            </Text>
            <NumberAvatar start={4} end={48} step={2} onSelect={setNumberOfWeeks} />
          </View>
          {error && <Text style={{ color: theme.colors.error, textAlign: 'center' }}>{error}</Text>}
          <View style={{ marginTop: 24 }}>
            <ButtonPrimary
              onPress={handleCreateLeague}
              loading={loading}
              disabled={loading || !leagueName.trim()}
            >
              CREATE LEAGUE
            </ButtonPrimary>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
