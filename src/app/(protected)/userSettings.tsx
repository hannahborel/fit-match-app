import { Text, TouchableOpacity, View } from 'react-native';

import { router } from 'expo-router';
import { X } from 'lucide-react-native';

export const userSettings = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <X />
      </TouchableOpacity>
      <Text>Settings</Text>
    </View>
  );
};

export default userSettings;
