import { TouchableOpacity } from 'react-native';
import { BaseCard } from './BaseCard';
import { useTheme } from 'react-native-paper';

type ButtonCardProps = React.ComponentProps<typeof BaseCard> & {
  onPress: () => void;

  children: JSX.Element;
};

export const ButtonCard = ({ onPress, children }: ButtonCardProps) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={{
        borderRadius: 6,
        padding: 12,
        backgroundColor: theme.colors.surface,
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {children}
    </TouchableOpacity>
  );
};
