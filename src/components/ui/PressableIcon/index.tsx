import React, { type FC } from "react";
import { Pressable, type StyleProp, type ViewStyle } from "react-native";

import Icon, { type Props as IconProps } from "@ui/Icon";

import theme, { cn } from "@/styling";

import s from "./styles";

interface Props {
  style?: StyleProp<ViewStyle>;
  label: string;
  icon: IconProps["name"];
  onPress: () => void;
}

const PressableIcon: FC<Props> = ({ style, label, icon, onPress }) => {
  return (
    <Pressable
      style={cn([style, s.pressable])}
      role="button"
      aria-label={label}
      accessibilityRole="button"
      accessibilityLabel={label}
      android_ripple={{ radius: theme["space-md"], borderless: true, foreground: true }}
      onPress={onPress}
    >
      <Icon name={icon} size={24} color={theme["primary-color-text"]} />
    </Pressable>
  );
};

export default PressableIcon;
