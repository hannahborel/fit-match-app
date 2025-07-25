import BgView from '@/components/elements/BgView';
import ButtonPrimary from '@/components/elements/ButtonPrimary';
import { useAuth } from '@clerk/clerk-expo';
import React from 'react';
import { Text } from 'react-native';

const accountSettings = () => {
  const { signOut } = useAuth();
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <BgView>
      <ButtonPrimary mode="contained" onPress={handleLogout}>
        <Text>Log Out</Text>
      </ButtonPrimary>
    </BgView>
  );
};

export default accountSettings;
