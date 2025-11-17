import { getAvatarByIndex } from '@/assets/avatar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, MD3Theme, useTheme } from 'react-native-paper';

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
  const isPlaceholder = player.isPlaceholder || false;

  const toggleExpanded = (index: number) => {
    // Don't allow expanding placeholders
    if (isPlaceholder) return;

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
  const styles = getStyles(theme, isPlaceholder, isExpanded);
  return (
    <TouchableOpacity
      disabled={isPlaceholder}
      activeOpacity={1}
      onPress={() => toggleExpanded(index)}
      key={index}
      style={{
        backgroundColor: isPlaceholder
          ? theme.colors.surface
          : theme.colors.surface,
        borderRadius: 6,
        opacity: isPlaceholder ? 1 : 1,
      }}
    >
      <View>
        <View style={styles.listItem}>
          <View style={styles.listItem_left}>
            <Avatar.Image
              size={30}
              source={getAvatarByIndex(index)}
              style={{ opacity: isPlaceholder ? 0.4 : 1 }}
            />
            <Text style={styles.text_characters}>
              {player.firstName}
              {isPlaceholder && ' (Waiting)'}
            </Text>
          </View>
          <Text style={styles.text_numbers}>{player.totalPoints}</Text>
        </View>
        {isExpanded && !isPlaceholder && (
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
      </View>
    </TouchableOpacity>
  );
};

export default ExpandedRows;

const getStyles = (
  theme: MD3Theme,
  isPlaceholder: boolean,
  isExpanded: boolean,
) =>
  StyleSheet.create({
    listItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: theme.colors.onSurface,
      borderBottomColor: isExpanded ? 'rgba(66, 71, 81, 0.53)' : 'transparent',
      borderBottomWidth: 1,
      padding: 8,
      paddingHorizontal: 16,
    },
    text_characters: {
      color: isPlaceholder
        ? theme.colors.onSurfaceDisabled
        : theme.colors.onSurface,
      fontWeight: 500,
      fontSize: 16,
      letterSpacing: 0,
      fontStyle: isPlaceholder ? 'italic' : 'normal',
    },
    text_numbers: {
      color: isPlaceholder
        ? theme.colors.onSurfaceDisabled
        : theme.colors.onSurface,
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
