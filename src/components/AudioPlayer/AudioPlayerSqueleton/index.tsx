import React, { type FC } from "react";
import { ActivityIndicator, Pressable, type StyleProp, Text, View, type ViewStyle } from "react-native";
import { useUnistyles } from "react-native-unistyles";

import ProgressBar from "@ui/ProgressBar";

import s from "../styles";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const AudioPlayerSkeleton: FC<Props> = ({ style }) => {
  const { theme } = useUnistyles();
  return (
    <View style={[s.container, style]}>
      <View style={s.wrapper}>
        <Text style={s.timer}>00:00</Text>
        <ProgressBar style={s.progressbar} />
        <Text style={s.timer}>00:00</Text>
      </View>
      <Pressable
        style={s.player}
        role="progressbar"
        aria-label="chargement"
        accessibilityRole="progressbar"
        accessibilityLabel="chargement"
        disabled
      >
        <ActivityIndicator size={theme["space-lg"]} color={theme["tertiary-color-text"]} />
      </Pressable>
    </View>
  );
};

export default AudioPlayerSkeleton;
