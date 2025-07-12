import React, { type FC } from "react";
import { Text, View } from "react-native";

import useRouter from "@/hooks/useRouter";

import s from "./styles";

interface Params {
  id: string;
}

const SampleView: FC = () => {
  const { params } = useRouter<Params>();
  return (
    <View style={s.container}>
      <Text>SAMPLE VIEW : {params.id}</Text>
    </View>
  );
};

export default SampleView;
