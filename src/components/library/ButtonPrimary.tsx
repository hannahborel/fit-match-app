import { Button, ButtonProps, useTheme } from "react-native-paper";

const ButtonPrimary:React.FC<ButtonProps> =props => {
  const theme = useTheme();
  return <Button {...props} style={{ backgroundColor: theme.colors.primary, paddingLeft:18, paddingRight:18, borderRadius:12, width: '100%'}} labelStyle={{ color: theme.colors.onPrimary}}>{props.children}</Button>;
};

export default ButtonPrimary;
