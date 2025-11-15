import {
  ActivityIndicator,
  Button,
  ButtonProps,
  useTheme,
} from 'react-native-paper';
import { View, Text } from 'react-native';

interface ValidationCondition {
  isValid: boolean;
  errorMessage?: string;
}

interface ButtonPrimaryProps extends ButtonProps {
  conditions?: ValidationCondition[]; // Array of conditions with optional error messages
  loading?: boolean;
  showErrors?: boolean; // Whether to show error messages
  replaceTextWithSpinner?: boolean; // When true, hides label and shows spinner while loading
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  conditions = [],
  loading = false,
  style,
  disabled,
  showErrors = false,
  replaceTextWithSpinner = false,
  ...otherProps
}) => {
  const theme = useTheme();

  const isDisabled =
    conditions.some((condition) => !condition.isValid) || disabled || loading;
  const failedConditions = conditions.filter(
    (condition) => !condition.isValid && condition.errorMessage,
  );
  const isDisabledWithoutLoading =
    conditions.some((condition) => !condition.isValid) || disabled;
  const labelColor = isDisabledWithoutLoading
    ? theme.colors.onSurfaceDisabled
    : theme.colors.onPrimary;
  const shouldShowSpinnerOnly = Boolean(loading && replaceTextWithSpinner);
  const buttonLoading = Boolean(loading && !replaceTextWithSpinner);

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
      labelStyle={{
        color: labelColor,
        fontSize: 16,
      }}
    >
      {shouldShowSpinnerOnly ? (
        <ActivityIndicator color={labelColor} size="small" />
      ) : (
        otherProps.children
      )}
    </Button>
  );
};

export default ButtonPrimary;
