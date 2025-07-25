import BgView from '@/components/elements/BgView';
import ButtonPrimary from '@/components/elements/ButtonPrimary';
import LogoutButton from '@/components/library/LogoutButton';
import { useAuth } from '@clerk/clerk-expo';
import React from 'react';
import { Text } from 'react-native';

const accountSettings = () => {
  return (
    <BgView>
      <LogoutButton />
    </BgView>
  );
};

export default accountSettings;
