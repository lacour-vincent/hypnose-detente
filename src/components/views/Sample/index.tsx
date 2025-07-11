import React, { type FC } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

import { getSamples } from "@/store/selectors/recording";

import Samples from "@/components/Samples";

import s from "./styles";

const SamplesView: FC = () => {
  const samples = useSelector(getSamples);
  return (
    <View style={s.container}>
      <Samples samples={samples} />
    </View>
  );
};

export default SamplesView;
