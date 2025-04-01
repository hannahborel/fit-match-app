import * as React from 'react';
import { TextInput, TextInputProps, useTheme } from 'react-native-paper';

const StyledInput: React.FC<TextInputProps> = props => {
  const theme = useTheme();
  return (
    <TextInput
      mode="outlined"
      theme={{ roundness: 12 }}
      outlineColor="transparent"
      style={{
        borderRadius: 12,
        height: 55,
        backgroundColor: theme.colors.surface,
      }}
      {...props}
    />
  );
};

export default StyledInput;
