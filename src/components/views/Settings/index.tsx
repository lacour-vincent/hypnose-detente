import React, { type FC } from "react";
import { View } from "react-native";

import Settings from "@/components/Settings";

import s from "./styles";

const SettingsView: FC = () => {
  return (
    <View style={s.container}>
      <Settings />
    </View>
  );
};

export default SettingsView;
