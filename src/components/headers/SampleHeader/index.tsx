import React, { type ReactNode } from "react";
import { View } from "react-native";

import PressableIcon from "@ui/PressableIcon";

import s from "./styles";

const HeaderRight = (): ReactNode => {
  const onInformationPress = () => true;
  return (
    <View style={s.container}>
      <PressableIcon label="Information" icon="information-outline" onPress={onInformationPress} />
    </View>
  );
};
export default { HeaderRight };
