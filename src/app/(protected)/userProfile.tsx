import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';

import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

export const userProfile = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => {
          router.push('home');
        }}
      >
        <X />
      </TouchableOpacity>
      <Text>Account Page xxx</Text>
    </View>
  );
};
export default userProfile;
