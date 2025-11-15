import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

type TRowProps = {
  col1: string;
  col2: string;
  lastRow?: boolean;
};
export const Row = ({ col1, col2, lastRow }: TRowProps) => {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 12,
        borderBottomWidth: 1,
        borderColor: lastRow ? 'transparent' : theme.colors.outline,
      }}
    >
      <View style={{ width: '40%' }}>
        <Text style={{ color: theme.colors.onSurface, fontSize: 14 }}>
          {col1}
        </Text>
      </View>
      <View
        style={{
          width: '60%',
          alignItems: 'flex-end',
        }}
      >
        <Text
          style={{
            color: theme.colors.onSurface,
            fontWeight: 500,
            fontSize: 14,
            flexWrap: 'nowrap',
          }}
        >
          {col2}
        </Text>
      </View>
    </View>
  );
};
