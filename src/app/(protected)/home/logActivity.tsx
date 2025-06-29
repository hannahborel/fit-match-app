import { View, Text } from 'react-native';
import React from 'react';
import ThemeWrapperBg from '@/components/elements/ThemeWrapperBg';
import { TextInput, useTheme } from 'react-native-paper';

const logActivity = () => {
  const theme = useTheme();
  return (
    <ThemeWrapperBg>
      <View
        style={{
          gap: 18,
          paddingVertical: 8,
        }}
      >
        <TextInput
          placeholder="search"
          mode="flat"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          style={{
            backgroundColor: theme.colors.surface,
            height: 40,
            borderRadius: 6,
          }}
        />
        <View
          style={{
            borderWidth: 1,
            borderColor: theme.colors.onSurface,
            borderRadius: 6,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.surface,
              borderRadius: 8,
              padding: 12,
              borderBottomColor: theme.colors.onSurface,
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ color: theme.colors.onSurface, fontWeight: 500 }}>
              Activity
            </Text>
          </View>
        </View>
      </View>
    </ThemeWrapperBg>
  );
};

export default logActivity;
