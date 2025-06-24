
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { router, Slot } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { X } from "lucide-react-native";
import { TouchableOpacity } from "react-native";


function CustomDrawerComntentProps(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
    <DrawerItemList {...props} />
    <DrawerItem
      label="My Profile"
      onPress={() => router.push("/(protected)/userProfile")}
    />
  </DrawerContentScrollView>
  )
}
export const DrawerLayout = () => {
  return (
    <Drawer drawerContent={ props => <CustomDrawerComntentProps{...props}/>} screenOptions={{ drawerType: 'front' }}>
      <Drawer.Screen name='home' options={{drawerItemStyle: {display: 'none'}}} />
      <Drawer.Screen name='userProfile' options={{ title: 'My Profile' }}/>
          </Drawer>
  )
};
export default DrawerLayout;