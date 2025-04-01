import { MD3LightTheme } from 'react-native-paper';

const theme = {
  // Component specific overrides
  components: {
    TextInput: {
      outlineStyle: { borderRadius: 50 },
      defaultProps: {
        mode: 'outlined',
      },
      variants: {
        default: {
          style: {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
};

export default theme;
