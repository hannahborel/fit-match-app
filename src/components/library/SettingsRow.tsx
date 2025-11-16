import React from 'react';
import { TouchableOpacity, View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

type SettingsRowProps = {
  label: string;
  value: string | number;
  onPress: () => void;
  isActive?: boolean;
  style?: ViewStyle;
};

const SettingsRow = ({
  label,
  value,
  onPress,
  isActive = false,
  style,
}: SettingsRowProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderBottomWidth: 1,
          borderColor: theme.colors.outline,
        },
        style,
      ]}
    >
      <View style={styles.labelContainer}>
        <Text style={{ color: theme.colors.onSurface, fontSize: 14 }}>
          {label}
        </Text>
      </View>
      <View style={styles.valueContainer}>
        <Text
          style={{
            color: isActive ? theme.colors.secondary : theme.colors.onSurface,
            fontWeight: 700,
            fontSize: 14,
            flexWrap: 'nowrap',
          }}
        >
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  labelContainer: {
    width: '40%',
  },
  valueContainer: {
    width: '60%',
    alignItems: 'flex-end',
  },
});

export default SettingsRow;
