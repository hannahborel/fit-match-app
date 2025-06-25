import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { Menu } from 'lucide-react-native';

export const DrawerMenuButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
      <Menu style={{ marginLeft: 16 }} />
    </Pressable>
  );
};
export default DrawerMenuButton;
