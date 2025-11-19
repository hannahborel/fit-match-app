import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Text, useTheme, Portal } from 'react-native-paper';
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  X as XCircle,
} from 'lucide-react-native';

type SnackbarType = 'success' | 'error' | 'warning' | 'info';

interface SnackbarProps {
  visible: boolean;
  type: SnackbarType;
  title: string;
  text?: string;
  actions?: Array<{
    label: string;
    onPress: () => void;
  }>;
  onDismiss?: () => void;
  duration?: number; // Auto-dismiss duration in ms, default 3000
  position?: 'top' | 'bottom'; // Position on screen, default 'top'
}

const Snackbar: React.FC<SnackbarProps> = ({
  visible,
  type,
  title,
  text,
  actions,
  onDismiss,
  duration = 4000,
  position = 'top',
}) => {
  const theme = useTheme();
  const opacity = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      if (duration > 0) {
        const timer = setTimeout(() => {
          handleDismiss();
        }, duration);
        return () => clearTimeout(timer);
      }
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, duration, position]);

  const handleDismiss = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onDismiss?.();
    });
  };

  const getIcon = () => {
    const iconSize = 20;
    const iconProps = { size: iconSize, strokeWidth: 2 };

    switch (type) {
      case 'success':
        return <CheckCircle2 {...iconProps} color="#4CAF50" />;
      case 'error':
        return <XCircle {...iconProps} color="#F44336" />;
      case 'warning':
        return <AlertTriangle {...iconProps} color="#FFC107" />;
      case 'info':
        return <AlertCircle {...iconProps} color="#2196F3" />;
    }
  };

  const styles = getStyles(theme, position);

  if (!visible) return null;

  return (
    <Portal>
      <Animated.View
        style={[
          styles.wrapper,
          {
            opacity,
          },
        ]}
      >
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={styles.iconContainer}>{getIcon()}</View>

            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              {text && <Text style={styles.text}>{text}</Text>}

              {actions && actions.length > 0 && (
                <View style={styles.actionsContainer}>
                  {actions.map((action, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={action.onPress}
                      style={styles.actionButton}
                    >
                      <Text style={styles.actionText}>{action.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      </Animated.View>
    </Portal>
  );
};

const getStyles = (theme: any, position: 'top' | 'bottom') =>
  StyleSheet.create({
    wrapper: {
      position: 'absolute',
      left: 0,
      right: 0,
      ...(position === 'top' ? { top: 50 } : { bottom: 110 }),
      zIndex: 1000,
    },
    container: {
      backgroundColor: 'rgb(12, 14, 20)',

      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.9,
      shadowRadius: 8,
      elevation: 8,
      marginHorizontal: 8,
    },
    iconContainer: {},

    textContainer: {
      justifyContent: 'center',
      width: '80%',
    },
    title: {
      fontSize: 12,
      fontWeight: '700',
      color: theme.colors.onSurface,
    },
    text: {
      fontSize: 12,
      fontWeight: '500',
      color: theme.colors.onSurface,
      opacity: 0.9,
    },
    actionsContainer: {
      flexDirection: 'row',
      marginTop: 16,
      gap: 16,
    },
    actionButton: {},
    actionText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.onSurface,
    },
    closeButton: {
      justifyContent: 'center',
    },
  });

export default Snackbar;
