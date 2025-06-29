import { Text } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

const SectionHeader = ({ text }: { text: string }) => {
  const theme = useTheme();
  return (
    <Text
      style={{
        color: theme.colors.onSurfaceVariant,
        letterSpacing: 0.75,
        fontSize: 14,
        fontWeight: 500,
        paddingVertical: 8,
        marginLeft: 8,
      }}
    >
      {text}
    </Text>
  );
};

export default SectionHeader;
