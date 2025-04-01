import * as React from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';

export default function StyledInput(props: TextInputProps) {
  return (
    <TextInput
      mode="outlined"
      theme={{ roundness: 12 }}
      style={{ borderRadius: 12, height: 60 }}
      {...props}
    />
  );
}
