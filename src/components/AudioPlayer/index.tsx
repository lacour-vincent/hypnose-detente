import React, { type FC } from "react";
import { Pressable, type StyleProp, Text, View, type ViewStyle } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { PlayerStatus } from "@/typings/player";

import { pause, play, seekTo } from "@/store/actions/player";
import { getPlayer } from "@/store/selectors/player";

import { formatAudioTime } from "@/utils/formatter";

import Icon from "@ui/Icon";
import Slider from "@ui/Slider";

import theme, { cn } from "@/styling";

import s from "./styles";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const AudioPlayer: FC<Props> = ({ style }) => {
  const dispatch = useDispatch();
  const { status, isPlaying, position, duration } = useSelector(getPlayer);
  const isPlayerReady = status === PlayerStatus.READY;
  const label = isPlaying ? "Pause" : "Lecture";
  const icon = isPlaying ? "pause" : "play";

  const onPress = () => {
    const action = isPlaying ? pause : play;
    return dispatch(action());
  };

  const onSlidingComplete = (position: number) => {
    return dispatch(seekTo({ position }));
  };

  return (
    <View style={cn([s.container, style])}>
      <View style={s.wrapper}>
        <Text style={cn([s.timer], [[s["time--hidden"], !isPlayerReady]])}>{formatAudioTime(position)}</Text>
        <Slider
          style={s.slider}
          value={position}
          options={{ min: 0, max: duration, step: 1 }}
          disabled={!isPlayerReady}
          onSlidingComplete={onSlidingComplete}
        />
        <Text style={cn([s.timer], [[s["time--hidden"], !isPlayerReady]])}>{formatAudioTime(duration)}</Text>
      </View>
      <Pressable
        style={s.player}
        role="button"
        aria-label={label}
        accessibilityRole="button"
        accessibilityLabel={label}
        android_ripple={{ radius: 0.5 * (theme["space-lg"] + 2 * theme["space-md"]) }}
        disabled={!isPlayerReady}
        onPress={onPress}
      >
        <Icon name={icon} size={theme["space-lg"]} color={theme["tertiary-color-text"]} />
      </Pressable>
    </View>
  );
};

export default AudioPlayer;
