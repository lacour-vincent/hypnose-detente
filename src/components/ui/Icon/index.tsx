import React, { type ComponentProps, type FC } from "react";
import type { StyleProp, ViewStyle } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { cn } from "@/styling";

export interface Props extends ComponentProps<typeof MaterialCommunityIcons> {
  style?: StyleProp<ViewStyle>;
}

const Icon: FC<Props> = ({ style, name, size, color }) => {
  return <MaterialCommunityIcons style={cn([style])} name={name} size={size} color={color} testID={name} />;
};

export default Icon;
