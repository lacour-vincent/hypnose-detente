import React, { type FC } from "react";
import { FlatList } from "react-native";

import type { Sample } from "@/typings/recording";

import SampleItem from "@/components/SampleItem";

import s from "./styles";

interface Props {
  samples: Sample[];
}

const Samples: FC<Props> = ({ samples }) => {
  return (
    <FlatList
      style={s.container}
      data={samples}
      keyExtractor={(notification) => notification.id}
      renderItem={(notification) => <SampleItem sample={notification.item} />}
    />
  );
};
export default Samples;
