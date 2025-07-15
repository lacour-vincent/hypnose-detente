import React, { type FC } from "react";
import type { StyleProp, ViewStyle } from "react-native";

import SliderCommunity from "@react-native-community/slider";

import theme, { cn } from "@/styling";

export interface Props {
  style?: StyleProp<ViewStyle>;
  value: number;
  options: { min: number; max: number; step: number };
  onChange: (value: number) => void;
}

const Slider: FC<Props> = ({ style, value, options, onChange }) => {
  return (
    <SliderCommunity
      style={cn([style])}
      value={value}
      minimumValue={options.min}
      maximumValue={options.max}
      step={options.step}
      thumbTintColor={theme["secondary-color"]}
      minimumTrackTintColor={theme["secondary-color"]}
      maximumTrackTintColor="#3a3a4a"
      testID="slider"
      onSlidingComplete={onChange}
    />
  );
};

export default Slider;
