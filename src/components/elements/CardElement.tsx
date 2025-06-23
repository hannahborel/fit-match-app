import { Card, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

type CardElementProps = {
  title: string;
  children: JSX.Element;
};
export const CardElement = (props: CardElementProps) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      margin: 16,
      backgroundColor: theme.colors.surface,
    },
    cardText: {
      color: theme.colors.onSurface,
    },
  });
  return (
    <Card style={styles.container}>
      <Card.Title titleStyle={styles.cardText} title={props.title} />
      <Card.Content>{props.children}</Card.Content>
    </Card>
  );
};

export default CardElement;
