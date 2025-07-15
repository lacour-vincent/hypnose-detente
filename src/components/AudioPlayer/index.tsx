import React, { type FC, useState } from "react";
import { Pressable, type StyleProp, Text, View, type ViewStyle } from "react-native";

import Icon from "@ui/Icon";
import Slider from "@ui/Slider";

import theme, { cn } from "@/styling";

import s from "./styles";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const AudioPlayer: FC<Props> = ({ style }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayerReady = true;
  const label = isPlaying ? "Pause" : "Lecture";
  const icon = isPlaying ? "pause" : "play";
  const onPress = () => setIsPlaying((prev) => !prev);
  const onSliderChange = () => true;
  return (
    <View style={cn([s.container, style])}>
      {isPlayerReady && (
        <View style={s.wrapper}>
          <Text style={s.timer}>00:00</Text>
          <Slider style={s.slider} value={50} options={{ min: 0, max: 100, step: 1 }} onChange={onSliderChange} />
          <Text style={s.timer}>18:30</Text>
        </View>
      )}
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
