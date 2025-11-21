import { hasLeagueStartedAtom } from '@/atoms/leagueAtom';
import { useAtomValue } from 'jotai';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import PreLeagueMatchup from './PreLeague/PreLeagueMatchup';

const Matchup = () => {
  const theme = useTheme();

  const leagueHasStarted = useAtomValue(hasLeagueStartedAtom);

  if (!leagueHasStarted) {
    return <PreLeagueMatchup />;
  }

  return (
    <SafeAreaView>
      <Text style={{ color: theme.colors.onSurface }}>Matchup</Text>
    </SafeAreaView>
  );
};

export default Matchup;
