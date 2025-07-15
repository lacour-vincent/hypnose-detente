import React, { type FC } from "react";
import { Text } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import useRouter from "@/hooks/useRouter";

import theme from "@/styling";

import s from "./styles";

interface Params {
  id: string;
}

const SampleView: FC = () => {
  const { params } = useRouter<Params>();
  return (
    <LinearGradient
      style={s.container}
      colors={[theme["primary-color"], theme["tertiary-color"]]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <Text>SAMPLE VIEW : {params.id}</Text>
    </LinearGradient>
  );
};

export default SampleView;
