import React, { type FC } from "react";
import { type StyleProp, Text, View, type ViewStyle } from "react-native";
import { useUnistyles } from "react-native-unistyles";

import type { Sample } from "@/typings/recording";

import { SAMPLE_THUMBNAILS } from "@/referential/thumbnails";

import Icon from "@ui/Icon";
import Image from "@ui/Image";

import s from "./styles";

interface Props {
  style?: StyleProp<ViewStyle>;
  sample: Sample;
  offline: boolean;
}

const SampleItem: FC<Props> = ({ style, sample, offline }) => {
  const { theme } = useUnistyles();
  const url = SAMPLE_THUMBNAILS[sample.rid];
  const alt = `Vignette - ${sample.label}`;
  return (
    <View style={[s.container, style]}>
      <Image style={s.thumbnail} src={url} alt={alt} />
      <View style={s.wrapper}>
        <Text style={s.title} numberOfLines={1}>
          {sample.title}
        </Text>
        <View style={s.row}>
          <Icon name="clock-outline" size={theme["font-size-sm"]} color={theme["font-secondary-color"]} />
          <Text style={s.duration}>{sample.duration} min</Text>
          {offline && (
            <Icon
              style={s.offline}
              name="airplane"
              size={theme["font-size-sm"]}
              color={theme["font-secondary-color"]}
            />
          )}
        </View>
      </View>
    </View>
  );
};
export default SampleItem;
