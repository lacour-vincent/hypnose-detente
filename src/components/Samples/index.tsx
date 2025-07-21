import React, { type FC } from "react";
import { FlatList } from "react-native";

import type { Sample } from "@/typings/recording";
import { type AssetPackStates, AssetPackStatus } from "@/typings/storage";

import { ROUTES } from "@/referential/routes";
import { getRouteWithParams } from "@/utils/url";

import SampleItem from "@/components/SampleItem";

import Link from "@ui/Link";

import s from "./styles";

interface Props {
  samples: Sample[];
  states: AssetPackStates;
}

const Samples: FC<Props> = ({ samples, states }) => {
  return (
    <FlatList
      contentContainerStyle={s.container}
      columnWrapperStyle={s.wrapper}
      numColumns={2}
      data={samples}
      keyExtractor={(sample) => sample.id}
      renderItem={({ item }) => {
        const href = getRouteWithParams(ROUTES.SAMPLE_VIEW, { id: item.id });
        const offline = states[item.id]?.status === AssetPackStatus.COMPLETED;
        return (
          <Link style={s.link} href={href} label={item.title}>
            <SampleItem style={s.item} sample={item} offline={offline} />
          </Link>
        );
      }}
    />
  );
};
export default Samples;
