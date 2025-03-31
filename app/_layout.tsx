import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import { themeColors } from '../src/constants/Colors';

const theme = { ...MD3LightTheme, colors: themeColors.light };

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="pages/CreateAccount" />
          <Stack.Screen name="pages/LeagueOptions" />
          <Stack.Screen name="pages/CreateLeague" />
        </Stack>
        <StatusBar />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
