import * as React from 'react';
import { TextInput, TextInputProps, useTheme } from 'react-native-paper';

const InputPrimary: React.FC<TextInputProps> = (props) => {
  const theme = useTheme();
  return (
    <TextInput
      mode="outlined"
      theme={{ roundness: 12 }}
      outlineColor={theme.colors.surface}
      style={{
        width: '100%',
        borderRadius: 12,
        backgroundColor: theme.colors.background,
        height: 52,
      }}
      {...props}
    />
  );
};

export default InputPrimary;
