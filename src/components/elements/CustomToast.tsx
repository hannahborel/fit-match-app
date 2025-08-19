import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

interface CustomToastProps {
  type: 'success' | 'error' | 'info';
  text1: string;
  text2?: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ type, text1, text2 }) => {
  const theme = useTheme();

  // Use the teal color from ButtonSecondary
  const tealColor = 'rgba(0, 206, 184, 1)';

  const getToastStyle = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: theme.colors.surface,
          borderLeftColor: tealColor,
          borderLeftWidth: 4,
        };
      case 'error':
        return {
          backgroundColor: theme.colors.surface,
          borderLeftColor: theme.colors.error,
          borderLeftWidth: 4,
        };
      case 'info':
        return {
          backgroundColor: theme.colors.surface,
          borderLeftColor: theme.colors.primary,
          borderLeftWidth: 4,
        };
      default:
        return {
          backgroundColor: theme.colors.surface,
          borderLeftColor: tealColor,
          borderLeftWidth: 4,
        };
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return tealColor;
      case 'error':
        return theme.colors.error;
      case 'info':
        return theme.colors.primary;
      default:
        return tealColor;
    }
  };

  const styles = StyleSheet.create({
    container: {
      ...getToastStyle(),
      padding: 16,
      marginHorizontal: 16,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      minHeight: 60,
      justifyContent: 'center',
    },
    text1: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.onSurface,
      marginBottom: text2 ? 4 : 0,
    },
    text2: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
    },
    iconContainer: {
      position: 'absolute',
      right: 16,
      top: 16,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: getIconColor(),
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
    },
  });

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'info':
        return 'ℹ';
      default:
        return '✓';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{getIcon()}</Text>
      </View>
      <Text style={styles.text1}>{text1}</Text>
      {text2 && <Text style={styles.text2}>{text2}</Text>}
    </View>
  );
};

export default CustomToast;
