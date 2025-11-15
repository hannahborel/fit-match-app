import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { Modal, Portal, IconButton, useTheme, Text } from 'react-native-paper';
import { X } from 'lucide-react-native';

type BottomSheetSize = 'sm' | 'md' | 'lg';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showDragHandle?: boolean;
  size?: BottomSheetSize;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
  title,
  showDragHandle = false,
  size = 'md',
}) => {
  const theme = useTheme();
  const screenHeight = Dimensions.get('window').height;
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;

  const getHeight = () => {
    switch (size) {
      case 'lg':
        return screenHeight * 0.89; // Full screen minus 20px from top
      case 'md':
        return screenHeight / 2; // Half screen
      case 'sm':
        return screenHeight / 3; // One third screen
      default:
        return screenHeight / 2;
    }
  };

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 40,
        stiffness: 220,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim, screenHeight]);

  const styles = getStyles(theme, getHeight());

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        style={styles.modal}
        contentContainerStyle={{ backgroundColor: 'transparent' }}
      >
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.sheetContent}>
            {/* Drag handle indicator */}
            {showDragHandle && <View style={styles.dragHandle} />}

            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'center',
                marginTop: 8,
                marginBottom: 12,
              }}
            >
              <X
                style={styles.closeButton}
                size={24}
                color="white"
                onPress={onClose}
              />
              {title && (
                <View>
                  <Text style={styles.headerText}>{title}</Text>
                </View>
              )}
            </View>

            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          </View>
        </Animated.View>
      </Modal>
    </Portal>
  );
};

const getStyles = (theme: any, height: number) =>
  StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalContent: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: height,
    },
    sheetContent: {
      paddingTop: 8,
      paddingHorizontal: 8,
      paddingBottom: 24,
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    headerText: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    dragHandle: {
      width: 40,
      height: 4,
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 2,
      alignSelf: 'center',
      marginBottom: 16,
    },
    closeButton: {
      position: 'absolute',
      left: 8,
      top: 0,
    },
    scrollView: {
      marginTop: 8,
      flex: 1,
    },
  });

export default BottomSheet;
