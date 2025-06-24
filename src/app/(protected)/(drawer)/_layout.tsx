import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

function CustomDrawerComntentProps(props: DrawerContentComponentProps) {
  const { navigation } = props; // ← drawer navigation object

  /** Closes the drawer, then navigates */
  const closeThenNavigate = (href: string) => {
    navigation.closeDrawer(); // 1. start close animation
    setTimeout(() => {
      // 2. wait one frame
      router.push(href); // 3. push the new route
    }, 500);
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="My Profile"
        onPress={() => closeThenNavigate('/(protected)/userProfile')}
      />
      <DrawerItem
        label="Settings"
        onPress={() => closeThenNavigate('/(protected)/userSettings')}
      />
    </DrawerContentScrollView>
  );
}
export const DrawerLayout = () => {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerComntentProps {...props} />}
      screenOptions={{ drawerType: 'front' }}
    >
      <Drawer.Screen
        name="home"
        options={{ drawerItemStyle: { display: 'none' } }}
      />

      <Drawer.Screen name="userProfile" options={{ title: 'My Profile' }} />
    </Drawer>
  );
};
export default DrawerLayout;
