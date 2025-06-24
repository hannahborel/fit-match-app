import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProtectedLayout() {
  const theme = useTheme();

  return (

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.colors.background,
            width: '100%',
           
          },
        }}
      >
       
        <Stack.Screen name="leagueEntry" />
        <Stack.Screen name="selectChallengeType" />
        <Stack.Screen name="faceOffSetup" />
      </Stack>

  );
}
