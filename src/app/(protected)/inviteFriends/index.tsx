import { View, Text } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

const inviteFriends = () => {
  const theme = useTheme();
  return (
    <View>
      <Text style={{ color: theme.colors.onSurface }}>Invite Friends</Text>
    </View>
  );
};

export default inviteFriends;
