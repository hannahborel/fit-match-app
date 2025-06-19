import * as React from 'react';
import { TextInput, TextInputProps, useTheme } from 'react-native-paper';

const InputPrimary: React.FC<TextInputProps> = props => {
  const theme = useTheme();
  return (
    <TextInput
      mode="outlined"
      theme={{ roundness: 12 }}
      outlineColor="transparent"
      style={{
        borderRadius: 12,
        backgroundColor: theme.colors.surface,
        width: 297,
        height: 45,
      }}
      {...props}
    />
  );
};

export default InputPrimary;
