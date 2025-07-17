import { Card, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { JSX } from 'react';

type BaseCardProps = {
  title?: string;
  children: JSX.Element;
};
export const BaseCard = (props: BaseCardProps) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: 6,
      paddingVertical: 8,
    },
    cardText: {
      color: theme.colors.onSurface,
    },
    cardContent: {},
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
