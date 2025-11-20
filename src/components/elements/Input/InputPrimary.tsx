import * as React from 'react';
import { TextInput, TextInputProps, useTheme } from 'react-native-paper';

export interface InputPrimaryProps extends TextInputProps {
  leftIcon?: string;
  rightIcon?: string | undefined;
}

const InputPrimary: React.FC<InputPrimaryProps> = ({
  leftIcon,
  rightIcon,
  ...props
}) => {
  const theme = useTheme();
  return (
    <TextInput
      activeOutlineColor={'rgba(21, 22, 24, 1)'}
      selectionColor={theme.colors.secondary}
      mode="outlined"
      theme={{ roundness: 12 }}
      outlineColor={'rgba(21, 22, 24, 1)'}
      placeholderTextColor={'rgb(137, 140, 145)'}
      left={
        leftIcon ? <TextInput.Icon icon={leftIcon} color="white" /> : undefined
      }
      right={
        rightIcon ? (
          <TextInput.Icon
            size={20}
            icon={rightIcon}
            color={theme.colors.secondary}
          />
        ) : undefined
      }
      {...props}
      style={[
        {
          width: '100%',
          borderRadius: 12,
          backgroundColor: theme.colors.surface,
          height: 40,
          fontSize: 16,
        },
        props.style,
      ]}
      contentStyle={[
        leftIcon && { paddingLeft: 0 },
        rightIcon && { paddingRight: 0 },
      ]}
    />
  );
};

export default InputPrimary;
