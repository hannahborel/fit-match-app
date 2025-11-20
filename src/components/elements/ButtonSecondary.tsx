import { Button, ButtonProps, useTheme } from 'react-native-paper';

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
  labelStyle,
  ...otherProps
}) => {
  const theme = useTheme();

  const isDisabled =
    conditions.some((condition) => !condition.isValid) || disabled || loading;

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
          paddingHorizontal: 18,
          paddingVertical: 4,
          borderRadius: 100,

          flexShrink: 1,
        },
        style,
      ]}
      labelStyle={[
        {
          color: isDisabled
            ? theme.colors.onSurfaceDisabled
            : theme.colors.onBackground,
          fontSize: 16,
        },
        labelStyle,
      ]}
    >
      {otherProps.children}
    </Button>
  );
};

export default ButtonSecondary;
