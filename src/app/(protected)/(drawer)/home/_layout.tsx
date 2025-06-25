// Tab navigator for the Home route
import DrawerMenuButton from '@/components/library/DrawerMenuButton';
import { Tabs } from 'expo-router';
import { Calendar, Home, Plus } from 'lucide-react-native';

export default function HomeTabs() {
  const homeTabs = [
    {
      title: 'Home',
      icon: () => <Home />,
      route: 'home',
      headerLeft: () => <DrawerMenuButton />,
    },
    {
      title: 'Log a Workout',
      icon: () => <Plus />,
      route: 'logActivity',
      // Custom header left for this tab
    },
    {
      title: 'Calendar',
      icon: () => <Calendar />,
      route: 'calendar',
    },
  ];
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      {homeTabs.map((tab, index) => (
        <Tabs.Screen
          key={index}
          name={tab.route}
          options={{
            title: tab.title,
            headerLeft: () => tab.headerLeft && <DrawerMenuButton />,
            tabBarLabel: () => null,
            tabBarIcon: () => {
              return <tab.icon />;
            },
          }}
        />
      ))}
    </Tabs>
  );
}
