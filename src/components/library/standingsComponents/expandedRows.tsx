import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Dispatch } from 'react';
import { Avatar, MD3Theme, useTheme } from 'react-native-paper';
import { SetStateAction } from 'jotai';
import { getAvatarByIndex } from '@/assets/avatar';

type expandedRowsProps = {
  player: any;
  setIsExpanded: React.Dispatch<React.SetStateAction<Set<number>>>;
  isExpanded: boolean;
  index: number;
};
const ExpandedRows = ({
  player,
  setIsExpanded,
  isExpanded,
  index,
}: expandedRowsProps) => {
  const theme = useTheme();

  const toggleExpanded = (index: number) => {
    setIsExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index); // Collapse if open
      } else {
        next.add(index); // Expand if closed
      }
      return next;
    });
  };

  const styles = getStyles(theme);
  return (
    <TouchableOpacity
      key={index}
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: 6,
      }}
      onPress={() => toggleExpanded(index)}
    >
      <View style={styles.listItem}>
        <View style={styles.listItem_left}>
          <Avatar.Image size={40} source={getAvatarByIndex(index)} />
          <Text style={styles.text_characters}>Johnny</Text>
        </View>

        <Text style={styles.text_numbers}>{player.totalPoints}</Text>
      </View>
      {isExpanded && (
        <>
          <View style={styles.listItem}>
            <View style={styles.listItem_left}>
              <View style={{ width: 40, height: 40 }} />
              <Text style={styles.text_characters}>STRENGTH</Text>
            </View>
            <Text style={styles.text_numbers}>{player.strengthPoints}</Text>
          </View>
          <View style={styles.listItem}>
            <View style={styles.listItem_left}>
              <View style={{ width: 40, height: 40 }} />
              <Text style={styles.text_characters}>CARDIO</Text>
            </View>
            <Text style={styles.text_numbers}>{player.cardioPoints}</Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

export default ExpandedRows;

const getStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    listItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: theme.colors.onSurface,
      borderBottomColor: 'rgba(51, 60, 78, 0.53)',
      borderBottomWidth: 1,
      padding: 8,
      paddingHorizontal: 16,
    },
    text_characters: {
      color: theme.colors.onSurface,
      fontWeight: 500,
      fontSize: 16,
      letterSpacing: 0,
    },
    text_numbers: {
      color: theme.colors.onSurface,
      fontSize: 18,
      fontWeight: 600,
    },
    listItem_left: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
    },
  });
