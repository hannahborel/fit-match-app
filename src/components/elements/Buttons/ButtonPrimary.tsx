import {
  ActivityIndicator,
  Button,
  ButtonProps,
  useTheme,
} from 'react-native-paper';
import { View, Text } from 'react-native';
import { useEffect, useState, useRef } from 'react';

interface ValidationCondition {
  isValid: boolean;
  errorMessage?: string;
}

interface ButtonPrimaryProps extends ButtonProps {
  conditions?: ValidationCondition[]; // Array of conditions with optional error messages
  loading?: boolean;
  showErrors?: boolean; // Whether to show error messages
  replaceTextWithSpinner?: boolean; // When true, hides label and shows spinner while loading
  minLoadingDuration?: number; // Minimum loading duration in milliseconds (default: 3000ms)
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  conditions = [],
  loading = false,
  style,
  disabled,
  showErrors = false,
  replaceTextWithSpinner = false,
  minLoadingDuration = 3000,
  labelStyle,
  ...otherProps
}) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const loadingStartTimeRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle minimum loading duration
  useEffect(() => {
    if (loading && !isLoading) {
      // Loading just started
      setIsLoading(true);
      loadingStartTimeRef.current = Date.now();
    } else if (!loading && isLoading) {
      // Loading just finished - enforce minimum duration
      const startTime = loadingStartTimeRef.current;
      if (startTime !== null) {
        const elapsed = Date.now() - startTime;
        const remaining = minLoadingDuration - elapsed;

        if (remaining > 0) {
          timerRef.current = setTimeout(() => {
            setIsLoading(false);
            loadingStartTimeRef.current = null;
          }, remaining);
        } else {
          setIsLoading(false);
          loadingStartTimeRef.current = null;
        }
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [loading, isLoading, minLoadingDuration]);

  const isDisabled =
    conditions.some((condition) => !condition.isValid) || disabled || isLoading;
  const failedConditions = conditions.filter(
    (condition) => !condition.isValid && condition.errorMessage,
  );
  const isDisabledWithoutLoading =
    conditions.some((condition) => !condition.isValid) || disabled;
  const labelColor = isDisabledWithoutLoading
    ? theme.colors.onSurfaceDisabled
    : theme.colors.onPrimary;
  const shouldShowSpinnerOnly = Boolean(isLoading && replaceTextWithSpinner);
  const buttonLoading = Boolean(isLoading && !replaceTextWithSpinner);

  return (
    <Button
      {...otherProps}
      disabled={isDisabled}
      loading={buttonLoading}
      style={[
        {
          backgroundColor: isDisabledWithoutLoading
            ? theme.colors.surfaceDisabled
            : theme.colors.primary,
          paddingHorizontal: 18,
          paddingVertical: 4,
          borderRadius: 100,
          marginHorizontal: 24,
          flexShrink: 1,
        },
        style,
      ]}
      labelStyle={[
        {
          color: labelColor,
          fontSize: 16,
        },
        labelStyle,
      ]}
    >
      {shouldShowSpinnerOnly ? (
        <ActivityIndicator color={labelColor} size={20} />
      ) : (
        otherProps.children
      )}
    </Button>
  );
};

export default ButtonPrimary;
