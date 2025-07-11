import React, { type FC } from "react";
import { Text, View } from "react-native";

import type { Sample } from "@sg/typings/recording";

import s from "./styles";

interface Props {
  sample: Sample;
}

const SampleItem: FC<Props> = ({ sample }) => {
  return (
    <View style={s.container}>
      <Text style={s.title}>{sample.title}</Text>
      <Text style={s.sentAt}>{sample.duration}</Text>
    </View>
  );
};
export default SampleItem;
