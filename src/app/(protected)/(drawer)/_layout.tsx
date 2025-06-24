
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Slot } from "expo-router";
import { Drawer } from "expo-router/drawer";

function CustomDrawerComntentProps(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
   </DrawerContentScrollView>
  )
}
export const DrawerLayout = () => {
  return (
    <Drawer screenOptions={{drawerType:'front'}}>
      <Drawer.Screen name='accountPage' />
          </Drawer>
  )
};
export default DrawerLayout;