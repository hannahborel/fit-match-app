import { MD3LightTheme } from 'react-native-paper';
import { themeColors } from '../constants/Colors';

const theme = {
  ...MD3LightTheme,
  colors: themeColors.light,
  // Component specific overrides
  components: {
    TextInput: {
      outlineStyle: { borderRadius: 50 },
      defaultProps: {
        mode: 'outlined',
      },
      variants: {
        outlined: {
          colors: {
            background: 'transparent',
          },
          outlineColor: 'rgba(58, 70, 91, 1)',
        },
      },
    },
  },
};

export default theme;
