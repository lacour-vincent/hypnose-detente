import React, { type FC } from "react";
import type { StyleProp, ViewStyle } from "react-native";

// @ts-expect-error: The library do not export types from now.
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { cn } from "@/styling";

interface Props {
  style?: StyleProp<ViewStyle>;
  name: string;
  size?: number;
  color?: string;
}

const Icon: FC<Props> = ({ style, name, size, color }) => {
  return <MaterialCommunityIcons style={cn([style])} name={name} size={size} color={color} />;
};

export default Icon;
