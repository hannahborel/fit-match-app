import { View, Text } from 'react-native';
import React from 'react';
import ButtonPrimary from '../elements/ButtonPrimary';
import { useAuth } from '@clerk/clerk-expo';
import { Button } from 'react-native-paper';

const LogoutButton = () => {
  const { signOut } = useAuth();
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <Button mode="outlined" style={{ borderRadius: 8 }} onPress={handleLogout}>
      <Text>Log Out</Text>
    </Button>
  );
};

export default LogoutButton;
