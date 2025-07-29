import React, { type FC } from "react";
import { View } from "react-native";

import About from "@/components/About";

import s from "./styles";

const AboutView: FC = () => {
  return (
    <View style={s.container}>
      <About />
    </View>
  );
};

export default AboutView;
