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
      backgroundColor: theme.colors.surface,
      borderRadius: 6,
      paddingVertical: 0,
    },
    cardText: {
      color: theme.colors.onSurface,
    },
    cardContent: {
      paddingVertical: 0,
    },
  });
  return (
    <Card style={styles.container}>
      {props.title && (
        <Card.Title titleStyle={styles.cardText} title={props.title} />
      )}
      <Card.Content style={styles.cardContent}>{props.children}</Card.Content>
    </Card>
  );
};

export default CardElement;
