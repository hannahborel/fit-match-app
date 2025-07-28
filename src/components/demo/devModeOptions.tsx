// components/library/SpeedDial.tsx
import { useAuth } from '@clerk/clerk-expo';
import { Settings, SquareArrowLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import { FAB, Portal, useTheme } from 'react-native-paper';

const SpeedDial = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const { signOut } = useAuth();
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <Portal>
      <FAB.Group
        fabStyle={{
          backgroundColor: theme.colors.primary,
        }}
        style={{ position: 'absolute', bottom: 16, right: 16 }}
        open={open}
        visible
        icon={() => <Settings color={theme.colors.onSurface} />}
        actions={[
          {
            style: { backgroundColor: theme.colors.primary },
            icon: () => <SquareArrowLeft color={theme.colors.onSurface} />,
            label: 'Log Out',
            onPress: () => handleLogout(),
          },
        ]}
        onStateChange={({ open }) => setOpen(open)}
        onPress={() => {
          if (open) {
            // Optional: handle tap when open
          }
        }}
      />
    </Portal>
  );
};

export default SpeedDial;
