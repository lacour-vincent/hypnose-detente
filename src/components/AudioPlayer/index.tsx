import React, { type FC, useState } from "react";
import { Pressable, type StyleProp, View, type ViewStyle } from "react-native";

import Icon from "@ui/Icon";

import theme, { cn } from "@/styling";

import s from "./styles";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const AudioPlayer: FC<Props> = ({ style }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const label = isPlaying ? "Pause" : "Lecture";
  const icon = isPlaying ? "pause" : "play";
  const onPress = () => setIsPlaying((prev) => !prev);
  return (
    <View style={cn([s.container, style])}>
      <Pressable
        style={s.player}
        role="button"
        aria-label={label}
        accessibilityRole="button"
        accessibilityLabel={label}
        android_ripple={{ radius: theme["space-lg"] }}
        onPress={onPress}
      >
        <Icon name={icon} size={theme["space-lg"]} color={theme["tertiary-color-text"]} />
      </Pressable>
    </View>
  );
};

export default AudioPlayer;
