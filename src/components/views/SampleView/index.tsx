import React, { type FC } from "react";
import { Text, View } from "react-native";

import s from "./styles";

const SampleView: FC = () => {
  return (
    <View style={s.container}>
      <Text>SAMPLE VIEW</Text>
    </View>
  );
};

export default SampleView;
