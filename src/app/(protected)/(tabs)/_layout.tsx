// Tab navigator for the Home route

import FlowchartIcon from '@/assets/svg/icons/bracketIcon';
import { Tabs } from 'expo-router';
import { Calendar, CircleUser, Home, Plus } from 'lucide-react-native';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useGetLeague } from '@/hooks/useGetLeague';

export default function HomeTabs() {
  const theme = useTheme();
  // Fetch league data at the tab layout level so all child tabs can access it via the atom
  useGetLeague();
  type TabIconProps = {
    color: string;
    size: number;
    focused: boolean;
  };

  type HomeTab = {
    title: string;
    route: string;
    icon: (props: TabIconProps) => React.ReactNode;
    headerShown?: boolean;
  };

  const homeTabs: HomeTab[] = [
    {
      title: 'Home',
      icon: ({ color }) => <Home color={color} />,
      route: 'home',
    },
    // {
    //   title: 'Calendar',
    // icon: ({ color }) => <FlowchartIcon color={color} />,
    //   route: 'calendar',
    // },

    {
      title: 'Log a Workout',
      icon: ({ color }) => <Plus color={color} />,
      route: 'activity',
    },
    {
      title: 'Calendar',
      icon: ({ color }) => <Calendar color={color} />,
      route: 'calendar',
    },
    {
      title: 'Account',
      icon: ({ color }) => <CircleUser color={color} />,
      route: 'account',
    },
  ];
  return (
    <Tabs>
      {homeTabs.map((tab, index) => (
        <Tabs.Screen
          key={index}
          name={tab.route}
          options={{
            headerShown: tab.headerShown ?? false,
            tabBarStyle: {
              backgroundColor: theme.colors.background,
              borderTopColor: theme.colors.backdrop,
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
