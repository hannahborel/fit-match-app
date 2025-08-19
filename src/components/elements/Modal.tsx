import React, { useEffect, useRef } from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { X } from 'lucide-react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  description,
  children,
  showCloseButton = true,
}) => {
  const theme = useTheme();
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      // Animate from bottom to center with smooth, controlled movement
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }).start();
    } else {
      // Reset animation value
      slideAnim.setValue(300);
    }
  }, [visible, slideAnim]);

  const styles = getStyles(theme);

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <Animated.View
              style={[
                styles.modalContent,
                {
                  transform: [{ translateY: slideAnim }],
                  opacity: 1, // Ensure full opacity
                },
              ]}
            >
              {showCloseButton && (
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={onClose}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <X size={20} color={theme.colors.onSurfaceVariant} />
                </TouchableOpacity>
              )}

              <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                {description && (
                  <Text style={styles.description}>{description}</Text>
                )}
              </View>

              <View style={styles.content}>{children}</View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modalContent: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      padding: 24,
      width: '100%',
      maxWidth: 400,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    closeButton: {
      position: 'absolute',
      top: 16,
      right: 16,
      zIndex: 1,
    },
    header: {
      alignItems: 'center',
      marginBottom: 24,
      marginTop: 8,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.onSurface,
      textAlign: 'center',
      marginBottom: 8,
    },
    description: {
      fontSize: 16,
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
      lineHeight: 22,
    },
    content: {
      width: '100%',
      alignItems: 'center',
    },
  });

export default Modal;
