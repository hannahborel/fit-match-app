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
}

const ITEM_WIDTH = 175;
const SCREEN_WIDTH = Dimensions.get('window').width;

export const NumberScroll: React.FC<NumberScrollerProps> = ({
  min,
  max,
  initial,
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
    <View style={styles.container}>
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

      <View style={styles.centerIndicator} pointerEvents="none" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    position: 'relative',
  },
  item: {
    width: ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
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
    left: SCREEN_WIDTH / 2 - ITEM_WIDTH / 2,
    width: ITEM_WIDTH,

    borderColor: 'rgba(255,255,255,0.2)',
  },
});
export default NumberScroll;
