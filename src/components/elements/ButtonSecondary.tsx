import { Button, ButtonProps, useTheme } from 'react-native-paper';
import { View, Text } from 'react-native';

interface ValidationCondition {
  isValid: boolean;
  errorMessage?: string;
}

interface ButtonSecondaryProps extends ButtonProps {
  conditions?: ValidationCondition[]; // Array of conditions with optional error messages
  loading?: boolean;
  showErrors?: boolean; // Whether to show error messages
}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  conditions = [],
  loading = false,
  style,
  disabled,
  showErrors = false,
  ...otherProps
}) => {
  const theme = useTheme();

  const isDisabled =
    conditions.some((condition) => !condition.isValid) || disabled || loading;
  const failedConditions = conditions.filter(
    (condition) => !condition.isValid && condition.errorMessage,
  );

  return (
    <Button
      {...otherProps}
      disabled={isDisabled}
      loading={loading}
      style={[
        {
          backgroundColor: isDisabled
            ? theme.colors.surfaceDisabled
            : theme.colors.background,
          paddingLeft: 18,
          paddingRight: 18,
          borderRadius: 12,
          width: '100%',
          borderWidth: 1,
          borderColor: theme.colors.primary,
        },
        style,
      ]}
      labelStyle={{
        color: isDisabled
          ? theme.colors.onSurfaceDisabled
          : theme.colors.onSurface,
      }}
    >
      {otherProps.children}
    </Button>
  );
};

export default ButtonSecondary;
