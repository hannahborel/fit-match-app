import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, useTheme } from 'react-native-paper';

interface ConfirmationModalProps {
  visible: boolean;
  message: string;
  onDismiss: () => void;
  duration?: number; // Duration in milliseconds, default 2000ms
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  message,
  onDismiss,
  duration = 2000,
}) => {
  const theme = useTheme();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, onDismiss]);

  const styles = getStyles(theme);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContent}
      >
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      </Modal>
    </Portal>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    modalContent: {
      backgroundColor: theme.colors.surface,
      padding: 24,
      marginHorizontal: 32,
      borderRadius: 12,
      alignItems: 'center',
    },
    messageContainer: {
      alignItems: 'center',
    },
    messageText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.onSurface,
      textAlign: 'center',
    },
  });

export default ConfirmationModal;
