import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

function CustomDrawerComntentProps(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="My Profile"
        onPress={() => router.push('/(protected)/userProfile')}
      />
      <DrawerItem
        label="Settings"
        onPress={() => router.push('/(protected)/userSettings')}
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
