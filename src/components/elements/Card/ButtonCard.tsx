import { TouchableOpacity, ViewStyle } from 'react-native';
import { BaseCard } from './BaseCard';
import { useTheme } from 'react-native-paper';
import { JSX } from 'react';

type ButtonCardProps = React.ComponentProps<typeof BaseCard> & {
  onPress: () => void;
  children: (JSX.Element | null)[];
  spacing: number;
};

export const ButtonCard = ({ spacing, onPress, children }: ButtonCardProps) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={{
        borderRadius: 6,
        padding: 12,
        backgroundColor: theme.colors.surface,
        gap: spacing,
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {children}
    </TouchableOpacity>
  );
};
