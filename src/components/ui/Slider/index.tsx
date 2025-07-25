import React, { type FC } from "react";
import type { StyleProp, ViewStyle } from "react-native";

import SliderCommunity from "@react-native-community/slider";

import theme, { cn } from "@/styling";

export interface Props {
  style?: StyleProp<ViewStyle>;
  value: number;
  options: { min: number; max: number; step: number };
  disabled?: boolean;
  onSlidingComplete: (value: number) => void;
}

const Slider: FC<Props> = ({ style, value, options, disabled, onSlidingComplete }) => {
  return (
    <SliderCommunity
      style={cn([style])}
      value={Math.floor(value)}
      minimumValue={Math.floor(options.min)}
      maximumValue={Math.floor(options.max)}
      step={options.step}
      thumbTintColor={theme["secondary-color"]}
      minimumTrackTintColor={theme["secondary-color"]}
      maximumTrackTintColor="#3a3a4a"
      disabled={disabled}
      testID="slider"
      onSlidingComplete={onSlidingComplete}
    />
  );
};

export default Slider;
