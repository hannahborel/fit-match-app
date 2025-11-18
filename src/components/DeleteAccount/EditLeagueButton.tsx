import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

const EditLeagueButton = () => {
  const handleEditLeague = () => {
    console.log('Edit League');
  };

  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={handleEditLeague}
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
      }}
    >
      <Text style={{ fontWeight: 500, color: theme.colors.secondary }}>
        Edit League
      </Text>
    </TouchableOpacity>
  );
};

export default EditLeagueButton;
