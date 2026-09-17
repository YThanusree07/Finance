import React from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  LayoutChangeEvent,
  ViewStyle,
} from 'react-native';
import { colors, borderRadius } from '../../theme';

interface AmountSliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange: (val: number) => void;
  style?: ViewStyle;
}

export const AmountSlider: React.FC<AmountSliderProps> = ({
  value,
  min = 10,
  max = 500,
  step = 10,
  onValueChange,
  style,
}) => {
  const [sliderWidth, setSliderWidth] = React.useState<number>(0);

  const calculateValueFromPosition = (xPos: number) => {
    if (sliderWidth <= 0) return;
    const clampedX = Math.max(0, Math.min(sliderWidth, xPos));
    const percentage = clampedX / sliderWidth;
    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    const finalValue = Math.max(min, Math.min(max, steppedValue));
    onValueChange(finalValue);
  };

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt: GestureResponderEvent) => {
          calculateValueFromPosition(evt.nativeEvent.locationX);
        },
        onPanResponderMove: (
          evt: GestureResponderEvent,
          _gestureState: PanResponderGestureState
        ) => {
          calculateValueFromPosition(evt.nativeEvent.locationX);
        },
      }),
    [sliderWidth, min, max, step]
  );

  const percentage = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const thumbLeft = Math.max(0, percentage * (sliderWidth - 24));

  const handleLayout = (e: LayoutChangeEvent) => {
    setSliderWidth(e.nativeEvent.layout.width);
  };

  return (
    <View style={[styles.container, style]}>
      <View
        style={styles.trackContainer}
        onLayout={handleLayout}
        {...panResponder.panHandlers}
      >
        {/* Background Track */}
        <View style={styles.trackBg} />

        {/* Active Fill Track */}
        <View
          style={[
            styles.trackFill,
            { width: `${percentage * 100}%` },
          ]}
        />

        {/* Slider Thumb Handle */}
        <View
          style={[
            styles.thumb,
            { transform: [{ translateX: thumbLeft }] },
          ]}
        >
          <View style={styles.thumbInner} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 14,
    justifyContent: 'center',
  },
  trackContainer: {
    height: 32,
    justifyContent: 'center',
    position: 'relative',
  },
  trackBg: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EAECEF',
    width: '100%',
  },
  trackFill: {
    position: 'absolute',
    left: 0,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.lavender,
  },
  thumb: {
    position: 'absolute',
    left: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.lavender,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.lavender,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  thumbInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.lavenderDark,
  },
});
