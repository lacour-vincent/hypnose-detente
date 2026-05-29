import React, { type ComponentProps, type FC } from "react";
import type { StyleProp, ViewStyle } from "react-native";

import MaterialIcons from "@react-native-vector-icons/material-design-icons";

export interface Props extends ComponentProps<typeof MaterialIcons> {
  style?: StyleProp<ViewStyle>;
}

const Icon: FC<Props> = ({ style, name, size, color }) => {
  return <MaterialIcons style={style} name={name} size={size} color={color} testID={name} />;
};

export default Icon;
