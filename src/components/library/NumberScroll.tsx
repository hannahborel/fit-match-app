import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

interface NumberScrollerProps {
  min: number;
  max: number;
  initial: number;
  onValueChange: (value: number) => void;
  unit: string;
}

const ITEM_WIDTH = 175;
const SCREEN_WIDTH = Dimensions.get('window').width;

export const NumberScroll: React.FC<NumberScrollerProps> = ({
  min,
  max,
  initial,
  unit,
  onValueChange,
}) => {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  const listRef = useRef<FlatList>(null);
  const [selected, setSelected] = useState(initial);

  useEffect(() => {
    setTimeout(() => {
      listRef.current?.scrollToIndex({
        index: initial - min,
        animated: false,
      });
    }, 10);
  }, []);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ITEM_WIDTH);
    const value = numbers[index];
    if (value !== selected) {
      setSelected(value);
      onValueChange(value);
    }
  };
  const renderItem = useCallback(
    ({ item }: { item: number }) => (
      <View style={styles.item}>
        <Text style={[styles.text, item === selected && styles.selected]}>
          {item}
        </Text>
      </View>
    ),
    [selected],
  );
  return (
    <View style={styles.scrollContainer}>
      <FlatList
        ref={listRef}
        data={numbers}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        onMomentumScrollEnd={onScrollEnd}
        keyExtractor={(item) => item.toString()}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        contentContainerStyle={{
          paddingHorizontal: (SCREEN_WIDTH - ITEM_WIDTH) / 2,
        }}
        renderItem={renderItem}
      />
      <Text style={styles.label}>{unit}</Text>
      <View style={styles.centerIndicator} pointerEvents="none" />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },

  item: {
    width: ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
  text: {
    fontSize: 88,
    fontWeight: '900',
    color: 'rgba(255,255,255,0.2)',
  },
  selected: {
    fontSize: 90,
    fontWeight: '900',
    color: '#fff',
  },
  centerIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,

    width: ITEM_WIDTH,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  label: {
    color: 'white',
    fontSize: 20,
  },
});
export default NumberScroll;
