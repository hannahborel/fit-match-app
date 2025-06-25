import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Check, X } from 'lucide-react-native';

interface PasswordVerificationProps {
  password: string;
}

const PasswordVerification = ({ password }: PasswordVerificationProps) => {
  const theme = useTheme();

  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const requirements = [
    { label: 'Must have at least 8 characters', met: hasMinLength },
    { label: 'Must have one number', met: hasNumber },
    { label: 'Must have one special character', met: hasSpecialChar },
  ];

  return (
    <View style={{ gap: 8, marginTop: 8 }}>
      {requirements.map((req, index) => (
        <View
          key={index}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
        >
          {req.met ? (
            <Check size={16} color={theme.colors.primary} />
          ) : (
            <X size={16} color={theme.colors.error} />
          )}
          <Text
            style={{
              color: req.met ? theme.colors.primary : theme.colors.error,
            }}
          >
            {req.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default PasswordVerification;
