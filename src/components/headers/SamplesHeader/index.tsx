import React, { type ReactNode } from "react";
import { View } from "react-native";

import PressableIcon from "@ui/PressableIcon";

import s from "./styles";

const HeaderRight = (): ReactNode => {
  const onRatingPress = () => true;
  const onMenuPress = () => true;
  return (
    <View style={s.container}>
      <PressableIcon label="Notation" icon="star" onPress={onRatingPress} />
      <PressableIcon label="Menu" icon="dots-vertical" onPress={onMenuPress} />
    </View>
  );
};
export default { HeaderRight };
