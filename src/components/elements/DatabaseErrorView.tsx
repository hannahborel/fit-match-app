import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { WifiOff } from 'lucide-react-native';

interface DatabaseErrorViewProps {
  error: Error;
  onRetry: () => void;
}

const DatabaseErrorView: React.FC<DatabaseErrorViewProps> = ({
  error,
  onRetry,
}) => {
  const theme = useTheme();

  const isNetworkError =
    error.message.includes('Failed to fetch') ||
    error.message.includes('Network request failed') ||
    error.message.includes('timeout') ||
    error.message.includes('AbortError');

  const getErrorMessage = () => {
    if (isNetworkError) {
      return 'Unable to connect to the server. Please check your internet connection and try again.';
    }
    return 'We are a connection issue. Check your internet connection and try again.';
  };

  const getErrorTitle = () => {
    if (isNetworkError) {
      return 'Connection Error';
    }
    return 'Service Unavailable';
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.iconContainer}>
        <WifiOff size={64} color={theme.colors.error} />
      </View>

      <Text
        variant="headlineSmall"
        style={[styles.title, { color: theme.colors.onBackground }]}
      >
        {getErrorTitle()}
      </Text>

      <Text
        variant="bodyMedium"
        style={[styles.message, { color: theme.colors.onSurfaceVariant }]}
      >
        {getErrorMessage()}
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={onRetry}
          style={styles.retryButton}
          buttonColor={theme.colors.primary}
        >
          Try Again
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
  },
  message: {
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
    maxWidth: 300,
  },
  buttonContainer: {
    marginBottom: 24,
    width: '100%',
    maxWidth: 300,
  },
  retryButton: {
    width: '100%',
  },
  helpText: {
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 18,
  },
});

export default DatabaseErrorView;
