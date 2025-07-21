import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface CustomHeaderProps {
  title: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ width: 40, height: 40, justifyContent: 'center' }}
      >
        {/* <ChevronLeft size={24} color={theme.colors.onBackground} /> */}
      </TouchableOpacity>
      <Text variant="titleMedium" style={{ color: theme.colors.onBackground }}>
        {title}
      </Text>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
    height: 56,
  },

  placeholder: {
    width: 40,
  },
});

export default CustomHeader;
