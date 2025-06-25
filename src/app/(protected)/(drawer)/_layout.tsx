import { handleLogout } from '@/helpers/helpers';
import { useAuth } from '@clerk/clerk-expo';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

function CustomDrawerComntentProps(props: DrawerContentComponentProps) {
  const { navigation } = props;
  const { signOut } = useAuth();

  const closeThenNavigate = (href: string) => {
    navigation.closeDrawer();
    setTimeout(() => {
      router.push(href);
    }, 500);
  };
  const drawerItems = [
    { label: 'My Profile', href: '/(protected)/userProfile' },
    { label: 'Settings', href: '/(protected)/userSettings' },
    {
      label: 'Logout',
      href: '/(auth)/login-email',
      actions: () => handleLogout(router, signOut),
    },
  ];
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {drawerItems.map((item, index) => (
        <DrawerItem
          key={index}
          label={item.label}
          onPress={() => {
            item.actions?.();
            closeThenNavigate(item.href);
          }}
        />
      ))}
    </DrawerContentScrollView>
  );
}
export const DrawerLayout = () => {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerComntentProps {...props} />}
      screenOptions={{ drawerType: 'front', headerShown: false }}
    >
      <Drawer.Screen
        name="home"
        options={{ drawerItemStyle: { display: 'none' } }}
      />
    </Drawer>
  );
};
export default DrawerLayout;
