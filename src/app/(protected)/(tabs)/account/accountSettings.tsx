import DeleteAccountButton from '@/components/DeleteAccountBtn';
import LoadingScreen from '@/components/elements/LoadingScreen';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useTheme } from 'react-native-paper';

const accountSettings = () => {
  const theme = useTheme();
  const [actionInProgress, setActionInProgress] = useState<boolean>(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {actionInProgress ? (
        <LoadingScreen message="Deleting account..." />
      ) : (
        <DeleteAccountButton setActionInProgress={setActionInProgress} />
      )}
    </SafeAreaView>
  );
};

export default accountSettings;
