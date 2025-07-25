import { View, Text } from 'react-native';
import React from 'react';
import ButtonPrimary from '../elements/ButtonPrimary';
import { useAuth } from '@clerk/clerk-expo';

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
    <ButtonPrimary mode="contained" onPress={handleLogout}>
      <Text>Log Out</Text>
    </ButtonPrimary>
  );
};

export default LogoutButton;
