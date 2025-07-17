import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

export default function BackButton() {
  const theme = useTheme();
  return (
    <ChevronLeft
      color={theme.colors.onBackground}
      onPress={() => router.back()}
    />
  );
}
