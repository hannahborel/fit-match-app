// Tab navigator for the Home route

import FlowchartIcon from '@/assets/svg/icons/bracketIcon';
import { Tabs } from 'expo-router';
import { Calendar, CircleUser, Home, Plus } from 'lucide-react-native';
import { useTheme } from 'react-native-paper';

export default function HomeTabs() {
  const theme = useTheme();
  const homeTabs = [
    {
      title: 'Home',
      icon: () => <Home />,
      route: 'index', // This maps to (tabs)/index.tsx
    },
    {
      title: 'Standings',
      icon: () => <FlowchartIcon color={theme.colors.primary} />,
      route: 'standings',
    },
    {
      title: 'Log a Workout',
      icon: () => <Plus />,
      route: 'activity',
    },
    {
      title: 'Calendar',
      icon: () => <Calendar />,
      route: 'calendar',
    },
    {
      title: 'Account',
      icon: () => <CircleUser />,
      route: 'account',
    },
  ];
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          color: theme.colors.onBackground,
        },
      }}
    >
      {homeTabs.map((tab, index) => (
        <Tabs.Screen
          key={index}
          name={tab.route}
          options={{
            tabBarStyle: {
              backgroundColor: theme.colors.background,
              borderTopColor: theme.colors.backdrop,
              height: 60,
            },
            title: tab.title,

            tabBarLabel: () => null,
            tabBarIcon: tab.icon,
          }}
        />
      ))}
    </Tabs>
  );
}
