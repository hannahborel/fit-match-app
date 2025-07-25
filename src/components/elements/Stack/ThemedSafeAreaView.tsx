import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ThemedSafeAreaView(
  props: React.ComponentProps<typeof SafeAreaView>,
) {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      {...props} // pass other props (e.g., initialRouteName, children)
    />
  );
}
